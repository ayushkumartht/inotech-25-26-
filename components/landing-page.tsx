"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
    TrendingUp, Zap, BarChart3, Users, ShoppingBag, Bell,
    ArrowRight, ChevronRight, Menu, X, Star, Check, Target, Eye,
    Globe, Activity, Sparkles,
} from "lucide-react"
import { useInView, AnimatedCounter } from "./landing/hooks"
import { LiveTicker } from "./landing/live-ticker"
import { InteractiveDemo } from "./landing/interactive-demo"
import { ComparisonTable } from "./landing/comparison-table"
import { TrendTimeline } from "./landing/trend-timeline"
import { FAQSection } from "./landing/faq-section"
import { BlogPreview } from "./landing/blog-preview"
import { VideoDemo } from "./landing/video-demo"
import { DarkModeToggle } from "./landing/dark-mode-toggle"

/* ---- Hero Dashboard Mockup ---- */
function HeroDashboardMockup() {
    return (
        <div className="relative w-full max-w-4xl mx-auto mt-16 perspective-[1200px]">
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-chart-2/15 to-chart-3/20 blur-3xl rounded-3xl opacity-60" />
            <div className="relative bg-card border border-border/60 rounded-2xl shadow-2xl shadow-primary/5 overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-border/50 bg-muted/30">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="px-4 py-1 bg-muted rounded-md text-[10px] text-muted-foreground font-mono">app.trendpredictpro.com/dashboard</div>
                    </div>
                </div>
                <div className="p-5">
                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-3 mb-4">
                        {[
                            { label: "Active Trends", value: "2,847", change: "+12%", icon: TrendingUp, bg: "bg-primary/10" },
                            { label: "Accuracy", value: "94.2%", change: "+3.1%", icon: Target, bg: "bg-green-500/10" },
                            { label: "Avg ROI", value: "3.2x", change: "+0.4x", icon: Zap, bg: "bg-amber-500/10" },
                            { label: "Alerts Today", value: "18", change: "5 new", icon: Bell, bg: "bg-chart-3/10" },
                        ].map(({ label, value, change, icon: Icon, bg }) => (
                            <div key={label} className="bg-muted/40 rounded-xl p-3 border border-border/30">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] text-muted-foreground font-medium">{label}</span>
                                    <div className={`w-6 h-6 rounded-md ${bg} flex items-center justify-center`}><Icon className="w-3 h-3 text-primary" /></div>
                                </div>
                                <p className="text-base font-bold text-foreground">{value}</p>
                                <span className="text-[10px] font-medium text-green-500">{change}</span>
                            </div>
                        ))}
                    </div>
                    {/* Charts */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2 bg-muted/40 rounded-xl p-4 border border-border/30">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-semibold text-foreground">Trend Predictions</span>
                                <span className="text-[10px] text-green-500 font-medium">▲ 23% this week</span>
                            </div>
                            <svg viewBox="0 0 400 120" className="w-full h-24">
                                <line x1="0" y1="30" x2="400" y2="30" stroke="currentColor" className="text-border/30" strokeWidth="0.5" />
                                <line x1="0" y1="60" x2="400" y2="60" stroke="currentColor" className="text-border/30" strokeWidth="0.5" />
                                <line x1="0" y1="90" x2="400" y2="90" stroke="currentColor" className="text-border/30" strokeWidth="0.5" />
                                <defs>
                                    <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" /><stop offset="100%" stopColor="#6366F1" stopOpacity="0.02" /></linearGradient>
                                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6366F1" /><stop offset="50%" stopColor="#8B5CF6" /><stop offset="100%" stopColor="#EC4899" /></linearGradient>
                                </defs>
                                <path d="M0,90 Q30,85 60,75 T120,60 T180,45 T240,50 T300,30 T360,20 T400,15 L400,120 L0,120 Z" fill="url(#areaGrad)" />
                                <path d="M0,90 Q30,85 60,75 T120,60 T180,45 T240,50 T300,30 T360,20 T400,15" fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" />
                                <circle cx="120" cy="60" r="3.5" fill="#6366F1" /><circle cx="240" cy="50" r="3.5" fill="#8B5CF6" /><circle cx="360" cy="20" r="3.5" fill="#EC4899" />
                            </svg>
                            <div className="flex justify-between mt-2">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => <span key={d} className="text-[9px] text-muted-foreground">{d}</span>)}</div>
                        </div>
                        <div className="bg-muted/40 rounded-xl p-4 border border-border/30">
                            <span className="text-xs font-semibold text-foreground mb-3 block">Platforms</span>
                            <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto mb-3">
                                <circle cx="50" cy="50" r="38" fill="none" stroke="#E5E5E5" strokeWidth="12" />
                                <circle cx="50" cy="50" r="38" fill="none" stroke="#6366F1" strokeWidth="12" strokeDasharray="100 139" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 50 50)" />
                                <circle cx="50" cy="50" r="38" fill="none" stroke="#EC4899" strokeWidth="12" strokeDasharray="60 179" strokeDashoffset="-100" strokeLinecap="round" transform="rotate(-90 50 50)" />
                                <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="12" strokeDasharray="40 199" strokeDashoffset="-160" strokeLinecap="round" transform="rotate(-90 50 50)" />
                            </svg>
                            <div className="space-y-1.5">
                                {[{ n: "YouTube", p: "42%", c: "bg-primary" }, { n: "Instagram", p: "25%", c: "bg-chart-3" }, { n: "LinkedIn", p: "18%", c: "bg-chart-4" }].map(({ n, p, c }) => (
                                    <div key={n} className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${c}`} /><span className="text-[10px] text-muted-foreground flex-1">{n}</span><span className="text-[10px] font-semibold text-foreground">{p}</span></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ---- Marquee Logos ---- */
function MarqueeLogos({ inView }: { inView: boolean }) {
    const brands = ["YouTube", "Instagram", "LinkedIn", "TikTok", "X (Twitter)", "Shopify", "Meta", "Reddit", "Pinterest", "Snapchat"]
    const doubled = [...brands, ...brands]
    return (
        <div className={`transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest text-center mb-6">Tracking trends across</p>
            <div className="overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
                <div className="flex animate-marquee whitespace-nowrap">
                    {doubled.map((b, i) => (
                        <span key={i} className="mx-8 text-sm font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-smooth select-none">{b}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

/* ================================================================== */
export function LandingPage() {
    const router = useRouter()
    const [mobileNav, setMobileNav] = useState(false)

    const goToLogin = () => router.push("/login")

    const hero = useInView(0.1)
    const logos = useInView(0.3)
    const features = useInView()
    const howItWorks = useInView()

    const testimonials = useInView()
    const pricing = useInView()
    const cta = useInView()

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* NAVBAR */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <a href="#" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"><TrendingUp className="w-4 h-4 text-primary-foreground" /></div>
                            <span className="text-lg font-bold">TrendPredict<span className="text-primary">Pro</span></span>
                        </a>
                        <div className="hidden md:flex items-center gap-8">
                            {["Features", "How It Works", "Pricing"].map(l => <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-muted-foreground hover:text-foreground transition-smooth">{l}</a>)}
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            <DarkModeToggle />
                            <button onClick={() => goToLogin()} className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-smooth">Sign In</button>
                            <button onClick={() => goToLogin()} className="px-5 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-smooth">Sign Up</button>
                        </div>
                        <button className="md:hidden p-2" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
                    </div>
                </div>
                {mobileNav && (
                    <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg animate-fade-in">
                        <div className="px-4 py-4 space-y-3">
                            {["Features", "How It Works", "Pricing"].map(l => <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} onClick={() => setMobileNav(false)} className="block text-sm text-muted-foreground">{l}</a>)}
                            <hr className="border-border/50" />
                            <div className="flex items-center gap-2"><DarkModeToggle /><span className="text-sm text-muted-foreground">Toggle theme</span></div>
                            <button onClick={() => { goToLogin(); setMobileNav(false) }} className="block w-full text-left text-sm font-medium">Sign In</button>
                            <button onClick={() => { goToLogin(); setMobileNav(false) }} className="block w-full text-left text-sm font-semibold text-primary">Sign Up Free</button>
                        </div>
                    </div>
                )}
            </nav>

            {/* LIVE TICKER */}
            <div className="pt-16"><LiveTicker /></div>

            {/* HERO */}
            <section ref={hero.ref} className="relative pt-12 pb-8 md:pt-24 md:pb-16 px-4">
                <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl animate-mesh-1 pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-chart-3/5 blur-3xl animate-mesh-2 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full bg-chart-4/5 blur-3xl animate-mesh-3 pointer-events-none" />
                <div className={`max-w-5xl mx-auto text-center relative z-10 transition-all duration-700 ${hero.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />Now tracking 50K+ trends across platforms
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                        Don&apos;t Follow Trends<br />
                        <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent animate-gradient">Predict Them</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">The only platform that uses AI to tell you what will go viral — <strong className="text-foreground">weeks before it happens.</strong> Stop reacting. Start leading.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={() => goToLogin()} className="group flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-smooth shadow-lg shadow-primary/20">
                            Start Predicting Free<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <a href="#how-it-works" className="flex items-center gap-2 px-8 py-3.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-smooth">See How It Works<ChevronRight className="w-4 h-4" /></a>
                    </div>
                    <div className="mt-12 flex items-center justify-center gap-3">
                        <div className="flex -space-x-2">{["bg-primary", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"].map((c, i) => <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-background flex items-center justify-center text-[10px] font-bold text-white`}>{String.fromCharCode(65 + i)}</div>)}</div>
                        <div className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">10,000+</span> creators already predicting</div>
                    </div>
                    <HeroDashboardMockup />
                </div>
            </section>

            {/* LOGOS */}
            <section ref={logos.ref} className="py-12 md:py-16 px-4 border-y border-border/30"><MarqueeLogos inView={logos.inView} /></section>

            {/* INTERACTIVE DEMO */}
            <InteractiveDemo />

            {/* FEATURES */}
            <section id="features" ref={features.ref} className="py-20 md:py-28 px-4 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-16 transition-all duration-700 ${features.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Features</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to stay ahead</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">Powerful tools that give you the edge in content creation, marketing strategy, and brand growth.</p>
                    </div>
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${features.inView ? "stagger-children" : ""}`}>
                        {[
                            { icon: TrendingUp, title: "AI Predictions", desc: "ML models analyze millions of data points to forecast trends before they go viral.", color: "from-primary to-chart-2" },
                            { icon: BarChart3, title: "Multi-Platform Analytics", desc: "Track trend performance across YouTube, Instagram, LinkedIn, and more in one dashboard.", color: "from-chart-2 to-chart-3" },
                            { icon: Zap, title: "Real-Time Alerts", desc: "Get instant notifications when a trend is about to peak so you can act at the perfect moment.", color: "from-chart-4 to-orange-400" },
                            { icon: Users, title: "Team Collaboration", desc: "Invite your team, share insights, and coordinate trend-based strategies together.", color: "from-chart-5 to-emerald-400" },
                            { icon: ShoppingBag, title: "Trend Marketplace", desc: "Buy and sell premium trend reports, predictions, and curated insights from top analysts.", color: "from-chart-3 to-rose-400" },
                            { icon: Bell, title: "Smart ROI Tracking", desc: "Measure exactly how much revenue each trend-based action generates for your brand.", color: "from-primary to-chart-5" },
                        ].map(({ icon: Icon, title, desc, color }) => (
                            <div key={title} className="group relative p-6 bg-card border border-border/50 rounded-2xl hover:shadow-lg hover:border-primary/20 transition-smooth overflow-hidden">
                                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth shadow-md`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" ref={howItWorks.ref} className="py-20 md:py-28 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className={`text-center mb-16 transition-all duration-700 ${howItWorks.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">How It Works</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Three steps to predict the future</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">Connect, analyze, and profit — in minutes, not months.</p>
                    </div>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 transition-all duration-700 ${howItWorks.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        {[
                            { step: "01", title: "Connect Your Platforms", desc: "Link your social media accounts. We support YouTube, Instagram, LinkedIn, and more.", icon: Globe, color: "from-primary to-chart-2" },
                            { step: "02", title: "AI Analyzes Trends", desc: "Our ML models scan millions of signals — engagement, search volumes, sentiment shifts.", icon: Activity, color: "from-chart-2 to-chart-3" },
                            { step: "03", title: "Profit from Insights", desc: "Act on high-confidence predictions, track ROI, and outperform competitors every time.", icon: Sparkles, color: "from-chart-3 to-chart-4" },
                        ].map(({ step, title, desc, icon: Icon, color }, i) => (
                            <div key={step} className="relative text-center group">
                                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-smooth`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                {i < 2 && <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[2px]"><div className="w-full h-full bg-gradient-to-r from-border to-border/30 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-border" /></div></div>}
                                <div className="text-xs font-bold text-primary/40 mb-2">STEP {step}</div>
                                <h3 className="text-xl font-bold mb-2">{title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TREND TIMELINE */}
            <TrendTimeline />

            {/* VIDEO DEMO */}
            <VideoDemo />

            {/* COMPARISON TABLE */}
            <ComparisonTable onSignUp={() => goToLogin()} />

            {/* TESTIMONIALS */}
            <section ref={testimonials.ref} className="py-20 md:py-28 px-4 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-16 transition-all duration-700 ${testimonials.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Testimonials</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by creators worldwide</h2>
                    </div>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${testimonials.inView ? "stagger-children" : ""}`}>
                        {[
                            { name: "Priya Sharma", role: "Content Creator · 1.2M subs", quote: "TrendPredict Pro helped me identify a fitness trend 3 weeks before it blew up. My video got 5x more views than usual!", avatar: "PS", color: "bg-primary" },
                            { name: "Alex Chen", role: "Marketing Lead · SaaS Startup", quote: "We use it to plan our content calendar. The accuracy is insane — 9 out of 10 predictions are spot on.", avatar: "AC", color: "bg-chart-2" },
                            { name: "Maria González", role: "Brand Strategist · Agency", quote: "The marketplace is a goldmine. I purchased a trend report that led to our most viral campaign ever.", avatar: "MG", color: "bg-chart-3" },
                        ].map(({ name, role, quote, avatar, color }) => (
                            <div key={name} className="relative p-6 bg-card border border-border/50 rounded-2xl hover:shadow-md transition-smooth">
                                <div className="absolute top-4 right-5 text-5xl font-serif text-primary/10 leading-none select-none">&ldquo;</div>
                                <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-5 relative z-10">&ldquo;{quote}&rdquo;</p>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${color}`}>{avatar}</div>
                                    <div><p className="text-sm font-semibold">{name}</p><p className="text-xs text-muted-foreground">{role}</p></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section id="pricing" ref={pricing.ref} className="py-20 md:py-28 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className={`text-center mb-16 transition-all duration-700 ${pricing.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Pricing</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Plans for every ambition</h2>
                        <p className="text-muted-foreground">Start free, upgrade when you&apos;re ready. No credit card required.</p>
                    </div>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${pricing.inView ? "stagger-children" : ""}`}>
                        {[
                            { name: "Starter", price: "₹0", period: "forever", desc: "For individuals getting started", features: ["5 trend predictions / month", "1 platform", "Basic analytics", "Community support"], cta: "Get Started", popular: false },
                            { name: "Basic", price: "₹299", period: "/month", desc: "For serious creators & marketers", features: ["25 trend predictions / month", "3 platforms", "Standard analytics", "Email support", "Marketplace access"], cta: "Start Basic", popular: false },
                            { name: "Pro", price: "₹699", period: "/month", desc: "For professional agencies", features: ["Unlimited predictions", "All platforms", "Advanced analytics & ROI", "Priority support", "Marketplace access", "Team collaboration (3 seats)"], cta: "Start Pro Trial", popular: true },
                        ].map(({ name, price, period, desc, features: f, cta: t, popular }) => (
                            <div key={name} className={`relative p-8 rounded-2xl border transition-smooth ${popular ? "bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/15 scale-[1.02]" : "bg-card border-border/50 hover:shadow-md"}`}>
                                {popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-chart-4 text-foreground text-xs font-bold rounded-full">Most Popular</div>}
                                <p className={`text-sm font-semibold mb-1 ${popular ? "text-primary-foreground/80" : "text-primary"}`}>{name}</p>
                                <div className="flex items-baseline gap-1 mb-1"><span className="text-4xl font-bold">{price}</span>{period && <span className={`text-sm ${popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{period}</span>}</div>
                                <p className={`text-sm mb-6 ${popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{desc}</p>
                                <ul className="space-y-3 mb-8">{f.map(i => <li key={i} className="flex items-start gap-2 text-sm"><Check className={`w-4 h-4 mt-0.5 shrink-0 ${popular ? "text-primary-foreground" : "text-primary"}`} /><span>{i}</span></li>)}</ul>
                                <button onClick={() => goToLogin()} className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-smooth ${popular ? "bg-background text-foreground hover:opacity-90" : "bg-primary text-primary-foreground hover:opacity-90"}`}>{t}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BLOG PREVIEW */}
            <BlogPreview />

            {/* FAQ */}
            <FAQSection />

            {/* CTA BANNER */}
            <section ref={cta.ref} className="py-20 md:py-28 px-4 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" /></div>
                <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-700 ${cta.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to predict the next big trend?</h2>
                    <p className="text-muted-foreground max-w-lg mx-auto mb-8">Join 10,000+ creators and marketers who are already ahead of the curve.</p>
                    <button onClick={() => goToLogin()} className="group inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-smooth shadow-lg shadow-primary/20">
                        Get Started — It&apos;s Free<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-border/50 py-16 px-4 bg-muted/20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"><TrendingUp className="w-4 h-4 text-primary-foreground" /></div>
                                <span className="text-base font-bold">TrendPredict<span className="text-primary">Pro</span></span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">AI-powered trend predictions for the modern creator economy.</p>
                        </div>
                        {[
                            { title: "Product", links: ["Features", "Pricing", "Marketplace", "Analytics", "API"] },
                            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
                            { title: "Resources", links: ["Documentation", "Help Center", "Community", "Status"] },
                            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
                        ].map(({ title, links }) => (
                            <div key={title}><p className="text-sm font-semibold mb-4">{title}</p><ul className="space-y-2.5">{links.map(l => <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">{l}</a></li>)}</ul></div>
                        ))}
                    </div>
                    <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-muted-foreground">© 2026 TrendPredict Pro. All rights reserved.</p>
                        <div className="flex items-center gap-4">{["X", "LinkedIn", "YouTube"].map(s => <a key={s} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-smooth">{s}</a>)}</div>
                    </div>
                </div>
            </footer>

        </div>
    )
}
