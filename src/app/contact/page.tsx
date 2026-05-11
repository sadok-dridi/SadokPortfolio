'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MagneticButton from '@/components/ui/MagneticButton';
import { TextMarquee } from '@/components/ui/Marquee';

const socialLinks = [
  { 
    label: 'GitHub', 
    href: 'https://github.com/sadok-dridi',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  },
  { 
    label: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/sadok-dridi/',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  { 
    label: 'Instagram', 
    href: 'https://www.instagram.com/sadok.dridi/',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    )
  },
];

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Master entrance timeline
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const subtitle = page.querySelector('.contact-subtitle');
    const heading = page.querySelector('.contact-heading');
    const description = page.querySelector('.contact-description');
    const infoCol = page.querySelector('.contact-info');
    const formCol = page.querySelector('.contact-form');

    gsap.set([subtitle, heading, description], { y: 30 });
    gsap.set([infoCol, formCol], { y: 40 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(subtitle, { opacity: 1, y: 0, duration: 0.6 }, 0.3);
    tl.to(heading, { opacity: 1, y: 0, duration: 0.7 }, 0.45);
    tl.to(description, { opacity: 1, y: 0, duration: 0.6 }, 0.65);
    tl.to(infoCol, { opacity: 1, y: 0, duration: 0.7 }, 0.85);
    tl.to(formCol, { opacity: 1, y: 0, duration: 0.7 }, 0.95);

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { scale: 0.98 },
          { scale: 1, duration: 0.3, ease: 'back.out(1.5)' }
        );
      }
    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <Header />
      
      <main className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20" ref={pageRef}>
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 md:px-12 mb-12 md:mb-20">
          <span className="contact-subtitle block text-xs sm:text-sm text-cyan-500 uppercase tracking-widest opacity-0">
            Get In Touch
          </span>
          
          <h1 className="contact-heading mt-3 md:mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white opacity-0">
            Let&apos;s work together
          </h1>
          
          <p className="contact-description mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl opacity-0">
            Have a project in mind? I&apos;d love to hear about it. 
            Drop me a message and let&apos;s create something amazing.
          </p>
        </section>

        {/* Content */}
        <section className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
            {/* Contact Info */}
            <div className="contact-info space-y-8 md:space-y-12 opacity-0">
              {/* Availability */}
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm sm:text-base text-green-400 font-medium">Available for new projects</span>
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  I&apos;m currently taking on new freelance projects. Let&apos;s discuss how I can help bring your ideas to life.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-base sm:text-lg font-medium text-white">Contact Details</h3>
                
                <a 
                  href="mailto:sadok.dridi.engineer@gmail.com"
                  className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm text-zinc-500">Email</div>
                    <div className="text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors truncate">sadok.dridi.engineer@gmail.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-zinc-900/30 border border-zinc-800">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-zinc-500">Location</div>
                    <div className="text-sm sm:text-base text-white">Tunisia</div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-base sm:text-lg font-medium text-white">Follow Me</h3>
                <div className="flex gap-3 sm:gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <MagneticButton
                        as="div"
                        className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                      >
                        <span className="[&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
                          {social.icon}
                        </span>
                      </MagneticButton>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form opacity-0">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-6"
              >
                {isSubmitted ? (
                  <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-green-500/10 border border-green-500/20 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-sm sm:text-base text-zinc-400">
                      Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 sm:mt-6 text-sm sm:text-base text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label htmlFor="name" className="block text-xs sm:text-sm text-zinc-400 mb-1.5 sm:mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-zinc-900 border border-zinc-800 text-sm sm:text-base text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs sm:text-sm text-zinc-400 mb-1.5 sm:mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-zinc-900 border border-zinc-800 text-sm sm:text-base text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs sm:text-sm text-zinc-400 mb-1.5 sm:mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-zinc-900 border border-zinc-800 text-sm sm:text-base text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="Project Inquiry"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs sm:text-sm text-zinc-400 mb-1.5 sm:mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        required
                        rows={5}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-zinc-900 border border-zinc-800 text-sm sm:text-base text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {error && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <p className="text-sm text-red-400">{error}</p>
                      </div>
                    )}

                    <MagneticButton
                      as="button"
                      onClick={() => {}}
                      className="w-full py-3 sm:py-4 bg-white text-sm sm:text-base text-zinc-950 font-medium rounded-full hover:bg-cyan-400 transition-colors"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </MagneticButton>
                  </>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <section className="mt-20 md:mt-32 py-6 md:py-8 border-y border-zinc-800/50 overflow-hidden">
          <TextMarquee
            text="Let's Create Something Amazing Together"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-800"
            separator={<span className="mx-4 sm:mx-6 md:mx-8 text-cyan-500/30">*</span>}
            speed={30}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
