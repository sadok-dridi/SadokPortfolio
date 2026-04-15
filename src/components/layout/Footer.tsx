'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';
import { TransitionLink } from './PageTransition';
import { TextMarquee } from '@/components/ui/Marquee';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/sadok-dridi' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sadok-dridi/' },
  { label: 'Instagram', href: 'https://www.instagram.com/sadok.dridi/' },
  { label: 'Email', href: 'mailto:sadok.dridi.engineer@gmail.com' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;
    
    if (!footer || !content) return;

    gsap.fromTo(
      content.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-zinc-950 border-t border-zinc-800/50">
      {/* Marquee banner */}
      <div className="py-4 md:py-6 border-b border-zinc-800/50 overflow-hidden">
        <TextMarquee
          text="Available for Projects"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-zinc-800"
          separator={<span className="mx-4 sm:mx-6 md:mx-8 text-cyan-500">*</span>}
          speed={40}
        />
      </div>

      <div ref={contentRef} className="container mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <TransitionLink href="/">
              <span className="text-2xl sm:text-3xl font-bold text-white">
                SADOK<span className="text-cyan-500">.</span>
              </span>
            </TransitionLink>
            <p className="mt-3 md:mt-4 text-sm sm:text-base text-zinc-500 max-w-md">
              Full Stack Engineer crafting digital experiences that blend beautiful design with powerful functionality.
            </p>
            
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4 md:mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 md:space-y-4">
              {['Work', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <TransitionLink href={`/${item.toLowerCase()}`}>
                    <MagneticButton
                      as="div"
                      className="text-sm sm:text-base text-zinc-300 hover:text-white transition-colors"
                      strength={0.3}
                    >
                      {item}
                    </MagneticButton>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4 md:mb-6">
              Connect
            </h4>
            <ul className="space-y-3 md:space-y-4">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2"
                  >
                    <MagneticButton
                      as="div"
                      className="text-sm sm:text-base text-zinc-300 hover:text-white transition-colors"
                      strength={0.3}
                    >
                      {link.label}
                    </MagneticButton>
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-600 group-hover:text-cyan-500 transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17L17 7M17 7H7M17 7v10"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-zinc-600">
            © {new Date().getFullYear()} Sadok. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-zinc-600">
            Designed & Built with passion
          </p>
        </div>
      </div>
    </footer>
  );
}
