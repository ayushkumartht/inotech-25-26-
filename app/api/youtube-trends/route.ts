import { NextResponse } from "next/server"
import { readFile, writeFile, mkdir } from "fs/promises"
import path from "path"
import { generateAIJSON } from "@/lib/ai-provider"

const DOMAIN_CATEGORY_MAP: Record<string, string> = {
    tech: "28", education: "27", entertainment: "24", food: "26",
}

const DOMAIN_CONTEXT: Record<string, string> = {
    tech: "AI tools, gadget reviews, coding, startups, smartphones",
    education: "UPSC, JEE, Python, English speaking, career guidance",
    entertainment: "Bollywood, anime, stand-up comedy, movie reactions, gaming",
    food: "street food india challenge trending, recipes",
}

const REDDIT_SUBS = ["Delhi", "india", "indiasocial", "IndianGaming", "bollywood", "developersIndia", "indiancreators", "IndianFood"]
const CACHE_DIR = path.join(process.cwd(), ".cache")
const CACHE_TTL = 4 * 60 * 60 * 1000 

async function readDomainCache(domain: string) {
    try {
        const raw = await readFile(path.join(CACHE_DIR, `yt_trends_${domain}.json`), "utf-8")
        const data = JSON.parse(raw)
        if (Date.now() - new Date(data.timestamp).getTime() < CACHE_TTL) {
            const hasPredictions = data.videos?.some((v: any) => v.prediction !== null)
            if (!hasPredictions && data.videos?.length > 0) return null
            return data
        }
    } catch { }
    return null
}

async function writeDomainCache(domain: string, data: any) {
    try {
        await mkdir(CACHE_DIR, { recursive: true })
        await writeFile(path.join(CACHE_DIR, `yt_trends_${domain}.json`), JSON.stringify(data, null, 2), "utf-8")
    } catch { }
}

async function getRedditContext(): Promise<string> {
    try {
        const fetches = REDDIT_SUBS.map(async (sub) => {
            try {
                const res = await fetch(
                    `https://www.reddit.com/r/${sub}/hot.json?limit=12&raw_json=1`,
                    { headers: { "User-Agent": "TrendPredictPro/1.0" }, next: { revalidate: 3600 } }
                )
                if (!res.ok) return []
                const json = await res.json()
                return (json?.data?.children || []).map((c: any) => ({
                    title: c.data?.title || "", score: (c.data?.score || 0) + (c.data?.num_comments || 0), sub,
                }))
            } catch { return [] }
        })
        const results = await Promise.allSettled(fetches)
        const posts: any[] = []
        for (const r of results) if (r.status === "fulfilled") posts.push(...r.value)
        if (!posts.length) return ""
        return `\nREDDIT SIGNALS:\n` + posts.sort((a, b) => b.score - a.score).slice(0, 20)
            .map((p, i) => `${i + 1}. [r/${p.sub}] "${p.title}"`).join("\n")
    } catch { return "" }
}

async function fetchYouTubeTrending(domain: string) {
    const apiKey = process.env.YOUTUBE_API_KEY
    if (!apiKey) return []
    try {
        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&chart=mostPopular&regionCode=IN&maxResults=4&videoCategoryId=${DOMAIN_CATEGORY_MAP[domain] || "0"}&key=${apiKey}`,
            { next: { revalidate: 3600 } }
        )
        if (!res.ok) return []
        const data = await res.json()
        return (data.items || []).map((item: any) => ({
            videoId: item.id,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || "",
            channelTitle: item.snippet.channelTitle,
            viewCount: parseInt(item.statistics?.viewCount || "0"),
            likeCount: parseInt(item.statistics?.likeCount || "0"),
            commentCount: parseInt(item.statistics?.commentCount || "0"),
            publishedAt: item.snippet.publishedAt,
        }))
    } catch { return [] }
}

const DOMAIN_SEARCH_TERMS: Record<string, string> = {
    tech: "best gadgets AI tools india trending",
    education: "UPSC preparation tips india trending",
    entertainment: "bollywood trending india movies",
    food: "street food india challenge trending",
}

async function fetchYouTubeSearch(domain: string) {
    const apiKey = process.env.YOUTUBE_API_KEY
    if (!apiKey) return []
    try {
        const q = encodeURIComponent(DOMAIN_SEARCH_TERMS[domain] || domain + " trending india")
        const searchRes = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&regionCode=IN&maxResults=4&order=viewCount&key=${apiKey}`,
            { next: { revalidate: 3600 } }
        )
        if (!searchRes.ok) return []
        const searchData = await searchRes.json()
        const videoIds = (searchData.items || []).map((i: any) => i.id?.videoId).filter(Boolean)
        if (videoIds.length === 0) return []
        const statsRes = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds.join(",")}&key=${apiKey}`,
            { next: { revalidate: 3600 } }
        )
        if (!statsRes.ok) return []
        const statsData = await statsRes.json()
        return (statsData.items || []).map((item: any) => ({
            videoId: item.id,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || "",
            channelTitle: item.snippet.channelTitle,
            viewCount: parseInt(item.statistics?.viewCount || "0"),
            likeCount: parseInt(item.statistics?.likeCount || "0"),
            commentCount: parseInt(item.statistics?.commentCount || "0"),
            publishedAt: item.snippet.publishedAt,
        }))
    } catch { return [] }
}

async function analyzeVideos(videos: any[], domain: string, redditCtx: string) {
    const summary = videos.slice(0, 8).map((v, i) =>
        `${i + 1}. "${v.title}" by ${v.channelTitle} (${(v.viewCount / 1000).toFixed(0)}K views)`
    ).join("\n")
    const prompt = `Analyst: YT India (${domain}).
    Videos: ${summary}
    ${redditCtx ? `Reddit: ${redditCtx}` : ""}
    Task: Return JSON array of analysis objects for each video.
    Only JSON.`
    return await generateAIJSON(prompt, `yt-trends/${domain}`)
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const domain = searchParams.get("domain") || "tech"
        const cached = await readDomainCache(domain)
        if (cached) return NextResponse.json(cached)

        const [redditCtx, ytVideos] = await Promise.all([getRedditContext(), fetchYouTubeTrending(domain)])
        let realVideos = ytVideos.slice(0, 4)
        if (realVideos.length === 0) realVideos = (await fetchYouTubeSearch(domain)).slice(0, 4)

        if (realVideos.length > 0) {
            const predictions = await analyzeVideos(realVideos, domain, redditCtx)
            const source = (ytVideos.length > 0 ? "youtube_trending" : "youtube_search") + (predictions.length > 0 ? " + gemini" : "")
            const result = {
                success: true, domain, source,
                videos: realVideos.map((v: any, i: number) => ({ ...v, prediction: predictions[i] || null, })),
                timestamp: new Date().toISOString(),
            }
            if (predictions.length > 0) await writeDomainCache(domain, result)
            return NextResponse.json(result)
        }
        return NextResponse.json({ success: false, domain, videos: [], timestamp: new Date().toISOString() })
    } catch (error) {
        return NextResponse.json({ success: false, videos: [] }, { status: 200 })
    }
}
