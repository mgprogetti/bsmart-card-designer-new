import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ProductData, CardVariant, ProductLink } from '../types';
import ModernCard from './ModernCard';
import { ArrowLeft, Save, MessageSquare, Book, Package, ShoppingBag, Eye } from 'lucide-react';

interface Props {
    initialData?: ProductData | null;
    onSave: (data: ProductData) => void;
    onCancel: () => void;
}

const EMPTY_DATA: ProductData = {
    title: "", // Internal WP Title
    cardTitle: "", // Display Title
    titleUrl: "",
    coverImage: "",
    imageClickUrl: "",
    description: "",
    subject: "",
    publisher: "",
    publisherUrl: "",
    author: "",
    whyRead: "",
    brand: "",
    educationalObjectives: [],
    tags: [],
    links: []
};

const CardEditor: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
    // Init form data
    const [formData, setFormData] = useState<ProductData>(
        initialData
            ? { ...initialData }
            : { ...EMPTY_DATA, cardVariant: 'comic' }
    );

    const [variant, setVariant] = useState<CardVariant>(initialData?.cardVariant || 'comic');

    // Helper states for array/complex inputs
    const [rawTags, setRawTags] = useState(initialData?.tags?.join(', ') || "");
    const [rawObjectives, setRawObjectives] = useState(initialData?.educationalObjectives?.join(', ') || "");
    const [buyLink, setBuyLink] = useState(initialData?.links?.find(l => l.type === 'primary')?.url || "");
    const [previewLink, setPreviewLink] = useState(initialData?.links?.find(l => l.type === 'secondary')?.url || "");

    // Internal Title (name of the card in dashboard)
    const [internalTitle, setInternalTitle] = useState(initialData?.title || "");

    // Update variant in form data when local variant state changes
    useEffect(() => {
        setFormData(prev => ({ ...prev, cardVariant: variant }));
    }, [variant]);

    // Handle generic input changes
    const handleChange = (field: keyof ProductData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Sync derived fields (links, tags) to formData whenever they change
    useEffect(() => {
        const newLinks: ProductLink[] = [];
        if (buyLink) newLinks.push({ label: "Acquista", url: buyLink, type: 'primary' as const });
        if (variant === 'comic' && previewLink) {
            newLinks.push({ label: "Sfoglia l'anteprima", url: previewLink, type: 'secondary' as const });
        }

        const newTags = rawTags.split(',').map(t => t.trim()).filter(t => t !== "");
        const newObjectives = rawObjectives.split(',').map(t => t.trim()).filter(t => t !== "");

        setFormData(prev => ({
            ...prev,
            title: internalTitle, // Sync internal title
            links: newLinks,
            tags: newTags,
            educationalObjectives: newObjectives
        }));
    }, [buyLink, previewLink, rawTags, rawObjectives, internalTitle, variant]);


    const handleSubmit = () => {
        if (!internalTitle.trim()) {
            alert("Per favore, inserisci un 'Nome Card' (in alto) per ritrovarla nella lista.");
            return;
        }
        if (!formData.cardTitle.trim()) {
            alert("Inserisci il 'Titolo Card' nel form che sarà visibile nell'anteprima.");
            return;
        }
        onSave(formData);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6 pb-12">
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm sticky top-20 z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                        title="Torna alla lista"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 leading-tight">
                            {initialData ? 'Modifica Card' : 'Nuova Card'}
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
                    {/* Variant Selector */}
                    <div className="flex bg-gray-100 p-1 rounded-lg mr-2">
                        <button onClick={() => setVariant('comic')} title="Fumetto" className={`flex items-center gap-2 px-3 py-1.5 text-sm font-bold rounded transition-all ${variant === 'comic' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}><MessageSquare size={16} /> <span className="hidden xl:inline">Fumetto</span></button>
                        <button onClick={() => setVariant('book')} title="Libro" className={`flex items-center gap-2 px-3 py-1.5 text-sm font-bold rounded transition-all ${variant === 'book' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}><Book size={16} /> <span className="hidden xl:inline">Libro</span></button>
                        <button onClick={() => setVariant('product')} title="Didattica" className={`flex items-center gap-2 px-3 py-1.5 text-sm font-bold rounded transition-all ${variant === 'product' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}><Package size={16} /> <span className="hidden xl:inline">Didattica</span></button>
                        <button onClick={() => setVariant('simple')} title="Semplice" className={`flex items-center gap-2 px-3 py-1.5 text-sm font-bold rounded transition-all ${variant === 'simple' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}><ShoppingBag size={16} /> <span className="hidden xl:inline">Semplice</span></button>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-sm flex items-center justify-center gap-2 transition-all whitespace-nowrap"
                    >
                        <Save size={18} />
                        Salva Card
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">

                {/* FORM COLUMN (Left) */}
                <div className="lg:col-span-5 space-y-6 animate-in slide-in-from-left-4 duration-500">
                    {/* Internal Name Section */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-blue-500">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome Gestione Interna</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium text-lg placeholder:font-normal"
                            placeholder="Es. Promo Ottobre - Promessi Sposi"
                            value={internalTitle}
                            onChange={(e) => setInternalTitle(e.target.value)}
                            autoFocus={!initialData}
                        />
                        <p className="text-xs text-gray-400 mt-1">Questo nome serve solo a te per ritrovare la card nella dashboard.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Dati Contenuto</h3>

                        {/* Common Fields */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Titolo Card (Visibile)</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Titolo del prodotto..."
                                value={formData.cardTitle}
                                onChange={(e) => handleChange('cardTitle', e.target.value)}
                            />
                        </div>

                        {/* Comic Subject */}
                        {variant === 'comic' && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Materia</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Es. Storia"
                                    value={formData.subject}
                                    onChange={(e) => handleChange('subject', e.target.value)}
                                />
                            </div>
                        )}

                        {/* Book Author */}
                        {variant === 'book' && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Autore</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Es. Alessandro Manzoni"
                                    value={formData.author || ''}
                                    onChange={(e) => handleChange('author', e.target.value)}
                                />
                            </div>
                        )}

                        {/* Brand */}
                        {(variant === 'product' && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Marca / Produttore</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Es. Learning Resources"
                                    value={formData.brand || ''}
                                    onChange={(e) => handleChange('brand', e.target.value)}
                                />
                            </div>
                        ))}

                        {/* Simple Product Brand */}
                        {(variant === 'simple' && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Marca / Produttore</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Es. Seven"
                                    value={formData.brand || ''}
                                    onChange={(e) => handleChange('brand', e.target.value)}
                                />
                            </div>
                        ))}

                        {/* Publisher (Not for simple/product) */}
                        {(variant === 'comic' || variant === 'book') && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Editore</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Es. De Agostini"
                                        value={formData.publisher}
                                        onChange={(e) => handleChange('publisher', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Link Editore</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono"
                                        placeholder="https://..."
                                        value={formData.publisherUrl || ''}
                                        onChange={(e) => handleChange('publisherUrl', e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Images */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">URL Immagine Copertina</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono"
                                placeholder="https://... (jpg/png)"
                                value={formData.coverImage}
                                onChange={(e) => handleChange('coverImage', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Link al click su Immagine (Opzionale)</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono"
                                placeholder="Se vuoto, usa Link Acquista"
                                value={formData.imageClickUrl || ''}
                                onChange={(e) => handleChange('imageClickUrl', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Link Titolo (Opzionale)</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono"
                                placeholder="Se vuoto, usa Link Acquista"
                                value={formData.titleUrl || ''}
                                onChange={(e) => handleChange('titleUrl', e.target.value)}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Descrizione</label>
                            <div className="bg-white">
                                <ReactQuill
                                    theme="snow"
                                    value={formData.description}
                                    onChange={(val) => handleChange('description', val)}
                                    modules={{
                                        toolbar: [
                                            ['bold', 'italic'],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                            ['link']
                                        ]
                                    }}
                                    className="h-40 mb-12" // mb-12 to account for toolbar height in flow
                                />
                            </div>
                        </div>

                        {/* Why Read (Book) */}
                        {variant === 'book' && (
                            <div>
                                <label className="block text-xs font-semibold text-blue-600 uppercase mb-1">Perché leggere (box blu)</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-blue-100 bg-blue-50/30 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24"
                                    placeholder="Motivi chiave..."
                                    value={formData.whyRead || ''}
                                    onChange={(e) => handleChange('whyRead', e.target.value)}
                                />
                            </div>
                        )}

                        {/* Tags / Objectives */}
                        {variant === 'comic' && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tag (separati da virgola)</label>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" value={rawTags} onChange={e => setRawTags(e.target.value)} placeholder="Es. Storia, 1945, Italia" />
                            </div>
                        )}
                        {variant === 'product' && (
                            <div>
                                <label className="block text-xs font-semibold text-green-600 uppercase mb-1">Obiettivi Didattici (separati da virgola)</label>
                                <input type="text" className="w-full px-3 py-2 border border-green-100 bg-green-50/30 rounded-lg outline-none" value={rawObjectives} onChange={e => setRawObjectives(e.target.value)} placeholder="Es. Logica, Motricità fine" />
                            </div>
                        )}

                        {/* Links */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                            <div>
                                <label className="block text-xs font-semibold text-blue-600 uppercase mb-1">Link "Acquista"</label>
                                <input type="text" className="w-full px-3 py-2 border border-blue-100 bg-blue-50/30 rounded-lg outline-none text-sm font-mono" value={buyLink} onChange={e => setBuyLink(e.target.value)} placeholder="https://store..." />
                            </div>
                            {variant === 'comic' && (
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Link "Anteprima"</label>
                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none text-sm font-mono" value={previewLink} onChange={e => setPreviewLink(e.target.value)} placeholder="https://books..." />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* PREVIEW COLUMN (Right) */}
                <div className="lg:col-span-7 sticky top-40 animate-in slide-in-from-right-4 duration-500">
                    <div className="bg-gray-100/80 p-4 md:p-8 rounded-2xl border border-dashed border-gray-300">
                        <div className="flex items-center justify-center mb-6 gap-2">
                            <Eye size={16} className="text-gray-400" />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Anteprima In Tempo Reale</span>
                        </div>

                        {/* Preview Render */}
                        <ModernCard data={formData} />

                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-400 italic">
                                Questa è l'esatta rappresentazione grafica che apparirà nel sito dopo aver inserito lo shortcode.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CardEditor;