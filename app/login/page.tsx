"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TrendingUp, Mail, Lock, User, Eye, EyeOff, ArrowRight, Github, Sparkles } from "lucide-react"
import { DarkModeToggle } from "@/components/landing/dark-mode-toggle"
import { supabase } from "@/lib/supabase"

/* ------------------------------------------------------------------ */
/*  Ultra-Minimalist Left Panel                                       */
/* ------------------------------------------------------------------ */
function MinimalistLeftPanel() {
    return (
        <div className="relative w-full h-full flex flex-col justify-center px-16 bg-[#09090B] select-none overflow-hidden">
            {/* Animated mesh gradients */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-mesh-1" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-chart-3/10 blur-[100px] animate-mesh-2" />
            
            {/* Logo at top corner */}
            <div className="absolute top-12 left-12 animate-fade-in">
                <a href="/" className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center shadow-lg shadow-primary/20">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">TrendPredict<span className="text-primary">Pro</span></span>
                </a>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-white/60 mb-8 animate-fade-in-up">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span>AI-Powered Trend Intelligence</span>
                </div>
                <h1 className="text-[64px] font-bold leading-[1.05] text-white tracking-tight mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                    Stay <span className="text-primary">Ahead</span><br />
                    Of The Curve.
                </h1>
                <p className="text-lg text-white/40 max-w-sm font-medium leading-relaxed animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                    The world moves fast. We help you see where it's going before everyone else does.
                </p>
            </div>

            {/* Subtle footer text */}
            <div className="absolute bottom-12 left-12 opacity-30 animate-fade-in" style={{ animationDelay: "400ms" }}>
                <p className="text-[10px] text-white font-semibold uppercase tracking-[0.2em]">
                    Enterprise Ready • AI Enabled
                </p>
            </div>
        </div>
    )
}

/* ================================================================== */
/*  MAIN LOGIN PAGE                                                     */
/* ================================================================== */
export default function LoginPage() {
    const router = useRouter()
    const [mode, setMode] = useState<"signin" | "signup">("signin")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        if (!email || !password) return setError("Please fill in all fields.")
        if (mode === "signup" && !name) return setError("Please enter your name.")
        setIsLoading(true)
        
        // Real Supabase Auth
        try {
            if (mode === "signup") {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name,
                        }
                    }
                })
                if (error) throw error
                if (data.user) {
                   localStorage.setItem("tpp_user", JSON.stringify({ name, email, loggedIn: true }))
                   router.push("/dashboard")
                }
            } else {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                if (data.user) {
                   localStorage.setItem("tpp_user", JSON.stringify({ name: data.user.user_metadata.full_name || email.split("@")[0], email, loggedIn: true }))
                   router.push("/dashboard")
                }
            }
        } catch (err: any) {
            setError(err.message || "Authentication failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setIsLoading(true)
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/dashboard`
                }
            })
            if (error) throw error
        } catch (err: any) {
            setError(err.message || "Google login failed.")
            setIsLoading(false)
        }
    }

    return (
        <div className={`min-h-screen bg-background flex selection:bg-primary/20 transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
            {/* ===== LEFT — Minimalist Brand Panel ===== */}
            <div className="hidden lg:flex lg:w-[45%] border-r border-border/40 relative">
                <MinimalistLeftPanel />
            </div>

            {/* ===== RIGHT — Auth Form ===== */}
            <div className="flex-1 flex flex-col bg-background relative overflow-hidden">
                {/* Visual accents */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-chart-3/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                {/* Top Header */}
                <div className="flex items-center justify-between px-8 py-6 relative z-10">
                    <div className="lg:hidden flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-bold">TrendPredict<span className="text-primary">Pro</span></span>
                    </div>
                    <div className="ml-auto flex items-center gap-6">
                        <DarkModeToggle />
                        <button
                            onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError("") }}
                            className="text-[13px] font-semibold text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                            {mode === "signin" ? "Create an account" : "Sign in to account"}
                        </button>
                    </div>
                </div>

                {/* Form area */}
                <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
                    <div className="w-full max-w-[400px] animate-fade-in-up">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-foreground tracking-tight mb-2">
                                {mode === "signin" ? "Welcome back" : "Create account"}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {mode === "signin" ? "Enter your credentials to access your dashboard" : "Join our community of elite trend predictors"}
                            </p>
                        </div>

                        {/* Social buttons - Google focus */}
                        <div className="mb-8">
                            <button 
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border/60 bg-card/40 hover:bg-muted/60 transition-all duration-200 text-[13px] font-bold shadow-sm disabled:opacity-50"
                            >
                                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Continue with Google
                            </button>
                        </div>

                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/40"></div></div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold">
                                <span className="bg-background px-4 text-muted-foreground/50">Or continue with</span>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 px-4 py-3 bg-destructive/5 border border-destructive/10 rounded-xl text-[13px] text-destructive font-semibold animate-fade-in">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === "signup" && (
                                <div className="space-y-1.5 animate-fade-in">
                                    <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full pl-11 pr-4 py-3 bg-muted/40 border border-border/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all duration-200"
                                        />
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider ml-1">Email Address</label>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@company.com"
                                        className="w-full pl-11 pr-4 py-3 bg-muted/40 border border-border/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all duration-200"
                                    />
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider">Password</label>
                                    {mode === "signin" && (
                                        <button type="button" className="text-[11px] font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider">Forgot?</button>
                                    )}
                                </div>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-11 py-3 bg-muted/40 border border-border/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all duration-200"
                                    />
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground rounded-xl text-[13px] font-bold hover:opacity-95 disabled:opacity-50 transition-all duration-200 shadow-xl shadow-primary/20 mt-6 overflow-hidden relative"
                            >
                                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    <>
                                        {mode === "signin" ? "Sign in to Dashboard" : "Create Account"}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="text-center text-[11px] text-muted-foreground/60 mt-8 leading-relaxed max-w-[280px] mx-auto">
                            By signing in, you agree to our <a href="#" className="underline underline-offset-2 hover:text-primary transition-colors">Terms of Service</a> and <a href="#" className="underline underline-offset-2 hover:text-primary transition-colors">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
