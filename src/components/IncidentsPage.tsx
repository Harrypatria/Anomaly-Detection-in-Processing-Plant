import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, ShieldAlert, Clock, Filter, Download, ChevronRight, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

interface IncidentsPageProps {
  alerts: any[];
  onAcknowledge: (id: number) => void;
}

export const IncidentsPage: React.FC<IncidentsPageProps> = ({ alerts, onAcknowledge }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Incident Manifold</h2>
          <p className="text-sm font-bold text-slate-500">Track and resolve process deviations across the production manifold.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-3 px-5 py-3 glass border-white/5 rounded-2xl text-[11px] font-black tracking-widest text-slate-400 hover:text-white transition-all shadow-xl">
            <Filter className="w-4 h-4" />
            FILTER VECTORS
          </button>
          <button className="flex items-center gap-3 px-5 py-3 bg-white text-slate-900 rounded-2xl text-[11px] font-black tracking-widest hover:bg-blue-400 transition-all shadow-2xl">
            <Download className="w-4 h-4" />
            EXPORT TELEMETRY
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-4">
          {Array.isArray(alerts) && alerts.length > 0 ? (
            alerts.map((alert) => (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "glass p-8 rounded-[2.5rem] border shadow-2xl flex items-center gap-8 group hover:border-white/20 transition-all",
                  alert.severity === 'critical' ? "border-l-8 border-l-red-600" : 
                  alert.severity === 'high' ? "border-l-8 border-l-rose-500" : 
                  alert.severity === 'medium' ? "border-l-8 border-l-orange-400" : "border-l-8 border-l-blue-400"
                )}
              >
                <div className={cn(
                  "w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner",
                  alert.severity === 'critical' ? "bg-red-500/10 text-red-400 border border-red-500/20" : 
                  alert.severity === 'high' ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                )}>
                  <ShieldAlert className="w-10 h-10" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                      alert.severity === 'critical' ? "bg-red-500/10 text-red-400 border-red-500/20" : 
                      alert.severity === 'high' ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                    )}>
                      {alert.severity}
                    </span>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      {format(new Date(alert.timestamp), 'MMM dd, yyyy • HH:mm:ss')}
                    </span>
                  </div>
                  <h4 className="text-xl font-black text-white tracking-tight leading-tight">{alert.message}</h4>
                  <p className="text-xs font-bold text-slate-500">
                    Manifold: <span className="text-slate-300">{alert.parameter}</span> • 
                    Vector: <span className="text-slate-300">{alert.value.toFixed(2)}</span> • 
                    Certainty: <span className="text-slate-300">{(alert.anomalyScore * 100).toFixed(1)}%</span>
                  </p>
                </div>
                <button 
                  onClick={() => onAcknowledge(alert.id)}
                  className="px-8 py-4 bg-white/5 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-inner border border-white/5"
                >
                  Resolve
                </button>
              </motion.div>
            ))
          ) : (
            <div className="glass p-24 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-6">
              <div className="w-24 h-24 bg-emerald-500/10 text-emerald-400 rounded-[2.5rem] flex items-center justify-center mx-auto border border-emerald-500/20 shadow-inner">
                <AlertCircle className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tighter">No Active Incidents</h3>
              <p className="text-slate-500 font-bold max-w-sm mx-auto text-sm leading-relaxed">System manifold integrity is balanced. Statistical anomalies have been successfully suppressed.</p>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="glass p-10 rounded-[3rem] border border-white/5 shadow-2xl space-y-8">
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Manifold Stats</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Cycle Events</span>
                <span className="text-2xl font-black text-white">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">MTTR Index</span>
                <span className="text-2xl font-black text-white">4.2m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Critical Rate</span>
                <span className="text-2xl font-black text-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.3)]">8%</span>
              </div>
            </div>
            <div className="pt-6 border-t border-white/5">
              <button className="w-full py-4 bg-blue-500/10 text-blue-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all border border-blue-500/20">
                PROBABILISTIC ANALYTICS
              </button>
            </div>
          </div>

          <div className="bg-blue-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-blue-600/30 space-y-6 relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black tracking-tighter">L3 Support Protocol</h3>
              <p className="text-blue-100 text-xs font-bold leading-relaxed">Initiate direct uplink to on-site thermodynamics specialists.</p>
              <button className="mt-2 w-full py-3 bg-white text-blue-600 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl group-hover:scale-105">
                UPLINK CONTROL ROOM
              </button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/20 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
