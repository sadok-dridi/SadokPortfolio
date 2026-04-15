'use client';

import { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const completedRef = useRef(false);
  const revealedRef = useRef(false);

  useEffect(() => {
    const mobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    setIsMobile(mobile);

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const duration = mobile ? 1450 : 1850;
    const revealDelay = mobile ? 120 : 220;
    const exitDuration = mobile ? 420 : 700;
    const startedAt = Date.now();

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const ratio = Math.min(elapsed / duration, 1);
      const eased = ratio < 0.5
        ? 2 * ratio * ratio
        : 1 - Math.pow(-2 * ratio + 2, 2) / 2;

      setProgress(prev => Math.max(prev, Math.round(eased * 100)));

      if (ratio >= 1 && !completedRef.current) {
        completedRef.current = true;
        window.clearInterval(interval);

        window.setTimeout(() => {
          if (!revealedRef.current) {
            revealedRef.current = true;
            onComplete?.();
          }

          setIsExiting(true);

          window.setTimeout(() => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            setIsHidden(true);
          }, exitDuration);
        }, revealDelay);
      }
    }, 16);

    const fallback = window.setTimeout(() => {
      if (completedRef.current) return;

      completedRef.current = true;
      window.clearInterval(interval);
      setProgress(100);

      if (!revealedRef.current) {
        revealedRef.current = true;
        onComplete?.();
      }

      setIsExiting(true);

      window.setTimeout(() => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        setIsHidden(true);
      }, exitDuration);
    }, mobile ? 2600 : 3600);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(fallback);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isHidden) return null;

  const progressRatio = progress / 100;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex h-svh w-screen items-center justify-center overflow-hidden bg-black transition-transform ${
        isMobile ? 'duration-500' : 'duration-700'
      } ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <div
          className="mb-10 sm:mb-14"
          style={{ opacity: Math.max(0.12, progressRatio) }}
        >
          <h1 className="text-6xl font-bold tracking-[-0.08em] text-white sm:text-7xl md:text-8xl lg:text-9xl">
            SADOK<span className="text-cyan-400">.</span>
          </h1>
        </div>

        <div className="flex w-full max-w-md items-center gap-4 sm:max-w-lg sm:gap-6">
          <div
            className="h-px flex-1 origin-right bg-gradient-to-r from-transparent to-zinc-500"
            style={{ transform: `scaleX(${progressRatio})` }}
          />

          <div className="min-w-[92px] sm:min-w-[108px]">
            <span className="text-2xl font-mono font-light tracking-[0.22em] text-zinc-300 sm:text-3xl">
              {progress.toString().padStart(3, '0')}
            </span>
            <span className="ml-1 text-sm font-mono text-zinc-500 sm:text-base">%</span>
          </div>

          <div
            className="h-px flex-1 origin-left bg-gradient-to-l from-transparent to-zinc-500"
            style={{ transform: `scaleX(${progressRatio})` }}
          />
        </div>

      </div>
    </div>
  );
}
