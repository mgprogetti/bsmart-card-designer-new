import React from 'react';
import { SavedCard } from '../types';
import { Plus, Edit, Trash2, Copy, Check, Search, FileCode, AlertTriangle } from 'lucide-react';

interface Props {
    cards: SavedCard[];
    onCreateNew: () => void;
    onEdit: (card: SavedCard) => void;
    onDelete: (id: number | string) => void;
}

const CardDashboard: React.FC<Props> = ({ cards, onCreateNew, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [copiedId, setCopiedId] = React.useState<string | number | null>(null);

    const filteredCards = cards.filter(c => {
        // Safety check: if data is null, include it so we can delete it, unless filtering by specific variant
        if (!c.data) return true;
        return c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
               (c.data.cardVariant && c.data.cardVariant.includes(searchTerm.toLowerCase()));
    });

    const handleCopyShortcode = (shortcode: string, id: string | number) => {
        navigator.clipboard.writeText(shortcode);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="max-w-[98%] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Card Designer</h1>
                    <p className="text-gray-500 mt-1">Gestisci le card prodotto da inserire nei tuoi articoli.</p>
                </div>
                <button 
                    onClick={onCreateNew}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm"
                >
                    <Plus size={20} />
                    Crea Nuova Card
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center gap-3">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text"
                            placeholder="Cerca per nome..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                {cards.length === 0 ? (
                    <div className="p-16 text-center">
                        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileCode className="text-blue-400" size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Nessuna card trovata</h3>
                        <p className="text-gray-500 mt-1 mb-6 max-w-sm mx-auto">Non hai ancora creato nessuna card. Clicca sul pulsante per iniziare.</p>
                        <button 
                            onClick={onCreateNew}
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Crea la tua prima card &rarr;
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 w-16 text-center">ID</th>
                                    <th className="px-6 py-3">Nome Card</th>
                                    <th className="px-6 py-3">Tipo</th>
                                    <th className="px-6 py-3">Shortcode</th>
                                    <th className="px-6 py-3 text-right">Azioni</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredCards.map((card) => {
                                    // Gestione errore dati corrotti
                                    if (!card.data) {
                                        return (
                                            <tr key={card.id} className="bg-red-50 hover:bg-red-100 transition-colors">
                                                <td className="px-6 py-4 text-center text-red-500 font-mono text-xs">
                                                    {card.id}
                                                </td>
                                                <td className="px-6 py-4" colSpan={3}>
                                                    <div className="flex items-center gap-2 text-red-600 font-bold">
                                                        <AlertTriangle size={18} />
                                                        Errore: Dati corrotti per la card "{card.title}"
                                                    </div>
                                                    <div className="text-red-400 text-xs mt-1">
                                                        È consigliato eliminare questa riga.
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button 
                                                        onClick={() => onDelete(card.id)}
                                                        className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors bg-red-100"
                                                        title="Elimina definitivamente"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }

                                    return (
                                        <tr key={card.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-center text-gray-400 font-mono text-xs">
                                                {card.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900 text-base">{card.title}</div>
                                                <div className="text-gray-500 text-xs mt-0.5 truncate max-w-[200px] italic">
                                                    Titolo visibile: "{card.data.cardTitle || 'N/A'}"
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                                    ${card.data.cardVariant === 'comic' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                                                    ${card.data.cardVariant === 'book' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : ''}
                                                    ${card.data.cardVariant === 'product' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                                                    ${card.data.cardVariant === 'simple' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                                                `}>
                                                    {card.data.cardVariant === 'comic' ? 'Fumetto' : 
                                                     card.data.cardVariant === 'book' ? 'Libro' : 
                                                     card.data.cardVariant === 'product' ? 'Didattica' : 'Semplice'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button 
                                                    onClick={() => handleCopyShortcode(card.shortcode, card.id)}
                                                    className="group/btn flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded px-3 py-1.5 font-mono text-xs text-slate-700 transition-colors cursor-pointer shadow-sm"
                                                >
                                                    {card.shortcode}
                                                    {copiedId === card.id ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <button 
                                                        onClick={() => onEdit(card)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Modifica"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => onDelete(card.id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Elimina"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardDashboard;