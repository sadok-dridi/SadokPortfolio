'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const hasCompletedRef = useRef(false);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Complete handler
  const handleComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    const container = containerRef.current;
    if (!container) {
      setIsVisible(false);
      document.body.style.overflow = '';
      onComplete?.();
      return;
    }

    // Exit animation
    gsap.to(container, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
      onComplete: () => {
        setIsVisible(false);
        document.body.style.overflow = '';
        onComplete?.();
      },
    });

    // Save to session storage
    try {
      sessionStorage.setItem('hasVisited', 'true');
    } catch (e) {
      // Ignore
    }
  }, [onComplete]);

  // Update progress bar animation
  useEffect(() => {
    const progressBar = progressRef.current;
    const counter = counterRef.current;

    if (!progressBar || !counter) return;

    // Kill previous animation
    animationRef.current?.kill();

    // Animate to current progress
    animationRef.current = gsap.to(progressBar, {
      scaleX: progress / 100,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: function() {
        const currentScale = gsap.getProperty(progressBar, 'scaleX') as number;
        counter.textContent = Math.round(currentScale * 100).toString().padStart(3, '0');
      }
    });
  }, [progress]);

  // Main loading logic
  useEffect(() => {
    // Check if already visited
    let hasVisited = false;
    try {
      hasVisited = sessionStorage.getItem('hasVisited') === 'true';
    } catch (e) {
      // Ignore
    }

    if (hasVisited) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Track loading progress
    let loadedItems = 0;
    let totalItems = 0;

    const updateProgress = () => {
      if (totalItems === 0) {
        setProgress(0);
        return;
      }
      const newProgress = Math.min(Math.round((loadedItems / totalItems) * 100), 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        // Small delay to show 100% before exit animation
        setTimeout(() => {
          handleComplete();
        }, 300);
      }
    };

    // 1. Track document ready state
    totalItems++;
    if (document.readyState === 'complete') {
      loadedItems++;
    } else {
      window.addEventListener('load', () => {
        loadedItems++;
        updateProgress();
      }, { once: true });
    }

    // 2. Track fonts
    totalItems++;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        loadedItems++;
        updateProgress();
      }).catch(() => {
        loadedItems++;
        updateProgress();
      });
    } else {
      // Fonts API not supported, mark as loaded
      loadedItems++;
    }

    // 3. Track images in viewport
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      // Only track images that might be visible initially
      const rect = img.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight * 2; // First 2 screens
      
      if (isInViewport) {
        totalItems++;
        if (img.complete && img.naturalHeight !== 0) {
          loadedItems++;
        } else {
          img.addEventListener('load', () => {
            loadedItems++;
            updateProgress();
          }, { once: true });
          img.addEventListener('error', () => {
            loadedItems++;
            updateProgress();
          }, { once: true });
        }
      }
    });

    // 4. Minimum loading time for branding (1 second)
    totalItems++;
    setTimeout(() => {
      loadedItems++;
      updateProgress();
    }, 1000);

    // Initial progress update
    updateProgress();

    // Fallback: max 5 seconds
    const maxTimeout = setTimeout(() => {
      if (!hasCompletedRef.current) {
        setProgress(100);
        setTimeout(handleComplete, 100);
      }
    }, 5000);

    // Animate text on mount
    const text = textRef.current;
    if (text) {
      const chars = text.querySelectorAll('.char');
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
        }
      );
    }

    return () => {
      clearTimeout(maxTimeout);
      animationRef.current?.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete, handleComplete]);

  if (!isVisible) return null;

  const name = 'SADOK';
  const chars = name.split('');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9998] bg-zinc-950 flex flex-col items-center justify-center"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12 px-4">
        {/* Name reveal */}
        <div ref={textRef} className="overflow-hidden">
          <div className="flex">
            {chars.map((char, i) => (
              <span
                key={i}
                className="char inline-block text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-white tracking-tight"
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Progress section */}
        <div className="flex flex-col items-center gap-3 md:gap-4 w-48 sm:w-56 md:w-64">
          {/* Progress bar */}
          <div className="w-full h-[2px] bg-zinc-800 overflow-hidden rounded-full">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          {/* Counter */}
          <div className="flex items-center gap-2 text-zinc-500">
            <span className="text-xs sm:text-sm uppercase tracking-widest">Loading</span>
            <span ref={counterRef} className="font-mono text-base sm:text-lg text-white">
              000
            </span>
            <span className="text-xs sm:text-sm">%</span>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 text-zinc-600 text-[10px] sm:text-xs font-mono">
        <div>PORTFOLIO 2026</div>
      </div>
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 text-zinc-600 text-[10px] sm:text-xs font-mono">
        <div>FULL STACK ENGINEER</div>
      </div>
    </div>
  );
}
