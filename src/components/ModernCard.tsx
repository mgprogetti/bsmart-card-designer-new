import React from 'react';
import type { ProductData } from '../types';
import { BookOpen, ShoppingBag } from 'lucide-react';

interface Props {
  data: ProductData;
}

const ModernCard: React.FC<Props> = ({ data }) => {
  const primaryUrl = data.links[0]?.url || '#';
  const titleHref = data.titleUrl || primaryUrl;
  const imageHref = data.imageClickUrl || primaryUrl;
  
  // Check variant
  const isBook = data.cardVariant === 'book';
  const isProduct = data.cardVariant === 'product';
  const isSimple = data.cardVariant === 'simple';
  const isComic = data.cardVariant === 'comic';

  // Filter links: Book, Product and Simple show only primary (usually)
  const linksToShow = (isBook || isProduct || isSimple)
    ? data.links.filter(l => l.type === 'primary') 
    : data.links;

  // Product and Simple share image style (aspect-square)
  const isProductOrSimple = isProduct || isSimple;

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full max-w-4xl mx-auto hover:shadow-lg transition-shadow duration-300">
      {/* Image Column */}
      <div className="md:w-[30%] bg-slate-50 p-6 flex items-center justify-center">
         <a 
            href={imageHref} 
            target="_blank" 
            rel="noopener" 
            className="block relative transition-transform duration-300 hover:scale-105 hover:-rotate-1"
         >
            <img 
                src={data.coverImage} 
                alt={data.cardTitle} 
                className={`w-full max-w-[160px] h-auto shadow-lg rounded-sm object-cover ${isProductOrSimple ? 'aspect-square object-contain' : ''}`}
            />
         </a>
      </div>

      {/* Content Column */}
      <div className="flex-1 p-8 flex flex-col">
        
        {/* Subject Badge (COMIC ONLY) */}
        {isComic && data.subject && (
            <div className="mb-3">
                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {data.subject}
                </span>
            </div>
        )}
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 leading-tight mb-1">
            <a href={titleHref} target="_blank" rel="noopener" className="hover:text-blue-600 transition-colors">
                {data.cardTitle}
            </a>
        </h3>

        {/* Author (BOOK ONLY) */}
        {isBook && data.author && (
            <div className="text-lg text-slate-500 italic font-medium mb-2">
                {data.author}
            </div>
        )}

        {/* Brand (PRODUCT & SIMPLE ONLY) */}
        {isProductOrSimple && data.brand && (
            <div className="text-sm text-slate-500 mb-4 uppercase tracking-wide font-semibold">
                <span className="text-slate-400">Produttore:</span> {data.brand}
            </div>
        )}

        {/* Publisher (COMIC & BOOK ONLY) */}
        {(!isProduct && !isSimple) && (
            <div className="text-sm text-slate-500 mb-4">
                <strong className="text-slate-700">Editore:</strong>{' '}
                {data.publisherUrl ? (
                    <a href={data.publisherUrl} target="_blank" rel="noopener" className="underline decoration-slate-300 hover:text-blue-600 hover:decoration-blue-600 underline-offset-2">
                        {data.publisher}
                    </a>
                ) : (
                    data.publisher
                )}
            </div>
        )}

        {/* Description */}
        <div className="text-slate-600 leading-relaxed mb-6">
            <p className="whitespace-pre-line">{data.description}</p>
        </div>

        {/* Why Read (BOOK ONLY) */}
        {isBook && data.whyRead && (
             <div className="mb-6 bg-blue-50/50 border-l-4 border-blue-500 p-4 rounded-r-md">
                <span className="block text-xs font-bold text-blue-800 uppercase mb-1">
                    Perché leggere questo libro?
                </span>
                <p className="text-slate-600 text-sm italic">
                    {data.whyRead}
                </p>
             </div>
        )}

        {/* Educational Objectives (PRODUCT ONLY) - Excluded for Simple */}
        {isProduct && data.educationalObjectives && data.educationalObjectives.length > 0 && (
            <div className="mb-6">
                <span className="block text-xs font-bold text-green-600 uppercase mb-2 tracking-wider">
                    Obiettivi Didattici
                </span>
                <div className="flex flex-wrap gap-2">
                    {data.educationalObjectives.map((tag, index) => (
                        <span key={index} className="bg-green-50 text-green-700 border border-green-100 text-xs px-2.5 py-1 rounded font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        )}

        {/* Tags (COMIC ONLY) */}
        {isComic && data.tags.length > 0 && (
            <div className="mb-6">
                <span className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
                    Argomenti
                </span>
                <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag, index) => (
                        <span key={index} className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        )}

        {/* Actions */}
        <div className="mt-auto flex flex-wrap gap-3">
            {linksToShow.map((link, index) => (
                <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener"
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 no-underline ${
                        link.type === 'primary' 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-transparent text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                    {link.type === 'primary' ? <ShoppingBag size={16} /> : <BookOpen size={16} />}
                    {link.label}
                </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ModernCard;