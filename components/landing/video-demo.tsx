"use client"

import { useInView } from "./hooks"
import { TrendingUp, BarChart3, Zap, Bell, Play, Search } from "lucide-react"

/* Animated 2D Product Demo - Pure CSS + SVG */

function AnimatedDashboard() {
    return (
        <div className="relative w-full aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] animate-mesh-1" />
            <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-violet-500/8 rounded-full blur-[80px] animate-mesh-2" />

            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-700/60 rounded-md">
                        <Search className="w-2.5 h-2.5 text-slate-500" />
                        <span className="text-[9px] text-slate-400 font-mono">app.trendpredictpro.com</span>
                    </div>
                </div>
            </div>

            {/* Dashboard content */}
            <div className="flex h-[calc(100%-36px)]">
                {/* Mini sidebar */}
                <div className="w-14 md:w-16 bg-slate-800/40 border-r border-slate-700/30 flex flex-col items-center pt-4 gap-3">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center animate-pulse" style={{ animationDuration: "3s" }}>
                        <TrendingUp className="w-3.5 h-3.5 text-white" />
                    </div>
                    {[BarChart3, Zap, Bell].map((Icon, i) => (
                        <div key={i} className="w-7 h-7 rounded-lg bg-slate-700/40 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
                            <Icon className="w-3 h-3 text-slate-400" />
                        </div>
                    ))}
                </div>

                {/* Main area */}
                <div className="flex-1 p-3 md:p-5 space-y-3 overflow-hidden">
                    {/* Animated stat cards */}
                    <div className="grid grid-cols-4 gap-2 md:gap-3">
                        {[
                            { label: "Active Trends", value: "2,847", change: "+12%", color: "from-indigo-500/20 to-indigo-500/5", border: "border-indigo-500/20", delay: "0s" },
                            { label: "Accuracy", value: "94.2%", change: "+3.1%", color: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/20", delay: "0.15s" },
                            { label: "Avg ROI", value: "3.2x", change: "+0.4x", color: "from-amber-500/20 to-amber-500/5", border: "border-amber-500/20", delay: "0.3s" },
                            { label: "Alerts", value: "18", change: "5 new", color: "from-rose-500/20 to-rose-500/5", border: "border-rose-500/20", delay: "0.45s" },
                        ].map(({ label, value, change, color, border, delay }) => (
                            <div
                                key={label}
                                className={`bg-gradient-to-b ${color} rounded-lg p-2 md:p-3 border ${border} animate-card-entrance`}
                                style={{ animationDelay: delay }}
                            >
                                <p className="text-[7px] md:text-[9px] text-slate-400 mb-1">{label}</p>
                                <p className="text-[10px] md:text-sm font-bold text-white">{value}</p>
                                <p className="text-[7px] md:text-[9px] text-emerald-400">{change}</p>
                            </div>
                        ))}
                    </div>

                    {/* Chart area */}
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                        {/* Main chart */}
                        <div className="col-span-2 bg-slate-800/30 rounded-lg p-2 md:p-3 border border-slate-700/30">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[8px] md:text-[10px] font-semibold text-slate-300">Trend Predictions</span>
                                <span className="text-[7px] md:text-[9px] text-emerald-400">Live</span>
                            </div>
                            <svg viewBox="0 0 400 100" className="w-full h-12 md:h-20">
                                <defs>
                                    <linearGradient id="chartArea" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                                    </linearGradient>
                                    <linearGradient id="chartLine" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#6366F1" />
                                        <stop offset="50%" stopColor="#8B5CF6" />
                                        <stop offset="100%" stopColor="#EC4899" />
                                    </linearGradient>
                                </defs>
                                {/* Grid lines */}
                                {[25, 50, 75].map(y => (
                                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />
                                ))}
                                {/* Area */}
                                <path d="M0,80 Q40,75 80,65 T160,50 T240,35 T320,25 T400,15 L400,100 L0,100 Z" fill="url(#chartArea)">
                                    <animate attributeName="d"
                                        values="M0,80 Q40,75 80,65 T160,50 T240,35 T320,25 T400,15 L400,100 L0,100 Z;
                                                M0,82 Q40,70 80,60 T160,55 T240,30 T320,20 T400,18 L400,100 L0,100 Z;
                                                M0,80 Q40,75 80,65 T160,50 T240,35 T320,25 T400,15 L400,100 L0,100 Z"
                                        dur="4s" repeatCount="indefinite" />
                                </path>
                                {/* Line */}
                                <path d="M0,80 Q40,75 80,65 T160,50 T240,35 T320,25 T400,15" fill="none" stroke="url(#chartLine)" strokeWidth="2" strokeLinecap="round">
                                    <animate attributeName="d"
                                        values="M0,80 Q40,75 80,65 T160,50 T240,35 T320,25 T400,15;
                                                M0,82 Q40,70 80,60 T160,55 T240,30 T320,20 T400,18;
                                                M0,80 Q40,75 80,65 T160,50 T240,35 T320,25 T400,15"
                                        dur="4s" repeatCount="indefinite" />
                                </path>
                                {/* Animated dot */}
                                <circle r="4" fill="#EC4899" filter="url(#glow)">
                                    <animateMotion dur="4s" repeatCount="indefinite" path="M0,80 Q40,75 80,65 T160,50 T240,35 T320,25 T400,15" />
                                </circle>
                                <circle r="8" fill="#EC4899" opacity="0.2">
                                    <animateMotion dur="4s" repeatCount="indefinite" path="M0,80 Q40,75 80,65 T160,50 T240,35 T320,25 T400,15" />
                                </circle>
                            </svg>
                        </div>

                        {/* Side panel - Platform breakdown */}
                        <div className="bg-slate-800/30 rounded-lg p-2 md:p-3 border border-slate-700/30">
                            <span className="text-[8px] md:text-[10px] font-semibold text-slate-300 block mb-2">Platforms</span>
                            <svg viewBox="0 0 80 80" className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-2">
                                <circle cx="40" cy="40" r="30" fill="none" stroke="#1E293B" strokeWidth="8" />
                                <circle cx="40" cy="40" r="30" fill="none" stroke="#6366F1" strokeWidth="8"
                                    strokeDasharray="75 113" strokeDashoffset="0" strokeLinecap="round"
                                    transform="rotate(-90 40 40)">
                                    <animateTransform attributeName="transform" type="rotate"
                                        from="-90 40 40" to="270 40 40" dur="2s" fill="freeze" />
                                </circle>
                                <circle cx="40" cy="40" r="30" fill="none" stroke="#EC4899" strokeWidth="8"
                                    strokeDasharray="47 141" strokeDashoffset="-75" strokeLinecap="round"
                                    transform="rotate(-90 40 40)" />
                                <circle cx="40" cy="40" r="30" fill="none" stroke="#F59E0B" strokeWidth="8"
                                    strokeDasharray="30 158" strokeDashoffset="-122" strokeLinecap="round"
                                    transform="rotate(-90 40 40)" />
                            </svg>
                            <div className="space-y-1">
                                {[
                                    { name: "YouTube", pct: "42%", color: "bg-indigo-500" },
                                    { name: "Instagram", pct: "25%", color: "bg-pink-500" },
                                    { name: "Reddit", pct: "18%", color: "bg-amber-500" },
                                ].map(({ name, pct, color }) => (
                                    <div key={name} className="flex items-center gap-1.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
                                        <span className="text-[7px] md:text-[9px] text-slate-400 flex-1">{name}</span>
                                        <span className="text-[7px] md:text-[9px] font-semibold text-slate-300">{pct}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom prediction cards */}
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                        {[
                            { title: "AI Photo Editing Tools", conf: 96, growth: "+67%", stage: "Rising", stageColor: "text-emerald-400 bg-emerald-500/10", delay: "0.6s" },
                            { title: "Budget Phones Under 15K", conf: 93, growth: "+35%", stage: "Peaking", stageColor: "text-orange-400 bg-orange-500/10", delay: "0.75s" },
                            { title: "5AM Study Routines", conf: 94, growth: "+45%", stage: "Rising", stageColor: "text-emerald-400 bg-emerald-500/10", delay: "0.9s" },
                        ].map(({ title, conf, growth, stage, stageColor, delay }) => (
                            <div
                                key={title}
                                className="bg-slate-800/30 rounded-lg p-2 md:p-3 border border-slate-700/30 animate-card-entrance"
                                style={{ animationDelay: delay }}
                            >
                                <div className="flex items-start justify-between mb-1">
                                    <span className="text-[7px] md:text-[10px] font-semibold text-slate-200 leading-tight line-clamp-1">{title}</span>
                                    <span className={`text-[6px] md:text-[8px] px-1.5 py-0.5 rounded-full font-semibold ${stageColor}`}>{stage}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1 md:mt-2">
                                    <div className="flex items-center gap-1">
                                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-indigo-500 flex items-center justify-center">
                                            <span className="text-[6px] md:text-[8px] font-bold text-indigo-400">{conf}</span>
                                        </div>
                                    </div>
                                    <span className="text-[7px] md:text-[9px] font-semibold text-emerald-400">{growth}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scanning line animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent animate-scan-line" />
            </div>
        </div>
    )
}

export function VideoDemo() {
    const { ref, inView } = useInView()

    return (
        <section ref={ref} className="py-20 md:py-28 px-4 bg-muted/20">
            <div className={`max-w-5xl mx-auto transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="text-center mb-10">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">See It In Action</p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Your dashboard, powered by AI</h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">Real-time trend predictions, multi-platform analytics, and actionable insights — all in one place.</p>
                </div>

                {/* Animated dashboard demo */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/30">
                    <AnimatedDashboard />
                </div>

                {/* Feature highlights below */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                    {[
                        { icon: TrendingUp, label: "Live Predictions", desc: "AI analyzes trends in real-time" },
                        { icon: BarChart3, label: "Multi-Platform", desc: "YouTube, Instagram & Reddit" },
                        { icon: Zap, label: "Instant Alerts", desc: "Get notified before trends peak" },
                    ].map(({ icon: Icon, label, desc }) => (
                        <div key={label} className="text-center p-4 rounded-xl bg-card border border-border/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <p className="text-sm font-semibold text-foreground">{label}</p>
                            <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
