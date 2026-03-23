"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Instagram, Heart, Monitor, GraduationCap, Film, UtensilsCrossed,
    TrendingUp, Clock, Sparkles, Users, Hash, Flame, Zap,
    ArrowUpRight, Eye, BarChart3, RefreshCw, Lightbulb,
    Music, Target, Layers,
} from "lucide-react"

const DOMAINS = [
    { id: "tech", label: "Tech", icon: Monitor, color: "from-blue-500 to-cyan-600", bg: "bg-blue-50", text: "text-blue-600", ring: "ring-blue-200", gradient: "from-blue-400/20 via-cyan-400/10 to-indigo-400/20" },
    { id: "education", label: "Education", icon: GraduationCap, color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50", text: "text-emerald-600", ring: "ring-emerald-200", gradient: "from-emerald-400/20 via-teal-400/10 to-green-400/20" },
    { id: "entertainment", label: "Entertainment", icon: Film, color: "from-purple-500 to-violet-600", bg: "bg-purple-50", text: "text-purple-600", ring: "ring-purple-200", gradient: "from-purple-400/20 via-violet-400/10 to-fuchsia-400/20" },
    { id: "food", label: "Food", icon: UtensilsCrossed, color: "from-amber-500 to-orange-600", bg: "bg-amber-50", text: "text-amber-600", ring: "ring-amber-200", gradient: "from-amber-400/20 via-orange-400/10 to-yellow-400/20" },
] as const

interface InstagramTrend {
    id: number
    trendTitle: string
    description: string
    hashtags: string[]
    estimatedReach: string
    engagementRate: number
    contentType: string
    bestPostingTime: string
    trendStage: string
    confidence: number
    growthRate: number
    targetAudience: string
    contentTips: string[]
    viralPotential: string
    audioTrend: string
    competitors: number
    saturationLevel: string
}

// ━━━ Component ━━━

function TrendStageBadge({ stage }: { stage: string }) {
    const config: Record<string, { bg: string; text: string; dot: string }> = {
        Emerging: { bg: "bg-blue-100 border-blue-200", text: "text-blue-700", dot: "bg-blue-500" },
        Rising: { bg: "bg-green-100 border-green-200", text: "text-green-700", dot: "bg-green-500" },
        Peaking: { bg: "bg-orange-100 border-orange-200", text: "text-orange-700", dot: "bg-orange-500" },
        Established: { bg: "bg-purple-100 border-purple-200", text: "text-purple-700", dot: "bg-purple-500" },
    }
    const c = config[stage] || config.Emerging

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${c.bg} ${c.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />
            {stage}
        </span>
    )
}

function ViralIndicator({ potential }: { potential: string }) {
    const config: Record<string, { color: string; icon: React.ElementType; bars: number }> = {
        Explosive: { color: "text-red-500", icon: Flame, bars: 4 },
        High: { color: "text-orange-500", icon: Zap, bars: 3 },
        Medium: { color: "text-yellow-500", icon: TrendingUp, bars: 2 },
        Low: { color: "text-gray-400", icon: BarChart3, bars: 1 },
    }
    const c = config[potential] || config.Medium
    const Icon = c.icon

    return (
        <div className="flex items-center gap-1.5">
            <Icon className={`w-3.5 h-3.5 ${c.color}`} />
            <div className="flex gap-0.5">
                {[1, 2, 3, 4].map(i => (
                    <div
                        key={i}
                        className={`w-1 rounded-full transition-all ${i <= c.bars ? c.color.replace("text-", "bg-") : "bg-gray-200"}`}
                        style={{ height: `${8 + i * 3}px` }}
                    />
                ))}
            </div>
            <span className={`text-[10px] font-semibold ${c.color}`}>{potential}</span>
        </div>
    )
}

function SkeletonCard() {
    return (
        <Card className="p-5 animate-pulse space-y-4">
            <div className="flex justify-between">
                <div className="h-5 bg-muted rounded w-40" />
                <div className="h-5 bg-muted rounded w-16" />
            </div>
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-3 bg-muted rounded w-3/4" />
            <div className="flex gap-2">
                <div className="h-6 bg-muted rounded-full w-20" />
                <div className="h-6 bg-muted rounded-full w-20" />
                <div className="h-6 bg-muted rounded-full w-20" />
            </div>
            <div className="flex gap-3">
                <div className="h-14 bg-muted rounded-xl flex-1" />
                <div className="h-14 bg-muted rounded-xl flex-1" />
                <div className="h-14 bg-muted rounded-xl flex-1" />
            </div>
        </Card>
    )
}

function SaturationMeter({ level }: { level: string }) {
    const fill = level === "Low" ? 25 : level === "Medium" ? 55 : 85
    const color = level === "Low" ? "from-green-400 to-emerald-500" : level === "Medium" ? "from-yellow-400 to-amber-500" : "from-red-400 to-rose-500"

    return (
        <div className="space-y-1">
            <div className="flex justify-between text-[10px]">
                <span className="text-muted-foreground">Saturation</span>
                <span className="font-semibold">{level}</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full bg-gradient-to-r ${color} animate-fill-bar`}
                    style={{ "--fill-width": `${fill}%` } as React.CSSProperties}
                />
            </div>
        </div>
    )
}

export function InstagramTrends() {
    const [domain, setDomain] = useState("tech")
    const [trends, setTrends] = useState<InstagramTrend[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [source, setSource] = useState<string>("AI")

    const fetchTrends = useCallback(async (d: string) => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`/api/instagram-trends?domain=${d}`)
            const data = await res.json()
            if (data.success && data.trends && data.trends.length > 0) {
                setTrends(data.trends)
                setSource(data.source || "AI")
            } else {
                setTrends([])
                setError("No trends generated for this domain.")
            }
        } catch {
            setTrends([])
            setError("Failed to connect to trend engine.")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchTrends(domain)
    }, [domain, fetchTrends])

    const activeDomain = DOMAINS.find(d => d.id === domain)!

    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="mb-8 animate-fade-in">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-orange-500 shadow-lg shadow-purple-200">
                        <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Instagram Trends</h1>
                        <p className="text-muted-foreground text-sm mt-0.5">AI-predicted trending content across 4 domains</p>
                    </div>
                </div>
            </div>

            {/* Domain Tabs */}
            <Tabs value={domain} onValueChange={setDomain} className="mb-8">
                <TabsList className="h-auto p-1.5 bg-muted/60 rounded-2xl flex-wrap gap-1">
                    {DOMAINS.map((d, i) => {
                        const Icon = d.icon
                        const isActive = domain === d.id
                        return (
                            <TabsTrigger
                                key={d.id}
                                value={d.id}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 data-[state=active]:shadow-md ${isActive
                                    ? `bg-gradient-to-r ${d.color} text-white shadow-lg`
                                    : "hover:bg-white/80"
                                    }`}
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{d.label}</span>
                            </TabsTrigger>
                        )
                    })}
                </TabsList>
            </Tabs>

            {/* Domain Hero Banner */}
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${activeDomain.color} p-6 md:p-8 mb-8 animate-fade-in`}>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-40 h-40 rounded-full bg-white/20 blur-3xl animate-mesh-1" />
                    <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-white/20 blur-3xl animate-mesh-2" />
                </div>
                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            {(() => { const Icon = activeDomain.icon; return <Icon className="w-5 h-5 text-white/80" /> })()}
                            <span className="text-white/80 text-sm font-medium uppercase tracking-wider">{activeDomain.label} Domain</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Instagram {activeDomain.label} Trends
                        </h2>
                        <p className="text-white/70 text-sm max-w-lg flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4" />
                            {trends.length > 0
                                ? `${trends.length} AI-predicted trends based on live signals • Source: ${source}`
                                : "Generating predictions with AI..."}
                        </p>
                    </div>
                    <button
                        onClick={() => fetchTrends(domain)}
                        disabled={loading}
                        className="p-3 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm disabled:opacity-50"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-fade-in">
                    <p className="font-medium">⚠️ {error}</p>
                    <button onClick={() => fetchTrends(domain)} className="mt-2 text-red-600 underline text-xs">Try again</button>
                </div>
            )}

            {/* Loading Skeletons */}
            {loading && (
                <div className="space-y-5">
                    {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            )}

            {/* Trends List */}
            {!loading && trends.length > 0 && (
                <div className="space-y-5">
                    {trends.map((trend, idx) => (
                        <Card
                            key={trend.id || idx}
                            className="group overflow-hidden border border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 animate-fade-in"
                            style={{ animationDelay: `${idx * 60}ms` }}
                        >
                            {/* Top accent bar */}
                            <div className={`h-1 bg-gradient-to-r ${activeDomain.color}`} />

                            <div className="p-5 md:p-6">
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                                {trend.trendTitle}
                                            </h3>
                                            <TrendStageBadge stage={trend.trendStage} />
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {trend.description}
                                        </p>
                                    </div>

                                    {/* Confidence Circle */}
                                    <div className="flex flex-col items-center gap-1 shrink-0">
                                        <div className="relative w-14 h-14">
                                            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 56 56">
                                                <circle cx="28" cy="28" r="24" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                                                <circle
                                                    cx="28" cy="28" r="24" fill="none"
                                                    stroke={trend.confidence >= 80 ? "#10B981" : trend.confidence >= 60 ? "#F59E0B" : "#EF4444"}
                                                    strokeWidth="4" strokeLinecap="round"
                                                    strokeDasharray={`${2 * Math.PI * 24}`}
                                                    strokeDashoffset={`${2 * Math.PI * 24 * (1 - trend.confidence / 100)}`}
                                                    className="transition-all duration-1000"
                                                />
                                            </svg>
                                            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">{trend.confidence}</span>
                                        </div>
                                        <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Confidence</span>
                                    </div>
                                </div>

                                {/* Hashtags */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {trend.hashtags?.map((tag, i) => (
                                        <span
                                            key={i}
                                            className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${activeDomain.bg} ${activeDomain.text} border ${activeDomain.ring}`}
                                        >
                                            <Hash className="w-2.5 h-2.5" />
                                            {tag.replace("#", "")}
                                        </span>
                                    ))}
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                                    <div className={`p-3 rounded-xl ${activeDomain.bg} border ${activeDomain.ring}`}>
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Eye className={`w-3.5 h-3.5 ${activeDomain.text}`} />
                                            <span className="text-[10px] text-muted-foreground">Est. Reach</span>
                                        </div>
                                        <p className="text-sm font-bold text-foreground">{trend.estimatedReach}</p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${activeDomain.bg} border ${activeDomain.ring}`}>
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Heart className={`w-3.5 h-3.5 ${activeDomain.text}`} />
                                            <span className="text-[10px] text-muted-foreground">Engagement</span>
                                        </div>
                                        <p className="text-sm font-bold text-foreground">{trend.engagementRate}%</p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${activeDomain.bg} border ${activeDomain.ring}`}>
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <ArrowUpRight className={`w-3.5 h-3.5 ${activeDomain.text}`} />
                                            <span className="text-[10px] text-muted-foreground">Growth</span>
                                        </div>
                                        <p className="text-sm font-bold text-green-600">+{trend.growthRate}%</p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${activeDomain.bg} border ${activeDomain.ring}`}>
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Users className={`w-3.5 h-3.5 ${activeDomain.text}`} />
                                            <span className="text-[10px] text-muted-foreground">Competitors</span>
                                        </div>
                                        <p className="text-sm font-bold text-foreground">{trend.competitors?.toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Info Row */}
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <Badge variant="outline" className="gap-1 text-[10px] h-6">
                                        <Layers className="w-3 h-3" />
                                        {trend.contentType}
                                    </Badge>
                                    <Badge variant="outline" className="gap-1 text-[10px] h-6">
                                        <Clock className="w-3 h-3" />
                                        {trend.bestPostingTime}
                                    </Badge>
                                    <Badge variant="outline" className="gap-1 text-[10px] h-6">
                                        <Target className="w-3 h-3" />
                                        {trend.targetAudience}
                                    </Badge>
                                    {trend.audioTrend && trend.audioTrend !== "Original Audio" && (
                                        <Badge variant="outline" className="gap-1 text-[10px] h-6">
                                            <Music className="w-3 h-3" />
                                            {trend.audioTrend}
                                        </Badge>
                                    )}
                                </div>

                                {/* Bottom Row: Viral Potential + Saturation + Tips */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="p-3 bg-muted/50 rounded-xl border border-border">
                                        <p className="text-[10px] text-muted-foreground mb-1.5 uppercase tracking-wider font-medium">Viral Potential</p>
                                        <ViralIndicator potential={trend.viralPotential} />
                                    </div>

                                    <div className="p-3 bg-muted/50 rounded-xl border border-border">
                                        <SaturationMeter level={trend.saturationLevel} />
                                    </div>

                                    <div className="p-3 bg-muted/50 rounded-xl border border-border">
                                        <div className="flex items-center gap-1 mb-1.5">
                                            <Lightbulb className="w-3 h-3 text-amber-500" />
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Top Tip</p>
                                        </div>
                                        <p className="text-[11px] text-foreground/80 leading-relaxed line-clamp-2">
                                            {trend.contentTips?.[0] || "Create authentic, relatable content"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Empty state */}
            {!loading && !error && trends.length === 0 && (
                <div className="text-center py-20 animate-fade-in">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${activeDomain.color} mx-auto mb-4 flex items-center justify-center`}>
                        <Instagram className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No trends generated</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                        AI is having trouble generating {activeDomain.label} trends right now.
                    </p>
                    <button
                        onClick={() => fetchTrends(domain)}
                        className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${activeDomain.color} text-white font-medium text-sm hover:shadow-lg transition-all`}
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Disclaimer */}
            {!loading && trends.length > 0 && (
                <div className="mt-8 p-4 bg-muted/40 rounded-xl border border-border text-center animate-fade-in">
                    <p className="text-[11px] text-muted-foreground flex items-center justify-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Predictions generated by AI based on real social sentiment — for prototype & research purposes only
                    </p>
                </div>
            )}
        </div>
    )
}
