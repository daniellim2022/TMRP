import React from 'react';
import type { Website } from '../types';

interface WebsiteCardProps {
  website: Website;
  onEdit: (website: Website) => void;
  onDelete: (website: Website) => void;
}

const ArrowIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);

const EditIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

const DeleteIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

export const WebsiteCard: React.FC<WebsiteCardProps> = ({ website, onEdit, onDelete }) => {
  return (
    <div
      className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-2"
    >
        <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={() => onEdit(website)} className="p-2 rounded-full bg-gray-900/50 hover:bg-cyan-600 text-white transition-colors" aria-label="Edit Website">
                <EditIcon className="w-5 h-5"/>
            </button>
            <button onClick={() => onDelete(website)} className="p-2 rounded-full bg-gray-900/50 hover:bg-red-600 text-white transition-colors" aria-label="Delete Website">
                <DeleteIcon className="w-5 h-5"/>
            </button>
        </div>
      <div className="relative">
        <img
          src={website.imageUrl}
          alt={website.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-colors duration-300"></div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
            {website.tags.map(tag => (
                <span key={tag} className="text-xs font-semibold bg-gray-700 text-cyan-400 py-1 px-2 rounded-full">
                    {tag}
                </span>
            ))}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{website.title}</h3>
        <p className="text-gray-400 text-sm mb-4 h-20 overflow-hidden">{website.description}</p>
        <a 
          href={website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-300 group/link"
        >
          <span>사이트 방문하기</span>
          <ArrowIcon className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      </div>
    </div>
  );
};