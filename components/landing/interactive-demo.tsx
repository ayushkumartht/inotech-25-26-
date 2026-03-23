"use client"

import { useState, useEffect } from "react"
import { Search, TrendingUp, Zap, BarChart3, ArrowUpRight } from "lucide-react"
import { useInView } from "./hooks"

const demoResults = [
    { label: "Viral Probability", value: 94, color: "bg-green-500" },
    { label: "Peak in", value: 0, text: "~3 weeks", color: "bg-primary" },
    { label: "Competition Level", value: 32, color: "bg-amber-500" },
    { label: "Recommended Platforms", value: 0, text: "YouTube, Instagram", color: "bg-chart-3" },
]

const suggestions = ["AI Fitness Coach", "Sustainable Packaging", "No-Code Apps", "Virtual Try-On", "AI Music"]

export function InteractiveDemo() {
    const { ref, inView } = useInView(0.2)
    const [query, setQuery] = useState("")
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [apiResults, setApiResults] = useState<any[]>([])
    const [typedText, setTypedText] = useState("")
    const [currentSuggestion, setCurrentSuggestion] = useState(0)

    // Auto-typing effect
    useEffect(() => {
        if (!inView || query) return
        const word = suggestions[currentSuggestion]
        let i = 0
        const typeTimer = setInterval(() => {
            if (i <= word.length) {
                setTypedText(word.slice(0, i))
                i++
            } else {
                clearInterval(typeTimer)
                setTimeout(() => {
                    setTypedText("")
                    setCurrentSuggestion((p) => (p + 1) % suggestions.length)
                }, 2000)
            }
        }, 80)
        return () => clearInterval(typeTimer)
    }, [inView, currentSuggestion, query])

    const handleAnalyze = async () => {
        const searchTerm = query || typedText
        if (!searchTerm) return

        setIsAnalyzing(true)
        setShowResults(false)

        try {
            const { searchTrendPredictions } = await import("@/lib/services/youtube")
            const results = await searchTrendPredictions(searchTerm)
            setApiResults(results)
            setShowResults(true)
        } catch (error) {
            console.error("Prediction error:", error)
        } finally {
            setIsAnalyzing(false)
        }
    }

    return (
        <section ref={ref} className="py-20 md:py-28 px-4 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl animate-mesh-1" />
                <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-chart-3/5 blur-3xl animate-mesh-2" />
            </div>

            <div className={`max-w-4xl mx-auto relative z-10 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                        <Zap className="w-3 h-3" /> Try It Live
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">See predictions in action</h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">Type any topic and watch our AI predict its trend potential instantly.</p>
                </div>

                {/* Search input */}
                <div className="max-w-2xl mx-auto">
                    <div className="relative flex items-center bg-card border-2 border-border/60 rounded-2xl p-2 shadow-xl shadow-primary/5 focus-within:border-primary/40 transition-smooth">
                        <Search className="w-5 h-5 text-muted-foreground ml-3 shrink-0" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                            placeholder=""
                            className="flex-1 px-3 py-2.5 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
                        />
                        {!query && (
                            <div className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none">
                                <span className="text-sm text-muted-foreground">{typedText}</span>
                                <span className="text-sm text-primary animate-blink">|</span>
                            </div>
                        )}
                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-smooth disabled:opacity-50 shrink-0"
                        >
                            {isAnalyzing ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    Analyzing...
                                </span>
                            ) : "Predict"}
                        </button>
                    </div>

                    {/* Quick suggestions */}
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {suggestions.map((s) => (
                            <button
                                key={s}
                                onClick={() => { setQuery(s); setShowResults(false) }}
                                className="px-3 py-1 text-xs bg-muted rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-smooth"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results */}
                {showResults && (
                    <div className="max-w-2xl mx-auto mt-8 animate-fade-in-up">
                        <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Analysis for</p>
                                    <p className="text-2xl font-black text-foreground">{query || typedText}</p>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-600 rounded-full text-xs font-black ring-1 ring-green-500/20">
                                    <ArrowUpRight className="w-3 h-3" /> HIGH POTENTIAL
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Top Predicted Content */}
                                <div>
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-3">Top Predicted Content</p>
                                    <div className="space-y-3">
                                        {apiResults.slice(0, 3).map((v, i) => (
                                            <div key={v.id} className="flex items-center gap-4 bg-muted/30 p-3 rounded-xl border border-border/50 hover:border-primary/30 transition-smooth group">
                                                <div className="relative w-16 h-10 rounded-lg overflow-hidden shrink-0">
                                                    <img src={v.thumbnail} alt={v.title} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all" />
                                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-foreground truncate">{v.title}</p>
                                                    <p className="text-[10px] text-muted-foreground">{v.channelTitle}</p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <p className="text-sm font-black text-primary">{v.score}%</p>
                                                    <p className="text-[10px] text-muted-foreground font-bold">MATCH</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Viral Probability */}
                                    <div className="bg-muted/40 rounded-xl p-4 border border-border/50">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3">Viral Strength</p>
                                        <div className="flex items-end gap-2 mb-2">
                                            <span className="text-4xl font-black text-green-600 tracking-tighter">94%</span>
                                            <TrendingUp className="w-4 h-4 text-green-500 mb-2" />
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                            <div className="bg-green-500 h-full rounded-full animate-fill-bar" style={{ "--fill-width": "94%" } as React.CSSProperties} />
                                        </div>
                                    </div>

                                    <div className="bg-muted/40 rounded-xl p-4 border border-border/50 flex flex-col justify-center">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Prediction Window</p>
                                        <span className="text-2xl font-black text-primary tracking-tight">8-12 DAYS</span>
                                        <p className="text-[10px] text-muted-foreground font-bold mt-1">BEST TIME TO PUBLISH</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-border/50 text-center">
                                <button className="text-xs font-black text-primary hover:text-primary/80 transition-colors flex items-center gap-2 mx-auto decoration-2 underline-offset-4 hover:underline">
                                    UNLOCK DEEP ANALYTICS & COMPETITOR INSIGHTS
                                    <ArrowUpRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
