import React, { useState, useEffect } from 'react';
import CardDashboard from './components/CardDashboard';
import CardEditor from './components/CardEditor';
import { ProductData, SavedCard } from './types';
import { api } from './utils/api';

const App: React.FC = () => {
    const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');
    const [cards, setCards] = useState<SavedCard[]>([]);
    const [editingCard, setEditingCard] = useState<SavedCard | null>(null);
    const [loading, setLoading] = useState(false);

    const loadCards = async () => {
        setLoading(true);
        const data = await api.getCards();
        setCards(data);
        setLoading(false);
    };

    // Load cards on mount
    useEffect(() => {
        loadCards();
    }, []);

    const handleCreateNew = () => {
        setEditingCard(null);
        setView('editor');
    };

    const handleEdit = (card: SavedCard) => {
        setEditingCard(card);
        setView('editor');
    };

    const handleDelete = async (id: number | string) => {
        if (window.confirm("Sei sicuro di voler eliminare questa card?")) {
            await api.deleteCard(id);
            loadCards();
        }
    };

    const handleSave = async (data: ProductData) => {
        try {
            setLoading(true);
            await api.saveCard(data, editingCard?.id);
            await loadCards();
            setView('dashboard');
        } catch (e) {
            alert("Errore durante il salvataggio. Controlla la console.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setView('dashboard');
        setEditingCard(null);
    };

    return (
        <div className="w-full bg-gray-100 font-sans text-slate-800 pb-12 relative">
            {/* Plugin Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">B</div>
                   <span className="font-semibold text-gray-700">bSmart Card Designer</span>
                </div>
                <div className="text-xs text-gray-400 font-mono">v1.0.7</div>
            </div>

            {loading && (
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-100 overflow-hidden z-[60]">
                    <div className="animate-pulse w-full h-full bg-blue-500 origin-left"></div>
                </div>
            )}

            <div className="pt-8 w-full">
                {view === 'dashboard' && (
                    <CardDashboard 
                        cards={cards}
                        onCreateNew={handleCreateNew}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}

                {view === 'editor' && (
                    <CardEditor 
                        initialData={editingCard?.data}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                )}
            </div>
        </div>
    );
};

export default App;