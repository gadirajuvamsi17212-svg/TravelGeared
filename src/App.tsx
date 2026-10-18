import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { HomePage } from './components/home/HomePage';
import { BlogPage } from './components/pages/BlogPage';
import { BlogDetailPage } from './components/pages/BlogDetailPage';
import { GuidesPage } from './components/pages/GuidesPage';
import { CategoryPage } from './components/pages/CategoryPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';

function CategoryPageWrapper() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  return (
    <CategoryPage
      categorySlug={slug}
      onSelectProduct={() => {}}
      onNavigate={(route, routeSlug) => {
        if (routeSlug) navigate(`/category/${routeSlug}`);
        else navigate('/');
      }}
    />
  );
}

function GuidesPageWrapper() {
  const navigate = useNavigate();
  return <GuidesPage onNavigate={() => navigate('/guides')} />;
}

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9fc] text-[#1a1c1e]">
      <ScrollToTop />
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/guides" element={<GuidesPageWrapper />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/category/:slug" element={<CategoryPageWrapper />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
