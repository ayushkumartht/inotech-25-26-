import { NextResponse } from "next/server"
import { MOCK_PREDICTIONS, type EnhancedPrediction } from "@/lib/data/mock-predictions"
import { readFile, writeFile } from "fs/promises"
import path from "path"
import { generateAIJSON } from "@/lib/ai-provider"

/* 
  PREDICTIONS API - Gemini Solo
  India (March 2026)
*/

const DOMAINS = ["Tech", "Education", "Entertainment", "Food"] as const
const REDDIT_SUBS = ["Delhi", "india", "IndianVideos", "indiasocial", "bollywood", "indiancreators"]
const CACHE_FILE = path.join(process.cwd(), "predictions_cache.json")
const INSTA_CACHE_FILE = path.join(process.cwd(), "insta_cache.json")
const REDDIT_CACHE_FILE = path.join(process.cwd(), "reddit_cache.json")
const CACHE_TTL = 4 * 60 * 60 * 1000 

const DOMAIN_CONTEXT: Record<string, string> = {
  Tech: "AI tools, gadget reviews, coding tutorials, startups, SaaS, smartphones, laptops, Raspberry Pi, home lab, open source, ChatGPT, automation, app reviews",
  Education: "study tips, UPSC preparation, online courses, EdTech, career guidance, Pomodoro technique, competitive exams, skill development, finance fundamentals, Indian history",
  Entertainment: "Bollywood, K-Pop mashups, stand-up comedy, memes, anime edits, celebrity news, AI short films, POV comedy, regional comedy, music remixes, transition reels",
  Food: "street food ASMR, budget recipes, bento box prep, cloud coffee, one-pot meals, food challenges, thali reviews, restaurant reviews, cooking hacks, food photography",
}

interface RedditSignal { title: string; upvotes: number; comments: number; subreddit: string }

async function fetchRedditSignals(): Promise<RedditSignal[]> {
  try {
    // Try reading cache from PRAW scraper first
    try {
      const raw = await readFile(REDDIT_CACHE_FILE, "utf-8")
      const cached = JSON.parse(raw)
      if (Array.isArray(cached) && cached.length > 0) return cached.slice(0, 30)
    } catch {}

    const all: RedditSignal[] = []
    const fetches = REDDIT_SUBS.map(async (sub) => {
      try {
        const res = await fetch(
          `https://www.reddit.com/r/${sub}/hot.json?limit=10&raw_json=1`,
          { headers: { "User-Agent": "TrendPredictPro/1.0", Accept: "application/json" }, next: { revalidate: 600 } }
        )
        if (!res.ok) return []
        const json = await res.json()
        return (json?.data?.children || []).map((c: any) => ({
          title: c.data?.title || "", upvotes: c.data?.score || 0,
          comments: c.data?.num_comments || 0, subreddit: c.data?.subreddit || sub,
        }))
      } catch { return [] }
    })
    const results = await Promise.allSettled(fetches)
    for (const r of results) if (r.status === "fulfilled") all.push(...r.value)
    return all.sort((a, b) => (b.upvotes + b.comments) - (a.upvotes + a.comments)).slice(0, 30)
  } catch { return [] }
}

interface InstaCache {
  posts: Array<{
    owner: string; caption: string; hashtags: string[];
    likes: number; comments: number; content_type: string; source_profile: string;
  }>
  analysis: {
    total_posts_analyzed: number;
    top_hashtags: Array<{ tag: string; count: number }>;
    content_type_distribution: Record<string, number>;
    avg_likes: number; avg_comments: number;
    top_performing_posts: Array<any>;
    profiles_scraped: string[];
  }
  updated_at: string;
}

async function readInstaCache(): Promise<InstaCache | null> {
  try {
    const raw = await readFile(INSTA_CACHE_FILE, "utf-8")
    const data = JSON.parse(raw)
    if (data.success && data.posts?.length > 0) return data
    return null
  } catch { return null }
}

function buildInstaContext(insta: InstaCache | null): string {
  if (!insta?.analysis) return ""
  const a = insta.analysis
  const topTags = (a.top_hashtags || []).slice(0, 15).map(t => `#${t.tag}(${t.count})`).join(", ")
  const topPosts = (a.top_performing_posts || []).slice(0, 6).map((p: any, i: number) =>
    `${i + 1}. @${p.owner}: "${(p.caption || "").slice(0, 80)}..." [${p.content_type}] L:${p.likes} C:${p.comments}`
  ).join("\n")
  return `
INSTAGRAM DATA:
Posts: ${a.total_posts_analyzed} | Avg Likes: ${a.avg_likes} | Avg Comments: ${a.avg_comments}
Trending Hashtags: ${topTags}
Top Posts:
${topPosts}`
}

interface PredictionCache {
  youtube: EnhancedPrediction[]
  instagram: EnhancedPrediction[]
  generatedAt: string
  source: string
}

async function readCache(): Promise<PredictionCache | null> {
  try {
    const raw = await readFile(CACHE_FILE, "utf-8")
    const data = JSON.parse(raw) as PredictionCache
    const age = Date.now() - new Date(data.generatedAt).getTime()
    if (age < CACHE_TTL) return data
    return null
  } catch { return null }
}

async function writeCache(data: PredictionCache) {
  try { await writeFile(CACHE_FILE, JSON.stringify(data, null, 2), "utf-8") } catch { }
}

async function generateAllPredictions(
  platform: "youtube" | "instagram",
  redditSignals: RedditSignal[],
  instaCtx: string,
): Promise<EnhancedPrediction[]> {
  const pf = platform === "youtube" ? "YouTube" : "Instagram"
  const pid = platform === "youtube" ? "yt" : "ig"
  const ts = Date.now()
  const TOXIC_KEYWORDS = ["rape", "murder", "kill", "attack", "mob", "crime", "abuse", "convicted", "violence", "threat", "scam", "fraud"]
  
  const filteredSignals = redditSignals.filter(s => 
    !TOXIC_KEYWORDS.some(k => s.title.toLowerCase().includes(k))
  )

  const redditCtx = filteredSignals.length > 0
    ? filteredSignals
        .sort((a, b) => (b.upvotes + b.comments) - (a.upvotes + a.comments))
        .slice(0, 25) // Slightly less for more focus
        .map((p, i) => `${i + 1}. [r/${p.subreddit}] ${p.title} (${p.upvotes}↑)`)
        .join("\n")
    : ""
    
  const instaInstruction = platform === "instagram" 
    ? "Focus on high-energy Instagram Reels, transition trends, and viral aesthetics. Provide ideas for visual styles and trending music styles."
    : "Focus on medium-to-long form YouTube videos, tutorials, or lifestyle vlogs. Suggest structure for visuals and storytelling."

  const allPredictions: EnhancedPrediction[] = []

  console.log(`[AI] Starting prediction generation for ${pf}. Signals found: ${filteredSignals.length}`)

  for (const domain of DOMAINS) {
    console.log(`[AI] Generating 5 predictions for ${domain}...`)
    const domainPrompt = `Analyst: ${pf} India Trend Expert.
    Target: ${pf} Marketplace - ${domain} Category.
    
    SAFETY RULE: Use the signals below ONLY to identify positive trends, interests, or discussions. 
    Strictly avoid generating anything related to crime, sensitive politics, or harmful behavior.
    
    CONTEXT:
    Domain: ${domain} - ${DOMAIN_CONTEXT[domain]}
    
    SIGNALS FROM REDDIT:
    ${redditCtx || "No specific signals, generate based on current Indian trends."}
    
    ${instaCtx || ""}
    
    TASK:
    Generate EXACTLY 5 high-performing, positive, and distinct ${pf} trends for ${domain}.
    ${instaInstruction}
    
    RULES:
    - Output ONLY a JSON array of 5 objects.
    - IDs: "${pid}-${domain.toLowerCase()}-N-${ts}"
    - Confidence: 92-99
    
    FORMAT:
    JSON array: {id, platform: "${platform}", domain: "${domain}", title, description, fullDescription, howToMake: {visuals: string[3], audio, script, editingStyle}, peakIn, confidence, engagement, tags: string[3]}.`

    let domainParsed: EnhancedPrediction[] = []
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const result = await generateAIJSON<EnhancedPrediction>(domainPrompt, `predictions/${platform}/${domain}`)
        if (result && result.length >= 3) { 
          domainParsed = result
          break
        }
      } catch (e) {
        console.error(`[AI] Domain ${domain} Attempt ${attempt} failed.`)
      }
      if (attempt < 3) await new Promise(r => setTimeout(r, 1000 * attempt))
    }

    if (domainParsed.length > 0) {
      allPredictions.push(...domainParsed)
    } else {
      console.warn(`[AI] Domain ${domain} failed, falling back to MOCK for this domain.`)
      allPredictions.push(...MOCK_PREDICTIONS.filter(p => p.platform === platform && p.domain === domain).slice(0, 5))
    }
  }

  return allPredictions.length > 0 ? allPredictions : MOCK_PREDICTIONS.filter(p => p.platform === platform).slice(0, 20)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const platformParam = searchParams.get("platform")?.toLowerCase()
  const platform = (platformParam === "youtube" || platformParam === "instagram") ? platformParam : null
  const forceRefresh = searchParams.get("refresh") === "true"

  try {
    if (!forceRefresh) {
      const cached = await readCache()
      if (cached) {
        let p = platform ? (platform === "youtube" ? cached.youtube : cached.instagram) : [...cached.youtube, ...cached.instagram]
        
        // SAFE FALLBACK: If cache has empty arrays, use mock data
        if (p.length === 0) {
          p = MOCK_PREDICTIONS.filter(x => platform ? x.platform === platform : true)
        }

        const ageMs = Date.now() - new Date(cached.generatedAt).getTime()
        const canRefresh = ageMs >= CACHE_TTL
        return NextResponse.json({
          success: true, predictions: p, count: p.length,
          source: cached.source + " (cached)", generatedAt: cached.generatedAt,
          canRefresh, nextRefreshIn: canRefresh ? 0 : Math.ceil((CACHE_TTL - ageMs) / 60000),
          debug_platform: platform,
        })
      }
    }

    const [redditSignals, instaCache] = await Promise.all([fetchRedditSignals(), readInstaCache()])
    const instaCtx = buildInstaContext(instaCache)
    const ytPredictions = await generateAllPredictions("youtube", redditSignals, instaCtx)
    const igPredictions = await generateAllPredictions("instagram", redditSignals, instaCtx)

    const source = (ytPredictions.length > 0 ? "gemini_ai" : "mock") + (redditSignals.length > 0 ? " + reddit" : "")
    const cacheData: PredictionCache = {
      youtube: ytPredictions, instagram: igPredictions,
      generatedAt: new Date().toISOString(), source
    }
    await writeCache(cacheData)

    let predictions = platform ? (platform === "youtube" ? ytPredictions : igPredictions) : [...ytPredictions, ...igPredictions]
    
    // SAFE FALLBACK: If combined result is empty, use mock data
    if (predictions.length === 0) {
      console.log(`[API] Results empty for ${platform || 'all'}, falling back to MOCK_PREDICTIONS`)
      predictions = MOCK_PREDICTIONS.filter(p => platform ? p.platform === platform : true)
    }

    return NextResponse.json({
      success: true, predictions, count: predictions.length,
      source, generatedAt: cacheData.generatedAt,
      canRefresh: false, nextRefreshIn: Math.ceil(CACHE_TTL / 60000),
      debug_platform: platform,
    })
  } catch (error) {
    let p = MOCK_PREDICTIONS
    if (platform) p = p.filter(x => x.platform === platform)
    return NextResponse.json({ success: true, predictions: p, source: "fallback" })
  }
}
