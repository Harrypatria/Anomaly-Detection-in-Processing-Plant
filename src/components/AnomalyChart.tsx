import React from 'react';
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
  ReferenceArea,
  Area,
} from 'recharts';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

interface AnomalyChartProps {
  history: any[];
}

export const AnomalyChart: React.FC<AnomalyChartProps> = ({ history }) => {
  const chartData = [...history].reverse().map(h => ({
    time: format(new Date(h.timestamp), 'HH:mm:ss'),
    score: h.ensemble_score,
    iforest: h.iforest_score,
    lof: h.lof_score,
    copod: h.copod_score,
    timestamp: h.timestamp,
  }));

  if (history.length === 0) {
    return (
      <div className="h-[400px] w-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[2rem] bg-white/2 space-y-4 shadow-inner">
        <div className="w-14 h-14 bg-white/5 rounded-2xl shadow-inner flex items-center justify-center border border-white/5">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Synchronizing Manifold</p>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Acquiring statistical equilibrium...</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass border border-white/10 p-5 rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] min-w-[240px]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
            <span className={cn(
              "text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest leading-none",
              data.score > 0.9 ? "bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.3)]" :
              data.score > 0.7 ? "bg-orange-500 text-white shadow-[0_0_12px_rgba(245,158,11,0.3)]" :
              data.score > 0.4 ? "bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]" :
              "bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]"
            )}>
              {data.score > 0.9 ? "Critical" : data.score > 0.7 ? "High" : data.score > 0.4 ? "Warning" : "Stable"}
            </span>
          </div>
          <div className="space-y-3">
            {payload.map((p: any) => (
              <div key={p.dataKey} className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full shadow-inner" style={{ backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}aa` }} />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">{p.name}</span>
                </div>
                <span className="text-[11px] font-black text-white tabular-nums">
                  {(p.value * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-[10px] font-bold text-slate-500 leading-tight italic">
              Vector consensus synthesized from multi-algorithm manifold analysis.
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            
            {/* Severity Zones for Inclusivity & Visibility */}
            <ReferenceArea y1={0} y2={0.4} fill="#10b981" fillOpacity={0.02} />
            <ReferenceArea y1={0.4} y2={0.7} fill="#3b82f6" fillOpacity={0.02} />
            <ReferenceArea y1={0.7} y2={0.9} fill="#f59e0b" fillOpacity={0.02} />
            <ReferenceArea y1={0.9} y2={1} fill="#ef4444" fillOpacity={0.02} />

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
              domain={[0, 1]}
              tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
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
              dataKey="score"
              name="Consensus Vector"
              stroke="#3b82f6"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorScore)"
              isAnimationActive={false}
            />
            
            <Line
              type="monotone"
              dataKey="iforest"
              name="iForest"
              stroke="#64748b"
              strokeWidth={2}
              strokeDasharray="6 6"
              dot={false}
              isAnimationActive={false}
              opacity={0.5}
            />
            
            <Line
              type="monotone"
              dataKey="lof"
              name="LOF Telemetry"
              stroke="#475569"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
              isAnimationActive={false}
              opacity={0.3}
            />

            <Line
              type="monotone"
              dataKey="copod"
              name="COPOD Scalar"
              stroke="#334155"
              strokeWidth={1.5}
              strokeDasharray="2 2"
              dot={false}
              isAnimationActive={false}
              opacity={0.2}
            />

            <ReferenceLine 
              y={0.7} 
              stroke="#ef4444" 
              strokeWidth={2}
              strokeDasharray="10 10"
              opacity={0.3}
              label={{ 
                value: 'CRITICAL THRESHOLD', 
                position: 'insideBottomRight', 
                fill: '#ef4444', 
                fontSize: 10, 
                fontWeight: 900,
                letterSpacing: '0.2em'
              }} 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Explainability Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/5">
        {[
          { label: 'Stable', range: '0-40%', color: 'bg-emerald-500', desc: 'Process nominal.' },
          { label: 'Warning', range: '40-70%', color: 'bg-blue-500', desc: 'Statistical variance.' },
          { label: 'High Risk', range: '70-90%', color: 'bg-orange-500', desc: 'Vector anomaly.' },
          { label: 'Critical', range: '90-100%', color: 'bg-rose-500', desc: 'Failure imminent.' },
        ].map((zone) => (
          <div key={zone.label} className="space-y-2">
            <div className="flex items-center gap-3">
              <div className={cn("w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]", zone.color)} style={{ boxShadow: `0 0 12px ${zone.color}44` }} />
              <span className="text-[11px] font-black text-white uppercase tracking-[0.15em]">{zone.label}</span>
              <span className="text-[10px] font-bold text-slate-600 ml-auto tabular-nums">{zone.range}</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-tight">{zone.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
