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
  type?: 'button' | 'submit' | 'reset';
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
  type = 'button',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    };
    setIsMobile(checkMobile());
  }, []);

  useEffect(() => {
    // Disable magnetic effect on mobile
    if (isMobile) return;

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

      gsap.to(content, {
        x: deltaX * 0.3,
        y: deltaY * 0.3,
        duration: 0.3,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
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

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, isMobile]);

  const commonProps = {
    ref: buttonRef as React.RefObject<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>,
    className: cn(
      'relative inline-flex items-center justify-center',
      className
    ),
    'data-cursor': cursorVariant,
    'data-cursor-text': cursorText,
  };

  // On mobile, render without the content wrapper for simplicity
  if (isMobile) {
    if (Component === 'a') {
      return (
        <a className={cn('relative inline-flex items-center justify-center', className)} href={href}>
          {children}
        </a>
      );
    }
    if (Component === 'div') {
      return (
        <div className={cn('relative inline-flex items-center justify-center', className)}>
          {children}
        </div>
      );
    }
    return (
      <button className={cn('relative inline-flex items-center justify-center', className)} onClick={onClick} type={type}>
        {children}
      </button>
    );
  }

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
    <button {...commonProps} onClick={onClick} type={type}>
      {content}
    </button>
  );
}
