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
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Incident Management</h2>
          <p className="text-sm font-bold text-slate-400">Track and resolve system anomalies and process deviations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all shadow-lg">
            <Download className="w-4 h-4" />
            Export Report
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
                className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40 flex items-center gap-6 group hover:border-blue-200 transition-all"
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0",
                  alert.severity === 'critical' ? "bg-red-50 text-red-600" : 
                  alert.severity === 'high' ? "bg-rose-50 text-rose-600" : "bg-orange-50 text-orange-600"
                )}>
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                      alert.severity === 'critical' ? "bg-red-50 text-red-600 border-red-100" : 
                      alert.severity === 'high' ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-orange-50 text-orange-600 border-orange-100"
                    )}>
                      {alert.severity}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {format(new Date(alert.timestamp), 'MMM dd, yyyy • HH:mm:ss')}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 tracking-tight">{alert.message}</h4>
                  <p className="text-xs font-bold text-slate-500">
                    Parameter: <span className="text-slate-900">{alert.parameter}</span> • 
                    Value: <span className="text-slate-900">{alert.value.toFixed(2)}</span> • 
                    Score: <span className="text-slate-900">{(alert.anomalyScore * 100).toFixed(1)}%</span>
                  </p>
                </div>
                <button 
                  onClick={() => onAcknowledge(alert.id)}
                  className="px-6 py-3 bg-slate-50 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                >
                  Acknowledge
                </button>
              </motion.div>
            ))
          ) : (
            <div className="bg-white p-20 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/40 text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto">
                <AlertCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">No Active Incidents</h3>
              <p className="text-slate-400 font-bold max-w-xs mx-auto">System integrity is maintained. All process parameters are within normal operating ranges.</p>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 space-y-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Incident Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Total Today</span>
                <span className="text-lg font-black text-slate-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Avg Resolution</span>
                <span className="text-lg font-black text-slate-900">4.2m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Critical Rate</span>
                <span className="text-lg font-black text-red-600">8%</span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <button className="w-full py-3 bg-blue-50 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all">
                View Detailed Analytics
              </button>
            </div>
          </div>

          <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-600/30 space-y-4 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-black tracking-tight">Need Assistance?</h3>
              <p className="text-blue-100 text-xs font-bold leading-relaxed">Contact the on-site engineering team for immediate process intervention.</p>
              <button className="mt-4 px-6 py-2.5 bg-white text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all">
                Call Control Room
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
