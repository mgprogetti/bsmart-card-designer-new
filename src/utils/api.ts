import { ProductData, SavedCard } from '../types';
import { generateWordPressCode } from './generateWordPressCode';

// Estendiamo l'interfaccia Window per TypeScript
declare global {
  interface Window {
    bsmartSettings?: {
      root: string;
      nonce: string;
    };
  }
}

const isWP = typeof window.bsmartSettings !== 'undefined';

// Simulazione locale se non siamo su WP
const LOCAL_STORAGE_KEY = 'bsmart_wp_cards_db_v2';

export const api = {
  getCards: async (): Promise<SavedCard[]> => {
    if (!isWP) {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }

    try {
      const response = await fetch(`${window.bsmartSettings!.root}bsmart/v1/cards`, {
        headers: { 'X-WP-Nonce': window.bsmartSettings!.nonce }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error fetching cards:", error);
      return [];
    }
  },

  saveCard: async (cardData: ProductData, existingId?: number | string): Promise<SavedCard> => {
    // Generiamo l'HTML statico da salvare nel DB per lo shortcode
    const { html } = generateWordPressCode(cardData);

    if (!isWP) {
      // Logica LocalStorage (Simulazione)
      const cards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      let newCard: SavedCard;
      
      if (existingId) {
        const index = cards.findIndex((c: SavedCard) => c.id === existingId);
        if (index > -1) {
          newCard = { ...cards[index], title: cardData.title, data: { ...cardData, id: existingId }, date: new Date().toISOString() };
          cards[index] = newCard;
        } else throw new Error("Card not found");
      } else {
        const newId = Date.now();
        newCard = { id: newId, title: cardData.title, data: { ...cardData, id: newId }, shortcode: `[card-designer id="${newId}"]`, date: new Date().toISOString() };
        cards.push(newCard);
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cards));
      return newCard;
    }

    // Logica Reale WP
    const response = await fetch(`${window.bsmartSettings!.root}bsmart/v1/cards`, {
      method: 'POST',
      headers: {
        'X-WP-Nonce': window.bsmartSettings!.nonce,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: existingId,
        title: cardData.title, // Titolo interno WP
        data: cardData, // JSON strutturato per l'editor
        html_content: html // HTML pre-renderizzato per lo shortcode
      })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Errore salvataggio');
    }
    return await response.json();
  },

  deleteCard: async (id: number | string): Promise<void> => {
    if (!isWP) {
      const cards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      const filtered = cards.filter((c: SavedCard) => c.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
      return;
    }

    await fetch(`${window.bsmartSettings!.root}bsmart/v1/cards/${id}`, {
      method: 'DELETE',
      headers: { 'X-WP-Nonce': window.bsmartSettings!.nonce }
    });
  }
};