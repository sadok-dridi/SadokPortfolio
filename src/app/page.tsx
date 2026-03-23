"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Terminal, Database, Server, Cpu, Globe, Cloud, Activity, X, ArrowRight, CheckCircle2, FileText, Image as ImageIcon } from "lucide-react";
import Starfield from "@/components/Starfield";

const projects = [
  {
    id: "infrasight",
    title: "InfraSight",
    icon: Activity,
    color: "blue",
    shortDesc: "A visually stunning AI-powered infrastructure dashboard. Integrates a local Ollama co-pilot to monitor VPS health.",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    bgClass: "hover:border-blue-500/30 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)]",
    iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    fullDesc: "Managing self-hosted VPS environments and containers across multiple nodes can become chaotic. I built InfraSight as a centralized command center that visualizes Docker stats, network traffic, and PostgreSQL health in real-time. It features an integrated AI terminal connected to a local Ollama instance for instant anomaly analysis.",
    link: "/infrasight",
    mockup: (
      <div className="mt-6 rounded-xl border border-zinc-800 bg-[#050505] p-4 font-mono text-xs overflow-hidden relative">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-zinc-500">vps-metrics-stream</span>
        </div>
        <div className="space-y-2 text-zinc-400">
          <p><span className="text-blue-400">[INFO]</span> Connected to remote node vps-01 (192.168.1.44)</p>
          <p><span className="text-blue-400">[INFO]</span> Container 'postgres-db' running at 45% RAM</p>
          <p className="text-yellow-400"><span className="text-yellow-500">[WARN]</span> High CPU detected on n8n-worker (89%)</p>
          <p><span className="text-cyan-400">[OLLAMA]</span> Suggestion: Scale n8n-worker replicas or implement payload chunking.</p>
          <p className="animate-pulse">_</p>
        </div>
      </div>
    )
  },
  {
    id: "radarx",
    title: "radarX",
    icon: Globe,
    color: "cyan",
    shortDesc: "Hybrid-cloud opportunity routing system. Saved 90% AI API costs by offloading heavy LLM inference to local machines via SSH tunnels.",
    tags: ["Next.js", "Docker", "Ollama", "PostgreSQL"],
    bgClass: "hover:border-cyan-500/30 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)]",
    iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    fullDesc: "Opportunity Radar (radarX) is a powerful intelligence system designed to discover, score, validate, and route high-signal opportunities from online platforms in real-time. By connecting directly to automated ingestion workflows via n8n, it cuts through the noise of the internet. The killer feature? A secure reverse SSH tunnel that pushes AI classification tasks from the cloud VPS to a local machine running Ollama, reducing inference costs to zero.",
    link: "https://radarx.mooo.com/",
    mockup: (
      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-zinc-100">Live Opportunities Queue</span>
          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-[10px] uppercase font-bold tracking-wider">Tunnel Active</span>
        </div>
        <div className="space-y-3">
          {[
            { id: "REQ-901", score: 98, status: "High Signal" },
            { id: "REQ-882", score: 85, status: "Verified" },
            { id: "REQ-875", score: 42, status: "Discarded" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800">
              <div className="flex items-center gap-3">
                <Database size={14} className="text-zinc-500" />
                <span className="text-sm font-mono text-zinc-300">{item.id}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-zinc-500 uppercase">AI Score</span>
                  <span className={`text-sm font-bold ${item.score > 80 ? 'text-green-400' : 'text-red-400'}`}>{item.score}/100</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "finhub",
    title: "FinHub-TN",
    icon: Database,
    color: "purple",
    shortDesc: "Secure escrow platform with ledger security. Features automated wallet management via Telegram bots and atomic state changes.",
    tags: ["Symfony", "JavaFX", "n8n", "Telegram API"],
    bgClass: "hover:border-purple-500/30 hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.15)]",
    iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    fullDesc: "FinHub-TN is a distributed fintech architecture designed to facilitate secure, trustless peer-to-peer transactions. I decoupled the backend (Symfony REST API) from the frontend (JavaFX) and integrated an event-driven automation layer using self-hosted n8n. Webhooks trigger a custom Telegram Bot that allows administrators to remotely control wallets, guaranteeing absolute transaction atomicity.",
    link: "https://www.finhub.tn/",
    mockup: (
      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="flex items-center gap-2 mb-4 text-sm font-medium text-zinc-300">
          <Terminal size={14} className="text-purple-400" /> Telegram Ops Alert
        </div>
        <div className="p-4 rounded-lg bg-[#18222d] border border-[#2a3948]">
          <p className="text-sm text-[#8ab4f8] font-semibold mb-2">FinHub Escrow Bot</p>
          <p className="text-sm text-zinc-100 mb-4">🚨 <strong className="text-white">Transaction Pending Validation</strong><br/><br/>
            Amount: <span className="text-green-400 font-mono">$4,500.00</span><br/>
            From: Wallet_A9x...<br/>
            To: Escrow_Vault_01<br/>
            Status: Awaiting Admin Signature
          </p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button className="py-2 bg-[#2b5278] hover:bg-[#325f8a] text-white text-sm rounded transition-colors text-center cursor-pointer">✅ Approve Release</button>
            <button className="py-2 bg-red-900/40 hover:bg-red-900/60 text-red-200 text-sm rounded transition-colors text-center cursor-pointer">❌ Rollback</button>
          </div>
        </div>
      </div>
    )
  }
];

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-cyan-500/30 overflow-hidden font-sans relative">
      <Starfield />

      {/* Background Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20 mix-blend-screen"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-20 mix-blend-screen"></div>
      </div>

      <main className="relative z-10 container mx-auto px-6 py-24 md:py-32 max-w-6xl">
        
        {/* HERO SECTION */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl space-y-8 min-h-[70vh] flex flex-col justify-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
            Engineering Student at ESPRIT
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl bg-gradient-to-br from-zinc-100 via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
            Sadok Dridi.
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl text-zinc-400 md:text-2xl font-light max-w-2xl leading-relaxed">
            I build <span className="text-zinc-100 font-medium">distributed systems</span>, secure fintech platforms, and <span className="text-cyan-400 font-medium">hybrid AI pipelines</span>. Full Stack Engineer specializing in automation.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <a href="mailto:sadok.dridi@esprit.tn" className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-900 transition-transform hover:scale-105 hover:bg-zinc-200">
              <Mail size={16} /> Get in touch
            </a>
            <a href="/cv" className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-6 py-3 text-sm font-medium text-cyan-400 transition-all hover:bg-cyan-500/20 hover:border-cyan-500 hover:shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)] cursor-pointer">
              <FileText size={16} /> View CV
            </a>
            <a href="https://github.com/sadok-dridi" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm px-6 py-3 text-sm font-medium text-zinc-100 transition-all hover:bg-zinc-800 hover:border-zinc-700 cursor-pointer">
              <Github size={16} /> GitHub
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm px-6 py-3 text-sm font-medium text-zinc-100 transition-all hover:bg-zinc-800 hover:border-zinc-700 cursor-pointer">
              <Linkedin size={16} /> LinkedIn
            </a>
          </motion.div>
        </motion.section>

        {/* SKILLS SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mt-32"
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl font-semibold text-zinc-100">Technical Arsenal</h2>
            <div className="h-px bg-zinc-800 flex-1"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md">
              <Cloud className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="font-medium mb-2">Infrastructure</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">Docker, Nginx, Linux (VPS/SSH), Webhooks</p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md">
              <Server className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="font-medium mb-2">Backend</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">Node.js, TypeScript, Java, Symfony</p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md">
              <Cpu className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="font-medium mb-2">AI & Auto</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">Ollama, n8n, Distributed Workers</p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md">
              <Database className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-medium mb-2">Data</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">PostgreSQL, Prisma, JWT, Ledgers</p>
            </div>
          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mt-40"
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl font-semibold text-zinc-100">Featured Architecture</h2>
            <div className="h-px bg-zinc-800 flex-1"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <motion.div 
                layoutId={project.id}
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                className={`group cursor-pointer relative flex flex-col justify-between rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-8 transition-all hover:bg-zinc-900/60 overflow-hidden ${project.bgClass}`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <project.icon size={100} />
                </div>
                <div className="relative z-10">
                  <div className={`mb-4 inline-flex p-3 rounded-xl border ${project.iconBg}`}>
                    <project.icon size={24} />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-zinc-100">
                    {project.title}
                  </h3>
                  <p className="mb-6 text-sm text-zinc-400 leading-relaxed">
                    {project.shortDesc}
                  </p>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="rounded-md bg-zinc-800/80 px-2 py-1 text-xs font-medium text-zinc-300">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* TIMELINE / EXPERIENCE */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mt-40 mb-20"
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl font-semibold text-zinc-100">Experience & Education</h2>
            <div className="h-px bg-zinc-800 flex-1"></div>
          </div>

          <div className="space-y-12 border-l border-zinc-800 ml-3 pl-8 relative">
            <div className="relative">
              <div className="absolute w-3 h-3 bg-cyan-500 rounded-full -left-[38px] top-2 border-4 border-[#0a0a0a]"></div>
              <div className="text-sm text-cyan-400 font-mono mb-1">Expected 2026</div>
              <h3 className="text-xl font-semibold text-zinc-100">Software Engineering Degree</h3>
              <p className="text-zinc-400">ESPRIT (École Supérieure Privée d'Ingénierie et de Technologie)</p>
              <p className="mt-3 text-sm text-zinc-500 max-w-2xl leading-relaxed">
                Project-based engineering curriculum with a strong focus on distributed systems, modern web technologies, database architecture, and artificial intelligence integration. (EUR-ACE Accredited).
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute w-3 h-3 bg-zinc-600 rounded-full -left-[38px] top-2 border-4 border-[#0a0a0a]"></div>
              <div className="text-sm text-zinc-500 font-mono mb-1">Present</div>
              <h3 className="text-xl font-semibold text-zinc-100">Independent Systems Architect</h3>
              <p className="text-zinc-400">Self-Directed Engineering</p>
              <p className="mt-3 text-sm text-zinc-500 max-w-2xl leading-relaxed">
                Architecting and deploying hybrid-cloud AI pipelines, automated FinTech trading platforms, and maintaining a robust self-hosted homelab/VPS infrastructure with reverse proxies and Docker swarms.
              </p>
            </div>
          </div>
        </motion.section>

        {/* FOOTER */}
        <footer className="mt-32 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Sadok Dridi. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Systems Operational
          </div>
        </footer>

      </main>

      {/* EXPANDED PROJECT MODAL */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Modal Content */}
            {projects.filter(p => p.id === selectedId).map(project => (
              <motion.div 
                layoutId={project.id}
                key="modal"
                className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-800 bg-[#0a0a0a] shadow-2xl"
              >
                <div className="p-8 sm:p-10">
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    <X size={20} />
                  </button>

                  <div className={`mb-6 inline-flex p-4 rounded-2xl border ${project.iconBg}`}>
                    <project.icon size={32} />
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="rounded-md bg-zinc-800 px-3 py-1 text-sm font-medium text-zinc-300">{tag}</span>
                    ))}
                  </div>

                  <div className="text-zinc-300 leading-relaxed mb-10 text-lg">
                    <p>{project.fullDesc}</p>
                  </div>

                  <div className="mb-10">
                    <h3 className="text-lg font-semibold mb-4 text-zinc-100 flex items-center gap-2">
                      <ImageIcon size={18} className="text-pink-500" /> Interface Gallery
                    </h3>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="w-full h-64 md:h-80 rounded-xl border border-zinc-800 bg-zinc-900/40 flex flex-col items-center justify-center text-zinc-500 relative overflow-hidden group cursor-pointer shadow-lg"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <ImageIcon size={40} className="mb-3 opacity-30 group-hover:opacity-60 transition-opacity group-hover:scale-110 duration-500" />
                      <p className="text-sm font-medium text-zinc-400">Awaiting Real Screenshots</p>
                      <p className="text-xs text-zinc-600 mt-2 max-w-xs text-center">Place your project images here to enable 3D tilt effects and lightbox viewing.</p>
                    </motion.div>
                  </div>

                  <div className="mb-10">
                    <h3 className="text-lg font-semibold mb-4 text-zinc-100 flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-green-500" /> System Mockup
                    </h3>
                    {project.mockup}
                  </div>

                  {project.link && (
                    <a 
                      href={project.link} 
                      target={project.link.startsWith('http') ? "_blank" : "_self"}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                        project.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30' :
                        project.color === 'purple' ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' :
                        'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                      }`}
                    >
                      View Live Project <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}