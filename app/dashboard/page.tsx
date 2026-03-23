"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout"
import { Dashboard } from "@/components/dashboard"

export default function DashboardPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<{ name: string; email: string } | null>(null)

    useEffect(() => {
        const stored = localStorage.getItem("tpp_user")
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                if (parsed.loggedIn) {
                    setUser(parsed)
                    setLoading(false)
                    return
                }
            } catch { }
        }
        // Not logged in — redirect to login
        router.push("/login")
    }, [router])

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <MainLayout>
            <Dashboard />
        </MainLayout>
    )
}
