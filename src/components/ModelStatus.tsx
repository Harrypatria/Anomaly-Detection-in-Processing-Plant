import React, { useState, useEffect } from 'react';
import { getModelInfo, triggerRetrain, getModelHistory } from '../api/client';
import { Settings, RefreshCw, CheckCircle, XCircle, Info, Database, Cpu, Activity, ChevronDown, ChevronUp, History } from 'lucide-react';
import { cn } from '../lib/utils';
import { formatDistanceToNow, format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

export const ModelStatus: React.FC = () => {
  const [info, setInfo] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [retraining, setRetraining] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const fetchInfo = async () => {
    try {
      const [infoRes, historyRes] = await Promise.all([
        getModelInfo(),
        getModelHistory()
      ]);
      setInfo(infoRes.data);
      setHistory(historyRes.data.data || []);
    } catch (err) {
      console.error('Fetch Model Info Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetrain = async () => {
    setRetraining(true);
    try {
      await triggerRetrain({ contamination: 0.05, notes: 'Manual retrain from dashboard' });
      await fetchInfo();
    } catch (err) {
      console.error('Retrain Error:', err);
    } finally {
      setRetraining(false);
    }
  };

  useEffect(() => {
    fetchInfo();
    const timer = setInterval(fetchInfo, 30000);
    return () => clearInterval(timer);
  }, []);

  if (loading && !info) {
    return <div className="h-48 bg-white rounded-3xl animate-pulse border border-slate-100" />;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-xl shadow-slate-200/40 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 rounded-2xl">
            <Cpu className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">AI Engine Status</h3>
        </div>
        <div className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border",
          info?.is_ready 
            ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
            : "bg-rose-50 text-rose-600 border-rose-100"
        )}>
          {info?.is_ready ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
          <span className="text-[10px] font-black uppercase tracking-widest">
            {info?.is_ready ? "Operational" : "Offline"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Trained</p>
          <p className="text-xs font-black text-slate-900">
            {info?.trained_at ? formatDistanceToNow(new Date(info.trained_at), { addSuffix: true }) : 'Never'}
          </p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Training Set</p>
          <p className="text-xs font-black text-slate-900">{info?.training_samples || 0} Samples</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Active Ensemble Algorithms</span>
          </div>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">Ensemble v2.4</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {info?.algorithms.map((algo: string) => (
            <div key={algo} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[11px] font-black uppercase tracking-tight text-slate-700">{algo}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Active</span>
                <div className="px-1.5 py-0.5 bg-white rounded-md border border-slate-200 text-[8px] font-black text-slate-400">99.2% ACC</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 space-y-4">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors group"
        >
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Training History</span>
          </div>
          {showHistory ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-2">
                {history.map((item, idx) => (
                  <div key={item.id} className="p-3 bg-white border border-slate-100 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-900">{format(new Date(item.trainedAt), 'MMM dd, HH:mm')}</p>
                      <p className="text-[9px] font-bold text-slate-400">{item.notes}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-blue-600">{item.trainingSamples} samples</p>
                      <p className="text-[9px] font-bold text-slate-400">CR: {item.contaminationRate}</p>
                    </div>
                  </div>
                ))}
                {history.length === 0 && (
                  <p className="text-center py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">No history found</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleRetrain}
          disabled={retraining}
          className={cn(
            "w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg",
            retraining 
              ? "bg-slate-50 text-slate-400 cursor-not-allowed" 
              : "bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98]"
          )}
        >
          <RefreshCw className={cn("w-4 h-4", retraining && "animate-spin")} />
          {retraining ? "Retraining Engine..." : "Retrain Engine"}
        </button>
      </div>
    </div>
  );
};
