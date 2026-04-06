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
      <section id="problem" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em]">The Challenge</span>
              <h2 className="text-6xl font-black tracking-tight leading-[0.95] text-slate-900">
                Traditional Monitoring is <span className="text-rose-600 italic">Reactive</span>.
              </h2>
              <p className="text-xl font-medium text-slate-500 leading-relaxed">
                Petrochemical plants generate terabytes of data daily. Human operators and static threshold alerts are no longer sufficient to catch complex deviations before they escalate.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {[
                { icon: AlertTriangle, title: "The 'Silent' Failure", desc: "Small deviations that stay within thresholds but signal imminent failure." },
                { icon: Database, title: "Data Overload", desc: "Operators overwhelmed by noise, missing critical signals in the telemetry." },
                { icon: TrendingUp, title: "Efficiency Loss", desc: "Sub-optimal process parameters leading to increased energy and waste." }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 items-start group">
                  <div className="w-14 h-14 bg-slate-50 rounded-[1.25rem] flex items-center justify-center shadow-sm border border-slate-100 text-slate-900 shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black tracking-tight">{item.title}</h4>
                    <p className="text-base font-medium text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full" />
            <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-[0_48px_96px_-12px_rgba(0,0,0,0.08)] relative z-10 space-y-10">
              <div className="flex items-center justify-between border-b border-slate-50 pb-8">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Anomaly Detection Gap</h3>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>
              
              <div className="space-y-10">
                <div className="relative h-64 w-full bg-slate-50 rounded-[2.5rem] overflow-hidden p-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.05),transparent)]" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full border-4 border-slate-100 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-8 border-rose-500/20 flex items-center justify-center animate-pulse">
                        <div className="w-20 h-20 rounded-full bg-rose-500 flex items-center justify-center shadow-2xl shadow-rose-500/50">
                          <AlertTriangle className="w-10 h-10 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 p-4 bg-white rounded-2xl shadow-xl border border-slate-50">
                      <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Critical Deviation</p>
                      <p className="text-2xl font-black text-slate-900">42% Missed</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Response Time</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tighter">14.2m</p>
                    <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">Too Slow</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Manual Inspection</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tighter">85%</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inefficient</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methods Section */}
      <section id="methods" className="py-40 bg-slate-50">
        <div className="max-w-7xl mx-auto px-12 space-y-32">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em]">The Methodology</span>
            <h2 className="text-6xl font-black tracking-tight leading-[0.95] text-slate-900">
              The PetroGuard AI <br /><span className="text-blue-600">Intelligence Engine.</span>
            </h2>
            <p className="text-xl font-medium text-slate-500 leading-relaxed">
              We combine multiple unsupervised learning algorithms with large language models to provide a comprehensive safety net for your operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Database, title: "Ingestion", desc: "High-frequency telemetry ingestion from plant SCADA systems." },
              { icon: Layers, title: "Ensemble", desc: "Simultaneous scoring via IForest, LOF, and COPOD algorithms." },
              { icon: BrainCircuit, title: "Analysis", desc: "Gemini AI interprets scores to provide expert context." },
              { icon: Zap, title: "Action", desc: "Actionable mitigation strategies delivered to operators." }
            ].map((step, i) => (
              <div key={i} className="group relative">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.04)] space-y-8 relative z-10 hover:-translate-y-4 transition-all duration-700">
                  <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-700 shadow-sm">
                    <step.icon className="w-10 h-10" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-2xl font-black tracking-tight">{step.title}</h4>
                    <p className="text-base font-medium text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="text-[80px] font-black text-slate-50/50 absolute -top-4 -right-4 select-none group-hover:text-slate-100 transition-colors">
                    0{i + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="py-40 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(37,99,235,0.15),transparent)]" />
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
          <div className="space-y-20">
            <div className="space-y-6">
              <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em]">Key Insights</span>
              <h2 className="text-7xl font-black tracking-tight leading-[0.9] text-white">
                Intelligence <br />that <span className="text-blue-400">Empowers.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
              {[
                { title: "98.4%", label: "Detection Accuracy", desc: "Minimal false positives through ensemble consensus." },
                { title: "< 2s", label: "Latency", desc: "Real-time processing for immediate incident response." },
                { title: "24/7", label: "Autonomous", desc: "Continuous monitoring without human fatigue." },
                { title: "Expert", label: "Context", desc: "AI-generated insights for every detected anomaly." }
              ].map((stat, i) => (
                <div key={i} className="space-y-4">
                  <h4 className="text-6xl font-black tracking-tighter text-white">{stat.title}</h4>
                  <div className="space-y-1">
                    <p className="text-[11px] font-black text-blue-400 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-base font-medium text-slate-500 leading-relaxed">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-16 rounded-[4rem] space-y-12 relative">
            <div className="absolute -top-8 -left-8 w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-600/50">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-black tracking-tight leading-tight">The Future of <br />Process Safety</h3>
            <p className="text-xl font-medium text-slate-300 leading-relaxed italic">
              "PetroGuard AI represents a paradigm shift in how we manage industrial risk. By turning data into dialogue, we enable operators to act with the confidence of an expert engineer."
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-xl shadow-blue-600/20">PC</div>
              <div>
                <p className="text-lg font-black">Patria & Co.</p>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Strategic Advisory</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-12 space-y-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="space-y-8 text-center lg:text-left">
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-900/20">
                  <ShieldAlert className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tighter">PetroGuard AI</h1>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patria & Co.</p>
                </div>
              </div>
              <p className="text-lg font-medium text-slate-400 max-w-md leading-relaxed">
                Advanced anomaly detection and predictive intelligence for the global petrochemical industry.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div className="space-y-6">
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Platform</p>
                <div className="flex flex-col gap-4">
                  {['Overview', 'Monitor', 'Alerts', 'AI Engine'].map((l) => (
                    <a key={l} href="#" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">{l}</a>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Company</p>
                <div className="flex flex-col gap-4">
                  {['About', 'Patria & Co.', 'Careers', 'Contact'].map((l) => (
                    <a key={l} href="#" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">{l}</a>
                  ))}
                </div>
              </div>
              <div className="space-y-6 col-span-2 sm:col-span-1">
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Connect</p>
                <div className="flex flex-col gap-4">
                  <a href="https://www.patriaco.co.uk" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                    patriaco.co.uk <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-sm font-bold text-slate-400">London, UK</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
              © 2026 PetroGuard AI. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-[11px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Privacy Policy</a>
              <a href="#" className="text-[11px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div className="mt-32 px-12">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLaunch}
            className="w-full max-w-4xl mx-auto py-8 bg-slate-900 text-white rounded-[3rem] font-black text-2xl hover:bg-slate-800 transition-all shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] flex items-center justify-center gap-6 group"
          >
            Launch Masterclass Dashboard
            <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
          </motion.button>
        </div>
      </footer>
    </div>
  );
};
