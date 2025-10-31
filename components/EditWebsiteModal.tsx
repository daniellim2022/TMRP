import React, { useState, useEffect } from 'react';
import type { Website } from '../types';

interface EditWebsiteModalProps {
    website: Website | null;
    onClose: () => void;
    onSave: (website: Website) => void;
}

export const EditWebsiteModal: React.FC<EditWebsiteModalProps> = ({ website, onClose, onSave }) => {
    const [formData, setFormData] = useState<Omit<Website, 'id'>>({
        title: '',
        description: '',
        imageUrl: '',
        url: '',
        tags: [],
    });
    
    const [tagsInput, setTagsInput] = useState('');

    useEffect(() => {
        if (website) {
            setFormData({
                title: website.title,
                description: website.description,
                imageUrl: website.imageUrl,
                url: website.url,
                tags: website.tags,
            });
            setTagsInput(website.tags.join(', '));
        } else {
             setFormData({ title: '', description: '', imageUrl: '', url: '', tags: [] });
             setTagsInput('');
        }
    }, [website]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagsInput(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
        onSave({
            ...formData,
            tags,
            id: website?.id || 0,
        });
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl transform transition-all"
                onClick={e => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit}>
                    <div className="p-6 sm:p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">{website ? '프로젝트 편집' : '새 프로젝트 추가'}</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-300">제목</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm h-10 px-3"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-300">설명</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-3"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300">이미지 URL</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    id="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm h-10 px-3"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="url" className="block text-sm font-medium text-gray-300">웹사이트 URL</label>
                                <input
                                    type="url"
                                    name="url"
                                    id="url"
                                    value={formData.url}
                                    onChange={handleChange}
                                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm h-10 px-3"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-300">태그 (쉼표로 구분)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    value={tagsInput}
                                    onChange={handleTagsChange}
                                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm h-10 px-3"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-700 px-6 py-4 flex justify-end gap-4 rounded-b-lg">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex justify-center py-2 px-4 border border-gray-500 shadow-sm text-sm font-medium rounded-md text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition-colors"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition-colors"
                        >
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};