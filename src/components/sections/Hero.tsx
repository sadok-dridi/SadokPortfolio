'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { TransitionLink } from '@/components/layout/PageTransition';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const indicator = scrollIndicatorRef.current;
    if (!indicator) return;

    // Animate scroll indicator
    gsap.to(indicator, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-center px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs - smaller on mobile */}
        <div className="absolute top-1/4 -left-1/4 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-purple-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto">
        {/* Status badge */}
        <div className="mb-6 sm:mb-8 overflow-hidden">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs sm:text-sm text-zinc-400">Available for freelance projects</span>
          </div>
        </div>

        {/* Main heading */}
        <div className="max-w-5xl">
          <TextReveal
            as="h1"
            animation="words"
            className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight"
            delay={2.6}
            trigger="load"
          >
            I build digital experiences that make an impact
          </TextReveal>
        </div>

        {/* Subtitle */}
        <div className="mt-5 sm:mt-6 md:mt-8 max-w-2xl">
          <TextReveal
            as="p"
            animation="words"
            className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed"
            delay={3}
            trigger="load"
          >
            Full Stack Engineer specializing in modern web applications, 
            cloud infrastructure, and AI-powered solutions.
          </TextReveal>
        </div>

        {/* CTA buttons */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <TransitionLink href="/work" className="w-full sm:w-auto">
            <MagneticButton
              as="div"
              className="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-zinc-950 font-medium rounded-full hover:bg-cyan-400 transition-all duration-300 text-center active:scale-[0.98]"
              cursorText="View"
              cursorVariant="text"
            >
              <span className="flex items-center justify-center gap-2">
                View My Work
                <svg 
                  className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </MagneticButton>
          </TransitionLink>

          <TransitionLink href="/contact" className="w-full sm:w-auto">
            <MagneticButton
              as="div"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 border border-zinc-700 text-white font-medium rounded-full hover:border-zinc-500 hover:bg-zinc-800/50 transition-all duration-300 text-center active:scale-[0.98]"
            >
              Get In Touch
            </MagneticButton>
          </TransitionLink>
        </div>

        {/* Stats row */}
        <div className="mt-16 sm:mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {[
            { value: '5+', label: 'Years Experience' },
            { value: '20+', label: 'Projects Completed' },
            { value: '15+', label: 'Happy Clients' },
            { value: '99%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="text-center md:text-left">
              <TextReveal
                as="div"
                animation="chars"
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
                delay={3.2 + index * 0.1}
                trigger="load"
              >
                {stat.value}
              </TextReveal>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator - hidden on very small screens */}
      <div
        ref={scrollIndicatorRef}
        className="hidden sm:flex absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest">Scroll</span>
        <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-zinc-700 rounded-full flex justify-center pt-2">
          <div className="w-1 h-1.5 sm:h-2 bg-zinc-500 rounded-full" />
        </div>
      </div>
    </section>
  );
}
