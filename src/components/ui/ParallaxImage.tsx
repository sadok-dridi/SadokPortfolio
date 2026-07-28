'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number;
  scale?: number;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className,
  containerClassName,
  speed = 0.3,
  scale = 1.2,
  fill = true,
  width,
  height,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    
    if (!container || !image) return;

    // Set initial scale
    gsap.set(image, { scale });

    // Create parallax effect
    gsap.to(image, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === container) {
          st.kill();
        }
      });
    };
  }, [speed, scale]);

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden', containerClassName)}
    >
      <div ref={imageRef} className="relative w-full h-full">
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={cn('object-cover', className)}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn('object-cover', className)}
            priority={priority}
          />
        )}
      </div>
    </div>
  );
}

// Video parallax variant
interface ParallaxVideoProps {
  src: string;
  className?: string;
  containerClassName?: string;
  speed?: number;
  scale?: number;
  poster?: string;
}

export function ParallaxVideo({
  src,
  className,
  containerClassName,
  speed = 0.3,
  scale = 1.2,
  poster,
}: ParallaxVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    
    if (!container || !video) return;

    gsap.set(video, { scale });

    gsap.to(video, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === container) {
          st.kill();
        }
      });
    };
  }, [speed, scale]);

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden', containerClassName)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        className={cn('w-full h-full object-cover', className)}
      />
    </div>
  );
}
