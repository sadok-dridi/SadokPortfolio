'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { TransitionLink } from '@/components/layout/PageTransition';

const skills = [
  {
    category: 'Frontend',
    items: ['Next.js (App Router)', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
  },
  {
    category: 'Backend & Systems',
    items: ['Node.js', 'TypeScript', 'Java (Spring/JavaFX)', 'PHP (Symfony)', 'PostgreSQL', 'Prisma'],
  },
  {
    category: 'Infrastructure & DevOps',
    items: ['Docker', 'Nginx', 'Linux (VPS/SSH)', 'CI/CD', 'Webhooks', 'Bash'],
  },
  {
    category: 'AI & Automation',
    items: ['Ollama (Local LLMs)', 'n8n (Self-hosted)', 'Workflow Orchestration', 'Telegram Bots', 'RAG'],
  },
];

const experience = [
  {
    period: '2024 - Present',
    title: 'Independent Projects & Building',
    company: 'Independent',
    description: 'Building production-deployed web applications and AI-powered tools independently. Focused on real deployment, real infrastructure, real problems.',
    color: '#06b6d4',
  },
  {
    period: '2023 - 2026',
    title: 'Software Engineering Student',
    company: 'ESPRIT (EUR-ACE Accredited)',
    description: 'Project-based engineering curriculum focusing on distributed systems, software architecture, database design, web technologies, and artificial intelligence.',
    color: '#8b5cf6',
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);

  // Master entrance timeline for hero section
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const subtitle = hero.querySelector('.about-subtitle');
    const heading = hero.querySelector('.about-heading');
    const description = hero.querySelector('.about-description');
    const buttons = hero.querySelector('.about-buttons');
    const photo = hero.querySelector('.about-photo');

    gsap.set([subtitle, heading, description], { y: 30 });
    gsap.set(buttons, { y: 20 });
    gsap.set(photo, { y: 40 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Subtitle label
    tl.to(subtitle, { opacity: 1, y: 0, duration: 0.6 }, 0.3);
    // 2. Heading
    tl.to(heading, { opacity: 1, y: 0, duration: 0.7 }, 0.45);
    // 3. Description
    tl.to(description, { opacity: 1, y: 0, duration: 0.6 }, 0.65);
    // 4. Buttons
    tl.to(buttons, { opacity: 1, y: 0, duration: 0.5 }, 0.85);
    // 5. Photo section
    tl.to(photo, { opacity: 1, y: 0, duration: 0.8 }, 0.5);

    return () => {
      tl.kill();
    };
  }, []);



  return (
    <>
      <Header />
      
      <main className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20">
        {/* Hero Section */}
        <section ref={heroRef} className="container mx-auto px-4 sm:px-6 md:px-12 mb-16 md:mb-32">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <span className="about-subtitle block text-xs sm:text-sm text-cyan-500 uppercase tracking-widest opacity-0">
                About Me
              </span>
              
              <h1 className="about-heading mt-3 md:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight opacity-0">
                Building the future, one line of code at a time
              </h1>
              
              <p className="about-description mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed opacity-0">
                I'm Sadok, a software engineering student at ESPRIT (Tunisia) in my 3rd year. I build real, working products — not just homework projects. My focus is on AI integration, automation workflows, and full stack web applications that solve actual problems. I'm motivated by building things that work in production, not just on localhost. Currently open to freelance projects and remote opportunities.
              </p>

              <div className="about-buttons mt-6 md:mt-8 flex flex-wrap gap-3 sm:gap-4 opacity-0">
                <TransitionLink href="/contact">
                  <MagneticButton
                    as="div"
                    className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-white text-zinc-950 font-medium rounded-full hover:bg-cyan-400 transition-colors"
                  >
                    Get In Touch
                  </MagneticButton>
                </TransitionLink>
                
                <a href="/SadokDridiResume.pdf" download="SadokDridiResume.pdf">
                  <MagneticButton
                    as="div"
                    className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border border-zinc-700 text-white font-medium rounded-full hover:bg-zinc-800 transition-colors"
                  >
                    Download CV
                  </MagneticButton>
                </a>
              </div>
            </div>

            {/* Photo */}
            <div className="about-photo relative order-first lg:order-last opacity-0">
              <div className="aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <Image
                  src="/profile/IMG_0273.JPG"
                  alt="Sadok Dridi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              

            </div>
          </div>
        </section>


        {/* Skills */}
        <section className="container mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-32">
          <TextReveal
            as="span"
            animation="words"
            className="text-xs sm:text-sm text-cyan-500 uppercase tracking-widest"
          >
            Skills & Expertise
          </TextReveal>
          
          <TextReveal
            as="h2"
            animation="words"
            className="mt-3 md:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-16"
          >
            Technologies I work with
          </TextReveal>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.category}
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <h3 className="text-sm sm:text-base md:text-lg font-medium text-white mb-3 sm:mb-4">{skill.category}</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm text-zinc-400 bg-zinc-800/50 rounded-md sm:rounded-lg"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="container mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-20">
          <TextReveal
            as="span"
            animation="words"
            className="text-xs sm:text-sm text-cyan-500 uppercase tracking-widest"
          >
            Experience
          </TextReveal>
          
          <TextReveal
            as="h2"
            animation="words"
            className="mt-3 md:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-16"
          >
            My journey so far
          </TextReveal>

          <div className="space-y-8 md:space-y-12 border-l border-zinc-800 ml-1.5 sm:ml-3 pl-6 sm:pl-8">
            {experience.map((item, index) => (
              <div key={index} className="relative">
                <div 
                  className="absolute w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full -left-[29px] sm:-left-[38px] top-1.5 sm:top-2 border-4 border-zinc-950"
                  style={{ backgroundColor: item.color }}
                />
                <div className="text-xs sm:text-sm font-mono mb-0.5 sm:mb-1" style={{ color: item.color }}>
                  {item.period}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm sm:text-base text-zinc-400">{item.company}</p>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-zinc-500 max-w-2xl leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-20">
          <div className="relative p-6 sm:p-10 md:p-12 lg:p-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px]" />
            
            <div className="relative z-10 max-w-2xl">
              <TextReveal
                as="h2"
                animation="words"
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white"
              >
                Interested in working together?
              </TextReveal>
              
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-400">
                I&apos;m always open to discussing new projects and opportunities. 
                Let&apos;s create something amazing together.
              </p>
              
              <div className="mt-6 sm:mt-8">
                <TransitionLink href="/contact">
                  <MagneticButton
                    as="div"
                    className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-white text-zinc-950 font-medium rounded-full hover:bg-cyan-400 transition-colors"
                  >
                    Start a Conversation
                    <svg 
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" 
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
        </section>
      </main>

      <Footer />
    </>
  );
}
