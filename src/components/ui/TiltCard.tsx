'use client';

import { useRef, ReactNode, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
  glareOpacity?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function TiltCard({
  children,
  className,
  tiltAmount = 10,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  glareOpacity = 0.2,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState('');
  const [glareStyle, setGlareStyle] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    };
    setIsMobile(checkMobile());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable tilt on mobile
    if (isMobile) return;
    
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateY = (mouseX / (rect.width / 2)) * tiltAmount;
    const rotateX = -(mouseY / (rect.height / 2)) * tiltAmount;
    
    setTransform(`
      perspective(${perspective}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(${scale}, ${scale}, ${scale})
    `);

    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlareStyle({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
    onMouseEnterProp?.();
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    setTransform('');
    onMouseLeaveProp?.();
  };

  // On mobile, just render children without effects
  if (isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative transition-transform duration-200 ease-out',
        className
      )}
      style={{
        transform: isHovered ? transform : '',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Glare overlay - only on desktop */}
      {glare && (
        <div
          className={cn(
            'absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div
            className="absolute w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${glareStyle.x}%`,
              top: `${glareStyle.y}%`,
              background: `radial-gradient(circle, rgba(255,255,255,${glareOpacity}) 0%, transparent 50%)`,
            }}
          />
        </div>
      )}
    </div>
  );
}
