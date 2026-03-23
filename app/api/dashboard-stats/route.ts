import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import path from "path"

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD STATS — Computed from predictions cache + Reddit
   Returns real metrics for the dashboard
   ═══════════════════════════════════════════════════════════════ */

const PREDICTIONS_CACHE = path.join(process.cwd(), "predictions_cache.json")
const REDDIT_SUBS = ["Delhi", "india", "indiasocial", "indiancreators", "bollywood"]

async function getRedditHot() {
    try {
        const fetches = REDDIT_SUBS.map(async (sub) => {
            try {
                const res = await fetch(
                    `https://www.reddit.com/r/${sub}/hot.json?limit=5&raw_json=1`,
                    { headers: { "User-Agent": "TrendPredictPro/1.0" }, next: { revalidate: 600 } }
                )
                if (!res.ok) return []
                const json = await res.json()
                return (json?.data?.children || []).map((c: any) => ({
                    title: c.data?.title || "",
                    score: c.data?.score || 0,
                    comments: c.data?.num_comments || 0,
                    sub: c.data?.subreddit || sub,
                }))
            } catch { return [] }
        })
        const results = await Promise.allSettled(fetches)
        const all: any[] = []
        for (const r of results) if (r.status === "fulfilled") all.push(...r.value)
        return all.sort((a, b) => (b.score + b.comments) - (a.score + a.comments))
    } catch { return [] }
}

export async function GET() {
    try {
        // Read predictions cache
        let predictions: any = null
        try {
            const raw = await readFile(PREDICTIONS_CACHE, "utf-8")
            predictions = JSON.parse(raw)
        } catch {}

        // Get Reddit signals
        const reddit = await getRedditHot()

        // Compute stats from predictions
        const ytPreds = predictions?.youtube || []
        const igPreds = predictions?.instagram || []
        const allPreds = [...ytPreds, ...igPreds]

        // Domain breakdown
        const domains = [ "Tech", "Education", "Entertainment", "Food"]
        const domainStats = domains.map(d => {
            const domPreds = allPreds.filter((p: any) => p.domain === d)
            const avgConf = domPreds.length
                ? Math.round(domPreds.reduce((s: number, p: any) => s + (p.confidence || 0), 0) / domPreds.length)
                : 0
            return {
                domain: d,
                predictions: domPreds.length,
                avgConfidence: avgConf,
                ytCount: ytPreds.filter((p: any) => p.domain === d).length,
                igCount: igPreds.filter((p: any) => p.domain === d).length,
            }
        })

        // Top predictions (highest confidence)
        const topPredictions = [...allPreds]
            .sort((a: any, b: any) => (b.confidence || 0) - (a.confidence || 0))
            .slice(0, 6)
            .map((p: any) => ({
                title: p.title,
                platform: p.platform === "youtube" ? "YouTube" : "Instagram",
                domain: p.domain || "General",
                confidence: p.confidence || 0,
                engagement: p.engagement || "High",
                peakIn: p.peakIn || "24h",
            }))

        // Recent activity from reddit
        const recentActivity = reddit.slice(0, 5).map((r: any, i: number) => ({
            id: i + 1,
            action: `Trending on r/${r.sub}`,
            detail: r.title.length > 60 ? r.title.slice(0, 60) + "…" : r.title,
            score: r.score,
            comments: r.comments,
        }))

        // Overall stats
        const totalPredictions = allPreds.length
        const avgAccuracy = allPreds.length
            ? Math.round(allPreds.reduce((s: number, p: any) => s + (p.confidence || 0), 0) / allPreds.length)
            : 0
        const highConfCount = allPreds.filter((p: any) => (p.confidence || 0) >= 90).length
        const platformMix = {
            youtube: ytPreds.length,
            instagram: igPreds.length,
        }

        return NextResponse.json({
            success: true,
            stats: {
                totalPredictions,
                avgAccuracy,
                highConfidenceCount: highConfCount,
                platformMix,
                activeDomains: domains.length,
                redditSignals: reddit.length,
            },
            domainStats,
            topPredictions,
            recentActivity,
            source: predictions ? "predictions_cache + reddit" : "reddit_only",
            generatedAt: predictions?.generatedAt || new Date().toISOString(),
        })
    } catch (error) {
        console.error("[dashboard-stats] Error:", error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
