'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/ui/MagneticButton';
import { TransitionLink } from './PageTransition';

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
  }, []);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate header on mount - simple animation, no delay needed
  // The parent controls visibility, so this just animates when visible
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    if (isMobile) {
      gsap.set(header, { y: 0, opacity: 1 });
      return;
    }

    gsap.fromTo(
      header,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 }
    );
  }, [isMobile]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close menu on link click
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
        <header
          ref={headerRef}
          className={cn(
          'fixed top-0 left-0 right-0 z-[100] isolate transition-all duration-500 opacity-0',
          isScrolled 
            ? 'py-3 md:py-4 bg-zinc-950/80 backdrop-blur-lg after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-zinc-800/40' 
            : 'py-4 md:py-6'
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <TransitionLink href="/" className="relative z-[101]">
              <MagneticButton className="text-lg sm:text-xl font-bold text-white tracking-tight" as="div">
                SADOK<span className="text-cyan-500">.</span>
              </MagneticButton>
            </TransitionLink>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <TransitionLink key={link.label} href={link.href}>
                  <MagneticButton
                    as="div"
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 uppercase tracking-wider"
                  >
                    {link.label}
                  </MagneticButton>
                </TransitionLink>
              ))}
              
              <TransitionLink href="/contact">
                <MagneticButton
                  as="div"
                  className="px-5 py-2.5 bg-white text-zinc-950 text-sm font-medium rounded-full hover:bg-cyan-400 transition-colors duration-300"
                  cursorText="Say Hi"
                  cursorVariant="text"
                >
                  Let&apos;s Talk
                </MagneticButton>
              </TransitionLink>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden relative z-[101] pointer-events-auto touch-manipulation w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 active:scale-95 transition-transform"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span
                className={cn(
                  'w-5 h-0.5 bg-white transition-all duration-300 origin-center',
                  isMenuOpen && 'rotate-45 translate-y-[4px]'
                )}
              />
              <span
                className={cn(
                  'w-5 h-0.5 bg-white transition-all duration-300',
                  isMenuOpen && 'opacity-0 scale-0'
                )}
              />
              <span
                className={cn(
                  'w-5 h-0.5 bg-white transition-all duration-300 origin-center',
                  isMenuOpen && '-rotate-45 -translate-y-[4px]'
                )}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[99] bg-zinc-950 md:hidden transition-opacity duration-300',
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-start px-6 pt-28 pb-10 overflow-y-auto">
          {/* Nav links */}
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            {navLinks.map((link) => (
              <TransitionLink
                key={link.label}
                href={link.href}
                className="nav-link block"
                onClick={handleLinkClick}
              >
                <span className="text-3xl sm:text-4xl font-bold text-white hover:text-cyan-400 transition-colors active:scale-95">
                  {link.label}
                </span>
              </TransitionLink>
            ))}
          </div>
          
          {/* CTA Button */}
          <TransitionLink
            href="/contact"
            className="nav-link mt-10 sm:mt-12 block"
            onClick={handleLinkClick}
          >
            <span className="inline-block px-8 py-4 bg-white text-zinc-950 text-base sm:text-lg font-medium rounded-full active:scale-95 transition-transform">
              Let&apos;s Talk
            </span>
          </TransitionLink>

          {/* Social links in mobile menu */}
          <div className="nav-link mt-12 sm:mt-16 flex items-center gap-6">
            {[
              { label: 'GitHub', href: 'https://github.com/sadok-dridi' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sadok-dridi/' },
              { label: 'Instagram', href: 'https://www.instagram.com/sadok.dridi/' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-500 hover:text-white transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Status indicator */}
          <div className="nav-link mt-8 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-zinc-500">Available for projects</span>
          </div>
        </div>
      </div>
    </>
  );
}
