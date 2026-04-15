'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TransitionLink } from '@/components/layout/PageTransition';
import TextReveal from '@/components/ui/TextReveal';
import TiltCard from '@/components/ui/TiltCard';
import MagneticButton from '@/components/ui/MagneticButton';
import { projects, Project } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Full Stack', 'Fintech'];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.project-card');
    
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
  }, [activeCategory]);

  return (
    <>
      <Header />
      
      <main className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 md:px-12 mb-12 md:mb-20">
          <TextReveal
            as="span"
            animation="words"
            className="text-xs sm:text-sm text-cyan-500 uppercase tracking-widest"
            trigger="load"
            delay={0.2}
          >
            Portfolio
          </TextReveal>
          
          <TextReveal
            as="h1"
            animation="words"
            className="mt-3 md:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white max-w-4xl"
            trigger="load"
            delay={0.4}
          >
            Selected projects & case studies
          </TextReveal>
          
          <TextReveal
            as="p"
            animation="fade"
            className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl"
            trigger="load"
            delay={0.6}
          >
            A collection of projects showcasing my expertise in full-stack development,
            cloud architecture, and AI integration.
          </TextReveal>
        </section>

        {/* Filter */}
        <section className="container mx-auto px-4 sm:px-6 md:px-12 mb-8 md:mb-12">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <MagneticButton
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-white text-zinc-950'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                }`}
              >
                {category}
              </MagneticButton>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="container mx-auto px-4 sm:px-6 md:px-12">
          <div ref={gridRef} className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TransitionLink href={`/work/${project.slug}`}>
      <TiltCard
        className="project-card group relative rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors duration-300"
        tiltAmount={5}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {project.images[0] ? (
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className={`object-cover transition-transform duration-700 ${
                isHovered ? 'scale-105' : 'scale-100'
              }`}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          ) : (
            <div 
              className="absolute inset-0" 
              style={{ 
                background: `linear-gradient(135deg, ${project.color}30, ${project.color}05)` 
              }}
            />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          
          {/* Category badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-white bg-zinc-900/80 backdrop-blur-sm rounded-full border border-zinc-800">
              {project.category}
            </span>
          </div>
          
          {/* Year */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <span className="text-xs sm:text-sm text-zinc-400">{project.year}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-500 mt-0.5 sm:mt-1 truncate">{project.subtitle}</p>
            </div>
            
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-zinc-800 group-hover:bg-cyan-500 transition-colors duration-300 flex-shrink-0"
              style={{ transform: isHovered ? 'rotate(-45deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs text-zinc-400 bg-zinc-800/50 rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs text-zinc-500">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </TiltCard>
    </TransitionLink>
  );
}
