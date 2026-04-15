'use client';

import { useRef, useEffect, ReactNode, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  repeat?: number;
  gap?: string;
}

export default function Marquee({
  children,
  className,
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  repeat = 4,
  gap = '4rem',
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    };
    setIsMobile(checkMobile());
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    
    if (!container || !inner) return;

    const itemWidth = inner.scrollWidth / repeat;
    const directionMultiplier = direction === 'left' ? -1 : 1;
    
    // Use CSS animation on mobile for better performance
    if (isMobile) {
      const duration = itemWidth / Math.max(speed * 0.6, 12);
      inner.style.animation = `marquee ${duration}s linear infinite`;
      inner.style.setProperty('--marquee-distance', `${directionMultiplier * itemWidth}px`);
      inner.style.willChange = 'auto';
      return;
    }
    
    // Use GSAP on desktop
    tweenRef.current = gsap.to(inner, {
      x: directionMultiplier * itemWidth,
      duration: itemWidth / speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const parsed = parseFloat(x);
          if (direction === 'left') {
            return (parsed % itemWidth);
          } else {
            return -(Math.abs(parsed) % itemWidth);
          }
        }),
      },
    });

    // Pause on hover (desktop only)
    if (pauseOnHover) {
      const handleMouseEnter = () => {
        gsap.to(tweenRef.current, { timeScale: 0, duration: 0.5 });
      };
      
      const handleMouseLeave = () => {
        gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
      };

      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        tweenRef.current?.kill();
      };
    }

    return () => {
      tweenRef.current?.kill();
    };
  }, [speed, direction, pauseOnHover, repeat, isMobile]);

  const items = Array(repeat).fill(children);

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden whitespace-nowrap', className)}
    >
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(var(--marquee-distance, -100%)); }
        }
      `}</style>
      <div
        ref={innerRef}
        className="inline-flex will-change-transform"
        style={{ gap }}
      >
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0" style={{ paddingRight: gap }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// Text marquee variant
interface TextMarqueeProps {
  text: string;
  className?: string;
  textClassName?: string;
  speed?: number;
  direction?: 'left' | 'right';
  separator?: ReactNode;
}

export function TextMarquee({
  text,
  className,
  textClassName,
  speed = 50,
  direction = 'left',
  separator = <span className="mx-8 text-cyan-500">*</span>,
}: TextMarqueeProps) {
  return (
    <Marquee speed={speed} direction={direction} className={className}>
      <span className={cn('inline-flex items-center', textClassName)}>
        {text}
        {separator}
      </span>
    </Marquee>
  );
}
