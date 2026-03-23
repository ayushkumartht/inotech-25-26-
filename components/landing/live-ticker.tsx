"use client"

import { TrendingUp } from "lucide-react"

const trendItems = [
    { tag: "#AIProductivity", score: "+94%", hot: true },
    { tag: "#SustainableFashion", score: "+87%", hot: true },
    { tag: "#RemoteWorkTools", score: "+82%", hot: false },
    { tag: "#Web3Gaming", score: "+79%", hot: true },
    { tag: "#HealthTech2026", score: "+76%", hot: false },
    { tag: "#CreatorEconomy", score: "+91%", hot: true },
    { tag: "#GreenEnergy", score: "+73%", hot: false },
    { tag: "#ShortFormVideo", score: "+96%", hot: true },
    { tag: "#PersonalFinance", score: "+68%", hot: false },
    { tag: "#EdgeComputing", score: "+85%", hot: true },
]

export function LiveTicker() {
    const doubled = [...trendItems, ...trendItems]
    return (
        <div className="w-full overflow-hidden bg-foreground/[0.03] border-y border-border/30 py-2.5">
            <div className="flex animate-marquee whitespace-nowrap">
                {doubled.map((item, i) => (
                    <div key={i} className="inline-flex items-center gap-2 mx-6">
                        {item.hot && <span className="text-[10px]">🔥</span>}
                        <span className="text-xs font-semibold text-foreground/80">{item.tag}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.hot ? "bg-green-500/10 text-green-600" : "bg-primary/10 text-primary"
                            }`}>{item.score}</span>
                        <span className="text-border mx-2">•</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
