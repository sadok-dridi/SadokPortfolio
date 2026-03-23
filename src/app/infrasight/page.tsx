"use client";

import { motion } from "framer-motion";
import { Activity, Server, Cpu, Database, Network, ShieldCheck, Terminal, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function InfraSight() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans p-4 md:p-8">
      {/* Navigation / Header */}
      <header className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)]">
            <Activity size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">InfraSight</h1>
            <p className="text-xs text-zinc-500 font-mono">v2.4.1-prod</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
            &larr; Back to Portfolio
          </Link>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            All Systems Nominal
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Requests", value: "2.4M", icon: Network, color: "text-blue-400" },
            { label: "Active Containers", value: "34", icon: Server, color: "text-purple-400" },
            { label: "Avg Latency", value: "45ms", icon: Activity, color: "text-green-400" },
            { label: "Security Events", value: "0", icon: ShieldCheck, color: "text-emerald-400" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm flex flex-col justify-between"
            >
              <stat.icon className={`w-5 h-5 mb-4 ${stat.color}`} />
              <div>
                <p className="text-2xl font-bold text-zinc-100">{stat.value}</p>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            </motion.div>
          ))}

          {/* Main Chart Area Mock */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-2 md:col-span-4 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm min-h-[300px] flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h2 className="text-sm font-semibold text-zinc-300">Cluster Resource Usage (Live)</h2>
              <div className="flex gap-2">
                <span className="px-2 py-1 text-[10px] rounded bg-zinc-800 text-zinc-300">CPU</span>
                <span className="px-2 py-1 text-[10px] rounded bg-zinc-800 text-zinc-300">RAM</span>
              </div>
            </div>

            {/* Mock Chart Lines */}
            <div className="flex-1 flex items-end gap-2 relative z-10">
              {[...Array(40)].map((_, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end gap-1">
                  <motion.div 
                    initial={{ height: "10%" }}
                    animate={{ height: `${Math.random() * 60 + 20}%` }}
                    transition={{ repeat: Infinity, duration: 2, repeatType: "mirror", delay: i * 0.05 }}
                    className="w-full bg-cyan-500/40 rounded-t-sm"
                  ></motion.div>
                </div>
              ))}
            </div>
            
            {/* X-axis labels */}
            <div className="flex justify-between mt-4 text-[10px] text-zinc-500 font-mono relative z-10">
              <span>12:00</span>
              <span>12:15</span>
              <span>12:30</span>
              <span>12:45</span>
              <span>13:00 (Now)</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: AI Terminal */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-1 rounded-2xl bg-[#0a0a0a] border border-zinc-800 flex flex-col overflow-hidden shadow-2xl relative"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 p-4 border-b border-zinc-800 bg-zinc-900/80">
            <Terminal size={16} className="text-zinc-400" />
            <span className="text-xs font-mono text-zinc-400">Ollama Co-Pilot</span>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-4">
            <div className="text-zinc-500">
              [SYSTEM] Initializing secure SSH tunnel to production DB...<br/>
              [SYSTEM] Connection established.<br/>
              [OLLAMA] Local model loaded. Awaiting query.
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex gap-2 text-cyan-400">
                <span>&gt;</span>
                <p>Analyze recent latency spike on worker node 2</p>
              </div>
              <div className="text-zinc-300 pl-4 border-l-2 border-zinc-800">
                I've analyzed the logs. The spike at 12:24 corresponds to a large ingestion task from n8n (Payload size: 45MB). 
                <br/><br/>
                <span className="text-emerald-400">Recommendation:</span> Implement batch processing in the Next.js API route to chunk payloads over 10MB.
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex gap-2 text-cyan-400">
                <span>&gt;</span>
                <p className="border-r-2 border-cyan-400 animate-pulse pr-1">_</p>
              </div>
            </div>
          </div>
          
          {/* Terminal Input Mock */}
          <div className="p-3 border-t border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black border border-zinc-800">
              <span className="text-zinc-500 text-sm">/ask</span>
              <input type="text" placeholder="Query infrastructure..." disabled className="bg-transparent border-none outline-none text-sm w-full text-zinc-300" />
            </div>
          </div>
        </motion.div>

        {/* Bottom Section: Active Services */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400"><Database size={16}/></div>
              <div>
                <p className="text-sm font-medium">PostgreSQL (Primary)</p>
                <p className="text-xs text-zinc-500">VPS-1 • Syncing</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono text-zinc-300">45%</p>
              <p className="text-[10px] text-zinc-500">Storage</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400"><Cpu size={16}/></div>
              <div>
                <p className="text-sm font-medium">Ollama Worker</p>
                <p className="text-xs text-zinc-500">Local-1 • Idle</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono text-zinc-300">8%</p>
              <p className="text-[10px] text-zinc-500">GPU Util</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-red-900/30 bg-red-900/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400"><AlertCircle size={16}/></div>
              <div>
                <p className="text-sm font-medium text-red-200">n8n Scraper</p>
                <p className="text-xs text-red-400/70">VPS-2 • Rate Limited</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono text-red-300">429</p>
              <p className="text-[10px] text-red-400/70">Status</p>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}