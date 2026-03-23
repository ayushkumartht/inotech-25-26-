"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import {
  User, Mail, MapPin, Calendar, TrendingUp, Target,
  Trophy, Zap, Play, Instagram, Edit3, ExternalLink,
  Star, Activity, BarChart3,
} from "lucide-react"

const recentPredictions = [
  { title: "AI Tool Speed Runs", platform: "Instagram", domain: "Tech", confidence: 95, status: "Correct", date: "Feb 23" },
  { title: "₹100 vs ₹10K Biryani", platform: "YouTube", domain: "Food", confidence: 95, status: "Correct", date: "Feb 22" },
  { title: "UPSC Topper Strategy", platform: "YouTube", domain: "Education", confidence: 95, status: "Correct", date: "Feb 20" },
  { title: "Celebrity Look Challenge", platform: "Instagram", domain: "Entertainment", confidence: 82, status: "Correct", date: "Feb 19" },
]

export function Profile() {
  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-2 text-sm">Manage your account and view your stats</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Profile Card */}
        <Card className="p-6 animate-fade-in">
          <div className="text-center">
            {/* Avatar */}
            <div className="relative mx-auto w-24 h-24 mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[3px] shadow-lg shadow-purple-200">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AP</span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <h2 className="text-xl font-bold">Ayush Patel</h2>
            <p className="text-sm text-muted-foreground">Trend Analyst • Gold Tier</p>

            <div className="flex justify-center gap-2 mt-3">
              <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-semibold border border-amber-200">🔥 Gold Tier</span>
              <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-semibold border border-indigo-200">#6 Global</span>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-border space-y-3">
            <InfoRow icon={Mail} label="Email" value="ayush@trendpredict.pro" />
            <InfoRow icon={MapPin} label="Location" value="Mumbai, India" />
            <InfoRow icon={Calendar} label="Member Since" value="January 2026" />
          </div>

          <div className="mt-5 pt-5 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Bio</p>
            <p className="text-sm text-foreground">Passionate about leveraging AI for social media trend prediction. Focused on Tech, Entertainment, and Food verticals.</p>
          </div>

          <button className="w-full mt-5 py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-medium hover:bg-primary/20 transition-all flex items-center justify-center gap-2">
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        </Card>

        {/* Stats & Activity */}
        <div className="lg:col-span-2 space-y-5">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <StatItem icon={TrendingUp} label="Predictions" value="156" />
            <StatItem icon={Target} label="Accuracy" value="87%" />
            <StatItem icon={Trophy} label="Rank" value="#6" />
            <StatItem icon={Zap} label="Streak" value="15 🔥" />
          </div>

          {/* Domain Expertise */}
          <Card className="p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Domain Expertise</h2>
            </div>
            <div className="space-y-3">
              {[
                { domain: "Tech", level: 94, predictions: 42 },
                { domain: "Entertainment", level: 85, predictions: 31 },
                { domain: "Food", level: 78, predictions: 25 },
                { domain: "Education", level: 72, predictions: 20 },
              ].map(d => (
                <div key={d.domain}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{d.domain}</span>
                    <span className="text-xs text-muted-foreground">{d.predictions} predictions • {d.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 animate-fill-bar"
                      style={{ "--fill-width": `${d.level}%` } as React.CSSProperties} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Predictions */}
          <Card className="p-5 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Recent Predictions</h2>
            </div>
            <div className="space-y-2">
              {recentPredictions.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl hover:bg-muted transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${p.platform === "YouTube" ? "bg-red-100" : "bg-purple-100"}`}>
                      {p.platform === "YouTube" ? <Play className="w-4 h-4 text-red-600" fill="currentColor" /> : <Instagram className="w-4 h-4 text-purple-600" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{p.title}</p>
                      <p className="text-[11px] text-muted-foreground">{p.domain} • {p.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{p.confidence}%</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${p.status === "Correct" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-1.5 bg-muted rounded-lg"><Icon className="w-3.5 h-3.5 text-muted-foreground" /></div>
      <div>
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}

function StatItem({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>, label: string, value: string }) {
  return (
    <Card className="p-3 text-center hover:shadow-md transition-all">
      <Icon className="w-5 h-5 text-primary mx-auto mb-1" />
      <p className="text-lg font-bold">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </Card>
  )
}
