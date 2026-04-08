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
  const isCompleteRef = useRef(false);
  const rafRef = useRef<number | null>(null);

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
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }

    // Loading configuration
    const MINIMUM_DURATION = 2500; // 2.5 seconds minimum
    const startTime = Date.now();
    
    // Track resources
    let resourcesLoaded = 0;
    let totalResources = 0;
    let allResourcesReady = false;

    const checkResourceProgress = () => {
      if (totalResources === 0) return 0;
      return resourcesLoaded / totalResources;
    };

    const onResourceLoad = () => {
      resourcesLoaded++;
      if (resourcesLoaded >= totalResources) {
        allResourcesReady = true;
      }
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

    // Track images
    const images = Array.from(document.images);
    images.forEach((img) => {
      if (!img.complete) {
        totalResources++;
        img.addEventListener('load', onResourceLoad, { once: true });
        img.addEventListener('error', onResourceLoad, { once: true });
      }
    });

    // Check initial state
    if (resourcesLoaded >= totalResources) {
      allResourcesReady = true;
    }

    // Animation loop
    const animate = () => {
      if (isCompleteRef.current) return;

      const elapsed = Date.now() - startTime;
      const resourceProgress = checkResourceProgress();
      
      // Calculate target progress
      // Phase 1 (0-70%): Time-based, takes ~1.5 seconds
      // Phase 2 (70-90%): Slower, waits for resources
      // Phase 3 (90-100%): Only when everything ready
      
      let targetProgress: number;
      
      if (elapsed < 1500) {
        // First 1.5s: go from 0 to 70% smoothly
        targetProgress = (elapsed / 1500) * 70;
      } else if (elapsed < MINIMUM_DURATION) {
        // Next 1s: go from 70 to 90% slowly
        const phase2Progress = (elapsed - 1500) / (MINIMUM_DURATION - 1500);
        targetProgress = 70 + (phase2Progress * 20);
      } else if (allResourcesReady) {
        // After minimum time + resources ready: complete
        targetProgress = 100;
      } else {
        // Waiting for resources, stay at 90%
        targetProgress = 90 + (resourceProgress * 10);
      }

      // Smooth interpolation
      const current = progressRef.current;
      const diff = targetProgress - current;
      const newProgress = current + diff * 0.06; // Smooth easing
      progressRef.current = newProgress;

      // Update DOM
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${newProgress / 100})`;
      }
      if (percentRef.current) {
        percentRef.current.textContent = Math.round(newProgress).toString();
      }

      // Check completion
      if (newProgress >= 99.5 && elapsed >= MINIMUM_DURATION && allResourcesReady) {
        isCompleteRef.current = true;
        
        // Set to exactly 100%
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = 'scaleX(1)';
        }
        if (percentRef.current) {
          percentRef.current.textContent = '100';
        }

        // Wait a moment at 100%, then exit
        setTimeout(exitAnimation, 400);
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const exitAnimation = () => {
      const container = containerRef.current;
      if (!container) {
        finishLoading();
        return;
      }

      gsap.to(container, {
        opacity: 0,
        duration: 0.6,
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

    // Start animation
    rafRef.current = requestAnimationFrame(animate);

    // Failsafe: force complete after 8 seconds
    const failsafe = setTimeout(() => {
      if (!isCompleteRef.current) {
        allResourcesReady = true;
      }
    }, 8000);

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

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div ref={logoRef} className="mb-16 opacity-0">
          <div className="text-5xl sm:text-6xl md:text-8xl font-bold text-white tracking-tight">
            SADOK<span className="text-cyan-500">.</span>
          </div>
        </div>

        {/* Progress container */}
        <div className="w-56 sm:w-64 md:w-72">
          {/* Progress bar background */}
          <div className="h-[2px] bg-zinc-800 rounded-full overflow-hidden">
            {/* Progress bar fill */}
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-500 origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          {/* Percentage */}
          <div className="mt-6 flex justify-center items-baseline">
            <span 
              ref={percentRef} 
              className="text-4xl sm:text-5xl font-bold text-white font-mono"
            >
              0
            </span>
            <span className="text-xl sm:text-2xl text-zinc-500 font-mono ml-1">%</span>
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
