'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { lerp } from '@/lib/utils';

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  text: string;
  variant: 'default' | 'text' | 'hidden' | 'large';
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default to true to prevent flash
  
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    text: '',
    variant: 'default',
  });

  // Check for touch device on mount
  useEffect(() => {
    const checkTouchDevice = () => {
      const isTouchCapable = 
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      
      setIsTouchDevice(isTouchCapable);
    };

    checkTouchDevice();
    
    // Also check on resize (for devices that can switch modes)
    window.addEventListener('resize', checkTouchDevice);
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Handle mouse down/up
  const handleMouseDown = useCallback(() => {
    setCursorState(prev => ({ ...prev, isClicking: true }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setCursorState(prev => ({ ...prev, isClicking: false }));
  }, []);

  // Check for interactive elements
  const handleElementHover = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check for data attributes on element or parent
    const interactiveElement = target.closest('[data-cursor]') as HTMLElement;
    
    if (interactiveElement) {
      const cursorType = interactiveElement.dataset.cursor as CursorState['variant'];
      const cursorText = interactiveElement.dataset.cursorText || '';
      
      setCursorState(prev => ({
        ...prev,
        isHovering: true,
        variant: cursorType || 'default',
        text: cursorText,
      }));
    } else if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.style.cursor === 'pointer' ||
      window.getComputedStyle(target).cursor === 'pointer'
    ) {
      setCursorState(prev => ({
        ...prev,
        isHovering: true,
        variant: 'default',
        text: '',
      }));
    } else {
      setCursorState(prev => ({
        ...prev,
        isHovering: false,
        variant: 'default',
        text: '',
      }));
    }
  }, []);

  // Animation loop
  useEffect(() => {
    if (isTouchDevice) return;
    
    let animationId: number;
    
    const animate = () => {
      // Smooth follow for main cursor (slower)
      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.15);
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.15);
      
      // Faster follow for dot
      dotPos.current.x = lerp(dotPos.current.x, mousePos.current.x, 0.35);
      dotPos.current.y = lerp(dotPos.current.y, mousePos.current.y, 0.35);
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px)`;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationId);
  }, [isTouchDevice]);

  // Event listeners
  useEffect(() => {
    if (isTouchDevice) return;
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleElementHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleElementHover, handleMouseDown, handleMouseUp, isTouchDevice]);

  // Animate cursor state changes
  useEffect(() => {
    if (isTouchDevice || !cursorRef.current) return;
    
    const cursor = cursorRef.current;
    
    if (cursorState.isHovering) {
      gsap.to(cursor, {
        scale: cursorState.variant === 'large' ? 2.5 : 1.5,
        duration: 0.3,
        ease: 'power3.out',
      });
    } else {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power3.out',
      });
    }
    
    if (cursorState.isClicking) {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1,
        ease: 'power3.out',
      });
    }
  }, [cursorState.isHovering, cursorState.isClicking, cursorState.variant, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div
          className={`
            w-10 h-10 rounded-full border-2 border-white
            flex items-center justify-center
            transition-[width,height,background] duration-300 ease-out
            ${cursorState.variant === 'text' ? 'w-24 h-24 bg-white' : ''}
            ${cursorState.variant === 'hidden' ? 'opacity-0' : ''}
            ${cursorState.variant === 'large' ? 'w-32 h-32' : ''}
          `}
        >
          {cursorState.text && (
            <span
              ref={cursorTextRef}
              className="text-black text-xs font-medium uppercase tracking-wider"
            >
              {cursorState.text}
            </span>
          )}
        </div>
      </div>
      
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className={`
          fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full
          pointer-events-none z-[9999] mix-blend-difference hidden md:block
          transition-opacity duration-300
          ${cursorState.variant === 'text' || cursorState.variant === 'hidden' ? 'opacity-0' : 'opacity-100'}
        `}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
