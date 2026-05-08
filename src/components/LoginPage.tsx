import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, ArrowRight, ShieldAlert, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      if (username === 'masterclass' && password === 'agentic26') {
        onLogin();
      } else {
        setError('UNAUTHORIZED_ACCESS_VECTOR_DENIED');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] flex items-center justify-center p-8 relative overflow-hidden font-sans noise-bg">
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[480px] relative z-10"
      >
        <div className="glass p-16 rounded-[4rem] border border-white/5 shadow-[0_64px_128px_-12px_rgba(0,0,0,0.5)] space-y-12">
          <div className="space-y-8 text-center sm:text-left">
            <div className="w-16 h-16 bg-blue-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20 mx-auto sm:mx-0 border border-white/10">
              <ShieldAlert className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-black text-white tracking-tighter leading-none uppercase">Neural Access</h1>
              <p className="text-[11px] font-black text-slate-500 leading-relaxed uppercase tracking-[0.2em]">
                SYNCHRONIZE CREDENTIALS TO INITIALIZE <span className="text-blue-400 font-black">PETROGUARD V4.0</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Identity Vector</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 glass border-white/5 rounded-2xl text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder:text-slate-800 transition-all shadow-inner"
                    placeholder="USERNAME"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Security Manifold</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 glass border-white/5 rounded-2xl text-xs font-black tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder:text-slate-800 transition-all shadow-inner"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 p-5 bg-rose-500/10 rounded-2xl border border-rose-500/20 shadow-inner"
              >
                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                <p className="text-[10px] font-black text-rose-400 leading-tight uppercase tracking-widest">{error}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-6 bg-white text-slate-900 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-blue-400 active:scale-[0.98] transition-all shadow-2xl",
                isLoading && "opacity-70 cursor-not-allowed bg-slate-800"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              ) : (
                <>
                  INITIALIZE SYNC
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <footer className="pt-10 border-t border-white/5 flex items-center justify-between">
            <div className="space-y-1 text-left">
              <p className="text-[10px] font-black text-white uppercase tracking-[0.2em] leading-none">Patria & Co.</p>
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Global Intelligence</p>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-white/5 border border-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/5 border border-white/10" />
            </div>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};
