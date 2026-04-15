'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { TransitionLink } from '@/components/layout/PageTransition';

interface HeroProps {
  isLoading?: boolean;
}

export default function Hero({ isLoading = false }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Don't animate while loading or if already animated
    if (isLoading || hasAnimated.current) return;
    
    hasAnimated.current = true;
    
    const container = containerRef.current;
    const content = contentRef.current;
    const indicator = scrollIndicatorRef.current;
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    
    if (!container || !content) return;

    // Get all animatable elements
    const heading = content.querySelector('.hero-heading');
    const subtitle = content.querySelector('.hero-subtitle');
    const buttons = content.querySelector('.hero-buttons');
    const stats = content.querySelectorAll('.hero-stat');

    if (isMobile) {
      gsap.fromTo(
        content,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', delay: 0.05 }
      );

      gsap.set([heading, subtitle, buttons, stats], { opacity: 1, y: 0 });

      if (indicator) {
        gsap.set(indicator, { opacity: 0 });
      }

      return;
    }

    // Create timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate elements in sequence
    if (heading) {
      tl.fromTo(heading,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.2
      );
    }

    if (subtitle) {
      tl.fromTo(subtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.4
      );
    }

    if (buttons) {
      tl.fromTo(buttons,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.6
      );
    }

    if (stats.length > 0) {
      tl.fromTo(stats,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        0.7
      );
    }

    // Scroll indicator animation
    if (indicator) {
      tl.fromTo(indicator,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1
      );

      gsap.to(indicator, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        delay: 1.5,
      });
    }

    return () => {
      tl.kill();
    };
  }, [isLoading]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-center px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20"
    >
      {/* Background elements - simplified on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs - smaller blur on mobile */}
        <div className="absolute top-1/4 -left-1/4 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[40px] md:blur-[100px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-purple-500/10 rounded-full blur-[40px] md:blur-[100px]" />
        
        {/* Grid pattern - hidden on mobile */}
        <div 
          className="hidden md:block absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div ref={contentRef} className="relative z-10 container mx-auto">
        {/* Main heading */}
        <div className="hero-heading max-w-5xl opacity-0">
          <h1 className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight">
            I build digital experiences that make an impact
          </h1>
        </div>

        {/* Subtitle */}
        <div className="hero-subtitle mt-5 sm:mt-6 md:mt-8 max-w-2xl opacity-0">
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed">
            Full Stack Engineer specializing in modern web applications, 
            cloud infrastructure, and AI-powered solutions.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="hero-buttons mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 opacity-0">
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
            <div key={index} className="hero-stat text-center md:text-left opacity-0">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                {stat.value}
              </div>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="hidden sm:flex absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-0"
      >
        <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest">Scroll</span>
        <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-zinc-700 rounded-full flex justify-center pt-2">
          <div className="w-1 h-1.5 sm:h-2 bg-zinc-500 rounded-full" />
        </div>
      </div>
    </section>
  );
}
