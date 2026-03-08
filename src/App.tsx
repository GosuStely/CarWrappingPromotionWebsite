import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/shared/LoadingScreen';

const Home = lazy(() => import('@/pages/Home/Home'));
const Services = lazy(() => import('@/pages/Services/Services'));
const Gallery = lazy(() => import('@/pages/Gallery/Gallery'));
const Pricing = lazy(() => import('@/pages/Pricing/Pricing'));
const About = lazy(() => import('@/pages/About/About'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));

function PageLoader() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="spinner" />
        <p className="text-sm text-slate-500">{t('common.loading')}</p>
      </div>
    </div>
  );
}

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-black text-white mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
        404
      </h1>
      <p className="text-slate-400 mb-8">{t('notFound.message')}</p>
      <a href="/" className="px-6 py-3 rounded-full bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors">
        {t('notFound.back')}
      </a>
    </div>
  );
}

export default function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAppLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={appLoading} />
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </>
  );
}
