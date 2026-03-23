"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout"
import { InstagramTrends } from "@/components/instagram-trends"

export default function InstagramTrendsPage() {
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
                    <div className="w-8 h-8 border-3 border-purple-400/30 border-t-purple-500 rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">Loading Instagram Trends...</p>
                </div>
            </div>
        )
    }

    return (
        <MainLayout>
            <InstagramTrends />
        </MainLayout>
    )
}
