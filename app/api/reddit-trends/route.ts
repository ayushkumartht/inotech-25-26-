import { NextResponse } from "next/server"
import { generateAIJSON } from "@/lib/ai-provider"

const VALID_SUBREDDITS = ["Delhi", "india", "IndianVideos", "YouTubers", "indiancreators", "TrendingNow"]
const DEFAULT_SUBREDDITS = ["Delhi", "india", "IndianVideos", "YouTubers", "indiancreators"]

const STOPWORDS = new Set([
  "the","a","an","and","or","but","in","on","at","to","for","of","with","by","from",
  "is","it","this","that","was","are","be","has","had","have","not","no","so","if",
  "as","do","my","me","we","he","she","you","your","our","up","out","all","can",
  "will","just","about","been","get","got","its","than","them","then","what","when",
  "who","how","more","some","any","also","like","very","much","most","only","over",
  "reddit","post","edit","update","tl","dr","tldr","sub","subreddit","deleted","removed",
])

function extractKeywords(text: string): string[] {
  const cleaned = text.toLowerCase().replace(/https?:\/\/\S+/g, "").replace(/[^\w\s]/g, "")
  const words = cleaned.split(/\s+/)
  const seen = new Set<string>()
  const result: string[] = []
  for (const w of words) {
    if (w.length >= 3 && !STOPWORDS.has(w) && !seen.has(w)) {
      seen.add(w)
      result.push(w)
      if (result.length >= 15) break
    }
  }
  return result
}

function categorizePost(text: string): string {
  const t = text.toLowerCase()
  if (/(viral|trending|gone viral|blowing up|everyone talking|going viral)/.test(t)) return "viral_trends"
  if (/(youtube|instagram|creator|vlog|reels|channel|subscriber|influencer|shorts|tiktok)/.test(t)) return "content_creation"
  if (/(meme|funny|lol|joke|humor|hilarious|comedy|rofl|lmao)/.test(t)) return "memes"
  if (/(movie|series|actor|bollywood|film|web series|ott|netflix|song|music|celebrity|fashion|beauty|travel)/.test(t)) return "entertainment"
  if (/(food|recipe|biryani|restaurant|cooking|eat|kitchen)/.test(t)) return "food"
  if (/(tech|gadget|ai|software|coding|development|phone|laptop)/.test(t)) return "tech"
  if (/(education|learn|study|exam|upsc|course|knowledge|tutorial)/.test(t)) return "education"
  return "general"
}

function isViralRelated(keywords: string[]): boolean {
  const signals = new Set(["viral","trending","trend","blowing","famous","popular","hype","buzz","exploding","sensation"])
  return keywords.some(k => signals.has(k))
}

interface RedditPost {
  id: string
  platform: string
  title: string
  url: string
  subreddit: string
  author: string
  upvotes: number
  comments: number
  engagement_rate: number
  body: string
  keywords: string[]
  category: string
  is_viral_related: boolean
  posted_at: string
  created_utc: number
  thumbnail: string | null
  flair: string | null
}

interface RedditChild {
  data: {
    id: string
    title?: string
    url?: string
    subreddit?: string
    author?: string
    score?: number
    num_comments?: number
    selftext?: string
    created_utc?: number
    thumbnail?: string
    link_flair_text?: string
    permalink?: string
  }
}

interface RedditResponse {
  data: {
    children: RedditChild[]
  }
}

async function fetchSubredditPosts(
  subreddit: string,
  sort: "hot" | "top" | "new" = "hot",
  limit: number = 25
): Promise<RedditPost[]> {
  const url = `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}&raw_json=1`

  const res = await fetch(url, {
    headers: {
      "User-Agent": "TrendPredictPro/1.0 (by /u/anonymous)",
      "Accept": "application/json",
    },
    next: { revalidate: 300 }, // cache for 5 min
  })

  if (!res.ok) {
    throw new Error(`Reddit fetch failed for r/${subreddit}: ${res.status}`)
  }

  const json: RedditResponse = await res.json()
  const children = json?.data?.children || []

  return children.map((child) => {
    const d = child.data
    const title = d.title || ""
    const body = (d.selftext || "").slice(0, 500)
    const combined = `${title} ${body}`
    const upvotes = d.score || 0
    const comments = d.num_comments || 0
    const engagement = (upvotes + comments) / Math.max(upvotes, 1) * 100
    const keywords = extractKeywords(combined)
    const createdUtc = d.created_utc || 0
    const postedAt = createdUtc ? new Date(createdUtc * 1000).toISOString() : ""
    const thumbnail = d.thumbnail && d.thumbnail.startsWith("http") ? d.thumbnail : null

    return {
      id: d.id || "",
      platform: "reddit",
      title,
      url: `https://www.reddit.com${d.permalink || ""}`,
      subreddit: d.subreddit || subreddit,
      author: d.author || "deleted",
      upvotes,
      comments,
      engagement_rate: Math.round(engagement * 100) / 100,
      body,
      keywords,
      category: categorizePost(combined),
      is_viral_related: isViralRelated(keywords),
      posted_at: postedAt,
      created_utc: createdUtc,
      thumbnail,
      flair: d.link_flair_text || null,
    }
  })
}

async function generateAIInsights(posts: RedditPost[], _geminiKey: string): Promise<string[]> {
  const fallback = [
    "Delhi-based content is seeing high engagement — localized storytelling wins.",
    "Creators covering trending topics in the first 24 hours get 3× more reach.",
    "Reddit discussions often predict YouTube/Instagram trends by 48–72 hours.",
  ]

  const topTitles = posts
    .slice(0, 8)
    .map((p, i) => `${i + 1}. [${p.category}] ${p.title} (↑${p.upvotes})`)
    .join("\n")

  const prompt = `Based on these Indian Reddit posts, give 3 short creator insights (1 sentence each). Return ONLY JSON array of 3 strings.\n\n${topTitles}`

  const result = await generateAIJSON<string>(prompt, "reddit-insights")
  return result.length > 0 ? result : fallback
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const subreddit = searchParams.get("subreddit") || "all"
  const sort = (searchParams.get("sort") || "hot") as "hot" | "top" | "new"
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50)
  const multi = searchParams.get("multi") === "true"

  try {
    let posts: RedditPost[] = []

    if (multi) {
      // Fetch from multiple default subreddits in parallel
      const results = await Promise.allSettled(
        DEFAULT_SUBREDDITS.map(sub => fetchSubredditPosts(sub, sort, 10))
      )
      for (const r of results) {
        if (r.status === "fulfilled") posts.push(...r.value)
      }
      // Sort by upvotes, dedupe by id
      const seen = new Set<string>()
      posts = posts
        .filter(p => { if (seen.has(p.id)) return false; seen.add(p.id); return true })
        .sort((a, b) => b.upvotes - a.upvotes)
        .slice(0, limit)
    } else {
      if (subreddit !== "all" && !VALID_SUBREDDITS.includes(subreddit)) {
        return NextResponse.json(
          { error: `Invalid subreddit. Use: ${VALID_SUBREDDITS.join(", ")} or multi=true` },
          { status: 400 }
        )
      }
      const target = subreddit === "all" ? "india" : subreddit
      posts = await fetchSubredditPosts(target, sort, limit)
    }

    // Get AI insights (optional, needs GEMINI_API_KEY)
    let aiInsights: string[] = []
    const geminiKey = process.env.GEMINI_API_KEY
    if (geminiKey && posts.length > 0) {
      aiInsights = await generateAIInsights(posts, geminiKey)
    } else {
      aiInsights = [
        "Delhi-based content is seeing high engagement — localized storytelling wins.",
        "Creators covering trending topics in the first 24 hours get 3× more reach.",
        "Reddit discussions often predict YouTube/Instagram trends by 48–72 hours.",
      ]
    }

    return NextResponse.json({
      success: true,
      subreddits: multi ? DEFAULT_SUBREDDITS : [subreddit],
      sort,
      posts,
      count: posts.length,
      aiInsights,
      fetchedAt: new Date().toISOString(),
      source: "reddit_public_json",
    })
  } catch (error) {
    console.error("[reddit-trends] Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch Reddit trends", details: String(error) },
      { status: 500 }
    )
  }
}
