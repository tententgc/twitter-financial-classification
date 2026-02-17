'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Sparkles,
  ArrowRight,
  Activity,
  Quote
} from 'lucide-react';

interface SentimentResult {
  label: string;
  score: number;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<SentimentResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeSentiment = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    
    // Simulate a slight delay for smoother UI feel
    const minDelay = new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const [res] = await Promise.all([
        fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input }),
        }),
        minDelay
      ]);

      if (!res.ok) throw new Error('Failed to fetch analysis');
      const data = await res.json();
      setResult(data.flat()); 
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTheme = (label: string) => {
    switch (label?.toLowerCase()) {
      case 'positive': 
        return { 
          color: 'text-emerald-500', 
          bg: 'bg-emerald-500', 
          border: 'border-emerald-200',
          gradient: 'from-emerald-400 to-emerald-600',
          shadow: 'shadow-emerald-500/20',
          icon: TrendingUp 
        };
      case 'negative': 
        return { 
          color: 'text-rose-500', 
          bg: 'bg-rose-500', 
          border: 'border-rose-200',
          gradient: 'from-rose-400 to-rose-600',
          shadow: 'shadow-rose-500/20',
          icon: TrendingDown 
        };
      default: 
        return { 
          color: 'text-amber-500', 
          bg: 'bg-amber-500', 
          border: 'border-amber-200',
          gradient: 'from-amber-400 to-amber-600',
          shadow: 'shadow-amber-500/20',
          icon: Minus 
        };
    }
  };

  const topResult = result?.reduce((p, c) => (p.score > c.score ? p : c));
  const theme = topResult ? getTheme(topResult.label) : null;

  // Determine the color for the SVG stroke based on the theme
  const getStrokeColor = () => {
    if (!theme) return '#E2E8F0';
    if (theme.color.includes('emerald')) return '#10B981'; // emerald-500
    if (theme.color.includes('rose')) return '#F43F5E';    // rose-500
    return '#F59E0B'; // amber-500
  };

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Modern Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-purple-300/30 rounded-full blur-[120px] mix-blend-multiply animate-blob" />
         <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-300/30 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
         <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-300/30 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-4000" />
      </div>

      <div className="w-full max-w-5xl z-10 grid lg:grid-cols-2 gap-12 items-start">
        
        {/* LEFT COLUMN: Input */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8 pt-8"
        >
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm"
            >
              <Activity className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600">FinBERT Model v1.0</span>
            </motion.div>
            
            <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Decode Market <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
                Sentiment Instantly
              </span>
            </h1>
            
            <p className="text-slate-600 text-lg leading-relaxed max-w-md">
              Institutional-grade analysis for your financial news feed. Detect market signals before they trend.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-2 rounded-3xl shadow-2xl shadow-indigo-900/5 border border-white/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all duration-300">
            <div className="relative">
              <Quote className="absolute top-5 left-5 text-indigo-200 w-6 h-6" />
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste headlines, tweets, or earnings call transcripts..."
                className="w-full h-48 pl-14 pr-6 py-5 bg-transparent border-none rounded-2xl text-slate-800 text-lg placeholder:text-slate-400 focus:ring-0 resize-none leading-relaxed font-medium"
              />
            </div>
            
            <div className="flex justify-between items-center px-6 pb-4 pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {input.length} chars
              </span>
              <button
                onClick={analyzeSentiment}
                disabled={loading || !input}
                className={clsx(
                  "flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg active:scale-95",
                  loading || !input
                    ? "bg-slate-100 text-slate-400 shadow-none cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/30 hover:shadow-indigo-500/40"
                )}
              >
                {loading ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
                  </span>
                ) : (
                  <>Analyze Text <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Results */}
        <div className="relative min-h-[500px] flex items-center">
          <AnimatePresence mode="wait">
            {!result ? (
              // EMPTY STATE
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full aspect-square max-w-[400px] mx-auto flex flex-col items-center justify-center text-center p-8 border-4 border-dashed border-indigo-100 rounded-[2.5rem] bg-white/30 backdrop-blur-sm"
              >
                <div className="w-20 h-20 bg-white rounded-3xl shadow-lg shadow-indigo-100 flex items-center justify-center mb-6 transform -rotate-6">
                  <Sparkles className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-slate-900 text-xl font-bold mb-2">Ready to Analyze</h3>
                <p className="text-slate-500">
                  AI results will appear here in real-time.
                </p>
              </motion.div>
            ) : (
              // RESULT STATE
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-900/10 border border-white overflow-hidden"
              >
                {/* Header / Meter Section */}
                <div className="p-10 flex flex-col items-center relative overflow-hidden">
                  
                  {/* Background Glow based on sentiment */}
                  <div className={clsx("absolute top-0 left-0 w-full h-full opacity-10", theme?.bg)} />
                  
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 relative z-10">
                    Confidence Meter
                  </span>

                  {/* SVG GAUGE */}
                  <div className="relative w-64 h-32 mb-4">
                     {/* Background Arc */}
                     <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100">
                        <path 
                          d="M 20 100 A 80 80 0 0 1 180 100" 
                          fill="none" 
                          stroke="#F1F5F9" 
                          strokeWidth="16" 
                          strokeLinecap="round" 
                        />
                        {/* Colored Arc */}
                        <motion.path 
                          d="M 20 100 A 80 80 0 0 1 180 100" 
                          fill="none" 
                          stroke={getStrokeColor()}
                          strokeWidth="16" 
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: topResult?.score || 0 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                     </svg>
                     
                     {/* Center Text */}
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="flex flex-col items-center"
                        >
                          <span className={clsx("text-5xl font-black tracking-tighter", theme?.color)}>
                            {Math.round((topResult?.score || 0) * 100)}%
                          </span>
                          <span className={clsx("text-sm font-bold uppercase tracking-wider mt-1 px-3 py-0.5 rounded-full bg-slate-100", theme?.color)}>
                            {topResult?.label}
                          </span>
                        </motion.div>
                     </div>
                  </div>
                </div>

                {/* List Breakdown */}
                <div className="px-10 pb-10 pt-2 space-y-6 bg-white">
                  <div className="h-px w-full bg-slate-100 mb-6" />
                  
                  {result.map((item, idx) => {
                    const itemTheme = getTheme(item.label);
                    const isWinner = item.label === topResult?.label;
                    
                    return (
                      <motion.div 
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (idx * 0.1) }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className={clsx("text-sm font-bold capitalize flex items-center gap-2", isWinner ? "text-slate-800" : "text-slate-400")}>
                            <div className={clsx("p-1.5 rounded-md", isWinner ? itemTheme.bg + " bg-opacity-20" : "bg-slate-100")}>
                              <itemTheme.icon className={clsx("w-3.5 h-3.5", isWinner ? itemTheme.color : "text-slate-400")} />
                            </div>
                            {item.label}
                          </span>
                          <span className={clsx("font-mono text-sm font-semibold", isWinner ? "text-slate-800" : "text-slate-400")}>
                            {(item.score * 100).toFixed(1)}%
                          </span>
                        </div>
                        
                        {/* Bar */}
                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.score * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={clsx("h-full rounded-full shadow-sm bg-gradient-to-r", itemTheme.gradient)}
                          />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}