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
        <div className="glass border border-slate-200 p-4 rounded-2xl shadow-2xl backdrop-blur-xl min-w-[220px] bg-white/80">
          <div className="flex items-center gap-2 mb-3">
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              entry.isAnomaly ? "bg-rose-500" : "bg-emerald-500"
            )} />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {format(new Date(entry.timestamp), 'MMM dd, HH:mm:ss')}
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Sensor Reading</span>
              <span className="text-xs font-black text-slate-900">
                {entry.value.toFixed(3)} 
                <span className="text-[9px] text-slate-400 ml-1">
                  {PARAMETERS.find(p => p.name === selectedParam)?.unit}
                </span>
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">AI Confidence</span>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full",
                      entry.anomalyScore > 0.7 ? "bg-rose-500" : "bg-blue-500"
                    )}
                    style={{ width: `${entry.anomalyScore * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-black text-slate-900">
                  {(entry.anomalyScore * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                  entry.isAnomaly ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                )}>
                  {entry.isAnomaly ? "Anomaly" : "Nominal"}
                </span>
              </div>
              <p className="text-[9px] font-bold text-slate-400 leading-tight">
                {entry.isAnomaly 
                  ? "Process deviation detected. Requires immediate inspection." 
                  : "System operating within expected parameters."}
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
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Data Archive</h2>
          <p className="text-sm font-bold text-slate-400">Access historical sensor data, anomaly records, and system logs.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
            {[
              { id: '24h', label: '24H' },
              { id: '7d', label: '7D' },
              { id: '30d', label: '30D' },
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={cn(
                  "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  timeRange === range.id 
                    ? "bg-slate-900 text-white shadow-lg" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {range.label}
              </button>
            ))}
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all shadow-lg"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 space-y-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Select Parameter</h3>
            <div className="space-y-2">
              {PARAMETERS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedParam(p.name)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-2xl transition-all group",
                    selectedParam === p.name 
                      ? "bg-blue-50 text-blue-600 border border-blue-100 shadow-sm" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                  )}
                >
                  <span className="text-xs font-black tracking-tight">{p.name}</span>
                  <ChevronRight className={cn("w-4 h-4 transition-transform", selectedParam === p.name ? "translate-x-1" : "group-hover:translate-x-1")} />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl">
                <Activity className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Visual Analysis</h3>
            </div>
            <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
              Interactive time-series visualization for {selectedParam}. 
              Red markers indicate AI-detected process anomalies.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">{selectedParam} Trend Analysis</h3>
                <p className="text-xs font-bold text-slate-400">Historical data visualization with anomaly highlighting</p>
              </div>
              <button 
                onClick={fetchHistory}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
              >
                <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
              </button>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fontWeight: 600 }}
                    minTickGap={60}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fontWeight: 600 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="top" 
                    align="right" 
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    name={selectedParam}
                    stroke="#2563eb"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    isAnimationActive={false}
                  />
                  <Scatter
                    name="Anomalies"
                    dataKey="anomalyValue"
                    fill="#ef4444"
                    stroke="#fff"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Raw Data Log</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {history.length} entries found for {timeRange}
                  </p>
                </div>
              </div>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search entries..." 
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Value</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Score</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={5} className="px-8 py-4"><div className="h-4 bg-slate-100 rounded-lg w-full" /></td>
                      </tr>
                    ))
                  ) : history.length > 0 ? (
                    history.map((entry, idx) => (
                      <tr 
                        key={idx} 
                        className="hover:bg-slate-50/50 transition-colors group relative"
                        onMouseEnter={(e) => {
                          setHoveredEntry(entry);
                          setTooltipPos({ x: e.clientX, y: e.clientY });
                        }}
                        onMouseMove={(e) => {
                          setTooltipPos({ x: e.clientX, y: e.clientY });
                        }}
                        onMouseLeave={() => setHoveredEntry(null)}
                      >
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-xs font-black text-slate-900">{format(new Date(entry.timestamp), 'HH:mm:ss')}</span>
                            <span className="text-[10px] font-bold text-slate-400">{format(new Date(entry.timestamp), 'MMM dd')}</span>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <span className="text-xs font-black text-slate-900">{entry.value.toFixed(2)}</span>
                          <span className="text-[10px] font-bold text-slate-400 ml-1">{PARAMETERS.find(p => p.name === selectedParam)?.unit}</span>
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full w-20 overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full rounded-full transition-all duration-500",
                                  entry.anomalyScore > 0.7 ? "bg-rose-500" : entry.anomalyScore > 0.4 ? "bg-amber-500" : "bg-emerald-500"
                                )} 
                                style={{ width: `${entry.anomalyScore * 100}%` }} 
                              />
                            </div>
                            <span className="text-[10px] font-black text-slate-900">{(entry.anomalyScore * 100).toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          {entry.isAnomaly ? (
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-rose-50 text-rose-600 rounded-lg border border-rose-100 w-fit">
                              <AlertCircle className="w-3 h-3" />
                              <span className="text-[9px] font-black uppercase tracking-widest">Anomaly</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100 w-fit">
                              <ShieldCheck className="w-3 h-3" />
                              <span className="text-[9px] font-black uppercase tracking-widest">Stable</span>
                            </div>
                          )}
                        </td>
                        <td className="px-8 py-4">
                          <button className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-400 hover:text-blue-600 transition-all">
                            <FileText className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <Database className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No records found for this period</p>
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
