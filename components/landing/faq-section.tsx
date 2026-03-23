"use client"

import { useState } from "react"
import { useInView } from "./hooks"
import { ChevronDown } from "lucide-react"

const faqItems = [
    {
        q: "How does TrendPredict Pro predict trends?",
        a: "We use a combination of machine learning models that analyze millions of signals including search volume changes, social media engagement patterns, sentiment analysis, and cross-platform content velocity. Our models are trained on historical trend data going back 5+ years.",
    },
    {
        q: "Which platforms do you track?",
        a: "We currently track YouTube, Instagram, LinkedIn, TikTok, and X (Twitter). We analyze hashtags, content themes, engagement patterns, search trends, and creator activity across all these platforms simultaneously.",
    },
    {
        q: "How accurate are the predictions?",
        a: "Our average prediction accuracy is 92%+ for trend direction (whether something will trend or not). For timing predictions (when it will peak), we're accurate within a 5-day window 85% of the time. We show confidence scores on every prediction.",
    },
    {
        q: "Can I try it before paying?",
        a: "Absolutely! Our Free plan gives you 5 trend predictions per month on 1 platform. No credit card required. Upgrade to Pro anytime for unlimited predictions across all platforms.",
    },
    {
        q: "How is this different from Google Trends?",
        a: "Google Trends shows you what's ALREADY trending. We predict what WILL trend before it happens — typically 2-4 weeks in advance. We also provide actionable insights, ROI tracking, and multi-platform analysis that Google Trends doesn't offer.",
    },
    {
        q: "Do you offer an API?",
        a: "Yes! Our Enterprise plan includes full API access so you can integrate trend predictions directly into your own tools, dashboards, and workflows. We provide RESTful APIs with comprehensive documentation.",
    },
]

export function FAQSection() {
    const { ref, inView } = useInView()
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section ref={ref} className="py-20 md:py-28 px-4">
            <div className="max-w-3xl mx-auto">
                <div className={`text-center mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">FAQ</p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently asked questions</h2>
                </div>

                <div className={`space-y-3 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    {faqItems.map(({ q, a }, i) => (
                        <div key={i} className="bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-sm transition-smooth">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left"
                            >
                                <span className="text-sm font-semibold text-foreground pr-4">{q}</span>
                                <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96 pb-5" : "max-h-0"}`}>
                                <p className="px-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
