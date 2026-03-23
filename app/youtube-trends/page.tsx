"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout"
import { YouTubeTrends } from "@/components/youtube-trends"

export default function YouTubeTrendsPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem("tpp_user")
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                if (parsed.loggedIn) {
                    setLoading(false)
                    return
                }
            } catch { }
        }
        router.push("/login")
    }, [router])

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-red-400/30 border-t-red-500 rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">Loading YouTube Trends...</p>
                </div>
            </div>
        )
    }

    return (
        <MainLayout>
            <YouTubeTrends />
        </MainLayout>
    )
}
