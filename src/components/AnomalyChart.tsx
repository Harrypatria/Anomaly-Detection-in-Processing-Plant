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
      <div className="h-[400px] w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/30 space-y-4">
        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Synchronizing Stream</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Awaiting statistical consensus...</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass border border-slate-200 p-4 rounded-2xl shadow-2xl backdrop-blur-xl min-w-[200px]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
            <span className={cn(
              "text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
              data.score > 0.9 ? "bg-rose-500 text-white" :
              data.score > 0.7 ? "bg-orange-500 text-white" :
              data.score > 0.4 ? "bg-amber-500 text-white" :
              "bg-emerald-500 text-white"
            )}>
              {data.score > 0.9 ? "Critical" : data.score > 0.7 ? "High" : data.score > 0.4 ? "Warning" : "Stable"}
            </span>
          </div>
          <div className="space-y-2.5">
            {payload.map((p: any) => (
              <div key={p.dataKey} className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: p.color }} />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">{p.name}</span>
                </div>
                <span className="text-[10px] font-black text-slate-900 tabular-nums">
                  {(p.value * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-[9px] font-bold text-slate-400 leading-tight italic">
              Ensemble consensus based on statistical deviation & density analysis.
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            {/* Severity Zones for Inclusivity & Visibility */}
            <ReferenceArea y1={0} y2={0.4} fill="#10b981" fillOpacity={0.03} />
            <ReferenceArea y1={0.4} y2={0.7} fill="#f59e0b" fillOpacity={0.03} />
            <ReferenceArea y1={0.7} y2={0.9} fill="#f97316" fillOpacity={0.03} />
            <ReferenceArea y1={0.9} y2={1} fill="#ef4444" fillOpacity={0.03} />

            <XAxis 
              dataKey="time" 
              stroke="#94a3b8" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontWeight: 600 }}
              minTickGap={40}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontWeight: 600 }}
              domain={[0, 1]}
              tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
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
              dataKey="score"
              name="Ensemble Consensus"
              stroke="#2563eb"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorScore)"
              isAnimationActive={false}
            />
            
            <Line
              type="monotone"
              dataKey="iforest"
              name="iForest (Tree-based)"
              stroke="#94a3b8"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
              isAnimationActive={false}
              opacity={0.6}
            />
            
            <Line
              type="monotone"
              dataKey="lof"
              name="LOF (Density)"
              stroke="#cbd5e1"
              strokeWidth={1}
              strokeDasharray="2 2"
              dot={false}
              isAnimationActive={false}
              opacity={0.4}
            />

            <Line
              type="monotone"
              dataKey="copod"
              name="COPOD (Copula)"
              stroke="#e2e8f0"
              strokeWidth={1}
              strokeDasharray="1 1"
              dot={false}
              isAnimationActive={false}
              opacity={0.3}
            />

            <ReferenceLine 
              y={0.7} 
              stroke="#ef4444" 
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{ 
                value: 'CRITICAL THRESHOLD', 
                position: 'insideBottomRight', 
                fill: '#ef4444', 
                fontSize: 9, 
                fontWeight: 900,
                letterSpacing: '0.1em'
              }} 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Explainability Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
        {[
          { label: 'Stable', range: '0-40%', color: 'bg-emerald-500', desc: 'Process within control limits.' },
          { label: 'Warning', range: '40-70%', color: 'bg-amber-500', desc: 'Minor statistical deviation.' },
          { label: 'High Risk', range: '70-90%', color: 'bg-orange-500', desc: 'Significant process anomaly.' },
          { label: 'Critical', range: '90-100%', color: 'bg-rose-500', desc: 'Immediate action required.' },
        ].map((zone) => (
          <div key={zone.label} className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", zone.color)} />
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{zone.label}</span>
              <span className="text-[9px] font-bold text-slate-400 ml-auto">{zone.range}</span>
            </div>
            <p className="text-[9px] text-slate-400 font-medium leading-tight">{zone.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
