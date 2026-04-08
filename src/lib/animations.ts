import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Easing presets (Osmo-style)
export const easings = {
  smooth: 'power3.out',
  smoothInOut: 'power3.inOut',
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.3)',
  expo: 'expo.out',
  expoInOut: 'expo.inOut',
};

// Fade in from bottom
export const fadeInUp = (
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    y?: number;
    ease?: string;
  } = {}
) => {
  const { duration = 1, delay = 0, y = 60, ease = easings.smooth } = options;
  
  return gsap.fromTo(
    element,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, delay, ease }
  );
};

// Stagger children reveal
export const staggerReveal = (
  elements: gsap.TweenTarget,
  options: {
    duration?: number;
    stagger?: number;
    y?: number;
    ease?: string;
  } = {}
) => {
  const { duration = 0.8, stagger = 0.1, y = 40, ease = easings.smooth } = options;
  
  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, stagger, ease }
  );
};

// Scroll-triggered reveal
export const scrollReveal = (
  element: gsap.TweenTarget,
  options: {
    trigger?: gsap.DOMTarget;
    start?: string;
    end?: string;
    y?: number;
    duration?: number;
    scrub?: boolean | number;
  } = {}
) => {
  const {
    trigger,
    start = 'top 80%',
    end = 'bottom 20%',
    y = 60,
    duration = 1,
    scrub = false,
  } = options;

  return gsap.fromTo(
    element,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      ease: easings.smooth,
      scrollTrigger: {
        trigger: trigger || element as gsap.DOMTarget,
        start,
        end,
        scrub,
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// Text split animation helper
export const splitTextReveal = (
  chars: gsap.TweenTarget,
  options: {
    duration?: number;
    stagger?: number;
    y?: number;
    rotateX?: number;
  } = {}
) => {
  const { duration = 0.6, stagger = 0.02, y = 100, rotateX = -90 } = options;

  return gsap.fromTo(
    chars,
    { 
      opacity: 0, 
      y, 
      rotateX,
      transformOrigin: 'top center'
    },
    { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      duration, 
      stagger,
      ease: easings.smooth 
    }
  );
};

// Parallax effect
export const parallax = (
  element: gsap.TweenTarget,
  options: {
    trigger?: gsap.DOMTarget;
    speed?: number;
    start?: string;
    end?: string;
  } = {}
) => {
  const { trigger, speed = 0.5, start = 'top bottom', end = 'bottom top' } = options;

  return gsap.to(element, {
    y: () => (1 - speed) * 200,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || element as gsap.DOMTarget,
      start,
      end,
      scrub: true,
    },
  });
};

// Scale reveal
export const scaleReveal = (
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    scale?: number;
  } = {}
) => {
  const { duration = 1, delay = 0, scale = 0.8 } = options;

  return gsap.fromTo(
    element,
    { opacity: 0, scale },
    { opacity: 1, scale: 1, duration, delay, ease: easings.smooth }
  );
};

// Horizontal scroll section
export const horizontalScroll = (
  container: gsap.DOMTarget,
  sections: gsap.TweenTarget
) => {
  const totalWidth = (sections as HTMLElement[]).length * 100;

  return gsap.to(sections, {
    xPercent: -100 * ((sections as HTMLElement[]).length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      end: () => `+=${totalWidth}%`,
    },
  });
};

// Magnetic effect calculation
export const calculateMagnetic = (
  mouseX: number,
  mouseY: number,
  elementRect: DOMRect,
  strength: number = 0.5
) => {
  const centerX = elementRect.left + elementRect.width / 2;
  const centerY = elementRect.top + elementRect.height / 2;
  
  const deltaX = (mouseX - centerX) * strength;
  const deltaY = (mouseY - centerY) * strength;
  
  return { x: deltaX, y: deltaY };
};

// Page transition animations
export const pageTransitions = {
  // Overlay wipe in
  wipeIn: (overlay: gsap.TweenTarget) => {
    return gsap.timeline()
      .set(overlay, { yPercent: -100 })
      .to(overlay, { 
        yPercent: 0, 
        duration: 0.8, 
        ease: easings.expoInOut 
      });
  },
  
  // Overlay wipe out
  wipeOut: (overlay: gsap.TweenTarget) => {
    return gsap.timeline()
      .to(overlay, { 
        yPercent: 100, 
        duration: 0.8, 
        ease: easings.expoInOut 
      });
  },

  // Fade content
  fadeContent: (content: gsap.TweenTarget, direction: 'in' | 'out') => {
    return gsap.to(content, {
      opacity: direction === 'in' ? 1 : 0,
      y: direction === 'in' ? 0 : -20,
      duration: 0.5,
      ease: easings.smooth,
    });
  },
};

// Cleanup all ScrollTriggers
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
