import React, { useState, useEffect, useCallback } from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Bell, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  User, 
  LogOut, 
  HelpCircle,
  TrendingUp,
  AlertCircle,
  Database,
  Cpu,
  RefreshCw,
  Zap,
  ShieldCheck,
  ZapOff,
  History,
  Clock,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { ParameterCard } from './ParameterCard';
import { AnomalyChart } from './AnomalyChart';
import { AlertFeed } from './AlertFeed';
import { ModelStatus } from './ModelStatus';
import { IncidentsPage } from './IncidentsPage';
import { AIEnginePage } from './AIEnginePage';
import { ArchivePage } from './ArchivePage';
import { useAnomalyStream } from '../hooks/useAnomalyStream';
import { useAlerts } from '../hooks/useAlerts';
import { PARAMETERS } from '../../server/ingest/ingest';
import { getLatestPrediction } from '../api/client';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showHelp, setShowHelp] = useState(false);
  const { latest, history, connected, error } = useAnomalyStream();
  const { alerts, loading: alertsLoading, acknowledgeAlert } = useAlerts();
  const [snapshot, setSnapshot] = useState<any>(null);
  const [snapshotLoading, setSnapshotLoading] = useState(false);

  const [lastSnapshotTime, setLastSnapshotTime] = useState<Date | null>(null);

  const fetchSnapshot = useCallback(async () => {
    setSnapshotLoading(true);
    try {
      const res = await getLatestPrediction();
      setSnapshot(res.data);
      setLastSnapshotTime(new Date());
    } catch (err) {
      console.error('Fetch Snapshot Error:', err);
    } finally {
      setSnapshotLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'overview') {
      fetchSnapshot();
      const interval = setInterval(fetchSnapshot, 15000); // Complementary refresh
      return () => clearInterval(interval);
    }
  }, [activeTab, fetchSnapshot]);

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-rose-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-amber-600';
      default: return 'text-emerald-600';
    }
  };

  const getSeverityBg = (sev: string) => {
    switch (sev) {
      case 'critical': return 'bg-red-50 border-red-100';
      case 'high': return 'bg-rose-50 border-rose-100';
      case 'medium': return 'bg-orange-50 border-orange-100';
      case 'low': return 'bg-amber-50 border-amber-100';
      default: return 'bg-emerald-50 border-emerald-100';
    }
  };

  const displayData = latest || snapshot;

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 font-sans flex overflow-hidden noise-bg">
      <div className="absolute inset-0 mesh-bg opacity-30 pointer-events-none" />

      {/* Detached Floating Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: sidebarCollapsed ? 88 : 280,
          x: 20,
          y: 20,
          height: 'calc(100vh - 40px)'
        }}
        className="fixed left-0 top-0 glass rounded-[2.5rem] flex flex-col z-[60] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border-white/5 overflow-hidden"
      >
        <div className="p-6 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter text-white">PetroGuard<span className="text-blue-400">AI</span></span>
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-500 hover:text-white"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
            { id: 'monitor', icon: Activity, label: 'Live Monitor' },
            { id: 'alerts', icon: Bell, label: 'Incidents', count: Array.isArray(alerts) ? alerts.length : 0 },
            { id: 'model', icon: Cpu, label: 'AI Engine' },
            { id: 'history', icon: Database, label: 'Archive' },
          ].map((item, idx) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 group relative",
                activeTab === item.id 
                  ? "bg-blue-600/10 text-blue-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5" 
                  : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform duration-300", activeTab === item.id ? "text-blue-400 scale-110" : "text-slate-600 group-hover:text-slate-200 group-hover:scale-110")} />
              {!sidebarCollapsed && (
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
              )}
              {!sidebarCollapsed && item.count !== undefined && item.count > 0 && (
                <span className="ml-auto bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-rose-500/20">
                  {item.count}
                </span>
              )}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-2xl">
                  {item.label}
                </div>
              )}
            </motion.button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
          <div className={cn(
            "p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3",
            sidebarCollapsed ? "justify-center" : ""
          )}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black text-xs shadow-inner">
              HP
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-white truncate">Harry Patria</p>
                <p className="text-[10px] font-bold text-slate-500 truncate">System Admin</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 flex flex-col h-screen overflow-hidden relative transition-all duration-500",
        sidebarCollapsed ? "ml-[108px]" : "ml-[300px]"
      )}>
        {/* Floating Help Widget */}
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
          <AnimatePresence>
            {showHelp && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] border border-slate-100 p-8 w-[360px] mb-2 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/30 relative">
                    <Sparkles className="w-7 h-7 text-white" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white" />
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-900 tracking-tight">PetroGuard Assistant</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">AI Expert Online</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-600 leading-relaxed">
                      "I've analyzed the latest Reactor 04 telemetry. There's a 92% probability of seal degradation based on the current vibration-pressure correlation."
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all">
                      View Analysis
                    </button>
                    <button className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all">
                      Dismiss
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quick Actions</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-900 hover:border-blue-600 transition-all text-left">
                      Technical Docs
                    </button>
                    <button className="p-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-900 hover:border-blue-600 transition-all text-left">
                      Contact Support
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className="w-16 h-16 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-slate-900/40 hover:scale-110 active:scale-95 transition-all group relative"
          >
            {showHelp ? <Zap className="w-7 h-7" /> : <HelpCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />}
            {!showHelp && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-rose-500 rounded-full border-4 border-white flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                1
              </span>
            )}
          </button>
        </div>

        {/* Header */}
        <header className="h-20 glass mx-8 mt-6 rounded-[2rem] px-8 flex items-center justify-between z-40 border-white/5 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search telemetry..." 
                className="pl-10 pr-4 py-2.5 bg-slate-900/40 border border-white/5 rounded-2xl text-sm font-medium w-64 focus:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-900/60 transition-all text-white placeholder:text-slate-600"
              />
            </div>
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-900/40 rounded-2xl border border-white/5">
              <div className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                connected ? "bg-emerald-500" : "bg-rose-500"
              )} />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {connected ? "Stream Active" : "Offline"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="p-2.5 hover:bg-white/10 rounded-2xl transition-all duration-300 text-slate-400 hover:text-white relative active:scale-95">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-900 shadow-sm" />
              </button>
              <div className="absolute top-full mt-3 right-0 w-64 bg-white rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] border border-slate-100 p-4 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Recent Notifications</p>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-rose-500 shrink-0" />
                    <p className="text-xs font-bold text-slate-600 leading-tight">Critical pressure anomaly detected in Reactor 04</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <p className="text-xs font-bold text-slate-600 leading-tight">System backup completed successfully</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all duration-300 text-slate-400 hover:text-slate-900 active:scale-95">
                <HelpCircle className="w-5 h-5" />
              </button>
              <div className="absolute top-full mt-3 right-0 w-48 bg-slate-900 text-white rounded-xl shadow-2xl p-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">Documentation</p>
                <p className="text-[9px] font-medium text-slate-400 leading-relaxed">Access the full PetroGuard AI technical manual and support docs.</p>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-slate-200 mx-2" />
            <button 
              onClick={onLogout}
              className="p-2.5 hover:bg-rose-50 rounded-2xl transition-colors text-slate-400 hover:text-rose-600 group relative"
            >
              <LogOut className="w-5 h-5" />
              <div className="absolute top-full mt-2 right-0 px-3 py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-2xl uppercase tracking-widest">
                Terminate Session
              </div>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2" />
            <button className="flex items-center gap-2 pl-2 pr-4 py-2 hover:bg-slate-100 rounded-2xl transition-colors group">
              <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors">Admin</span>
            </button>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1600px] mx-auto p-8 pt-4 space-y-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-400 shadow-sm glass"
              >
                <ZapOff className="w-5 h-5" />
                <p className="text-sm font-bold">{error}</p>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Status Banner */}
                    <div className={cn(
                      "lg:col-span-2 p-10 rounded-[3rem] border flex items-center justify-between shadow-2xl transition-all duration-700 relative overflow-hidden glass",
                      displayData ? (displayData.is_anomaly ? "border-rose-500/20" : "border-emerald-500/20") : "border-white/5"
                    )}>
                      <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-3 rounded-2xl", 
                            displayData?.is_anomaly ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"
                          )}>
                            {displayData?.is_anomaly ? <AlertCircle className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">System Integrity Status</span>
                        </div>
                        <div>
                          <h2 className="text-5xl font-black text-white tracking-tighter">
                            {displayData ? (displayData.is_anomaly ? "Anomaly Detected" : "System Balanced") : "Synthesizing..."}
                          </h2>
                          <p className={cn("text-sm font-bold mt-2", displayData ? getSeverityColor(displayData.severity) : "text-slate-500")}>
                            {displayData ? `Global Severity: ${displayData.severity.toUpperCase()}` : "Mapping process manifold..."}
                          </p>
                        </div>
                      </div>
                      <div className="text-right relative z-10">
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest block mb-1">Ensemble Confidence</span>
                        <p className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 tracking-tighter">
                          {displayData ? (displayData.ensemble_score * 100).toFixed(1) : "0.0"}%
                        </p>
                      </div>
                      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
                    </div>

                    {/* Quick Stats */}
                    <div className="glass p-10 rounded-[3rem] shadow-2xl flex flex-col justify-center space-y-8 border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Active Alerts</p>
                          <p className="text-4xl font-black text-white">{alerts.length}</p>
                        </div>
                        <div className="w-14 h-14 bg-rose-500/10 rounded-3xl flex items-center justify-center text-rose-500 shadow-inner">
                          <Bell className="w-7 h-7" />
                        </div>
                      </div>
                      <div className="h-[1px] bg-white/5" />
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Sync Manifold</p>
                          <div className="flex items-center gap-2">
                            <p className="text-2xl font-black text-white">
                              {lastSnapshotTime ? format(lastSnapshotTime, 'HH:mm:ss') : 'LIVE'}
                            </p>
                            {snapshotLoading && <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />}
                          </div>
                        </div>
                        <button 
                          onClick={fetchSnapshot}
                          className="w-14 h-14 bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-all shadow-inner group active:scale-90"
                        >
                          <RefreshCw className={cn("w-7 h-7 transition-transform duration-700", snapshotLoading && "animate-spin", !snapshotLoading && "group-hover:rotate-180")} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 space-y-8">
                      <div className="glass p-10 rounded-[3rem] shadow-2xl border-white/5">
                        <div className="flex items-center justify-between mb-10">
                          <div className="space-y-1">
                            <h3 className="text-xl font-black text-white tracking-tight">Anomaly Vector History</h3>
                            <p className="text-xs font-bold text-slate-500">Real-time manifold prediction trend • Last 200 samples</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-2xl text-[10px] font-black text-blue-400 uppercase tracking-widest border border-blue-500/20">
                              <Zap className="w-3.5 h-3.5 fill-current" /> Live Manifold
                            </span>
                          </div>
                        </div>
                        <AnomalyChart history={history} />
                      </div>

                      <div className="space-y-8">
                        <div className="flex items-center justify-between px-4">
                          <div className="flex items-center gap-4">
                            <h3 className="text-xl font-black text-white tracking-tight">Process Manifolds</h3>
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/5">
                              <Clock className="w-3.5 h-3.5" /> {snapshotLoading ? "Syncing..." : "Latest Telemetry"}
                            </div>
                          </div>
                          <button className="text-[11px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors">Grid Config</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                          {displayData ? (
                            Object.entries(displayData.parameters).map(([name, res]: [string, any]) => (
                              <ParameterCard
                                key={name}
                                name={name}
                                value={res.value}
                                unit={PARAMETERS.find(p => p.name === name)?.unit || ''}
                                anomalyScore={res.anomaly_score}
                                severity={displayData.severity}
                                iforestScore={displayData.iforest_score}
                                lofScore={displayData.lof_score}
                                copodScore={displayData.copod_score}
                                description={PARAMETERS.find(p => p.name === name)?.desc}
                              />
                            ))
                          ) : (
                            Array.from({ length: 6 }).map((_, i) => (
                              <div key={i} className="h-64 glass rounded-[2.5rem] animate-pulse border-white/5" />
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <AlertFeed 
                        alerts={alerts} 
                        onAcknowledge={acknowledgeAlert} 
                        loading={alertsLoading} 
                      />
                      <ModelStatus />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'monitor' && (
                <motion.div
                  key="monitor"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden relative min-h-[600px] flex flex-col items-center justify-center text-center">
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#3b82f6,transparent_70%)]" />
                      <div className="grid grid-cols-20 gap-4 p-8">
                        {Array.from({ length: 200 }).map((_, i) => (
                          <div key={i} className="h-1 bg-slate-900/10 rounded-full" style={{ width: `${Math.random() * 100}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="relative z-10 space-y-6 max-w-2xl">
                      <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-blue-600/50 animate-pulse">
                        <Activity className="w-12 h-12 text-white" />
                      </div>
                      <h2 className="text-5xl font-black tracking-tighter text-slate-900">Advanced Process Monitoring</h2>
                      <p className="text-slate-400 font-medium text-lg leading-relaxed">
                        Visualizing high-frequency sensor data with sub-millisecond latency. 
                        Our neural network is currently analyzing 42 unique process streams.
                      </p>
                      <div className="flex items-center justify-center gap-8 pt-8">
                        <div className="text-center">
                          <p className="text-4xl font-black text-blue-600">1.2ms</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">Latency</p>
                        </div>
                        <div className="w-[1px] h-12 bg-slate-200" />
                        <div className="text-center">
                          <p className="text-4xl font-black text-emerald-600">99.9%</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">Accuracy</p>
                        </div>
                        <div className="w-[1px] h-12 bg-slate-200" />
                        <div className="text-center">
                          <p className="text-4xl font-black text-amber-600">15k</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">Ops/Sec</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'alerts' && (
                <IncidentsPage alerts={alerts} onAcknowledge={acknowledgeAlert} />
              )}

              {activeTab === 'model' && (
                <AIEnginePage />
              )}

              {activeTab === 'history' && (
                <ArchivePage />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
