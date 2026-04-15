import { useEffect } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { NavigationMenu } from '../components/NavigationMenu';
import { HeroSection } from '../components/HeroSection';
import { CategoryBrowser } from '../components/CategoryBrowser';
import { DailyDeals } from '../components/DailyDeals';
import { PromoBanners } from '../components/PromoBanners';
import { RelatedItems } from '../components/RelatedItems';
import { Footer } from '../components/Footer';
import { useStoreToasts } from '../store/useStoreToasts';

export function HomePage() {
  useStoreToasts();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchBar />
      <NavigationMenu />
      <main>
        <HeroSection />
        <CategoryBrowser />
        <DailyDeals />
        <PromoBanners />
        <RelatedItems />
      </main>
      <Footer />
    </div>
  );
}
