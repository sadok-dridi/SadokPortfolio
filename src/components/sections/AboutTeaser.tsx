'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { TransitionLink } from '@/components/layout/PageTransition';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'React / Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js', level: 88 },
  { name: 'Python', level: 85 },
  { name: 'Cloud / DevOps', level: 82 },
];

export default function AboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const skillsContainer = skillsRef.current;
    
    if (!section || !image || !skillsContainer) return;

    // Parallax effect on image
    gsap.to(image, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Animate skill bars
    const bars = skillsContainer.querySelectorAll('.skill-bar');
    bars.forEach((bar) => {
      const width = bar.getAttribute('data-width');
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: `${width}%`,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-12 bg-zinc-950/50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <div
                ref={imageRef}
                className="absolute inset-0 scale-110"
              >
                {/* Placeholder image - replace with actual photo */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-zinc-900" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-9xl font-bold text-white/5">S</span>
                </div>
              </div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-8 -right-8 md:right-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">5+</p>
                  <p className="text-sm text-zinc-500">Years of Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="space-y-8">
            <TextReveal
              as="span"
              animation="words"
              className="text-sm text-cyan-500 uppercase tracking-widest"
            >
              About Me
            </TextReveal>

            <TextReveal
              as="h2"
              animation="words"
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              Crafting digital solutions with passion & precision
            </TextReveal>

            <TextReveal
              as="p"
              animation="fade"
              className="text-lg text-zinc-400 leading-relaxed"
            >
              I&apos;m a Full Stack Engineer with a passion for building products that 
              make a difference. From scalable cloud infrastructure to beautiful 
              user interfaces, I bring ideas to life with clean code and thoughtful design.
            </TextReveal>

            <TextReveal
              as="p"
              animation="fade"
              className="text-zinc-500 leading-relaxed"
            >
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, 
              contributing to open source, or sharing knowledge with the developer community.
            </TextReveal>

            {/* Skills */}
            <div ref={skillsRef} className="space-y-4 pt-4">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-300">{skill.name}</span>
                    <span className="text-zinc-500">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="skill-bar h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                      data-width={skill.level}
                      style={{ width: 0 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <TransitionLink href="/about">
                <MagneticButton
                  as="div"
                  className="group inline-flex items-center gap-2 text-white"
                >
                  <span className="relative">
                    Learn More About Me
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-500 group-hover:w-full transition-all duration-300" />
                  </span>
                  <svg 
                    className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </MagneticButton>
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
