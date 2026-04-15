'use client';

import { useEffect, useState, useCallback } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import FeaturedWork from '@/components/sections/FeaturedWork';
import AboutTeaser from '@/components/sections/AboutTeaser';
import ContactCTA from '@/components/sections/ContactCTA';
import { TextMarquee } from '@/components/ui/Marquee';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      
      // Force a browser reflow/resize event so mobile browsers (iOS Safari)
      // recalculate the scrollable height and unlock the view.
      setTimeout(() => {
        window.scrollTo(0, 0);
        window.dispatchEvent(new Event('resize'));
      }, 50);
    }
  }, [isLoading]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setShowContent(true);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />

      <div
        className={showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        style={{ animation: showContent ? `fadeIn ${isMobile ? '0.22s' : '0.5s'} ease-out` : undefined }}
      >
        <Header />
        
        <main>
          {/* Hero Section */}
          <Hero isLoading={isLoading} />

          {/* Marquee Banner */}
          <div className="py-8 border-y border-zinc-800/50 overflow-hidden bg-zinc-900/30">
            <TextMarquee
              text="Full Stack Development * Cloud Architecture * AI Integration * UI/UX Design"
              className="text-2xl md:text-3xl font-medium text-zinc-600"
              textClassName="uppercase tracking-wider"
              separator={<span className="mx-6 text-cyan-500/50">+</span>}
              speed={35}
              direction="left"
            />
          </div>

          {/* Featured Work Section */}
          <FeaturedWork />

          {/* About Teaser Section */}
          <AboutTeaser />

          {/* Contact CTA Section */}
          <ContactCTA />
        </main>

        <Footer />
      </div>
    </>
  );
}
