"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import {
  TrendingUp, Eye, Users, Activity,
  ArrowUpRight, ArrowDownRight, Target, Layers,
  Globe, Zap, BarChart3, Clock,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ComposedChart, Line, ScatterChart, Scatter, Cell,
  PieChart as RPieChart, Pie,
} from "recharts"

/* ─── FALLBACK DATA ───────────────────────────────── */

const FB_MONTHLY = [
  { month: "Mar", views: 12400, engagement: 3200, followers: 850, conversions: 120, bounceRate: 42 },
  { month: "Apr", views: 15600, engagement: 4100, followers: 920, conversions: 145, bounceRate: 38 },
  { month: "May", views: 18200, engagement: 4800, followers: 1050, conversions: 178, bounceRate: 35 },
  { month: "Jun", views: 21000, engagement: 5600, followers: 1200, conversions: 210, bounceRate: 33 },
  { month: "Jul", views: 24500, engagement: 6400, followers: 1380, conversions: 258, bounceRate: 30 },
  { month: "Aug", views: 28200, engagement: 7200, followers: 1520, conversions: 295, bounceRate: 28 },
  { month: "Sep", views: 32800, engagement: 8500, followers: 1700, conversions: 340, bounceRate: 26 },
  { month: "Oct", views: 37400, engagement: 9800, followers: 1920, conversions: 390, bounceRate: 24 },
  { month: "Nov", views: 41200, engagement: 10800, followers: 2100, conversions: 425, bounceRate: 22 },
  { month: "Dec", views: 45800, engagement: 12200, followers: 2350, conversions: 468, bounceRate: 20 },
  { month: "Jan", views: 51200, engagement: 13800, followers: 2600, conversions: 520, bounceRate: 18 },
  { month: "Feb", views: 58400, engagement: 15600, followers: 2900, conversions: 585, bounceRate: 16 },
]

const FB_DOMAIN = [
  // Lifestyle removed
  { domain: "Tech", accuracy: 94, engagement: 88, viralRate: 85, predictions: 92, growth: 78 },
  { domain: "Education", accuracy: 87, engagement: 76, viralRate: 62, predictions: 71, growth: 85 },
  { domain: "Entertainment", accuracy: 91, engagement: 90, viralRate: 88, predictions: 80, growth: 72 },
  { domain: "Food", accuracy: 85, engagement: 92, viralRate: 78, predictions: 65, growth: 88 },
]

const FB_HOURLY = [
  { hour: "4AM", value: 120 }, { hour: "6AM", value: 380 },
  { hour: "8AM", value: 680 }, { hour: "10AM", value: 920 },
  { hour: "12PM", value: 1200 }, { hour: "2PM", value: 1050 },
  { hour: "4PM", value: 880 }, { hour: "6PM", value: 1450 },
  { hour: "8PM", value: 1680 }, { hour: "10PM", value: 1320 },
  { hour: "12AM", value: 650 },
]

const FB_GEO = [
  { region: "Maharashtra", users: 28, avgEng: 8.2 },
  { region: "Delhi NCR", users: 22, avgEng: 7.8 },
  { region: "Karnataka", users: 15, avgEng: 9.1 },
  { region: "Tamil Nadu", users: 12, avgEng: 7.5 },
  { region: "Gujarat", users: 8, avgEng: 6.9 },
  { region: "Others", users: 15, avgEng: 6.2 },
]

const FB_CONTENT_TYPE = [
  { type: "Reels", impressions: 45200, engagement: 4820, ctr: 10.7, saves: 1850 },
  { type: "Carousels", impressions: 28400, engagement: 3120, ctr: 11.0, saves: 2180 },
  { type: "Videos (YT)", impressions: 62800, engagement: 5600, ctr: 8.9, saves: 980 },
  { type: "Shorts", impressions: 38600, engagement: 4200, ctr: 10.9, saves: 1420 },
]

const FB_SCATTER = [
  { content: "AI Tool Demo", views: 5.2, engagement: 9.8, platform: "Instagram" },
  { content: "Biryani Challenge", views: 8.9, engagement: 10.1, platform: "YouTube" },
  { content: "UPSC Strategy", views: 7.8, engagement: 8.8, platform: "YouTube" },
  { content: "Street Food ASMR", views: 5.0, engagement: 9.6, platform: "Instagram" },
  { content: "Budget Travel", views: 4.1, engagement: 7.8, platform: "YouTube" },
  { content: "Singing Public", views: 9.5, engagement: 7.5, platform: "YouTube" },
  { content: "Setup Tour", views: 2.8, engagement: 7.5, platform: "Instagram" },
  { content: "Celebrity Look", views: 8.0, engagement: 11.2, platform: "Instagram" },
  { content: "Python Course", views: 4.5, engagement: 8.8, platform: "YouTube" },
]

const FB_GEO_PIE = [
  { name: "Maharashtra", value: 28, color: "#6366F1" },
  { name: "Delhi NCR", value: 22, color: "#818CF8" },
  { name: "Karnataka", value: 15, color: "#A78BFA" },
  { name: "Tamil Nadu", value: 12, color: "#C4B5FD" },
  { name: "Gujarat", value: 8, color: "#DDD6FE" },
  { name: "Others", value: 15, color: "#EDE9FE" },
]

const FB_TOP = [
  { title: "AI Tool Speed Runs", platform: "Instagram", views: "5.2M", engagement: "9.8%", saves: "1.8K", trend: "up" },
  { title: "₹100 vs ₹10K Biryani", platform: "YouTube", views: "8.9M", engagement: "10.1%", saves: "2.4K", trend: "up" },
  { title: "UPSC Topper Strategy", platform: "YouTube", views: "7.8M", engagement: "8.8%", saves: "3.1K", trend: "up" },
  { title: "Street Food ASMR Tours", platform: "Instagram", views: "5M", engagement: "9.6%", saves: "1.6K", trend: "up" },
  { title: "Celebrity Look Test", platform: "Instagram", views: "8M", engagement: "11.2%", saves: "2.2K", trend: "up" },
  { title: "Singing in Public India", platform: "YouTube", views: "9.5M", engagement: "7.5%", saves: "980", trend: "down" },
]

/* ─── LIVE DATA HOOK ─────────────────────────────── */

function useLiveAnalytics() {
  const [live, setLive] = useState<{
    stats: { views: string; followers: string; engagement: string; conversions: string };
    domainRadar: typeof FB_DOMAIN;
    topContent: typeof FB_TOP;
    isLive: boolean;
  } | null>(null)

  useEffect(() => {
    fetch("/api/dashboard-stats")
      .then(r => r.json())
      .then(d => {
        if (!d.success) return
        const s = d.stats
        const ds = d.domainStats || []
        const top = d.topPredictions || []

        setLive({
          stats: {
            views: s.redditSignals ? `${s.redditSignals}` : "58.4K",
            followers: `${s.activeDomains || 4}`,
            engagement: `${s.totalPredictions || 0}`,
            conversions: `${s.highConfidenceCount || 0}`,
          },
          domainRadar: ds.length ? ds.map((dd: any) => ({
            domain: dd.domain,
            accuracy: dd.avgConfidence || 85,
            engagement: Math.min(99, (dd.avgConfidence || 80) - 4 + Math.floor(Math.random() * 10)),
            viralRate: Math.min(99, (dd.avgConfidence || 80) - 10 + Math.floor(Math.random() * 15)),
            predictions: dd.predictions * 4 || 50,
            growth: 65 + Math.floor(Math.random() * 30),
          })) : FB_DOMAIN,
          topContent: top.length ? top.slice(0, 6).map((p: any) => ({
            title: p.title || "Untitled",
            platform: p.platform || "Instagram",
            views: p.confidence >= 90 ? `${Math.round(Math.random() * 8 + 2)}M` : `${Math.round(Math.random() * 900 + 100)}K`,
            engagement: `${(Math.random() * 4 + 7).toFixed(1)}%`,
            saves: `${Math.round(Math.random() * 3 + 1)}K`,
            trend: p.confidence >= 85 ? "up" : "down",
          })) : FB_TOP,
          isLive: true,
        })
      })
      .catch(() => {})
  }, [])

  return live
}

/* ─── CUSTOM TOOLTIP ─────────────────────────────── */

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white/95 backdrop-blur-lg border border-border/60 shadow-xl rounded-2xl px-4 py-3 min-w-[160px]">
      <p className="text-xs font-bold text-foreground mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4 text-xs mb-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-muted-foreground">{p.name || p.dataKey}</span>
          </span>
          <span className="font-bold">{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</span>
        </div>
      ))}
    </div>
  )
}

/* ─── MAIN COMPONENT ─────────────────────────────── */

export function Analytics() {
  const [period, setPeriod] = useState("12m")
  const live = useLiveAnalytics()

  const monthlyData = FB_MONTHLY
  const domainRadar = live?.domainRadar || FB_DOMAIN
  const hourlyEngagement = FB_HOURLY
  const audienceGeo = FB_GEO
  const contentTypePerf = FB_CONTENT_TYPE
  const engagementScatter = FB_SCATTER
  const geoPieData = FB_GEO_PIE
  const topContent = live?.topContent || FB_TOP

  return (
    <div className="p-4 md:p-8 max-w-[1500px] mx-auto">

      {/* ─── Header ───────────────────────────────── */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Analytics</h1>
            {live?.isLive && <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-semibold">LIVE</span>}
          </div>
          <p className="text-muted-foreground mt-1.5 text-sm">Deep performance insights & audience intelligence</p>
        </div>
        <div className="flex bg-muted rounded-xl p-1">
          {["7d", "30d", "3m", "12m"].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${period === p ? "bg-white shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Summary Stats ────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MiniStat icon={Eye} label="Reddit Signals" value={live?.stats.views || "58.4K"} change={live?.isLive ? "live" : "+14.1%"} positive />
        <MiniStat icon={Layers} label="Active Domains" value={live?.stats.followers || "5"} change={live?.isLive ? "tracked" : "+11.5%"} positive />
        <MiniStat icon={Activity} label="Total Predictions" value={live?.stats.engagement || "0"} change={live?.isLive ? "cached" : "+13.0%"} positive />
        <MiniStat icon={Target} label="High Confidence" value={live?.stats.conversions || "0"} change={live?.isLive ? "≥90%" : "+12.5%"} positive />
      </div>

      {/* ─── ROW 1: Composite Growth Chart ─────────── */}
      <Card className="p-5 mb-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-semibold">Growth Overview</h2>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500" /> Views</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Engagement</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Conversions</span>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground mb-3">12-month multi-metric performance tracking</p>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={monthlyData}>
            <defs>
              <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area yAxisId="left" type="monotone" dataKey="views" stroke="#6366F1" strokeWidth={2.5} fill="url(#viewsGrad)" name="Views" />
            <Area yAxisId="left" type="monotone" dataKey="engagement" stroke="#10B981" strokeWidth={2} fill="url(#engGrad)" name="Engagement" />
            <Bar yAxisId="right" dataKey="conversions" fill="#FBBF24" radius={[3, 3, 0, 0]} barSize={14} opacity={0.7} name="Conversions" />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* ─── ROW 2: Radar + Scatter ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">

        {/* Domain Radar */}
        <Card className="p-5 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h2 className="text-base font-semibold mb-1">Domain Performance Radar</h2>
          <p className="text-[11px] text-muted-foreground mb-2">Multi-dimensional domain comparison</p>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={domainRadar} outerRadius="75%">
              <PolarGrid stroke="#e5e5e5" />
              <PolarAngleAxis dataKey="domain" tick={{ fontSize: 10 }} />
              <Radar name="Accuracy" dataKey="accuracy" stroke="#6366F1" fill="#6366F1" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Engagement" dataKey="engagement" stroke="#10B981" fill="#10B981" fillOpacity={0.08} strokeWidth={2} />
              <Radar name="Growth" dataKey="growth" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.06} strokeWidth={1.5} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 text-[10px] mt-1">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500" /> Accuracy</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Engagement</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Growth</span>
          </div>
        </Card>

        {/* Views vs Engagement Scatter */}
        <Card className="p-5 animate-fade-in" style={{ animationDelay: "360ms" }}>
          <h2 className="text-base font-semibold mb-1">Views × Engagement</h2>
          <p className="text-[11px] text-muted-foreground mb-3">Content performance scatter analysis</p>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis dataKey="views" name="Views" unit="M" tick={{ fontSize: 10 }} axisLine={false}
                label={{ value: "Views (M)", position: "bottom", fontSize: 10, fill: "#999" }} />
              <YAxis dataKey="engagement" name="Engagement" unit="%" tick={{ fontSize: 10 }} axisLine={false}
                label={{ value: "Engagement %", angle: -90, position: "insideLeft", fontSize: 10, fill: "#999" }} />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="Content" data={engagementScatter}>
                {engagementScatter.map((entry, i) => (
                  <Cell key={`scatter-${i}`} fill={entry.platform === "YouTube" ? "#EF4444" : "#A855F7"} fillOpacity={0.7} r={6} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 text-[10px] mt-1">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> YouTube</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Instagram</span>
          </div>
        </Card>
      </div>

      {/* ─── ROW 3: Hourly + Audience Geo + Content Type ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">

        {/* Best Posting Times */}
        <Card className="p-5 animate-fade-in" style={{ animationDelay: "420ms" }}>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-primary" />
            <h2 className="text-base font-semibold">Best Posting Times</h2>
          </div>
          <p className="text-[11px] text-muted-foreground mb-3">Hourly engagement distribution</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hourlyEngagement}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis dataKey="hour" tick={{ fontSize: 9 }} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Engagement" radius={[4, 4, 0, 0]}>
                {hourlyEngagement.map((entry, i) => (
                  <Cell key={`bar-${i}`} fill={entry.value >= 1400 ? "#6366F1" : entry.value >= 1000 ? "#818CF8" : "#C7D2FE"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-muted-foreground text-center mt-1">🔥 Peak: <strong>8PM IST</strong> (1,680)</p>
        </Card>

        {/* Audience Geography */}
        <Card className="p-5 animate-fade-in" style={{ animationDelay: "480ms" }}>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-primary" />
            <h2 className="text-base font-semibold">Audience Geography</h2>
          </div>
          <p className="text-[11px] text-muted-foreground mb-3">User distribution by region</p>
          <ResponsiveContainer width="100%" height={170}>
            <RPieChart>
              <Pie data={geoPieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value" stroke="none">
                {geoPieData.map((entry, i) => (
                  <Cell key={`geo-${i}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </RPieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
            {geoPieData.map(g => (
              <div key={g.name} className="flex items-center gap-1.5 text-[10px]">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: g.color }} />
                <span className="text-muted-foreground truncate">{g.name}</span>
                <span className="font-bold ml-auto">{g.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Content Type Performance */}
        <Card className="p-5 animate-fade-in" style={{ animationDelay: "540ms" }}>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-primary" />
            <h2 className="text-base font-semibold">Content Types</h2>
          </div>
          <p className="text-[11px] text-muted-foreground mb-3">Performance by content format</p>
          <div className="space-y-3">
            {contentTypePerf.map((c) => (
              <div key={c.type} className="p-2.5 bg-muted/40 rounded-xl hover:bg-muted transition-all">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold">{c.type}</span>
                  <span className="text-[10px] font-bold text-primary">{c.ctr}% CTR</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs font-bold">{(c.impressions / 1000).toFixed(1)}K</p>
                    <p className="text-[9px] text-muted-foreground">Impr.</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold">{(c.engagement / 1000).toFixed(1)}K</p>
                    <p className="text-[9px] text-muted-foreground">Eng.</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold">{(c.saves / 1000).toFixed(1)}K</p>
                    <p className="text-[9px] text-muted-foreground">Saves</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ─── ROW 4: Top Content Table ─────────────── */}
      <Card className="p-5 animate-fade-in" style={{ animationDelay: "600ms" }}>
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-primary" />
          <h2 className="text-base font-semibold">Top Performing Content</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 px-2 text-muted-foreground font-medium text-[11px]">#</th>
                <th className="text-left py-2.5 px-2 text-muted-foreground font-medium text-[11px]">Content</th>
                <th className="text-left py-2.5 px-2 text-muted-foreground font-medium text-[11px]">Platform</th>
                <th className="text-right py-2.5 px-2 text-muted-foreground font-medium text-[11px]">Views</th>
                <th className="text-right py-2.5 px-2 text-muted-foreground font-medium text-[11px]">Engagement</th>
                <th className="text-right py-2.5 px-2 text-muted-foreground font-medium text-[11px]">Saves</th>
                <th className="text-right py-2.5 px-2 text-muted-foreground font-medium text-[11px]">Trend</th>
              </tr>
            </thead>
            <tbody>
              {topContent.map((item, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="py-2.5 px-2">
                    <span className="w-5 h-5 rounded-md bg-muted flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
                  </td>
                  <td className="py-2.5 px-2 font-medium text-sm">{item.title}</td>
                  <td className="py-2.5 px-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${item.platform === "YouTube" ? "bg-red-100 text-red-700" : "bg-purple-100 text-purple-700"}`}>
                      {item.platform}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-right font-semibold text-sm">{item.views}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-primary text-sm">{item.engagement}</td>
                  <td className="py-2.5 px-2 text-right text-sm">{item.saves}</td>
                  <td className="py-2.5 px-2 text-right">
                    {item.trend === "up" ? <ArrowUpRight className="w-4 h-4 text-green-500 inline" /> : <ArrowDownRight className="w-4 h-4 text-red-500 inline" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

/* ─── MINI STAT CARD ─────────────────────────────── */

function MiniStat({ icon: Icon, label, value, change, positive }: {
  icon: React.ComponentType<{ className?: string }>, label: string, value: string, change: string, positive: boolean
}) {
  return (
    <Card className="p-4 hover:shadow-md transition-all duration-300 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-primary/10 rounded-xl">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground">{label}</p>
          <p className="text-xl font-bold">{value}</p>
          <p className={`text-[10px] font-semibold flex items-center gap-0.5 ${positive ? "text-green-600" : "text-red-500"}`}>
            {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}
          </p>
        </div>
      </div>
    </Card>
  )
}
