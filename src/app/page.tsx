'use client';

import { useState } from 'react';
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

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        
        <main>
          {/* Hero Section */}
          <Hero />

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
