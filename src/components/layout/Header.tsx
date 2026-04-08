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
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate header on mount
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.5 }
    );
  }, []);

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
    const menu = menuRef.current;
    if (!menu) return;

    if (!isMenuOpen) {
      setIsMenuOpen(true);
      gsap.fromTo(
        menu,
        { clipPath: 'circle(0% at calc(100% - 32px) 32px)' },
        { clipPath: 'circle(150% at calc(100% - 32px) 32px)', duration: 0.8, ease: 'power4.inOut' }
      );
      // Animate links
      gsap.fromTo(
        menu.querySelectorAll('.nav-link'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
      );
    } else {
      gsap.to(menu, {
        clipPath: 'circle(0% at calc(100% - 32px) 32px)',
        duration: 0.6,
        ease: 'power4.inOut',
        onComplete: () => setIsMenuOpen(false),
      });
    }
  };

  // Close menu on link click
  const handleLinkClick = () => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at calc(100% - 32px) 32px)',
        duration: 0.6,
        ease: 'power4.inOut',
        onComplete: () => setIsMenuOpen(false),
      });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
          isScrolled 
            ? 'py-3 md:py-4 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800/50' 
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
              className="md:hidden relative z-[101] w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 active:scale-95 transition-transform"
              onClick={toggleMenu}
              aria-label="Toggle menu"
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
        ref={menuRef}
        className={cn(
          'fixed inset-0 z-[99] bg-zinc-950 md:hidden',
          !isMenuOpen && 'pointer-events-none'
        )}
        style={{ clipPath: 'circle(0% at calc(100% - 32px) 32px)' }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          {/* Nav links */}
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            {navLinks.map((link, index) => (
              <TransitionLink
                key={link.label}
                href={link.href}
                className="nav-link"
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
            className="nav-link mt-10 sm:mt-12"
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
              { label: 'LinkedIn', href: 'https://linkedin.com/in/sadok-dridi' },
              { label: 'Twitter', href: 'https://twitter.com/sadok' },
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
