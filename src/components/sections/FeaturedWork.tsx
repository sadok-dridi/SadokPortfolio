'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { TransitionLink } from '@/components/layout/PageTransition';
import TextReveal from '@/components/ui/TextReveal';
import TiltCard from '@/components/ui/TiltCard';
import MagneticButton from '@/components/ui/MagneticButton';
import { getFeaturedProjects, Project } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const projects = getFeaturedProjects();

  useEffect(() => {
    const section = sectionRef.current;
    const projectsContainer = projectsRef.current;
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    
    if (!section || !projectsContainer) return;

    // Animate projects on scroll
    const projectCards = projectsContainer.querySelectorAll('.project-card');
    
    const animations = Array.from(projectCards).map((card) =>
      gsap.fromTo(
        card,
        { y: isMobile ? 36 : 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: isMobile ? 0.45 : 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: isMobile ? 'top 92%' : 'top 85%',
            toggleActions: isMobile ? 'play none none none' : 'restart none none reset',
            once: isMobile,
          },
        }
      )
    );

    return () => {
      animations.forEach((animation) => animation.scrollTrigger?.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-32 px-4 sm:px-6 md:px-12">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-10 md:mb-16">
          <div>
            <TextReveal
              as="span"
              animation="words"
              className="text-xs sm:text-sm text-cyan-500 uppercase tracking-widest"
            >
              Selected Projects
            </TextReveal>
            <TextReveal
              as="h2"
              animation="words"
              className="mt-3 md:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            >
              Featured Work
            </TextReveal>
          </div>
          
          <TransitionLink href="/work">
            <MagneticButton
              as="div"
              className="group flex items-center gap-2 text-sm sm:text-base text-zinc-400 hover:text-white transition-colors"
            >
              View All Projects
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

        {/* Projects grid */}
        <div ref={projectsRef} className="space-y-12 md:space-y-24">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Alternate layout for visual interest
  const isReversed = index % 2 === 1;

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    if (isHovered) {
      gsap.to(image, {
        scale: 1.05,
        duration: 0.6,
        ease: 'power3.out',
      });
    } else {
      gsap.to(image, {
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
      });
    }
  }, [isHovered]);

  return (
    <TransitionLink href={`/work/${project.slug}`}>
      <div
        ref={cardRef}
        className={`project-card group grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-12 items-center ${
          isReversed ? 'md:flex-row-reverse' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="large"
        data-cursor-text="View"
      >
        {/* Image */}
        <TiltCard
          className={`relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 ${
            isReversed ? 'md:order-2' : ''
          }`}
          tiltAmount={5}
        >
          <div ref={imageRef} className="absolute inset-0">
            {project.images[0] ? (
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)` 
                }}
              />
            )}
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Project number */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            <span 
              className="text-4xl sm:text-5xl md:text-6xl font-bold opacity-20"
              style={{ color: project.color }}
            >
              0{index + 1}
            </span>
          </div>
        </TiltCard>

        {/* Content */}
        <div className={`space-y-3 sm:space-y-4 md:space-y-6 ${isReversed ? 'md:order-1 md:text-right' : ''}`}>
          {/* Category & Year */}
          <div className={`flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-500 ${isReversed ? 'md:justify-end' : ''}`}>
            <span className="uppercase tracking-wider">{project.category}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span>{project.year}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-400">
            {project.subtitle}
          </p>

          {/* Description - hidden on smallest screens */}
          <p className="hidden sm:block text-sm sm:text-base text-zinc-500 leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${isReversed ? 'md:justify-end' : ''}`}>
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-zinc-400 border border-zinc-800 rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-zinc-500">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* View button */}
          <div className={`flex ${isReversed ? 'md:justify-end' : ''}`}>
            <MagneticButton
              as="div"
              className="inline-flex items-center gap-2 text-sm sm:text-base text-white group/btn"
            >
              <span className="relative">
                View Case Study
                <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-500 group-hover/btn:w-full transition-all duration-300" />
              </span>
              <svg 
                className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
          </div>
        </div>
      </div>
    </TransitionLink>
  );
}
