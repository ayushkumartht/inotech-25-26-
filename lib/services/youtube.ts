const API_KEY = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeTrendResult {
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
    viewCount: string;
    publishedAt: string;
    score: number; // Simulated prediction score
}

export async function fetchTrendingVideos(regionCode = 'US'): Promise<YouTubeTrendResult[]> {
    if (!API_KEY || API_KEY === 'your_key_here_after_generation') {
        console.warn("YouTube API Key is missing. Returning mock data.");
        return getMockTrends();
    }

    try {
        const response = await fetch(
            `${BASE_URL}/videos?part=snippet,statistics&chart=mostPopular&regionCode=${regionCode}&maxResults=10&key=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.statusText}`);
        }

        const data = await response.json();

        return data.items.map((item: any) => ({
            id: item.id,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
            channelTitle: item.snippet.channelTitle,
            viewCount: item.statistics.viewCount,
            publishedAt: item.snippet.publishedAt,
            score: Math.floor(Math.random() * 20) + 80, // Simulation: high score for trending
        }));
    } catch (error) {
        console.error("Error fetching YouTube trends:", error);
        return getMockTrends();
    }
}

export async function searchTrendPredictions(query: string): Promise<YouTubeTrendResult[]> {
    if (!API_KEY || API_KEY === 'your_key_here_after_generation') {
        console.warn("YouTube API Key is missing. Returning mock data for query:", query);
        return getMockTrends(query);
    }

    try {
        const response = await fetch(
            `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.statusText}`);
        }

        const data = await response.json();

        // Search endpoint doesn't return statistics, we'd need a second call for viewCount
        // For now, we'll return what we have
        return data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
            channelTitle: item.snippet.channelTitle,
            viewCount: "N/A",
            publishedAt: item.snippet.publishedAt,
            score: Math.floor(Math.random() * 30) + 70,
        }));
    } catch (error) {
        console.error("Error searching YouTube trends:", error);
        return getMockTrends(query);
    }
}

function getMockTrends(query?: string): YouTubeTrendResult[] {
    // Fallback mock data
    return [
        {
            id: "1",
            title: query ? `${query} transformation challenge` : "The future of AI in 2026",
            thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
            channelTitle: "TechVision",
            viewCount: "1200000",
            publishedAt: new Date().toISOString(),
            score: 94
        },
        {
            id: "2",
            title: query ? `Why ${query} is taking over` : "New minimalist design trends",
            thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
            channelTitle: "CreativePulse",
            viewCount: "850000",
            publishedAt: new Date().toISOString(),
            score: 88
        }
    ];
}
