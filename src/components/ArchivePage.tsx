import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Database, Search, Filter, Download, Calendar, Clock, ChevronRight, FileText, Activity, AlertCircle, ShieldCheck, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';
import { format, subHours, subDays } from 'date-fns';
import { getHistory } from '../api/client';
import { PARAMETERS } from '../../server/ingest/ingest';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Area,
  Scatter,
} from 'recharts';

export const ArchivePage: React.FC = () => {
  const [selectedParam, setSelectedParam] = useState(PARAMETERS[0].name);
  const [timeRange, setTimeRange] = useState('24h');
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hoveredEntry, setHoveredEntry] = useState<any | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const end = new Date();
      let start = subHours(end, 24);
      if (timeRange === '7d') start = subDays(end, 7);
      if (timeRange === '30d') start = subDays(end, 30);

      const res = await getHistory(selectedParam, { start: start.toISOString(), end: end.toISOString() });
      setHistory(res.data || []);
    } catch (err) {
      console.error('Fetch History Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const end = new Date();
    let start = subHours(end, 24);
    if (timeRange === '7d') start = subDays(end, 7);
    if (timeRange === '30d') start = subDays(end, 30);

    const url = `/api/history/export/${selectedParam}?start=${start.toISOString()}&end=${end.toISOString()}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    fetchHistory();
  }, [selectedParam, timeRange]);

  const chartData = [...history].map(h => ({
    timestamp: h.timestamp,
    time: format(new Date(h.timestamp), 'HH:mm:ss'),
    date: format(new Date(h.timestamp), 'MMM dd'),
    value: h.value,
    score: h.anomalyScore,
    isAnomaly: h.isAnomaly,
    anomalyValue: h.isAnomaly ? h.value : null,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass border border-slate-200 p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
          <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">
            {format(new Date(data.timestamp), 'MMM dd, HH:mm:ss')}
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-8">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">Value</span>
              <span className="text-[10px] font-black text-slate-900">{data.value.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between gap-8">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">AI Score</span>
              <span className={cn(
                "text-[10px] font-black",
                data.score > 0.7 ? "text-rose-600" : "text-slate-900"
              )}>
                {(data.score * 100).toFixed(1)}%
              </span>
            </div>
            {data.isAnomaly && (
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest">Anomaly Detected</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const TableTooltip = ({ entry, pos }: { entry: any; pos: { x: number; y: number } }) => {
    if (!entry) return null;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="fixed z-50 pointer-events-none"
        style={{ left: pos.x + 20, top: pos.y - 40 }}
      >
        <div className="glass border border-white/10 p-5 rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] min-w-[240px]">
          <div className="flex items-center gap-3 mb-4">
            <div className={cn(
              "w-2 h-2 rounded-full",
              entry.isAnomaly ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
            )} />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              {format(new Date(entry.timestamp), 'MMM dd, HH:mm:ss')}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Manifold Reading</span>
              <span className="text-sm font-black text-white tracking-tighter tabular-nums">
                {entry.value.toFixed(3)} 
                <span className="text-[9px] text-slate-500 ml-1 uppercase">
                  {PARAMETERS.find(p => p.name === selectedParam)?.unit}
                </span>
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">AI Certainty</span>
              <div className="flex items-center gap-3">
                <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={cn(
                      "h-full rounded-full",
                      entry.anomalyScore > 0.7 ? "bg-rose-500" : "bg-blue-500"
                    )}
                    style={{ width: `${entry.anomalyScore * 100}%` }}
                  />
                </div>
                <span className="text-[11px] font-black text-white tabular-nums">
                  {(entry.anomalyScore * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Process Status</span>
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg",
                  entry.isAnomaly ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                )}>
                  {entry.isAnomaly ? "ANOMALY" : "STABLE"}
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-500 leading-tight">
                {entry.isAnomaly 
                  ? "Neural vectors indicate L1 deviation. Proceed with protocol alpha." 
                  : "Manifold sync optimized within L1 control boundaries."}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Unified Data Archive</h2>
          <p className="text-sm font-bold text-slate-500">Historical telemetry across all neural manifolds and sensor vectors.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex glass border-white/5 rounded-2xl p-1.5 shadow-xl">
            {[
              { id: '24h', label: '24H' },
              { id: '7d', label: '7D' },
              { id: '30d', label: '30D' },
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={cn(
                  "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  timeRange === range.id 
                    ? "bg-white text-slate-900 shadow-2xl" 
                    : "text-slate-500 hover:text-white"
                )}
              >
                {range.label}
              </button>
            ))}
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center gap-3 px-6 py-3 bg-white text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-400 transition-all shadow-2xl"
          >
            <Download className="w-4 h-4" />
            EXPORT DATA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-10 rounded-[3rem] border border-white/5 shadow-2xl space-y-8">
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Select Vector</h3>
            <div className="space-y-3">
              {PARAMETERS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedParam(p.name)}
                  className={cn(
                    "w-full flex items-center justify-between p-5 rounded-[1.5rem] transition-all group",
                    selectedParam === p.name 
                      ? "bg-white text-slate-900 shadow-2xl scale-105 border border-white/10" 
                      : "text-slate-500 hover:bg-white/5 hover:text-white border border-transparent"
                  )}
                >
                  <span className="text-[11px] font-black uppercase tracking-widest leading-none">{p.name}</span>
                  <ChevronRight className={cn("w-4 h-4 transition-transform", selectedParam === p.name ? "translate-x-1" : "group-hover:translate-x-1")} />
                </button>
              ))}
            </div>
          </div>

          <div className="glass p-10 rounded-[3rem] border border-white/5 shadow-2xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 shadow-inner">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Visual Lab</h3>
            </div>
            <p className="text-[10px] font-bold text-slate-600 leading-relaxed uppercase tracking-[0.15em]">
              Synchronized manifold visualization for {selectedParam} vectors. 
              Glow points signify AI-detected process divergence.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-10">
          <div className={cn(
            "glass p-10 rounded-[3.5rem] border border-white/5 shadow-2xl transition-all duration-700",
            isFullScreen ? "fixed inset-8 z-[100] flex flex-col" : ""
          )}>
            <div className="flex items-center justify-between mb-10">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{selectedParam} VECTOR TREND</h3>
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none">Historical neural mapping / statistical manifold</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="p-3 glass rounded-2xl hover:bg-white/10 transition-colors text-slate-500 group"
                  title={isFullScreen ? "Exit Matrix View" : "Enter Matrix View"}
                >
                  <Activity className={cn("w-5 h-5 transition-transform group-hover:scale-110", isFullScreen ? "text-blue-400" : "")} />
                </button>
                <button 
                  onClick={fetchHistory}
                  className="p-3 glass rounded-2xl hover:bg-white/10 transition-colors text-slate-500"
                >
                  <RefreshCw className={cn("w-5 h-5", loading && "animate-spin text-blue-400")} />
                </button>
              </div>
            </div>
            <div className={cn("w-full h-full", isFullScreen ? "flex-1" : "h-[450px]")}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fontWeight: 600, fill: '#475569' }}
                    minTickGap={60}
                  />
                  <YAxis 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fontWeight: 600, fill: '#475569' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="top" 
                    align="right" 
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: '30px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    name={selectedParam}
                    stroke="#3b82f6"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    isAnimationActive={false}
                  />
                  <Scatter
                    name="Divergence"
                    dataKey="anomalyValue"
                    fill="#ef4444"
                    stroke="#000"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass rounded-[3.5rem] border border-white/5 shadow-2xl overflow-hidden">
            <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/2">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 border border-white/10 shadow-inner">
                  <Database className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">Telemetry Vault</h3>
                  <p className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                    {history.length} Manifold records indexed for {timeRange}
                  </p>
                </div>
              </div>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="FILTER VAULT..." 
                  className="pl-12 pr-6 py-4 glass border-white/5 rounded-2xl text-[11px] font-black tracking-widest w-72 uppercase placeholder:text-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/2">
                    <th className="px-10 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] leading-none">Stardate / UTC</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] leading-none">Value Flux</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] leading-none">AI Vector</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] leading-none">Manifold Status</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] leading-none">Record</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/2">
                  {loading ? (
                    Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={5} className="px-10 py-6"><div className="h-5 bg-white/2 rounded-xl w-full" /></td>
                      </tr>
                    ))
                  ) : history.length > 0 ? (
                    history.map((entry, idx) => (
                      <tr 
                        key={idx} 
                        className="hover:bg-white/2 transition-all group relative border-l-4 border-l-transparent hover:border-l-blue-500"
                        onMouseEnter={(e) => {
                          setHoveredEntry(entry);
                          setTooltipPos({ x: e.clientX, y: e.clientY });
                        }}
                        onMouseMove={(e) => {
                          setTooltipPos({ x: e.clientX, y: e.clientY });
                        }}
                        onMouseLeave={() => setHoveredEntry(null)}
                      >
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-slate-600" />
                            <div className="flex flex-col">
                              <span className="text-xs font-black text-white tabular-nums">{format(new Date(entry.timestamp), 'HH:mm:ss')}</span>
                              <span className="text-[10px] font-bold text-slate-600 tabular-nums uppercase">{format(new Date(entry.timestamp), 'MMM dd')}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <span className="text-sm font-black text-white tabular-nums tracking-tighter">{entry.value.toFixed(2)}</span>
                          <span className="text-[10px] font-black text-slate-600 ml-1.5 uppercase font-mono tracking-widest">{PARAMETERS.find(p => p.name === selectedParam)?.unit}</span>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className="flex-1 h-1 bg-white/5 rounded-full w-24 overflow-hidden shadow-inner">
                              <div 
                                className={cn(
                                  "h-full rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(0,0,0,0.5)]",
                                  entry.anomalyScore > 0.7 ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]" : entry.anomalyScore > 0.4 ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]" : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                                )
                                } 
                                style={{ width: `${entry.anomalyScore * 100}%` }} 
                              />
                            </div>
                            <span className="text-[11px] font-black text-white tabular-nums tracking-tighter">{(entry.anomalyScore * 100).toFixed(0)}<span className="text-slate-700 text-[10px] ml-0.5">%</span></span>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          {entry.isAnomaly ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20 w-fit shadow-inner">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-black uppercase tracking-widest">ANOMALY</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 w-fit shadow-inner">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-black uppercase tracking-widest">STABLE</span>
                            </div>
                          )}
                        </td>
                        <td className="px-10 py-6">
                          <button className="p-3 glass rounded-2xl text-slate-600 hover:text-white transition-all shadow-inner border border-white/5 active:scale-95">
                            <FileText className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-10 py-32 text-center">
                        <div className="w-20 h-20 bg-white/2 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 border border-white/5 shadow-inner">
                          <Database className="w-10 h-10 text-slate-800" />
                        </div>
                        <p className="text-xs font-black text-slate-600 uppercase tracking-[0.3em]">Vault is empty for this production cycle</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <TableTooltip entry={hoveredEntry} pos={tooltipPos} />
    </motion.div>
  );
};
