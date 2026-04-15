'use client';

import { useRef, useEffect, ReactNode, createContext, useContext, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (href: string) => Promise<void>;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  startTransition: async () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransitionProvider({ children }: PageTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  // Animate content in on route change
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      gsap.set(content, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      content,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 }
    );
  }, [pathname]);

  // Reset transition state when returning via browser back/forward (bfcache)
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        // Page was restored from bfcache — reset everything
        const overlay = overlayRef.current;
        const content = contentRef.current;
        if (overlay) gsap.set(overlay, { yPercent: 100 });
        if (content) gsap.set(content, { opacity: 1, y: 0 });
        setIsTransitioning(false);
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  const startTransition = useCallback(async (href: string): Promise<void> => {
    const overlay = overlayRef.current;
    if (!overlay || isTransitioning) return;

    setIsTransitioning(true);

    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Navigate after animation
          window.location.href = href;
          resolve();
        },
      });

      // Wipe in overlay
      tl.fromTo(
        overlay,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.6, ease: 'power4.inOut' }
      );

      // Fade out content
      tl.to(
        contentRef.current,
        { opacity: 0, y: -20, duration: 0.3, ease: 'power3.in' },
        0
      );
    });
  }, [isTransitioning]);

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9997] bg-zinc-950 pointer-events-none"
        style={{ transform: 'translateY(100%)' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>

      {/* Page content */}
      <div ref={contentRef}>
        {children}
      </div>
    </TransitionContext.Provider>
  );
}

// Link component with page transition
interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TransitionLink({ href, children, className, onClick }: TransitionLinkProps) {
  const { startTransition, isTransitioning } = usePageTransition();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (isTransitioning) return;
    
    onClick?.();
    
    // Check if it's an external link
    if (href.startsWith('http') || href.startsWith('mailto:')) {
      window.open(href, '_blank');
      return;
    }

    await startTransition(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
