"use client"

import { useInView } from "./hooks"
import { Sparkles, Eye, TrendingUp, Rocket, CheckCircle } from "lucide-react"

const timelineSteps = [
    {
        icon: Eye,
        date: "Day 1",
        title: "AI Detects Signal",
        desc: "Our models detect an emerging pattern around 'AI Fitness Coach' across 14 data sources.",
        color: "bg-primary",
        detail: "Early Signal · Confidence: 67%",
    },
    {
        icon: TrendingUp,
        date: "Day 5",
        title: "Trend Confirmed",
        desc: "Search volume up 340%. Social mentions accelerating. Confidence upgraded.",
        color: "bg-chart-2",
        detail: "Confirmed Trend · Confidence: 89%",
    },
    {
        icon: Sparkles,
        date: "Day 8",
        title: "You Create Content",
        desc: "You publish a video based on our prediction. Zero competition in the space.",
        color: "bg-chart-4",
        detail: "Action Taken · You're early",
    },
    {
        icon: Rocket,
        date: "Day 21",
        title: "Trend Goes Viral",
        desc: "The trend explodes. Your content is already #1. 5x more views than average.",
        color: "bg-chart-5",
        detail: "Viral · Your ROI: 8.2x",
    },
]

export function TrendTimeline() {
    const { ref, inView } = useInView(0.1)

    return (
        <section ref={ref} className="py-20 md:py-28 px-4 bg-muted/30">
            <div className="max-w-4xl mx-auto">
                <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Real Example</p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How a trend prediction becomes profit</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">Follow a real prediction from early signal to viral moment.</p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/50 md:-translate-x-0.5" />

                    <div className="space-y-8 md:space-y-12">
                        {timelineSteps.map(({ icon: Icon, date, title, desc, color, detail }, i) => (
                            <div
                                key={title}
                                className={`relative flex items-start gap-6 md:gap-0 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                    }`}
                                style={{ transitionDelay: `${i * 200}ms` }}
                            >
                                {/* Desktop: alternating sides */}
                                <div className={`hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 w-full items-center`}>
                                    {/* Left content (even items) */}
                                    <div className={`${i % 2 === 0 ? "text-right" : ""}`}>
                                        {i % 2 === 0 ? (
                                            <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm hover:shadow-md transition-smooth inline-block text-left max-w-sm ml-auto">
                                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{date}</span>
                                                <h3 className="text-base font-bold mt-1">{title}</h3>
                                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                                                <span className={`inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${color}/10 text-foreground`}>{detail}</span>
                                            </div>
                                        ) : <div />}
                                    </div>

                                    {/* Center icon */}
                                    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center shadow-lg z-10`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>

                                    {/* Right content (odd items) */}
                                    <div>
                                        {i % 2 !== 0 ? (
                                            <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm hover:shadow-md transition-smooth inline-block text-left max-w-sm">
                                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{date}</span>
                                                <h3 className="text-base font-bold mt-1">{title}</h3>
                                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                                                <span className={`inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${color}/10 text-foreground`}>{detail}</span>
                                            </div>
                                        ) : <div />}
                                    </div>
                                </div>

                                {/* Mobile: all left-aligned */}
                                <div className="md:hidden flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center shadow-lg shrink-0 z-10`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm flex-1">
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{date}</span>
                                        <h3 className="text-base font-bold mt-1">{title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                                        <span className={`inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${color}/10 text-foreground`}>{detail}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Final result badge */}
                    <div className={`mt-10 text-center transition-all duration-700 delay-700 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-chart-5/10 border border-chart-5/20 rounded-full">
                            <CheckCircle className="w-4 h-4 text-chart-5" />
                            <span className="text-sm font-semibold text-chart-5">Result: 8.2x ROI — 3 weeks ahead of competitors</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
