'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Check if already visited this session
    let skipLoading = false;
    try {
      skipLoading = sessionStorage.getItem('hasVisited') === 'true';
    } catch (e) {}

    if (skipLoading) {
      setIsHidden(true);
      onComplete?.();
      return;
    }

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.inset = '0';

    const logo = logoRef.current;
    const percentEl = percentRef.current;
    const lineLeft = lineLeftRef.current;
    const lineRight = lineRightRef.current;
    const container = containerRef.current;

    if (!percentEl || !container || !logo) {
      // Fallback if refs not ready
      setTimeout(() => {
        setIsHidden(true);
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.inset = '';
        onComplete?.();
      }, 100);
      return;
    }

    // Animate progress from 0 to 100 over 2.5 seconds
    // Logo opacity syncs with progress
    const duration = 2.5;
    const progressObj = { value: 0 };

    // Animate the lines expanding
    if (lineLeft && lineRight) {
      gsap.fromTo(
        [lineLeft, lineRight],
        { scaleX: 0 },
        { scaleX: 1, duration: duration, ease: 'power2.inOut' }
      );
    }

    gsap.to(progressObj, {
      value: 100,
      duration: duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.round(progressObj.value);
        percentEl.textContent = val.toString().padStart(3, '0');
        
        // Logo fades in as progress increases (0% = 0 opacity, 100% = 1 opacity)
        logo.style.opacity = (progressObj.value / 100).toString();
      },
      onComplete: () => {
        // Hold at 100% briefly
        setTimeout(() => {
          // Exit animation - slide up and fade out
          const tl = gsap.timeline({
            onComplete: () => {
              // Restore body
              document.body.style.overflow = '';
              document.body.style.position = '';
              document.body.style.inset = '';
              
              setIsHidden(true);
              onComplete?.();

              // Mark as visited
              try {
                sessionStorage.setItem('hasVisited', 'true');
              } catch (e) {}
            }
          });

          tl.to(container, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power3.inOut',
          });
        }, 400);
      }
    });

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.inset = '';
    };
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-zinc-950 flex items-center justify-center overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950" />
      
      {/* Ambient glow - subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />

      {/* Main content - centered */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Logo - fades in with progress */}
        <div 
          ref={logoRef} 
          className="mb-12 sm:mb-16"
          style={{ opacity: 0 }}
        >
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold text-white tracking-tighter">
            SADOK
            <span className="text-cyan-400">.</span>
          </h1>
        </div>

        {/* Percentage display with lines */}
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Left line */}
          <div 
            ref={lineLeftRef}
            className="w-12 sm:w-20 md:w-32 h-[1px] bg-gradient-to-r from-transparent to-zinc-600 origin-right"
            style={{ transform: 'scaleX(0)' }}
          />
          
          {/* Percentage */}
          <div className="flex items-baseline">
            <span 
              ref={percentRef} 
              className="text-xl sm:text-2xl md:text-3xl font-mono font-light text-zinc-400 tracking-widest"
            >
              000
            </span>
            <span className="text-sm sm:text-base text-zinc-600 font-mono ml-1">%</span>
          </div>

          {/* Right line */}
          <div 
            ref={lineRightRef}
            className="w-12 sm:w-20 md:w-32 h-[1px] bg-gradient-to-l from-transparent to-zinc-600 origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>

      {/* Bottom corner info */}
      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10">
        <p className="text-[10px] sm:text-xs text-zinc-700 font-mono uppercase tracking-[0.2em]">
          Full Stack Engineer
        </p>
      </div>

      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10">
        <p className="text-[10px] sm:text-xs text-zinc-700 font-mono uppercase tracking-[0.2em]">
          2026
        </p>
      </div>
    </div>
  );
}
