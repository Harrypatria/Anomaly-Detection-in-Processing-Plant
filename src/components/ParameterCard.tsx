import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { TrendingUp, TrendingDown, Minus, Info, AlertCircle, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ParameterCardProps {
  name: string;
  value: number;
  unit: string;
  anomalyScore: number;
  severity: string;
  iforestScore?: number;
  lofScore?: number;
  copodScore?: number;
  description?: string;
}

export const ParameterCard: React.FC<ParameterCardProps> = ({
  name,
  value,
  unit,
  anomalyScore,
  severity,
  iforestScore = 0,
  lofScore = 0,
  copodScore = 0,
  description
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const isAnomaly = anomalyScore > 0.7;
  
  const getScoreColor = (score: number) => {
    if (score > 0.8) return 'text-rose-400';
    if (score > 0.5) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getScoreBg = (score: number) => {
    if (score > 0.8) return 'bg-rose-500/20 border-rose-500/20';
    if (score > 0.5) return 'bg-amber-500/20 border-amber-500/20';
    return 'bg-emerald-500/20 border-emerald-500/20';
  };

  const formatName = (n: string) => n.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <motion.div
      layout
      className={cn(
        "group relative glass rounded-[2.5rem] transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-blue-500/10",
        isAnomaly ? "border-rose-500/30" : "border-white/5"
      )}
    >
      {/* Status Indicator Bar */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1.5 transition-colors duration-500",
        isAnomaly ? "bg-rose-500" : "bg-emerald-500"
      )} />

      <div className="p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{formatName(name)}</h3>
              <div className="relative">
                <button 
                  onMouseEnter={() => setShowInfo(true)}
                  onMouseLeave={() => setShowInfo(false)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors text-slate-600 hover:text-blue-400"
                >
                  <Info className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showInfo && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      className="absolute bottom-full left-0 mb-3 w-56 p-4 glass rounded-2xl text-[10px] font-medium text-slate-300 shadow-2xl z-50 leading-relaxed border border-white/10"
                    >
                      {description || "Real-time manifold telemetry. Monitored for statistical deviation."}
                      <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-[#1a1c2e] border-r border-b border-white/10 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white tracking-tighter">{value.toFixed(2)}</span>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{unit}</span>
            </div>
          </div>
          
          <div className={cn(
            "w-12 h-12 rounded-[1.25rem] flex items-center justify-center transition-all duration-500 shadow-inner",
            isAnomaly ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"
          )}>
            {isAnomaly ? <AlertCircle className="w-6 h-6 animate-pulse" /> : <CheckCircle2 className="w-6 h-6" />}
          </div>
        </div>

        {/* Mini Sparkline Placeholder */}
        <div className="h-10 flex items-end gap-1.5 opacity-20 group-hover:opacity-40 transition-opacity">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="flex-1 bg-slate-500 rounded-t-lg" style={{ height: `${Math.random() * 100}%` }} />
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className={cn("px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border", getScoreBg(anomalyScore), getScoreColor(anomalyScore))}>
              Anomaly: {(anomalyScore * 100).toFixed(0)}%
            </div>
          </div>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-slate-500 hover:text-white flex items-center justify-center active:scale-90"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pt-6 border-t border-white/5 space-y-4"
            >
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'iForest', score: iforestScore },
                  { label: 'LOF', score: lofScore },
                  { label: 'COPOD', score: copodScore },
                ].map((m) => (
                  <div key={m.label} className="bg-white/5 p-3 rounded-2xl border border-white/5 flex flex-col items-center">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">{m.label}</span>
                    <span className={cn("text-xs font-black", getScoreColor(m.score))}>
                      {m.score.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Trend Vector (1h)</span>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest">-2.4%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
