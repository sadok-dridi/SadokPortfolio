'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(false);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isCompleteRef = useRef(false);

  useEffect(() => {
    // Skip if already visited this session
    try {
      if (sessionStorage.getItem('hasVisited') === 'true') {
        setIsHidden(true);
        onComplete?.();
        return;
      }
    } catch (e) {}

    // Lock body scroll
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';

    // Animate logo in
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );
    }

    // Progress tracking
    let resourcesLoaded = 0;
    let totalResources = 0;
    const minLoadTime = 1200; // Minimum time to show loading
    const startTime = Date.now();
    let minTimeReached = false;

    const calculateProgress = () => {
      // Base progress from resources (0-90%)
      let resourceProgress = totalResources > 0 
        ? (resourcesLoaded / totalResources) * 90 
        : 0;
      
      // Time-based progress boost (ensures smooth progression)
      const elapsed = Date.now() - startTime;
      const timeProgress = Math.min((elapsed / minLoadTime) * 50, 50);
      
      // Combine: take the higher of the two, max 90% until fully ready
      targetProgressRef.current = Math.min(Math.max(resourceProgress, timeProgress), 90);
      
      // If everything is loaded AND min time passed, go to 100%
      if (resourcesLoaded >= totalResources && minTimeReached) {
        targetProgressRef.current = 100;
      }
    };

    const onResourceLoad = () => {
      resourcesLoaded++;
      calculateProgress();
    };

    // Track document ready state
    totalResources++;
    if (document.readyState === 'complete') {
      resourcesLoaded++;
    } else {
      window.addEventListener('load', onResourceLoad, { once: true });
    }

    // Track fonts
    totalResources++;
    if (document.fonts?.ready) {
      document.fonts.ready.then(onResourceLoad).catch(onResourceLoad);
    } else {
      resourcesLoaded++;
    }

    // Track visible images
    const images = Array.from(document.images);
    images.forEach((img) => {
      if (img.complete) return;
      totalResources++;
      img.addEventListener('load', onResourceLoad, { once: true });
      img.addEventListener('error', onResourceLoad, { once: true });
    });

    // Initial calculation
    calculateProgress();

    // Minimum time timer
    setTimeout(() => {
      minTimeReached = true;
      calculateProgress();
    }, minLoadTime);

    // Smooth progress animation loop
    const animateProgress = () => {
      if (isCompleteRef.current) return;

      const current = progressRef.current;
      const target = targetProgressRef.current;
      
      // Smoothly interpolate towards target
      const newProgress = current + (target - current) * 0.08;
      progressRef.current = newProgress;

      // Update DOM
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${newProgress / 100})`;
      }
      if (percentRef.current) {
        percentRef.current.textContent = Math.round(newProgress).toString();
      }

      // Check if complete
      if (newProgress >= 99.5 && target >= 100) {
        isCompleteRef.current = true;
        progressRef.current = 100;
        
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = 'scaleX(1)';
        }
        if (percentRef.current) {
          percentRef.current.textContent = '100';
        }

        // Trigger exit animation
        setTimeout(exitAnimation, 300);
        return;
      }

      rafRef.current = requestAnimationFrame(animateProgress);
    };

    const exitAnimation = () => {
      const container = containerRef.current;
      if (!container) {
        finishLoading();
        return;
      }

      // Animate out
      gsap.to(container, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: finishLoading,
      });
    };

    const finishLoading = () => {
      // Restore scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);

      setIsHidden(true);
      onComplete?.();

      try {
        sessionStorage.setItem('hasVisited', 'true');
      } catch (e) {}
    };

    // Start animation loop
    rafRef.current = requestAnimationFrame(animateProgress);

    // Failsafe: force complete after 6 seconds
    const failsafe = setTimeout(() => {
      if (!isCompleteRef.current) {
        targetProgressRef.current = 100;
        minTimeReached = true;
      }
    }, 6000);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(failsafe);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-zinc-950 flex items-center justify-center"
      style={{ touchAction: 'none' }}
    >
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div ref={logoRef} className="mb-12">
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight">
            SADOK<span className="text-cyan-500">.</span>
          </div>
        </div>

        {/* Progress container */}
        <div className="w-64 sm:w-72 md:w-80">
          {/* Progress bar background */}
          <div className="h-[3px] bg-zinc-800 rounded-full overflow-hidden">
            {/* Progress bar fill */}
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 origin-left transition-none"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          {/* Percentage */}
          <div className="mt-4 flex justify-between items-center text-sm">
            <span className="text-zinc-500 uppercase tracking-widest text-xs">Loading</span>
            <div className="text-white font-mono">
              <span ref={percentRef}>0</span>
              <span className="text-zinc-500">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Corner text */}
      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 text-zinc-700 text-[10px] sm:text-xs font-mono uppercase tracking-wider">
        Portfolio 2026
      </div>
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-zinc-700 text-[10px] sm:text-xs font-mono uppercase tracking-wider">
        Full Stack Engineer
      </div>
    </div>
  );
}
