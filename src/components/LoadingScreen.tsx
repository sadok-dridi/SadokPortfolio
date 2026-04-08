'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const hasRun = useRef(false);

  // Memoize onComplete to avoid dependency issues
  const handleComplete = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    // Prevent double execution in strict mode
    if (hasRun.current) return;
    hasRun.current = true;

    // Check if already visited this session
    let skipLoading = false;
    try {
      skipLoading = sessionStorage.getItem('hasVisited') === 'true';
    } catch {
      // sessionStorage not available
    }

    if (skipLoading) {
      setIsHidden(true);
      handleComplete();
      return;
    }

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Animate progress from 0 to 100 using requestAnimationFrame
    const duration = 2500; // 2.5 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Ease in-out curve
      const eased = rawProgress < 0.5
        ? 2 * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;
      
      const currentProgress = Math.round(eased * 100);
      setProgress(currentProgress);

      // Update logo opacity directly
      if (logoRef.current) {
        logoRef.current.style.opacity = String(eased);
      }

      // Update lines scale
      if (lineLeftRef.current) {
        lineLeftRef.current.style.transform = `scaleX(${eased})`;
      }
      if (lineRightRef.current) {
        lineRightRef.current.style.transform = `scaleX(${eased})`;
      }

      if (rawProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete - hold briefly then exit
        setTimeout(() => {
          setIsExiting(true);
          
          // Wait for exit animation then hide
          setTimeout(() => {
            document.body.style.overflow = '';
            setIsHidden(true);
            handleComplete();
            
            // Mark as visited
            try {
              sessionStorage.setItem('hasVisited', 'true');
            } catch {
              // sessionStorage not available
            }
          }, 800);
        }, 400);
      }
    };

    // Start animation on next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      requestAnimationFrame(animate);
    });

    return () => {
      document.body.style.overflow = '';
    };
  }, [handleComplete]);

  // Don't render if hidden
  if (isHidden) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] bg-zinc-950 flex items-center justify-center overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
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
          className="mb-12 sm:mb-16 transition-opacity"
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
            className="w-12 sm:w-20 md:w-32 h-[1px] bg-gradient-to-r from-transparent to-zinc-600 origin-right transition-transform"
            style={{ transform: 'scaleX(0)' }}
          />
          
          {/* Percentage */}
          <div className="flex items-baseline">
            <span 
              ref={percentRef} 
              className="text-xl sm:text-2xl md:text-3xl font-mono font-light text-zinc-400 tracking-widest tabular-nums"
            >
              {progress.toString().padStart(3, '0')}
            </span>
            <span className="text-sm sm:text-base text-zinc-600 font-mono ml-1">%</span>
          </div>

          {/* Right line */}
          <div 
            ref={lineRightRef}
            className="w-12 sm:w-20 md:w-32 h-[1px] bg-gradient-to-l from-transparent to-zinc-600 origin-left transition-transform"
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
