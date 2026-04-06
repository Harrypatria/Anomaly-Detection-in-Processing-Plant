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
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">AI Engine Configuration</h2>
          <p className="text-sm font-bold text-slate-400">Manage the core anomaly detection algorithms and model lifecycle.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Settings className="w-4 h-4" />
            Advanced Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-blue-600/50">
                  <Cpu className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Ensemble Architecture V1.2</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Multi-Algorithm Consensus Engine</p>
                </div>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                Our proprietary ensemble model combines Isolation Forest, Local Outlier Factor, and COPOD algorithms 
                to provide a robust, high-confidence anomaly score. The consensus mechanism reduces false positives 
                by 64% compared to single-algorithm approaches.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confidence</p>
                  <p className="text-2xl font-black text-slate-900">98.4%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inference</p>
                  <p className="text-2xl font-black text-slate-900">1.2ms</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Throughput</p>
                  <p className="text-2xl font-black text-slate-900">15k/s</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-50 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Isolation Forest', desc: 'Tree-based anomaly detection', icon: Layers, status: 'Active' },
              { name: 'LOF', desc: 'Density-based local outlier detection', icon: Activity, status: 'Active' },
              { name: 'COPOD', desc: 'Copula-based outlier detection', icon: Zap, status: 'Active' },
            ].map((algo) => (
              <div key={algo.name} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40 space-y-4 group hover:border-blue-200 transition-all">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                  <algo.icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-900 tracking-tight">{algo.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 leading-tight">{algo.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 pt-2">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">{algo.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Model Parameters</h3>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Edit Config</button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Contamination Rate', value: '0.05', type: 'float' },
                { label: 'Ensemble Threshold', value: '0.75', type: 'float' },
                { label: 'Window Size', value: '100', type: 'integer' },
                { label: 'Feature Scaling', value: 'StandardScaler', type: 'method' },
              ].map((param) => (
                <div key={param.label} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-500">{param.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{param.type}</span>
                    <span className="text-xs font-black text-slate-900">{param.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <ModelStatus />
          
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-xl">
                <Info className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">System Health</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">CPU Usage</span>
                <span className="text-xs font-black text-slate-900">12.4%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[12.4%] h-full bg-blue-600 rounded-full" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Memory Usage</span>
                <span className="text-xs font-black text-slate-900">2.1 GB / 8 GB</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[26%] h-full bg-emerald-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
