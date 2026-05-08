import React, { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, AlertTriangle, Clock, ChevronRight, Filter, ShieldAlert, Zap, Info, ChevronDown, ChevronUp, Activity, History as HistoryIcon, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { format, formatDistanceToNow } from 'date-fns';
import { getAIAnalysis } from '../lib/gemini';
import Markdown from 'react-markdown';

interface AlertFeedProps {
  alerts: any[];
  onAcknowledge: (id: number) => void;
  loading: boolean;
}

export const AlertFeed: React.FC<AlertFeedProps> = ({ alerts, onAcknowledge, loading }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<Record<number, string>>({});
  const [aiLoading, setAiLoading] = useState<Record<number, boolean>>({});

  const handleAIAnalysis = async (alert: any) => {
    if (aiAnalysis[alert.id]) return;
    
    setAiLoading(prev => ({ ...prev, [alert.id]: true }));
    try {
      const analysis = await getAIAnalysis(
        alert.parameter,
        alert.value || 0,
        alert.anomalyScore,
        alert.severity
      );
      setAiAnalysis(prev => ({ ...prev, [alert.id]: analysis || 'No analysis available.' }));
    } catch (err: any) {
      console.error('AI Analysis Error:', err);
      setAiAnalysis(prev => ({ ...prev, [alert.id]: err.message || 'Failed to generate AI analysis. Please check your API key.' }));
    } finally {
      setAiLoading(prev => ({ ...prev, [alert.id]: false }));
    }
  };

  const getSeverityIcon = (sev: string) => {
    switch (sev) {
      case 'critical': return <AlertCircle className="w-6 h-6 text-red-600 animate-bounce" />;
      case 'high': return <ShieldAlert className="w-6 h-6 text-rose-600 animate-pulse" />;
      case 'medium': return <AlertTriangle className="w-6 h-6 text-orange-600" />;
      default: return <Info className="w-6 h-6 text-blue-600" />;
    }
  };

  const getSeverityBg = (sev: string) => {
    switch (sev) {
      case 'critical': return 'bg-red-500/10 border-red-500/20 shadow-red-500/5';
      case 'high': return 'bg-rose-500/10 border-rose-500/20 shadow-rose-500/5';
      case 'medium': return 'bg-orange-500/10 border-orange-500/20 shadow-orange-500/5';
      default: return 'bg-blue-500/10 border-blue-500/20 shadow-blue-500/5';
    }
  };

  const getSeverityBorder = (sev: string) => {
    switch (sev) {
      case 'critical': return 'border-l-8 border-l-red-600';
      case 'high': return 'border-l-8 border-l-rose-600';
      case 'medium': return 'border-l-8 border-l-orange-600';
      default: return 'border-l-8 border-l-blue-600';
    }
  };

  const getRecommendedActions = (param: string) => {
    if (param.includes('Pressure')) return ['Check relief valves', 'Inspect seal integrity', 'Reduce feed rate'];
    if (param.includes('Temperature')) return ['Increase cooling water flow', 'Check heat exchanger', 'Verify thermocouple calibration'];
    if (param.includes('Flow')) return ['Inspect pump cavitation', 'Check for line blockage', 'Verify control valve position'];
    return ['Inspect local sensor', 'Verify process stability', 'Consult shift supervisor'];
  };

  return (
    <div className="glass border-white/5 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col h-[600px]">
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/2">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-2xl shadow-inner border border-white/5">
            <ShieldAlert className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-[11px] font-black text-white uppercase tracking-widest leading-none">Live Incident Manifold</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Sync</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {(!Array.isArray(alerts) || alerts.length === 0) ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6"
            >
              <div className="w-24 h-24 bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center border border-emerald-500/20 shadow-inner">
                <CheckCircle className="w-12 h-12 text-emerald-400" />
              </div>
              <div className="space-y-2">
                <p className="text-[11px] font-black text-white uppercase tracking-[0.2em]">All Manifolds Balanced</p>
                <p className="text-xs text-slate-500 font-bold leading-relaxed max-w-[200px]">Zero anomalies detected in the last production cycle.</p>
              </div>
            </motion.div>
          ) : (
            Array.isArray(alerts) && alerts.map((alert) => (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "rounded-[2.5rem] border transition-all duration-500 cursor-pointer overflow-hidden group shadow-sm",
                  getSeverityBg(alert.severity),
                  getSeverityBorder(alert.severity),
                  expandedId === alert.id ? "ring-2 ring-blue-500/30 border-blue-500/40 shadow-2xl" : "hover:border-white/10 hover:shadow-lg"
                )}
                onClick={() => setExpandedId(expandedId === alert.id ? null : alert.id)}
              >
                <div className="p-6">
                  <div className="flex items-start gap-5">
                    <div className="mt-1 p-2.5 bg-white/5 rounded-2xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform">
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-widest text-white truncate">
                          {alert.parameter.replace(/_/g, ' ')}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                          <Clock className="w-4 h-4" />
                          {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 font-bold leading-relaxed">
                        {alert.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="px-3 py-1.5 bg-white/5 rounded-xl border border-white/5 flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-blue-400" />
                          <span className="text-[10px] font-black text-white">{(alert.anomalyScore * 100).toFixed(0)}% Vector</span>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-slate-600 group-hover:text-white transition-colors shadow-inner">
                          {expandedId === alert.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === alert.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-white/2 border-t border-white/5 p-6 space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            AI Insight Vector
                          </div>
                          {!aiAnalysis[alert.id] && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAIAnalysis(alert);
                              }}
                              disabled={aiLoading[alert.id]}
                              className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors disabled:opacity-50"
                            >
                              {aiLoading[alert.id] ? 'Analyzing...' : 'Generate Analysis'}
                            </button>
                          )}
                        </div>
                        
                        {aiLoading[alert.id] ? (
                          <div className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                            <span className="text-xs font-bold text-blue-400">Gemini is synthesizing manifold telemetry...</span>
                          </div>
                        ) : aiAnalysis[alert.id] ? (
                          <div className="p-5 bg-white/5 rounded-[2rem] border border-white/5 prose prose-xs max-w-none prose-invert">
                            <div className="text-[12px] font-medium leading-relaxed text-slate-400">
                              <Markdown>{aiAnalysis[alert.id]}</Markdown>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[11px] font-bold text-slate-600 italic">Initiate AI analysis for manifold deep-dive.</p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                          <Activity className="w-4 h-4" />
                          Protocol Response
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {getRecommendedActions(alert.parameter).map((action, i) => (
                            <div key={i} className="flex items-center gap-3 text-[11px] font-bold text-slate-400 bg-white/2 p-3 rounded-xl border border-white/5">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAcknowledge(alert.id);
                          }}
                          className="w-full py-4 bg-white text-slate-900 text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-400 transition-all flex items-center justify-center gap-2 shadow-2xl active:scale-95"
                        >
                          Resolve Loop <CheckCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="p-8 bg-white/2 border-t border-white/5">
        <button className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-white/10 hover:text-white transition-all shadow-inner flex items-center justify-center gap-3 group">
          <HistoryIcon className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform" />
          View Incident Archive
        </button>
      </div>
    </div>
  );
};
