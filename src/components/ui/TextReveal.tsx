'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  animation?: 'chars' | 'words' | 'lines' | 'fade';
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: 'load' | 'scroll';
  threshold?: string;
  once?: boolean;
}

export default function TextReveal({
  children,
  className,
  as: Component = 'div',
  animation = 'words',
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
  trigger = 'scroll',
  threshold = 'top 85%',
  once = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get the text content
    const text = container.innerText;
    
    // Clear and rebuild with spans
    let html = '';
    
    if (animation === 'chars') {
      // Split into characters
      const chars = text.split('');
      html = chars
        .map((char) => 
          char === ' ' 
            ? '<span class="inline-block">&nbsp;</span>' 
            : `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full opacity-0">${char}</span></span>`
        )
        .join('');
    } else if (animation === 'words') {
      // Split into words
      const words = text.split(' ');
      html = words
        .map((word) => 
          `<span class="inline-block overflow-hidden mr-[0.25em]"><span class="inline-block translate-y-full opacity-0">${word}</span></span>`
        )
        .join('');
    } else if (animation === 'lines') {
      // Wrap in single span for line animation
      html = `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full opacity-0">${text}</span></span>`;
    } else {
      // Simple fade
      html = `<span class="inline-block opacity-0">${text}</span>`;
    }
    
    container.innerHTML = html;

    // Get the inner spans to animate
    const innerSpans = container.querySelectorAll('.translate-y-full, .opacity-0');
    
    const animateIn = () => {
      if (once && hasAnimated.current) return;
      hasAnimated.current = true;

      if (animation === 'fade') {
        gsap.to(innerSpans, {
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
        });
      } else {
        gsap.to(innerSpans, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
        });
      }
    };

    const reset = () => {
      if (animation === 'fade') {
        gsap.set(innerSpans, { opacity: 0 });
      } else {
        gsap.set(innerSpans, { y: '100%', opacity: 0 });
      }

      if (!once) {
        hasAnimated.current = false;
      }
    };

    if (trigger === 'load') {
      animateIn();
    } else {
      const triggerInstance = ScrollTrigger.create({
        trigger: container,
        start: threshold,
        onEnter: animateIn,
        onEnterBack: animateIn,
        onLeaveBack: reset,
        once,
      });

      return () => {
        triggerInstance.kill();
      };
    }

    return;
  }, [animation, delay, duration, stagger, trigger, threshold, once]);

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement & HTMLDivElement>}
      className={cn('', className)}
    >
      {children}
    </Component>
  );
}

// Animated heading component with gradient support
interface AnimatedHeadingProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  gradient?: boolean;
}

export function AnimatedHeading({
  children,
  className,
  as = 'h1',
  gradient = false,
}: AnimatedHeadingProps) {
  return (
    <TextReveal
      as={as}
      animation="words"
      className={cn(
        gradient && 'bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </TextReveal>
  );
}
