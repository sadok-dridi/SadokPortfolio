'use client';

import { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const completedRef = useRef(false);
  const revealedRef = useRef(false);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const duration = 2600;
    const startedAt = Date.now();

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const ratio = Math.min(elapsed / duration, 1);
      const eased = ratio < 0.5
        ? 2 * ratio * ratio
        : 1 - Math.pow(-2 * ratio + 2, 2) / 2;

      setProgress(Math.round(eased * 100));

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
          }, 700);
        }, 350);
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
      }, 700);
    }, 4500);

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
      className={`fixed inset-0 z-[9999] flex h-svh w-screen items-center justify-center overflow-hidden bg-zinc-950 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.12),transparent_40%),linear-gradient(180deg,#09090b_0%,#111114_50%,#09090b_100%)]" />

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
            <span className="text-2xl font-mono font-light tracking-[0.28em] text-zinc-300 sm:text-3xl">
              {progress.toString().padStart(3, '0')}
            </span>
            <span className="ml-1 text-sm font-mono text-zinc-500 sm:text-base">%</span>
          </div>

          <div
            className="h-px flex-1 origin-left bg-gradient-to-l from-transparent to-zinc-500"
            style={{ transform: `scaleX(${progressRatio})` }}
          />
        </div>

        <p className="mt-6 text-[11px] uppercase tracking-[0.35em] text-zinc-600 sm:text-xs">
          Loading Portfolio
        </p>
      </div>

      <div className="absolute bottom-6 left-6 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-700 sm:bottom-10 sm:left-10 sm:text-xs">
        Full Stack Engineer
      </div>

      <div className="absolute bottom-6 right-6 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-700 sm:bottom-10 sm:right-10 sm:text-xs">
        2026
      </div>
    </div>
  );
}
