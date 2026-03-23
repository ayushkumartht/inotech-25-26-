"use client"

import { useInView } from "./hooks"
import { ArrowRight, Clock, BookOpen } from "lucide-react"

const articles = [
    {
        category: "Guide",
        title: "How to Ride a Trend Before It Peaks: The Creator's Playbook",
        excerpt: "Learn the exact framework our top users follow to turn predictions into viral content every time.",
        readTime: "8 min read",
        color: "bg-primary/10 text-primary",
    },
    {
        category: "Case Study",
        title: "How a Small Brand Got 2M Views Using Trend Predictions",
        excerpt: "A fashion startup used TrendPredict Pro to identify the 'quiet luxury' trend 4 weeks early — here's what happened.",
        readTime: "5 min read",
        color: "bg-chart-3/10 text-chart-3",
    },
    {
        category: "Research",
        title: "The Science Behind Trend Prediction: How ML Models Forecast Virality",
        excerpt: "A deep dive into the machine learning architecture that powers our 92%+ accuracy rate.",
        readTime: "12 min read",
        color: "bg-chart-5/10 text-chart-5",
    },
]

export function BlogPreview() {
    const { ref, inView } = useInView()

    return (
        <section ref={ref} className="py-20 md:py-28 px-4 bg-muted/30">
            <div className="max-w-7xl mx-auto">
                <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div>
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Resources</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">Learn from the best</h2>
                        <p className="text-muted-foreground">Guides, case studies, and research from our team.</p>
                    </div>
                    <a href="#" className="mt-4 md:mt-0 flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                        View all articles <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${inView ? "stagger-children" : ""}`}>
                    {articles.map(({ category, title, excerpt, readTime, color }) => (
                        <a key={title} href="#" className="group block bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-lg transition-smooth">
                            {/* Colored header bar */}
                            <div className="h-2 bg-gradient-to-r from-primary via-chart-2 to-chart-3 group-hover:h-3 transition-all duration-300" />
                            <div className="p-6">
                                <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${color} mb-3`}>
                                    {category}
                                </span>
                                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-smooth leading-snug">
                                    {title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{excerpt}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    {readTime}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
