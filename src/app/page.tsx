'use client';

import { useState, useEffect } from 'react';
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

  // Check if we should skip loading on mount
  useEffect(() => {
    let skipLoading = false;
    try {
      skipLoading = sessionStorage.getItem('hasVisited') === 'true';
    } catch {
      // sessionStorage not available
    }
    
    if (skipLoading) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />
      
      {/* Page content - completely hidden until loading completes */}
      <div 
        className={`transition-opacity duration-500 ease-out ${
          showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ 
          visibility: showContent ? 'visible' : 'hidden',
        }}
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
