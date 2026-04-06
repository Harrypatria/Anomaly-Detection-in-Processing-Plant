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
      case 'critical': return <AlertCircle className="w-5 h-5 text-red-600 animate-pulse" />;
      case 'high': return <AlertTriangle className="w-5 h-5 text-rose-600" />;
      case 'medium': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getSeverityBg = (sev: string) => {
    switch (sev) {
      case 'critical': return 'bg-red-50/80 border-red-200 shadow-red-100/50';
      case 'high': return 'bg-rose-50/80 border-rose-200 shadow-rose-100/50';
      case 'medium': return 'bg-orange-50/80 border-orange-200 shadow-orange-100/50';
      default: return 'bg-blue-50/80 border-blue-200 shadow-blue-100/50';
    }
  };

  const getSeverityBorder = (sev: string) => {
    switch (sev) {
      case 'critical': return 'border-l-[6px] border-l-red-600';
      case 'high': return 'border-l-[6px] border-l-rose-600';
      case 'medium': return 'border-l-[6px] border-l-orange-600';
      default: return 'border-l-[6px] border-l-blue-600';
    }
  };

  const getRecommendedActions = (param: string) => {
    if (param.includes('Pressure')) return ['Check relief valves', 'Inspect seal integrity', 'Reduce feed rate'];
    if (param.includes('Temperature')) return ['Increase cooling water flow', 'Check heat exchanger', 'Verify thermocouple calibration'];
    if (param.includes('Flow')) return ['Inspect pump cavitation', 'Check for line blockage', 'Verify control valve position'];
    return ['Inspect local sensor', 'Verify process stability', 'Consult shift supervisor'];
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/40 flex flex-col h-[600px]">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-900 rounded-2xl shadow-lg shadow-slate-900/20">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Live Incident Feed</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {(!Array.isArray(alerts) || alerts.length === 0) ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center border border-emerald-100">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-widest">All Systems Nominal</p>
                <p className="text-xs text-slate-400 font-bold mt-2 leading-relaxed">No active anomalies detected in the last 24 hours.</p>
              </div>
            </motion.div>
          ) : (
            Array.isArray(alerts) && alerts.map((alert) => (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden shadow-sm",
                  getSeverityBg(alert.severity),
                  getSeverityBorder(alert.severity),
                  expandedId === alert.id ? "ring-4 ring-blue-500/10 border-blue-300 shadow-xl" : "hover:border-slate-300 hover:shadow-md"
                )}
                onClick={() => setExpandedId(expandedId === alert.id ? null : alert.id)}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-white rounded-xl shadow-sm">{getSeverityIcon(alert.severity)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-900 truncate">
                          {alert.parameter.replace(/_/g, ' ')}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 font-bold leading-relaxed">
                        {alert.message}
                      </p>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="px-2.5 py-1 bg-white rounded-lg border border-slate-100 shadow-sm flex items-center gap-1.5">
                            <Zap className="w-3 h-3 text-blue-600" />
                            <span className="text-[10px] font-black text-slate-900">{(alert.anomalyScore * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                        {expandedId === alert.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
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
                      className="bg-white/50 border-t border-slate-100 p-5 space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <Sparkles className="w-3 h-3 text-blue-600" />
                            AI Insight Analysis
                          </div>
                          {!aiAnalysis[alert.id] && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAIAnalysis(alert);
                              }}
                              disabled={aiLoading[alert.id]}
                              className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline disabled:opacity-50"
                            >
                              {aiLoading[alert.id] ? 'Analyzing...' : 'Generate AI Analysis'}
                            </button>
                          )}
                        </div>
                        
                        {aiLoading[alert.id] ? (
                          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                            <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                            <span className="text-[10px] font-bold text-blue-600">Gemini is analyzing process telemetry...</span>
                          </div>
                        ) : aiAnalysis[alert.id] ? (
                          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 prose prose-xs max-w-none prose-slate">
                            <div className="text-[11px] font-medium leading-relaxed text-slate-700">
                              <Markdown>{aiAnalysis[alert.id]}</Markdown>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[10px] font-bold text-slate-400 italic">Click "Generate AI Analysis" for deep process insights.</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <Activity className="w-3 h-3" />
                          Recommended Actions
                        </div>
                        <div className="space-y-1.5">
                          {getRecommendedActions(alert.parameter).map((action, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                              <div className="w-1 h-1 bg-blue-500 rounded-full" />
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
                          className="w-full py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                          Acknowledge & Resolve <CheckCircle className="w-4 h-4" />
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

      <div className="p-6 bg-slate-50/50 border-t border-slate-100">
        <button className="w-full py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-sm flex items-center justify-center gap-2">
          <HistoryIcon className="w-4 h-4" />
          View Incident Archive
        </button>
      </div>
    </div>
  );
};
