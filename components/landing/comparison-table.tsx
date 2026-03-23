"use client"

import { useInView } from "./hooks"
import { Check, X, ArrowRight } from "lucide-react"

export function ComparisonTable({ onSignUp }: { onSignUp: () => void }) {
    const { ref, inView } = useInView()

    const rows = [
        { feature: "Trend discovery speed", manual: "Hours / Days", pro: "Seconds", highlight: true },
        { feature: "Prediction accuracy", manual: "~40% guesswork", pro: "92%+ ML-powered", highlight: true },
        { feature: "Platform coverage", manual: "1-2 platforms", pro: "All major platforms", highlight: false },
        { feature: "ROI tracking", manual: "Spreadsheets", pro: "Automated dashboard", highlight: false },
        { feature: "Team collaboration", manual: "Email chains", pro: "Real-time workspace", highlight: false },
        { feature: "Cost of missed trends", manual: "Thousands in lost revenue", pro: "₹0 — you catch them all", highlight: true },
    ]

    return (
        <section ref={ref} className="py-20 md:py-28 px-4">
            <div className="max-w-4xl mx-auto">
                <div className={`text-center mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Why Switch</p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Manual research vs. TrendPredict Pro</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">Stop guessing. Start predicting.</p>
                </div>

                <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-lg">
                        {/* Header */}
                        <div className="grid grid-cols-3 border-b border-border/50">
                            <div className="p-4 text-sm font-semibold text-muted-foreground">Feature</div>
                            <div className="p-4 text-sm font-semibold text-center text-muted-foreground border-x border-border/30">Manual Way</div>
                            <div className="p-4 text-sm font-semibold text-center bg-primary/5 text-primary">TrendPredict Pro</div>
                        </div>
                        {/* Rows */}
                        {rows.map(({ feature, manual, pro, highlight }, i) => (
                            <div key={feature} className={`grid grid-cols-3 ${i < rows.length - 1 ? "border-b border-border/30" : ""}`}>
                                <div className="p-4 text-sm font-medium text-foreground">{feature}</div>
                                <div className="p-4 text-sm text-center text-muted-foreground border-x border-border/20">{manual}</div>
                                <div className={`p-4 text-sm text-center font-medium bg-primary/5 ${highlight ? "text-green-600" : "text-foreground"}`}>{pro}</div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <button onClick={onSignUp} className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-smooth">
                            Switch to TrendPredict Pro
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
