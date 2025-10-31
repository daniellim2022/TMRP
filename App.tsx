import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { initialWebsites } from './constants';
import { WebsiteCard } from './components/WebsiteCard';
import { EditWebsiteModal } from './components/EditWebsiteModal';
import { Navbar } from './components/Navbar';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import type { Website } from './types';
import './index.css';

const App: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>(initialWebsites);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [websiteToDelete, setWebsiteToDelete] = useState<Website | null>(null);

  const categories = useMemo(() => 
    ['All', ...Array.from(new Set(websites.flatMap(w => w.tags)))]
  , [websites]);

  useEffect(() => {
    // If the active category is no longer in the list of available categories
    // (e.g., after deleting the last item of that category), reset to 'All'.
    if (!categories.includes(activeCategory)) {
      setActiveCategory('All');
    }
  }, [categories, activeCategory]);

  const filteredWebsites = useMemo(() => {
    if (activeCategory === 'All') {
      return websites;
    }
    return websites.filter(website => website.tags.includes(activeCategory));
  }, [websites, activeCategory]);

  const handleOpenEditModal = (website: Website) => {
    setEditingWebsite(website);
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setEditingWebsite(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWebsite(null);
  };

  const handleSaveWebsite = (websiteToSave: Website) => {
    if (editingWebsite) {
      setWebsites(websites.map(w => w.id === websiteToSave.id ? websiteToSave : w));
    } else {
      const newWebsite = { ...websiteToSave, id: Date.now() };
      setWebsites([newWebsite, ...websites]);
    }
    handleCloseModal();
  };
  
  const handleOpenDeleteModal = (website: Website) => {
    setWebsiteToDelete(website);
  };

  const handleCloseDeleteModal = () => {
    setWebsiteToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (websiteToDelete) {
      setWebsites(prevWebsites => prevWebsites.filter(w => w.id !== websiteToDelete.id));
      handleCloseDeleteModal();
    }
  };

  return (
 <div className="app-container">
      <Navbar 
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      
      <header className="app-header">
          <h1 className="header-title">
              나의 게임 개발 포트폴리오
          </h1>
          <p className="header-description">
              제가 개발한 게임 프로젝트들을 소개합니다. 각 카드를 클릭하여 자세한 내용을 확인해보세요.
          </p>
          <button
              onClick={handleOpenAddModal}
              className="add-project-button"
          >
              새 프로젝트 추가
          </button>
      </header>
      
      <main className="main-content">
        <div className="projects-grid">
          {filteredWebsites.map((website: Website) => (
            <WebsiteCard 
              key={website.id} 
              website={website} 
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
            />
          ))}
        </div>
      </main>

      <footer className="app-footer">
        <p className="footer-copyright">&copy; {new Date().getFullYear()} 잉~기모링. All Rights Reserved.</p>
        <p className="footer-address">학교 주소: 경기 분당구 하오개로 351번 길 4</p>
      </footer>

      {isModalOpen && (
        <EditWebsiteModal
          website={editingWebsite}
          onClose={handleCloseModal}
          onSave={handleSaveWebsite}
        />
      )}

      <ConfirmDeleteModal 
        website={websiteToDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default App;