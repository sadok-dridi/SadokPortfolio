'use client';

import { useRef, ReactNode, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a' | 'div';
  href?: string;
  onClick?: () => void;
  cursorText?: string;
  cursorVariant?: 'default' | 'text' | 'hidden' | 'large';
}

export default function MagneticButton({
  children,
  className,
  strength = 0.5,
  as: Component = 'button',
  href,
  onClick,
  cursorText,
  cursorVariant = 'default',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    const content = contentRef.current;
    
    if (!button || !content) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power3.out',
      });

      // Content moves slightly more for depth effect
      gsap.to(content, {
        x: deltaX * 0.3,
        y: deltaY * 0.3,
        duration: 0.3,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [strength]);

  const commonProps = {
    ref: buttonRef as React.RefObject<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>,
    className: cn(
      'relative inline-flex items-center justify-center overflow-hidden',
      className
    ),
    'data-cursor': cursorVariant,
    'data-cursor-text': cursorText,
  };

  const content = (
    <span
      ref={contentRef}
      className="relative z-10 flex items-center justify-center gap-2"
    >
      {children}
    </span>
  );

  if (Component === 'a') {
    return (
      <a {...commonProps} href={href}>
        {content}
      </a>
    );
  }

  if (Component === 'div') {
    return (
      <div {...commonProps}>
        {content}
      </div>
    );
  }

  return (
    <button {...commonProps} onClick={onClick} type="button">
      {content}
    </button>
  );
}
