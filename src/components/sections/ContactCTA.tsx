'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { TransitionLink } from '@/components/layout/PageTransition';
import { TextMarquee } from '@/components/ui/Marquee';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    
    if (!section || !heading) return;

    // Scale up heading on scroll
    gsap.fromTo(
      heading,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Marquee background */}
      <div className="absolute inset-0 flex flex-col justify-center opacity-[0.03] pointer-events-none">
        <TextMarquee
          text="LET'S WORK TOGETHER"
          className="text-[12rem] font-bold text-white whitespace-nowrap"
          speed={30}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
        {/* Label */}
        <TextReveal
          as="span"
          animation="words"
          className="text-sm text-cyan-500 uppercase tracking-widest"
        >
          Got a Project?
        </TextReveal>

        {/* Main heading */}
        <div ref={headingRef} className="mt-8">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1]">
            Let&apos;s create
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              something amazing
            </span>
          </h2>
        </div>

        {/* Description */}
        <TextReveal
          as="p"
          animation="fade"
          className="mt-8 text-xl text-zinc-400 max-w-2xl mx-auto"
        >
          Have an idea? I&apos;d love to hear about it. Let&apos;s discuss how we can 
          bring your vision to life.
        </TextReveal>

        {/* CTA buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <TransitionLink href="/contact">
            <MagneticButton
              as="div"
              className="group px-10 py-5 bg-white text-zinc-950 text-lg font-medium rounded-full hover:bg-cyan-400 transition-all duration-300"
              cursorText="Contact"
              cursorVariant="text"
            >
              <span className="flex items-center gap-3">
                Start a Conversation
                <svg 
                  className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </MagneticButton>
          </TransitionLink>

          <a href="mailto:hello@sadok.dev">
            <MagneticButton
              as="div"
              className="px-10 py-5 border border-zinc-700 text-white text-lg font-medium rounded-full hover:border-zinc-500 hover:bg-zinc-800/50 transition-all duration-300"
            >
              hello@sadok.dev
            </MagneticButton>
          </a>
        </div>

        {/* Social links */}
        <div className="mt-16 flex items-center justify-center gap-6">
          {[
            { label: 'GitHub', href: 'https://github.com/sadok' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/sadok' },
            { label: 'Twitter', href: 'https://twitter.com/sadok' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MagneticButton
                as="div"
                className="text-zinc-500 hover:text-white transition-colors duration-300"
                strength={0.3}
              >
                {social.label}
              </MagneticButton>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
