"use client";

import { ArrowLeft, Download, Printer } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CVPage() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 font-sans sm:p-8 dark:bg-[#050505] dark:text-zinc-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Toolbar - hidden when printing */}
        <div className="flex justify-between items-center mb-8 print:hidden">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium hover:text-cyan-500 transition-colors">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <div className="flex gap-4">
            <a
              href="/SadokDridiResume.pdf"
              download
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <Download size={16} /> Download
            </a>
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
              <Printer size={16} /> Print
            </button>
          </div>
        </div>

        {/* Paper Sheet */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white text-black p-8 sm:p-12 md:p-16 rounded-2xl shadow-xl print:shadow-none print:p-0 print:rounded-none"
        >
          {/* Header */}
          <div className="border-b-2 border-zinc-200 pb-6 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-zinc-900">SADOK DRIDI</h1>
            <h2 className="text-xl font-medium text-cyan-600 mb-4">Full Stack Engineer | AI & Automation Systems</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600 font-medium">
              <span>Tunis, Tunisia</span>
              <span>sadok.dridi.engineer@gmail.com</span>
              <a href="https://github.com/sadok-dridi" className="hover:text-cyan-600">github.com/sadok-dridi</a>
              <a href="https://linkedin.com/in/" className="hover:text-cyan-600">LinkedIn</a>
            </div>
          </div>

          <p className="text-zinc-700 mb-8 italic">
            Engineering student at ESPRIT building real-world, cost-effective systems combining modern web technologies, AI integrations, and automated infrastructure.
          </p>

          {/* Section: Skills */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-200 pb-2 mb-4 uppercase tracking-wider">Core Skills</h3>
            <ul className="space-y-2 text-sm text-zinc-700">
              <li><strong className="text-zinc-900">Infrastructure & DevOps:</strong> Docker, Nginx, Linux (VPS/SSH), CI/CD, Webhooks</li>
              <li><strong className="text-zinc-900">Backend & Systems:</strong> Node.js, TypeScript, Java (Spring/JavaFX), PHP (Symfony), PostgreSQL</li>
              <li><strong className="text-zinc-900">AI & Automation:</strong> Local LLMs (Ollama), n8n (Self-hosted), Workflow Orchestration</li>
              <li><strong className="text-zinc-900">Frontend:</strong> Next.js (App Router), React, Tailwind CSS</li>
            </ul>
          </div>

          {/* Section: Experience & Projects */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-200 pb-2 mb-4 uppercase tracking-wider">Engineering Experience & Projects</h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-md font-bold text-zinc-900">radarX | Hybrid-Cloud AI Intelligence Platform</h4>
              </div>
              <p className="text-xs text-cyan-600 font-mono mb-2">Next.js, PostgreSQL, Prisma, n8n, Ollama, Docker, SSH Tunneling</p>
              <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-zinc-700">
                <li>Engineered a hybrid-cloud opportunity routing system using Next.js and PostgreSQL on a VPS, automating data ingestion via self-hosted n8n workflows.</li>
                <li>Reduced AI API costs by an estimated 90% by configuring secure reverse SSH tunnels to offload heavy LLM processing from the VPS to a local machine running Ollama.</li>
                <li>Implemented stateless JWT authentication (jose, bcryptjs) and robust Role-Based Access Control (RBAC) to secure internal operator dashboards.</li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-md font-bold text-zinc-900">FinHub-TN | Secure Escrow & Trading Engine</h4>
              </div>
              <p className="text-xs text-cyan-600 font-mono mb-2">JavaFX, Symfony, Webhooks, Telegram API, Ledger Security</p>
              <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-zinc-700">
                <li>Developed a secure fintech escrow platform separating core ledger logic (Symfony REST APIs) from the client terminal (JavaFX).</li>
                <li>Integrated automated wallet management and real-time transaction alerts via a self-hosted n8n instance and a custom Telegram bot.</li>
                <li>Designed atomic state changes to prevent financial discrepancies in peer-to-peer transactions.</li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-md font-bold text-zinc-900">HomeLab & Self-Hosted Infrastructure</h4>
              </div>
              <p className="text-xs text-cyan-600 font-mono mb-2">Linux, Docker Swarm, Nginx, Bash</p>
              <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-zinc-700">
                <li>Provisioned and managed a production-grade VPS environment using Docker and Nginx reverse proxies.</li>
                <li>Developed custom Telegram bots and shell scripts to remotely orchestrate, start, and stop local AI services and server containers on demand.</li>
              </ul>
            </div>
          </div>

          {/* Section: Education */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-200 pb-2 mb-4 uppercase tracking-wider">Education</h3>
            <div className="flex justify-between items-baseline">
              <h4 className="text-md font-bold text-zinc-900">ESPRIT (École Supérieure Privée d'Ingénierie et de Technologie)</h4>
              <span className="text-sm text-zinc-600 font-medium">Expected 2026</span>
            </div>
            <p className="text-sm text-zinc-700">Software Engineering Degree (EUR-ACE Accredited) | Tunis, Tunisia</p>
            <p className="text-sm text-zinc-600 mt-1"><strong className="text-zinc-700">Coursework:</strong> Distributed Systems, Software Architecture, Database Design, Web Technologies</p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}