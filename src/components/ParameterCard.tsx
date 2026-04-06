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
    if (score > 0.8) return 'text-rose-600';
    if (score > 0.5) return 'text-amber-600';
    return 'text-emerald-600';
  };

  const getScoreBg = (score: number) => {
    if (score > 0.8) return 'bg-rose-50';
    if (score > 0.5) return 'bg-amber-50';
    return 'bg-emerald-50';
  };

  const formatName = (n: string) => n.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <motion.div
      layout
      className={cn(
        "group relative bg-white rounded-3xl border transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50",
        isAnomaly ? "border-rose-200" : "border-slate-100"
      )}
    >
      {/* Status Indicator Bar */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1.5 transition-colors duration-500",
        isAnomaly ? "bg-rose-500" : "bg-emerald-500"
      )} />

      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{formatName(name)}</h3>
              <div className="relative">
                <button 
                  onMouseEnter={() => setShowInfo(true)}
                  onMouseLeave={() => setShowInfo(false)}
                  className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-300 hover:text-blue-600"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
                <AnimatePresence>
                  {showInfo && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      className="absolute bottom-full left-0 mb-2 w-48 p-3 glass rounded-2xl text-[10px] font-medium text-slate-600 shadow-2xl z-50 leading-relaxed border border-slate-200"
                    >
                      {description || "Real-time sensor data from the Ethylene Cracker unit. Monitored for process stability."}
                      <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-white border-r border-b border-slate-200 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 tracking-tighter">{value.toFixed(2)}</span>
              <span className="text-xs font-bold text-slate-400">{unit}</span>
            </div>
          </div>
          
          <div className={cn(
            "w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500",
            isAnomaly ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
          )}>
            {isAnomaly ? <AlertCircle className="w-5 h-5 animate-pulse" /> : <CheckCircle2 className="w-5 h-5" />}
          </div>
        </div>

        {/* Mini Sparkline Placeholder */}
        <div className="h-8 flex items-end gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex-1 bg-slate-400 rounded-t-sm" style={{ height: `${Math.random() * 100}%` }} />
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className={cn("px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest", getScoreBg(anomalyScore), getScoreColor(anomalyScore))}>
              Score: {(anomalyScore * 100).toFixed(0)}%
            </div>
          </div>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-900"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pt-4 border-t border-slate-100 space-y-3"
            >
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'iForest', score: iforestScore },
                  { label: 'LOF', score: lofScore },
                  { label: 'COPOD', score: copodScore },
                ].map((m) => (
                  <div key={m.label} className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex flex-col items-center">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</span>
                    <span className={cn("text-xs font-black", getScoreColor(m.score))}>
                      {m.score.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between px-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Trend (1h)</span>
                <div className="flex items-center gap-1 text-emerald-600">
                  <TrendingDown className="w-3 h-3" />
                  <span className="text-[10px] font-black">-2.4%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
