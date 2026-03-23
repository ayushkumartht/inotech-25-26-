"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Clock,
  TrendingUp,
  Eye,
  Play,
  Camera,
  Sparkles,
  Film,
  Palette,
  Music,
  FileText,
  Scissors,
  ChevronRight,
  CheckCircle2,
  RefreshCw,
} from "lucide-react"
import { useState, useEffect } from "react"
import type { EnhancedPrediction } from "@/lib/data/mock-predictions"

const DOMAINS = ["All", "Tech", "Education", "Entertainment", "Food"] as const
type DomainFilter = (typeof DOMAINS)[number]

// ── Platform visual config ────────────────────────────────────
const platformConfig = {
  youtube: {
    gradient: "from-red-500/15 via-rose-500/10 to-orange-400/5",
    accent: "bg-red-500",
    accentText: "text-red-600 dark:text-red-400",
    badge: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    icon: Play,
    label: "YouTube Trends",
    cardBorder: "hover:border-red-400/50",
    headerGradient: "from-red-500 to-rose-500",
  },
  instagram: {
    gradient: "from-purple-500/15 via-pink-500/10 to-orange-400/5",
    accent: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400",
    accentText: "text-pink-600 dark:text-pink-400",
    badge: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
    icon: Camera,
    label: "Instagram Trends",
    cardBorder: "hover:border-pink-400/50",
    headerGradient: "from-purple-500 via-pink-500 to-orange-400",
  },
}

// ── Domain icons ──────────────────────────────────────────────
const domainEmoji: Record<string, string> = {
  All: "🌐",
  Tech: "💻",
  Education: "📚",
  Entertainment: "🎬",
  Food: "🍳",
}

export function Marketplace() {
  const [platform, setPlatform] = useState<"youtube" | "instagram">("youtube")
  const [domainFilter, setDomainFilter] = useState<DomainFilter>("All")
  const [predictions, setPredictions] = useState<EnhancedPrediction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPrediction, setSelectedPrediction] = useState<EnhancedPrediction | null>(null)
  const [canRefresh, setCanRefresh] = useState(false)
  const [nextRefreshIn, setNextRefreshIn] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [generatedAt, setGeneratedAt] = useState<string | null>(null)

  useEffect(() => {
    fetchPredictions()
  }, [platform])

  const fetchPredictions = async (forceRefresh = false) => {
    try {
      if (forceRefresh) setIsRefreshing(true)
      else setIsLoading(true)
      const url = `/api/predictions?platform=${platform}${forceRefresh ? "&refresh=true" : ""}`
      const res = await fetch(url)
      const data = await res.json()

      if (data.success && data.predictions) {
        setPredictions(data.predictions)
        setCanRefresh(data.canRefresh ?? false)
        setNextRefreshIn(data.nextRefreshIn ?? 0)
        setGeneratedAt(data.generatedAt ?? null)
      }
    } catch (error) {
      console.error("Failed to fetch predictions:", error)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const handleRefresh = () => {
    if (!canRefresh || isRefreshing) return
    fetchPredictions(true)
  }

  const filteredPredictions =
    domainFilter === "All"
      ? predictions
      : predictions.filter((p) => p.domain === domainFilter)

  const config = platformConfig[(platform || "youtube").toLowerCase() as keyof typeof platformConfig] || platformConfig.youtube

  // Format "generated at" time
  const timeAgo = generatedAt
    ? (() => {
        const mins = Math.round((Date.now() - new Date(generatedAt).getTime()) / 60000)
        if (mins < 60) return `${mins}m ago`
        const hrs = Math.floor(mins / 60)
        return `${hrs}h ${mins % 60}m ago`
      })()
    : null

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Trend Marketplace
            </h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Deep-dive predictions with actionable content strategies
              {timeAgo && <span className="ml-2 text-xs opacity-70">· Updated {timeAgo}</span>}
            </p>
          </div>

          {/* Refresh Button */}
          <Button
            variant={canRefresh ? "default" : "outline"}
            size="sm"
            onClick={handleRefresh}
            disabled={!canRefresh || isRefreshing}
            className={`gap-2 text-sm transition-all ${
              canRefresh
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:scale-105"
                : "opacity-70"
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing
              ? "Generating…"
              : canRefresh
                ? "🔄 Get Fresh Predictions"
                : `Next refresh in ${nextRefreshIn}m`}
          </Button>
        </div>
      </div>

      {/* ── Platform Tabs ──────────────────────────────────── */}
      <Tabs
        value={platform}
        onValueChange={(v) => {
          setPlatform(v as "youtube" | "instagram")
          setDomainFilter("All")
        }}
        className="mb-6"
      >
        <TabsList className="h-12 p-1 bg-muted/60 backdrop-blur-sm gap-1">
          <TabsTrigger
            value="youtube"
            className="h-10 px-5 gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
          >
            <Play className="w-4 h-4" />
            <span className="font-semibold">YouTube</span>
          </TabsTrigger>
          <TabsTrigger
            value="instagram"
            className="h-10 px-5 gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:via-pink-500 data-[state=active]:to-orange-400 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
          >
            <Camera className="w-4 h-4" />
            <span className="font-semibold">Instagram</span>
          </TabsTrigger>
        </TabsList>

        {/* Both tabs render the same filtered view, differentiated by state */}
        <TabsContent value="youtube" />
        <TabsContent value="instagram" />
      </Tabs>

      {/* ── Domain Filter Bar ──────────────────────────────── */}
      <div className="mb-6 flex flex-wrap gap-2 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        {DOMAINS.map((domain) => (
          <Button
            key={domain}
            variant={domainFilter === domain ? "default" : "outline"}
            size="sm"
            onClick={() => setDomainFilter(domain)}
            className={`text-sm gap-1.5 hover:scale-105 transition-all ${domainFilter === domain
                ? "shadow-md"
                : "hover:bg-muted/80"
              }`}
          >
            <span>{domainEmoji[domain]}</span>
            {domain}
          </Button>
        ))}
      </div>

      {/* ── Cards Grid ─────────────────────────────────────── */}
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-64 gap-4">
          <div className="relative w-12 h-12">
            <Sparkles className="w-12 h-12 text-primary animate-pulse" />
            <div className="absolute inset-0 animate-pulse-soft rounded-full" />
          </div>
          <p className="text-muted-foreground">Loading predictions…</p>
        </div>
      ) : filteredPredictions.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground text-lg">No predictions found for this filter.</p>
          <p className="text-muted-foreground text-sm mt-1">Try selecting a different domain.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filteredPredictions.map((prediction, index) => (
            <div
              key={prediction.id}
              style={{ animationDelay: `${index * 75}ms` }}
              className="animate-fade-in-up"
            >
              <PredictionCard
                prediction={prediction}
                onViewStrategy={() => setSelectedPrediction(prediction)}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Strategy Dialog Modal ──────────────────────────── */}
      <StrategyDialog
        prediction={selectedPrediction}
        open={!!selectedPrediction}
        onClose={() => setSelectedPrediction(null)}
      />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// ── Prediction Card ──────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

interface PredictionCardProps {
  prediction: EnhancedPrediction
  onViewStrategy: () => void
}

function PredictionCard({ prediction, onViewStrategy }: PredictionCardProps) {
  const platformKey = (prediction.platform || "youtube").toLowerCase() as keyof typeof platformConfig
  const config = platformConfig[platformKey] || platformConfig.youtube
  const PlatformIcon = config.icon

  return (
    <Card
      className={`overflow-hidden border border-border ${config.cardBorder} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group`}
    >
      {/* Platform gradient header */}
      <div className={`relative bg-gradient-to-r ${config.gradient} p-4 pb-3`}>
        {/* Platform badge */}
        <div className="flex items-center justify-between mb-3">
          <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${config.badge}`}>
            <PlatformIcon className="w-3 h-3" />
            {prediction.platform === "youtube" ? "YouTube" : "Instagram"}
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-foreground/10 text-foreground">
            <Clock className="w-3 h-3" />
            Peaks in {prediction.peakIn}
          </div>
        </div>

        {/* Domain pill */}
        <Badge variant="secondary" className="text-xs">
          {domainEmoji[prediction.domain]} {prediction.domain}
        </Badge>
      </div>

      {/* Card body */}
      <div className="p-4 md:p-5">
        <h3 className="text-base md:text-lg font-bold text-foreground mb-2 line-clamp-2 leading-snug">
          {prediction.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {prediction.description}
        </p>

        {/* Confidence bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Confidence
            </span>
            <span className={`text-sm font-bold ${config.accentText}`}>
              {prediction.confidence}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${config.headerGradient} transition-all duration-1000`}
              style={{ width: `${prediction.confidence}%` }}
            />
          </div>
        </div>

        {/* Engagement + Tags row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground">{prediction.engagement}</span>
            <span className="text-xs text-muted-foreground">Engagement</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {prediction.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-md hover:bg-primary/10 transition-colors"
            >
              #{tag}
            </span>
          ))}
          {prediction.tags.length > 3 && (
            <span className="text-xs text-muted-foreground">+{prediction.tags.length - 3}</span>
          )}
        </div>

        {/* Divider + CTA */}
        <div className="border-t border-border pt-4">
          <Button
            onClick={onViewStrategy}
            className={`w-full bg-gradient-to-r ${config.headerGradient} text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-all gap-2`}
          >
            <Sparkles className="w-4 h-4" />
            View Strategy
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

// ════════════════════════════════════════════════════════════════
// ── Strategy Dialog ──────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

interface StrategyDialogProps {
  prediction: EnhancedPrediction | null
  open: boolean
  onClose: () => void
}

function StrategyDialog({ prediction, open, onClose }: StrategyDialogProps) {
  if (!prediction) return null
  const config = platformConfig[prediction.platform]

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 gap-0">
        {/* Modal header with platform gradient */}
        <div className={`bg-gradient-to-r ${config.headerGradient} p-6 text-white`}>
          <div className="flex items-center gap-2 text-xs font-medium mb-2 opacity-90">
            <config.icon className="w-4 h-4" />
            {prediction.platform === "youtube" ? "YouTube" : "Instagram"} · {prediction.domain}
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-white leading-snug">
              {prediction.title}
            </DialogTitle>
            <DialogDescription className="text-white/80 mt-1 text-sm">
              Peaks in {prediction.peakIn} · {prediction.confidence}% Confidence · {prediction.engagement} Engagement
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Full Description */}
          <section>
            <h3 className="flex items-center gap-2 text-sm font-bold text-foreground mb-2">
              <FileText className="w-4 h-4 text-primary" />
              Full Analysis
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {prediction.fullDescription}
            </p>
          </section>

          <div className="border-t border-border" />

          {/* How to Make */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
              <Film className="w-5 h-5 text-primary" />
              How to Make This Content
            </h3>

            <div className="space-y-4">
              {/* Visuals */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <Palette className="w-4 h-4 text-blue-500" />
                  Visuals Checklist
                </h4>
                <ul className="space-y-1.5">
                  {prediction.howToMake.visuals.map((v, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Audio */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <Music className="w-4 h-4 text-purple-500" />
                  Audio
                </h4>
                <p className="text-sm text-muted-foreground">{prediction.howToMake.audio}</p>
              </div>

              {/* Script */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <FileText className="w-4 h-4 text-orange-500" />
                  Script Blueprint
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{prediction.howToMake.script}</p>
              </div>

              {/* Editing Style */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <Scissors className="w-4 h-4 text-red-500" />
                  Editing Style
                </h4>
                <p className="text-sm text-muted-foreground">{prediction.howToMake.editingStyle}</p>
              </div>
            </div>
          </section>

          {/* Tags */}
          <div className="border-t border-border pt-4">
            <div className="flex flex-wrap gap-2">
              {prediction.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
