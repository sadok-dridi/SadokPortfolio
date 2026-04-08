'use client';

import { useRef, useEffect, ReactNode } from 'react';
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

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    
    if (!container || !inner) return;

    // Calculate the width of one item set
    const itemWidth = inner.scrollWidth / repeat;
    
    // Set up the infinite scroll
    const directionMultiplier = direction === 'left' ? -1 : 1;
    
    // Create seamless loop
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

    // Pause on hover
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
  }, [speed, direction, pauseOnHover, repeat]);

  // Create repeated content
  const items = Array(repeat).fill(children);

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden whitespace-nowrap', className)}
    >
      <div
        ref={innerRef}
        className="inline-flex"
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
