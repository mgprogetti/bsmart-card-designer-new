<?php
/**
 * Plugin Name: bSmart Card Designer
 * Description: Un plugin per creare e gestire card prodotto responsive (Fumetto, Libro, Didattica, ecc.) da inserire negli articoli tramite shortcode.
 * Version: 1.1.0
 * Author: bSmart Labs
 * Text Domain: bsmart-card-designer
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class BSmart_Card_Designer {

    public function __construct() {
        // Registra il menu di amministrazione
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Registra il Custom Post Type per salvare le card
        add_action('init', array($this, 'register_cpt'));
        
        // Registra endpoint API REST
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        
        // Registra lo Shortcode
        add_shortcode('card-designer', array($this, 'render_shortcode'));
        
        // Filtro per aggiungere type="module" agli script (Fix pagina bianca)
        add_filter('script_loader_tag', array($this, 'add_type_attribute'), 10, 3);

        // Hook di attivazione per pulire i permalink
        register_activation_hook(__FILE__, array($this, 'activate_plugin'));
    }

    /**
     * Attivazione: Pulizia permalink per evitare conflitti 404
     */
    public function activate_plugin() {
        $this->register_cpt();
        flush_rewrite_rules();
    }

    /**
     * Aggiunge la voce di menu nell'admin
     */
    public function add_admin_menu() {
        add_menu_page(
            'Card Designer',
            'Card Designer',
            'manage_options', 
            'bsmart-card-manager', // Slug univoco per evitare 404
            array($this, 'render_admin_page'),
            'dashicons-layout', 
            99 
        );
    }

    /**
     * Registra il Custom Post Type nascosto
     */
    public function register_cpt() {
        $args = array(
            'label'              => 'Card Designer Cards',
            'public'             => false, // Non visibile pubblicamente come URL
            'show_ui'            => false, // Non mostrare nell'admin standard
            'show_in_rest'       => false, // Gestiamo noi le API
            'rewrite'            => false, // Disabilita slug URL per evitare 404
            'query_var'          => false,
            'supports'           => array('title', 'editor', 'custom-fields'),
            'capability_type'    => 'post',
        );
        register_post_type('bsmart_card', $args);
    }

    /**
     * Fix per caricare React come modulo ES6
     */
    public function add_type_attribute($tag, $handle, $src) {
        if ('bsmart-card-designer-js' !== $handle) {
            return $tag;
        }
        return '<script type="module" src="' . esc_url($src) . '"></script>';
    }

    /**
     * Renderizza la pagina React nell'admin
     */
    public function render_admin_page() {
        // Carica gli script solo nella nostra pagina
        $this->enqueue_admin_scripts();
        
        // CONTENITORE PRINCIPALE: Rimosso 'display: flex' per permettere larghezza piena (1.0.5)
        echo '<div id="bsmart-card-root" style="min-height: 500px; width: 100%; position: relative;">';
        
        // Messaggio di caricamento (centrato solo lui)
        echo '<div style="position: absolute; top: 50px; left: 0; width: 100%; text-align: center; font-family: sans-serif; color: #666; font-size: 16px;">';
        echo '<span class="spinner is-active" style="float:none; margin-right: 10px;"></span> Caricamento applicazione...';
        echo '</div>';
        
        echo '</div>';
    }

    /**
     * Carica CSS e JS dell'app React
     */
    private function enqueue_admin_scripts() {
        $plugin_url = plugin_dir_url(__FILE__);
        $dist_url = $plugin_url . 'dist/assets/';

        // Carica lo stile CSS compilato da Vite
        wp_enqueue_style(
            'bsmart-card-designer-css',
            $dist_url . 'index.css',
            array(),
            '1.1.0'
        );

        // Carica il JS compilato da Vite
        wp_enqueue_script(
            'bsmart-card-designer-js',
            $dist_url . 'index.js',
            array('wp-element'), // Dipendenze
            '1.1.0',
            true // Footer
        );

        // Passa variabili PHP a JS (Nonce e Root API)
        wp_localize_script('bsmart-card-designer-js', 'bsmartSettings', array(
            'root' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest')
        ));
    }

    /**
     * Registra le route API per React
     */
    public function register_rest_routes() {
        register_rest_route('bsmart/v1', '/cards', array(
            array(
                'methods' => 'GET',
                'callback' => array($this, 'get_cards'),
                'permission_callback' => function() { return current_user_can('edit_posts'); }
            ),
            array(
                'methods' => 'POST',
                'callback' => array($this, 'save_card'),
                'permission_callback' => function() { return current_user_can('edit_posts'); }
            ),
        ));

        register_rest_route('bsmart/v1', '/cards/(?P<id>\d+)', array(
            'methods' => 'DELETE',
            'callback' => array($this, 'delete_card'),
            'permission_callback' => function() { return current_user_can('edit_posts'); }
        ));
    }

    // API: GET cards
    public function get_cards() {
        $posts = get_posts(array(
            'post_type' => 'bsmart_card',
            'numberposts' => -1,
            'post_status' => 'publish'
        ));

        $data = array();
        foreach ($posts as $post) {
            $json_data = json_decode($post->post_content);
            $data[] = array(
                'id' => $post->ID,
                'title' => $post->post_title,
                'data' => $json_data ? $json_data : null,
                'shortcode' => '[card-designer id="' . $post->ID . '"]',
                'date' => $post->post_date
            );
        }
        return $data;
    }

    // API: SAVE card
    public function save_card($request) {
        $params = $request->get_json_params();
        
        $id = isset($params['id']) ? intval($params['id']) : 0;
        $title = sanitize_text_field($params['title']);
        $card_data = $params['data']; // Raw JSON obj
        $html_content = $params['html_content']; // HTML pre-generato

        // Validazione
        if (empty($title)) {
            return new WP_Error('missing_title', 'Titolo mancante', array('status' => 400));
        }

        // FIX: wp_slash() protegge i caratteri di escape (es. \n) che altrimenti WP rimuove
        $post_data = array(
            'post_title'    => $title,
            'post_content'  => wp_slash(json_encode($card_data, JSON_UNESCAPED_UNICODE)), 
            'post_status'   => 'publish',
            'post_type'     => 'bsmart_card'
        );

        if ($id > 0) {
            $post_data['ID'] = $id;
            $post_id = wp_update_post($post_data);
        } else {
            $post_id = wp_insert_post($post_data);
        }

        if (is_wp_error($post_id)) {
            return $post_id;
        }

        // Salviamo l'HTML renderizzato nei meta per recuperarlo velocemente nello shortcode
        update_post_meta($post_id, '_bsmart_card_html', $html_content);

        return array(
            'id' => $post_id,
            'message' => 'Salvato con successo'
        );
    }

    // API: DELETE card
    public function delete_card($request) {
        $id = $request['id'];
        $deleted = wp_delete_post($id, true);
        if ($deleted) {
            return array('message' => 'Cancellato');
        }
        return new WP_Error('cant_delete', 'Errore cancellazione', array('status' => 500));
    }

    /**
     * Shortcode Render [card-designer id="123"]
     */
    public function render_shortcode($atts) {
        $atts = shortcode_atts(array(
            'id' => 0,
        ), $atts);

        if (!$atts['id']) return '';

        // Recupera l'HTML pre-renderizzato
        $html = get_post_meta($atts['id'], '_bsmart_card_html', true);

        if (!$html) {
            // Fallback: se non c'è HTML salvato (vecchie versioni?), prova a rigenerarlo o mostra errore
            return '<!-- bSmart Card Error: Card ID ' . esc_html($atts['id']) . ' not found or empty -->';
        }

        // Carica il CSS del frontend solo se lo shortcode viene usato
        wp_enqueue_style(
            'bsmart-card-frontend-style',
            plugin_dir_url(__FILE__) . 'bsmart-style.css',
            array(),
            '1.1.0'
        );

        return $html;
    }
}

// Inizializza il plugin
new BSmart_Card_Designer();
