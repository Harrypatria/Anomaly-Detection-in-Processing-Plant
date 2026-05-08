import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  Zap, 
  Database, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Globe, 
  Layers, 
  Cpu, 
  Activity,
  AlertTriangle,
  Search,
  BrainCircuit,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onLaunch: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-900/20">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter leading-none">PetroGuard AI</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Strategic Intelligence</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-12">
          {['Problem', 'Methods', 'Insights'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">
              {item}
            </a>
          ))}
          <div className="h-6 w-[1px] bg-slate-100" />
          <button 
            onClick={onLaunch}
            className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 active:scale-[0.98] transition-all shadow-2xl shadow-slate-900/10 flex items-center gap-3"
          >
            Launch Portal
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section - Silicon Valley Split Layout */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center pt-20">
        <div className="flex-1 p-12 lg:p-24 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Masterclass Series 2026</span>
            </div>
            <h2 className="text-[clamp(3.5rem,8vw,7rem)] font-black tracking-tight leading-[0.85] text-slate-900">
              Predicting the <br />
              <span className="text-blue-600">Unpredictable.</span>
            </h2>
            <p className="text-xl font-medium text-slate-500 max-w-xl leading-relaxed">
              Bridging the gap between raw telemetry and actionable intelligence through advanced ensemble AI for the petrochemical industry.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <button 
                onClick={onLaunch}
                className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 active:scale-[0.98] transition-all shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-4"
              >
                Launch Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold text-slate-400">
                  <span className="text-slate-900 font-black">500+</span> engineers onboarded
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 w-full h-full min-h-[600px] bg-slate-50 relative overflow-hidden flex items-center justify-center p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent)]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl bg-white rounded-[3.5rem] shadow-[0_64px_128px_-12px_rgba(0,0,0,0.12)] border border-slate-100 p-10 space-y-8"
          >
            <div className="flex items-center justify-between border-b border-slate-50 pb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">Live Stream</p>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Connected</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ensemble Score</p>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">0.984</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="h-48 w-full bg-slate-50 rounded-[2rem] relative overflow-hidden flex items-end px-6 gap-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.random() * 60 + 20}%` }}
                    transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse', delay: i * 0.05 }}
                    className={cn(
                      "flex-1 rounded-t-lg transition-all duration-1000",
                      i > 16 && i < 20 ? "bg-rose-500" : "bg-blue-500/20"
                    )} 
                  />
                ))}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 border-t border-dashed border-slate-300" />
              </div>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: 'Latency', val: '1.2ms' },
                  { label: 'Accuracy', val: '99.9%' },
                  { label: 'Ops/Sec', val: '15k' }
                ].map((s, i) => (
                  <div key={i} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                    <p className="text-lg font-black text-slate-900">{s.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-48 bg-[#0a0f1d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(244,63,94,0.05),transparent)]" />
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
          <div className="space-y-16">
            <div className="space-y-8">
              <span className="text-[11px] font-black text-rose-500 uppercase tracking-[0.3em]">Critical Imperative</span>
              <h2 className="text-7xl font-black tracking-tight leading-[0.9] text-white">
                Reactive <br />is <span className="text-rose-500 italic uppercase">Lethal.</span>
              </h2>
              <p className="text-xl font-medium text-slate-500 leading-relaxed max-w-lg">
                Complex petrochemical vectors generate chaos signals that static threshold systems simply cannot parse. Humans cannot monitor what they cannot see.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-10">
              {[
                { icon: AlertTriangle, title: "Ghost Deviations", desc: "Sub-threshold ripples that precede total manifold collapse." },
                { icon: Database, title: "Telemetry Noise", desc: "Operators overwhelmed by 1.5M daily sensor signals." },
                { icon: TrendingUp, title: "Inertia Loss", desc: "Drifting process parameters eroding total equilibrium." }
              ].map((item, i) => (
                <div key={i} className="flex gap-10 items-start group">
                  <div className="w-16 h-16 glass rounded-3xl flex items-center justify-center border border-white/5 text-slate-500 shrink-0 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-400/50 transition-all duration-700 shadow-inner">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-2xl font-black tracking-tight text-white uppercase">{item.title}</h4>
                    <p className="text-base font-medium text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-[140px] rounded-full" />
            <div className="glass p-16 rounded-[4rem] border border-white/5 shadow-[0_64px_128px_-12px_rgba(0,0,0,0.5)] relative z-10 space-y-12">
              <div className="flex items-center justify-between border-b border-white/5 pb-10">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-600">Detection Gap Matrix</h3>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                  <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                </div>
              </div>
              
              <div className="space-y-12">
                <div className="relative h-72 w-full glass rounded-[3rem] overflow-hidden p-10 flex items-center justify-center shadow-inner border border-white/5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent)]" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border border-white/5 flex items-center justify-center">
                      <div className="w-36 h-36 rounded-full border-4 border-rose-500/20 flex items-center justify-center animate-pulse">
                        <div className="w-24 h-24 rounded-full bg-rose-600 flex items-center justify-center shadow-[0_0_40px_rgba(225,29,72,0.4)] border border-rose-400">
                          <AlertTriangle className="w-10 h-10 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 p-6 glass rounded-3xl shadow-2xl border border-white/10">
                      <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em] mb-1">Unseen Vector</p>
                      <p className="text-3xl font-black text-white tracking-tighter tabular-nums">42<span className="text-rose-500 text-sm ml-1">%</span></p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-12 px-2">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Response Lag</p>
                    <p className="text-5xl font-black text-white tracking-tighter tabular-nums">14.2<span className="text-rose-500 text-sm ml-1">m</span></p>
                    <p className="text-[9px] font-black text-rose-500 uppercase tracking-[0.3em]">Critical Failure</p>
                  </div>
                  <div className="space-y-2 text-right">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Manual Vectors</p>
                    <p className="text-5xl font-black text-white tracking-tighter tabular-nums">85<span className="text-slate-700 text-sm ml-1">%</span></p>
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">High Friction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methods Section */}
      <section id="methods" className="py-48 bg-white/2 relative">
        <div className="max-w-7xl mx-auto px-12 space-y-40">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.3em]">The Architecture</span>
            <h2 className="text-7xl font-black tracking-tight leading-[0.9] text-white">
              Neural Ensemble <br /><span className="text-blue-500 italic uppercase">Syncology.</span>
            </h2>
            <p className="text-xl font-medium text-slate-500 leading-relaxed">
              Synthesizing distributed unsupervised vectors with recursive LLM logic to maintain total process equilibrium across the global fleet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Database, title: "L1 Ingestion", desc: "Nano-latency manifold telemetry streaming directly from SCADA cores." },
              { icon: Layers, title: "Consensus", desc: "Triangulated scoring via IForest, LOF, and statistical COPOD vectors." },
              { icon: BrainCircuit, title: "Cognition", desc: "Neural interpretation of scalar variance via advanced Gemini AI." },
              { icon: Zap, title: "Protocol", desc: "Automated mitigation logic delivered to front-line consoles." }
            ].map((step, i) => (
              <div key={i} className="group relative">
                <div className="glass p-12 rounded-[3.5rem] border border-white/5 shadow-2xl space-y-10 relative z-10 hover:-translate-y-6 hover:bg-white/5 transition-all duration-700 shadow-inner">
                  <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-slate-500 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-700 border border-white/5 shadow-inner">
                    <step.icon className="w-10 h-10" />
                  </div>
                  <div className="space-y-5">
                    <h4 className="text-2xl font-black tracking-tight text-white uppercase">{step.title}</h4>
                    <p className="text-base font-medium text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="text-[100px] font-black text-white/2 absolute -top-8 -right-4 select-none group-hover:text-white/5 transition-colors pointer-events-none">
                    0{i + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="py-48 bg-[#0a0f1d] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.15),transparent)]" />
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
          <div className="space-y-24">
            <div className="space-y-8 text-center lg:text-left">
              <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.3em]">Operational Metrics</span>
              <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-black tracking-tight leading-[0.8] text-white uppercase">
                Synchronized <br />Intelligence.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
              {[
                { title: "98.4%", label: "Consensus Precision", desc: "Total scalar alignment across all neural nodes." },
                { title: "< 1ms", label: "Neural Latency", desc: "Instantaneous manifold analysis and sync." },
                { title: "24/7", label: "Autonomous", desc: "Persistent process auditing without decay." },
                { title: "Expert", label: "Dialogue", desc: "Human-centric AI analysis for every vector shift." }
              ].map((stat, i) => (
                <div key={i} className="space-y-6">
                  <h4 className="text-7xl font-black tracking-tighter text-white tabular-nums">{stat.title}</h4>
                  <div className="space-y-2">
                    <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em]">{stat.label}</p>
                    <p className="text-base font-medium text-slate-600 leading-relaxed">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-16 rounded-[4.5rem] border border-white/5 space-y-16 relative shadow-[0_64px_128px_-12px_rgba(0,0,0,0.5)] shadow-inner">
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-blue-500/50 border border-white/10">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-4xl font-black tracking-tighter leading-[0.9] text-white uppercase italic">The Future of <br />Industrial Manifolds.</h3>
            <p className="text-2xl font-medium text-slate-400 leading-relaxed italic border-l-4 border-blue-500/30 pl-8">
              "PetroGuard AI represents a total shift in risk strategy. By turning dead data into neural dialogue, we enable operators to act with calculated precision."
            </p>
            <div className="flex items-center gap-8 pt-4">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center font-black text-white text-3xl shadow-2xl shadow-blue-600/30 border border-white/10">PC</div>
              <div className="space-y-1">
                <p className="text-2xl font-black text-white tracking-tighter uppercase leading-none">Patria & Co.</p>
                <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.25em]">Strategic Advisory Collective</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Footer */}
      <footer className="py-48 bg-[#0a0f1d] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.01]" />
        <div className="max-w-7xl mx-auto px-12 space-y-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-24">
            <div className="space-y-10 text-center lg:text-left">
              <div className="flex items-center gap-6 justify-center lg:justify-start">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 border border-white/10">
                  <ShieldAlert className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tighter text-white uppercase leading-none">PetroGuard AI</h1>
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Patria & Co. / INTEX</p>
                </div>
              </div>
              <p className="text-xl font-medium text-slate-500 max-w-md leading-relaxed">
                Autonomous anomaly detection and recursive predictive intelligence for the global process industry.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
              <div className="space-y-8">
                <p className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Protocol</p>
                <div className="flex flex-col gap-5">
                  {['Manifold', 'Neural Core', 'Vectors', 'Consensus'].map((l) => (
                    <a key={l} href="#" className="text-xs font-bold text-slate-600 hover:text-white transition-colors uppercase tracking-widest">{l}</a>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <p className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Collective</p>
                <div className="flex flex-col gap-5">
                  {['Advisory', 'Vision', 'Nodes', 'Sync'].map((l) => (
                    <a key={l} href="#" className="text-xs font-bold text-slate-600 hover:text-white transition-colors uppercase tracking-widest">{l}</a>
                  ))}
                </div>
              </div>
              <div className="space-y-8 col-span-2 sm:col-span-1">
                <p className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Neural Link</p>
                <div className="flex flex-col gap-5">
                  <a href="https://www.patriaco.co.uk" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-slate-600 hover:text-white transition-colors flex items-center gap-3 uppercase tracking-widest group">
                    patriaco.co.uk <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">London / Node_L1</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
            <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">
              © 2026 PetroGuard AI Neural Network. Total process containment maintained.
            </p>
            <div className="flex items-center gap-12">
              <a href="#" className="text-[10px] font-black text-slate-700 hover:text-white transition-colors uppercase tracking-[0.2em]">Privacy Protocol</a>
              <a href="#" className="text-[10px] font-black text-slate-700 hover:text-white transition-colors uppercase tracking-[0.2em]">Neural Terms</a>
            </div>
          </div>
        </div>
        
        <div className="mt-40 px-12 pb-24">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLaunch}
            className="w-full max-w-5xl mx-auto py-10 glass border border-white/10 text-white rounded-[3.5rem] font-black text-3xl uppercase tracking-[0.35em] hover:bg-white hover:text-slate-900 transition-all shadow-[0_64px_128px_-12px_rgba(0,0,0,0.5)] flex items-center justify-center gap-10 group shadow-inner"
          >
            Launch Matrix Core
            <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
          </motion.button>
        </div>
      </footer>
    </div>
  );
};
