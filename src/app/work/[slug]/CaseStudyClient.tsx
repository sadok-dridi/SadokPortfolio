'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TransitionLink } from '@/components/layout/PageTransition';
import MagneticButton from '@/components/ui/MagneticButton';
import { CaseGallery, type GalleryPhoto } from '@/components/ui/case-gallery';

import { Project } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyClientProps {
  project: Project;
  nextProject: Project;
  galleryPhotos: GalleryPhoto[];
}

export default function CaseStudyClient({ project, nextProject, galleryPhotos }: CaseStudyClientProps) {
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Master entrance timeline for hero
  useEffect(() => {
    const heroContent = heroContentRef.current;
    const heroImage = heroImageRef.current;
    if (!heroContent || !heroImage) return;

    const badges = heroContent.querySelector('.case-badges');
    const title = heroContent.querySelector('.case-title');
    const subtitle = heroContent.querySelector('.case-subtitle');

    gsap.set(heroImage, { scale: 1.05 });
    gsap.set(badges, { y: 20 });
    gsap.set(title, { y: 30 });
    gsap.set(subtitle, { y: 20 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Hero image fades in & scales down
    tl.to(heroImage, { opacity: 1, scale: 1, duration: 1.2 }, 0.2);
    // 2. Metadata badges
    tl.to(badges, { opacity: 1, y: 0, duration: 0.6 }, 0.5);
    // 3. Title
    tl.to(title, { opacity: 1, y: 0, duration: 0.7 }, 0.65);
    // 4. Subtitle
    tl.to(subtitle, { opacity: 1, y: 0, duration: 0.6 }, 0.85);

    // Hero image parallax on scroll
    gsap.to(heroImage, {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: heroImage,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Scroll-triggered content sections
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const sections = content.querySelectorAll('.reveal-section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        {project.slug === 'paragon' ? (
          <section className="relative h-[45vh] min-h-[360px] overflow-hidden bg-zinc-950">
            <div ref={heroImageRef} className="absolute inset-0 flex items-center justify-center p-12 opacity-0">
              {project.thumbnail && (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  width={300}
                  height={226}
                  className="object-contain w-auto h-auto max-w-[200px] md:max-w-[300px] max-h-[30vh]"
                  priority
                />
              )}
            </div>

            <div ref={heroContentRef} className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="container mx-auto">
                <div className="case-badges flex flex-wrap items-center gap-4 mb-4 opacity-0">
                  <span className="px-3 py-1 text-xs font-medium text-white bg-zinc-900/80 backdrop-blur-sm rounded-full border border-zinc-800">
                    {project.category}
                  </span>
                  <span className="text-zinc-400">{project.year}</span>
                  <span className="text-zinc-600">*</span>
                  <span className="text-zinc-400">{project.role}</span>
                </div>

                <h1 className="case-title text-4xl md:text-6xl lg:text-7xl font-bold text-white opacity-0">
                  {project.title}
                </h1>
                
                <p className="case-subtitle mt-4 text-xl md:text-2xl text-zinc-300 max-w-2xl opacity-0">
                  {project.subtitle}
                </p>
              </div>
            </div>
          </section>
        ) : (
          <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
            <div ref={heroImageRef} className="absolute inset-0 opacity-0">
              {project.images[0] ? (
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              ) : (
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    background: `linear-gradient(135deg, ${project.color}40, ${project.color}10, #09090b)` 
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
            </div>

            <div ref={heroContentRef} className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="container mx-auto">
                <div className="case-badges flex flex-wrap items-center gap-4 mb-4 opacity-0">
                  <span className="px-3 py-1 text-xs font-medium text-white bg-zinc-900/80 backdrop-blur-sm rounded-full border border-zinc-800">
                    {project.category}
                  </span>
                  <span className="text-zinc-400">{project.year}</span>
                  <span className="text-zinc-600">*</span>
                  <span className="text-zinc-400">{project.role}</span>
                </div>

                <h1 className="case-title text-4xl md:text-6xl lg:text-7xl font-bold text-white opacity-0">
                  {project.title}
                </h1>
                
                <p className="case-subtitle mt-4 text-xl md:text-2xl text-zinc-300 max-w-2xl opacity-0">
                  {project.subtitle}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <div ref={contentRef} className="container mx-auto px-6 md:px-12 py-20">
          {/* Overview */}
          <section className="reveal-section opacity-0 grid lg:grid-cols-3 gap-12 mb-24">
            <div className="lg:col-span-2">
              <h2 className="text-sm text-cyan-500 uppercase tracking-widest mb-4">Overview</h2>
              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>
            
            <div className="space-y-8">
              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <MagneticButton
                      as="div"
                      className="px-5 py-2.5 bg-white text-zinc-950 rounded-full text-sm font-medium hover:bg-cyan-400 transition-colors"
                    >
                      Visit Live Site
                    </MagneticButton>
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <MagneticButton
                      as="div"
                      className="px-5 py-2.5 border border-zinc-700 text-white rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
                    >
                      View Code
                    </MagneticButton>
                  </a>
                )}
              </div>

              {/* Tech stack */}
              <div>
                <h3 className="text-sm text-zinc-500 uppercase tracking-wider mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Challenge, Solution, Results */}
          {(project.challenges || project.solutions || project.results) && (
            <section className="reveal-section opacity-0 grid md:grid-cols-3 gap-8 mb-24">
              {project.challenges && (
                <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Challenges</h3>
                  <ul className="space-y-3">
                    {project.challenges.map((item, i) => (
                      <li key={i} className="text-zinc-400 text-sm leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {project.solutions && (
                <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Solutions</h3>
                  <ul className="space-y-3">
                    {project.solutions.map((item, i) => (
                      <li key={i} className="text-zinc-400 text-sm leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {project.results && (
                <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Results</h3>
                  <ul className="space-y-3">
                    {project.results.map((item, i) => (
                      <li key={i} className="text-zinc-400 text-sm leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Gallery */}
          {galleryPhotos.length > 0 && (
            <section className="reveal-section opacity-0 mb-24">
              <h2 className="text-sm text-cyan-500 uppercase tracking-widest mb-8">Gallery</h2>
              <CaseGallery photos={galleryPhotos} color={project.color} />
            </section>
          )}

          {/* Next Project */}
          <section className="reveal-section opacity-0 border-t border-zinc-800 pt-20">
            <span className="text-sm text-zinc-500 uppercase tracking-wider">Next Project</span>
            
            <TransitionLink href={`/work/${nextProject.slug}`}>
              <div className="group mt-4 flex items-center justify-between">
                <h3 className="text-4xl md:text-5xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {nextProject.title}
                </h3>
                <MagneticButton
                  as="div"
                  className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </MagneticButton>
              </div>
            </TransitionLink>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
