import React from 'react';
import { motion } from 'motion/react';
import { Cpu, ShieldCheck, Zap, Layers, Activity, RefreshCw, Settings, Info, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { ModelStatus } from './ModelStatus';

export const AIEnginePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">AI Inference Engine</h2>
          <p className="text-sm font-bold text-slate-500">Configure the neural manifold and statistical consensus layers.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-3 px-5 py-3 glass border-white/5 rounded-2xl text-[11px] font-black tracking-widest text-slate-400 hover:text-white transition-all shadow-xl">
            <Settings className="w-4 h-4" />
            ENGINE SPECS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-blue-500 rounded-[2.5rem] flex items-center justify-center text-white shadow-[0_0_40px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform duration-500 border border-white/10">
                  <Cpu className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-white tracking-tighter">Neural Ensemble V1.2</h3>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Distributed Consensus Network • ACTIVE_LINK</p>
                  </div>
                </div>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed max-w-xl text-sm">
                Proprietary manifold architecture synthesizing Isolation Forest, density-based LOF, and statistical COPOD vectors 
                to maintain total process equilibrium. Adaptive consensus inhibits false positives by 64% via dynamic scalar weighting.
              </p>
              <div className="grid grid-cols-3 gap-8 pt-6 border-t border-white/5">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">CERTAINTY</p>
                  <p className="text-3xl font-black text-white tracking-tighter">98.4<span className="text-blue-400 text-sm italic ml-1">%</span></p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">LATENCY</p>
                  <p className="text-3xl font-black text-white tracking-tighter">1.2<span className="text-blue-400 text-sm italic ml-1">ms</span></p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">THROUGHPUT</p>
                  <p className="text-3xl font-black text-white tracking-tighter">15<span className="text-blue-400 text-sm italic ml-1">k/s</span></p>
                </div>
              </div>
            </div>
            <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none group-hover:scale-125 transition-transform duration-1000" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'iForest Vector', desc: 'Neural tree partitioning', icon: Layers, status: 'LOCKED' },
              { name: 'LOF Scalar', desc: 'Density manifold analysis', icon: Activity, status: 'LOCKED' },
              { name: 'COPOD Flux', desc: 'Copula statistical mapping', icon: Zap, status: 'LOCKED' },
            ].map((algo) => (
              <div key={algo.name} className="glass p-8 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-6 group hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all border border-white/5 shadow-inner">
                  <algo.icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-black text-white tracking-[0.05em] uppercase">{algo.name}</h4>
                  <p className="text-[10px] font-bold text-slate-600 leading-tight uppercase tracking-widest">{algo.desc}</p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{algo.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="glass p-10 rounded-[3rem] border border-white/5 shadow-2xl space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Manifold Hyper-Parameters</h3>
              <button className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors">TUNING PORTAL</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Contamination', value: '0.05', type: 'FLT64' },
                { label: 'Ensemble Threshold', value: '0.75', type: 'FLT64' },
                { label: 'Window Depth', value: '100', type: 'INT32' },
                { label: 'Feature Scaling', value: 'StdScaler', type: 'SYTH' },
              ].map((param) => (
                <div key={param.label} className="flex items-center justify-between p-5 bg-white/2 rounded-[2rem] border border-white/5 hover:border-white/10 transition-colors shadow-inner">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block">{param.type}</span>
                    <span className="text-xs font-bold text-slate-400">{param.label}</span>
                  </div>
                  <span className="text-sm font-black text-white tabular-nums tracking-tighter">{param.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <ModelStatus />
          
          <div className="glass p-10 rounded-[3rem] border border-white/5 shadow-2xl space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 shadow-inner">
                <Info className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Neural Heat Index</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">CORE_LOAD</span>
                  <span className="text-sm font-black text-white tabular-nums tracking-tighter">12.4<span className="text-slate-500 text-[10px] ml-1">%</span></span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '12.4%' }}
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]" 
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">MAP_BUFFER</span>
                  <span className="text-sm font-black text-white tabular-nums tracking-tighter">2.1 <span className="text-slate-500 text-[10px] uppercase">GB / 8GB</span></span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '26%' }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
