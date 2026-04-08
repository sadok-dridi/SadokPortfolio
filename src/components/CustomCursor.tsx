'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  text: string;
  variant: 'default' | 'text' | 'hidden' | 'large';
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    text: '',
    variant: 'default',
  });

  // Check if we should show custom cursor (desktop only, no touch)
  useEffect(() => {
    // Only show on devices with fine pointer (mouse)
    const hasFineMouse = window.matchMedia('(pointer: fine)').matches;
    const isLargeScreen = window.innerWidth >= 768;
    
    if (hasFineMouse && isLargeScreen) {
      setIsVisible(true);
      // Hide default cursor
      document.body.style.cursor = 'none';
    }

    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  // Linear interpolation helper
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

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
    if (!isVisible) return;
    
    let animationId: number;
    
    const animate = () => {
      // Smooth follow for main cursor (slower)
      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.15);
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.15);
      
      // Faster follow for dot
      dotPos.current.x = lerp(dotPos.current.x, mousePos.current.x, 0.4);
      dotPos.current.y = lerp(dotPos.current.y, mousePos.current.y, 0.4);
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPos.current.x}px`;
        cursorRef.current.style.top = `${cursorPos.current.y}px`;
      }
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${dotPos.current.x}px`;
        cursorDotRef.current.style.top = `${dotPos.current.y}px`;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationId);
  }, [isVisible]);

  // Event listeners
  useEffect(() => {
    if (!isVisible) return;
    
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
  }, [handleMouseMove, handleElementHover, handleMouseDown, handleMouseUp, isVisible]);

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  // Calculate cursor size based on state
  const getCursorSize = () => {
    if (cursorState.isClicking) return 'w-6 h-6';
    if (cursorState.variant === 'text') return 'w-20 h-20';
    if (cursorState.variant === 'large') return 'w-24 h-24';
    if (cursorState.isHovering) return 'w-14 h-14';
    return 'w-10 h-10';
  };

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ left: -100, top: -100 }}
      >
        <div
          className={`
            rounded-full border-2 border-white
            flex items-center justify-center
            transition-all duration-200 ease-out
            ${getCursorSize()}
            ${cursorState.variant === 'text' ? 'bg-white' : 'bg-transparent'}
            ${cursorState.variant === 'hidden' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
          `}
        >
          {cursorState.text && (
            <span className="text-black text-[10px] font-medium uppercase tracking-wider">
              {cursorState.text}
            </span>
          )}
        </div>
      </div>
      
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className={`
          fixed w-1 h-1 bg-white rounded-full
          pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference
          transition-opacity duration-200
          ${cursorState.variant === 'text' || cursorState.variant === 'hidden' || cursorState.isHovering ? 'opacity-0' : 'opacity-100'}
        `}
        style={{ left: -100, top: -100 }}
      />
      
    </>
  );
}
