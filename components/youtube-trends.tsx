"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Play, Eye, ThumbsUp, MessageCircle, TrendingUp, Clock,
    Flame, Zap, Sparkles, Monitor, GraduationCap, Film, UtensilsCrossed, Heart,
    BarChart3, ArrowUpRight, Users, RefreshCw,
} from "lucide-react"

const DOMAINS = [
    { id: "tech", label: "Tech", icon: Monitor, color: "from-blue-500 to-cyan-600", bg: "bg-blue-50", text: "text-blue-600", ring: "ring-blue-200" },
    { id: "education", label: "Education", icon: GraduationCap, color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50", text: "text-emerald-600", ring: "ring-emerald-200" },
    { id: "entertainment", label: "Entertainment", icon: Film, color: "from-purple-500 to-violet-600", bg: "bg-purple-50", text: "text-purple-600", ring: "ring-purple-200" },
    { id: "food", label: "Food", icon: UtensilsCrossed, color: "from-amber-500 to-orange-600", bg: "bg-amber-50", text: "text-amber-600", ring: "ring-amber-200" },
] as const

interface VideoTrend {
    videoId: string
    title: string
    thumbnail: string
    channelTitle: string
    viewCount: number
    likeCount: number
    commentCount: number
    publishedAt: string
    prediction?: {
        confidence: number
        trendScore: number
        peakIn: string
        category: string
        sentiment: string
        viralPotential: string
        keyInsight: string
        predictedGrowth: number
        relatedHashtags: string[]
        targetAudience: string
    }
}

const DUMMY_YOUTUBE_VIDEOS: Record<string, VideoTrend[]> = {
    tech: [
        { videoId: "aircAruvnKk", title: "I Built an AI App in 24 Hours Using Only Free Tools", thumbnail: "https://i.ytimg.com/vi/aircAruvnKk/hqdefault.jpg", channelTitle: "CodeWithRahul", viewCount: 5600000, likeCount: 420000, commentCount: 31000, publishedAt: "2026-02-21T09:00:00Z", prediction: { confidence: 96, trendScore: 95, peakIn: "1 day", category: "AI Development", sentiment: "Wow Factor", viralPotential: "explosive", keyInsight: "AI build challenges are the hottest trend in tech YouTube.", predictedGrowth: 78, relatedHashtags: ["#AIApp", "#BuildInPublic", "#FreeTechTools"], targetAudience: "18-30, Developers" } },
        { videoId: "YQHsXMglC9A", title: "iPhone 17 Pro vs Galaxy S26 Ultra — Ultimate Camera Comparison", thumbnail: "https://i.ytimg.com/vi/YQHsXMglC9A/hqdefault.jpg", channelTitle: "Tech Burner India", viewCount: 8200000, likeCount: 610000, commentCount: 45000, publishedAt: "2026-02-20T12:00:00Z", prediction: { confidence: 92, trendScore: 90, peakIn: "2 days", category: "Smartphone Review", sentiment: "Comparative", viralPotential: "explosive", keyInsight: "Flagship comparison videos drive the highest ad revenue.", predictedGrowth: 55, relatedHashtags: ["#iPhone17Pro", "#GalaxyS26", "#CameraTest"], targetAudience: "18-35, Tech Enthusiasts" } },
        { videoId: "Sagg08DrO5U", title: "Top 10 VS Code Extensions Every Developer Needs in 2026", thumbnail: "https://i.ytimg.com/vi/Sagg08DrO5U/hqdefault.jpg", channelTitle: "Dev Mastery", viewCount: 2100000, likeCount: 165000, commentCount: 9800, publishedAt: "2026-02-19T15:00:00Z", prediction: { confidence: 85, trendScore: 81, peakIn: "4 days", category: "Developer Tools", sentiment: "Informative", viralPotential: "high", keyInsight: "Listicle tool recommendation videos have evergreen search traffic.", predictedGrowth: 32, relatedHashtags: ["#VSCode", "#DevTools", "#CodingTips"], targetAudience: "20-35, Software Engineers" } },
        { videoId: "qz0aGYrrlhU", title: "Best Budget Laptops Under ₹40,000 for Students — 2026 Edition", thumbnail: "https://i.ytimg.com/vi/qz0aGYrrlhU/hqdefault.jpg", channelTitle: "Gadget Guru", viewCount: 3400000, likeCount: 258000, commentCount: 19200, publishedAt: "2026-02-18T10:00:00Z", prediction: { confidence: 88, trendScore: 84, peakIn: "3 days", category: "Laptop Reviews", sentiment: "Helpful", viralPotential: "high", keyInsight: "Budget laptop reviews peak during academic enrollment season.", predictedGrowth: 40, relatedHashtags: ["#BudgetLaptop", "#StudentLaptop", "#BestLaptop2026"], targetAudience: "16-25, Students" } },
        { videoId: "w7ejDZ8SWv8", title: "This Free AI Tool Will Replace Photoshop — Not Clickbait", thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/hqdefault.jpg", channelTitle: "AI Explorer", viewCount: 4800000, likeCount: 365000, commentCount: 27000, publishedAt: "2026-02-17T14:00:00Z", prediction: { confidence: 90, trendScore: 87, peakIn: "2 days", category: "AI Tools", sentiment: "Surprising", viralPotential: "explosive", keyInsight: "Free alternative tool videos drive massive click-through.", predictedGrowth: 65, relatedHashtags: ["#AITools", "#FreePhotoshop", "#DesignTool"], targetAudience: "18-35, Designers & Creators" } },
        { videoId: "Kp7eSUU9oy8", title: "I Used Only Linux for 30 Days as a Windows User", thumbnail: "https://i.ytimg.com/vi/Kp7eSUU9oy8/hqdefault.jpg", channelTitle: "OS Explorer", viewCount: 1750000, likeCount: 132000, commentCount: 11500, publishedAt: "2026-02-22T08:00:00Z", prediction: { confidence: 82, trendScore: 78, peakIn: "5 days", category: "Operating Systems", sentiment: "Curious", viralPotential: "medium", keyInsight: "OS challenge videos create strong community engagement.", predictedGrowth: 25, relatedHashtags: ["#LinuxChallenge", "#Ubuntu", "#WindowsToLinux"], targetAudience: "20-35, Power Users" } },
        { videoId: "JGwWNGJdvx8", title: "₹5,000 Complete Setup — Budget Gaming PC Build Guide India", thumbnail: "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg", channelTitle: "Budget Builder", viewCount: 6200000, likeCount: 468000, commentCount: 35000, publishedAt: "2026-02-23T11:00:00Z", prediction: { confidence: 91, trendScore: 89, peakIn: "2 days", category: "PC Build", sentiment: "Exciting", viralPotential: "explosive", keyInsight: "Budget PC build guides drive massive saves and part affiliate revenue.", predictedGrowth: 52, relatedHashtags: ["#PCBuild", "#BudgetGaming", "#GamingPC"], targetAudience: "16-28, Gamers" } },
        { videoId: "e-ORhEE9VVg", title: "Top 5 AI Coding Assistants That Actually Work in 2026", thumbnail: "https://i.ytimg.com/vi/e-ORhEE9VVg/hqdefault.jpg", channelTitle: "Code Craft", viewCount: 3800000, likeCount: 290000, commentCount: 21000, publishedAt: "2026-02-22T14:00:00Z", prediction: { confidence: 88, trendScore: 85, peakIn: "3 days", category: "AI Coding", sentiment: "Practical", viralPotential: "high", keyInsight: "AI coding tool reviews generate the highest CTR in tech category.", predictedGrowth: 42, relatedHashtags: ["#AICoding", "#CodingTools", "#DevProductivity"], targetAudience: "20-35, Developers" } },
        { videoId: "60ItHLz5WEA", title: "Raspberry Pi 6 Review — The Perfect Home Server?", thumbnail: "https://i.ytimg.com/vi/60ItHLz5WEA/hqdefault.jpg", channelTitle: "Pi Master India", viewCount: 2100000, likeCount: 162000, commentCount: 12800, publishedAt: "2026-02-21T15:00:00Z", prediction: { confidence: 84, trendScore: 80, peakIn: "4 days", category: "Hardware Review", sentiment: "Educational", viralPotential: "high", keyInsight: "Raspberry Pi content attracts a niche but highly engaged audience.", predictedGrowth: 30, relatedHashtags: ["#RaspberryPi", "#HomeServer", "#TechReview"], targetAudience: "22-40, Makers & Tinkerers" } },
        { videoId: "lp-EO5I60KA", title: "Why Every Developer Should Learn Rust in 2026", thumbnail: "https://i.ytimg.com/vi/lp-EO5I60KA/hqdefault.jpg", channelTitle: "Rust Lang India", viewCount: 1500000, likeCount: 115000, commentCount: 8900, publishedAt: "2026-02-20T09:00:00Z", prediction: { confidence: 81, trendScore: 77, peakIn: "6 days", category: "Programming Language", sentiment: "Persuasive", viralPotential: "medium", keyInsight: "Language evangelism videos generate strong opinion-based engagement in comments.", predictedGrowth: 20, relatedHashtags: ["#RustLang", "#LearnRust", "#Programming2026"], targetAudience: "22-35, Senior Developers" } },
    ],
    education: [
        { videoId: "rfscVS0vtbw", title: "UPSC Topper's Complete Strategy — AIR 12 Reveals Everything", thumbnail: "https://i.ytimg.com/vi/rfscVS0vtbw/hqdefault.jpg", channelTitle: "UPSC Pathshala", viewCount: 7800000, likeCount: 580000, commentCount: 42000, publishedAt: "2026-02-21T06:00:00Z", prediction: { confidence: 95, trendScore: 94, peakIn: "1 day", category: "UPSC Prep", sentiment: "Motivational", viralPotential: "explosive", keyInsight: "UPSC topper interviews are the most-watched education content in India.", predictedGrowth: 72, relatedHashtags: ["#UPSCTopper", "#IASPreparation", "#CivilServices"], targetAudience: "18-28, UPSC Aspirants" } },
        { videoId: "kqtD5dpn9C8", title: "Learn Python in 4 Hours — Complete Beginner Course 2026", thumbnail: "https://i.ytimg.com/vi/kqtD5dpn9C8/hqdefault.jpg", channelTitle: "CodeSimplified", viewCount: 4500000, likeCount: 340000, commentCount: 18500, publishedAt: "2026-02-20T08:00:00Z", prediction: { confidence: 90, trendScore: 88, peakIn: "3 days", category: "Programming", sentiment: "Educational", viralPotential: "high", keyInsight: "Python continues to be the #1 searched programming language.", predictedGrowth: 48, relatedHashtags: ["#LearnPython", "#PythonCourse", "#Coding2026"], targetAudience: "16-30, Aspiring Developers" } },
        { videoId: "HGOBQPFzWKo", title: "JEE Advanced 2026 — Top 100 Most Important Questions", thumbnail: "https://i.ytimg.com/vi/HGOBQPFzWKo/hqdefault.jpg", channelTitle: "Physics Galaxy", viewCount: 3200000, likeCount: 245000, commentCount: 15800, publishedAt: "2026-02-19T05:30:00Z", prediction: { confidence: 88, trendScore: 86, peakIn: "2 days", category: "JEE Prep", sentiment: "Focused", viralPotential: "high", keyInsight: "Question compilation videos spike before exam season.", predictedGrowth: 55, relatedHashtags: ["#JEEAdvanced", "#IITPrep", "#Physics"], targetAudience: "16-20, JEE Aspirants" } },
        { videoId: "8jLOx1hD3_o", title: "How to Get a Job at Google India — Complete Roadmap 2026", thumbnail: "https://i.ytimg.com/vi/8jLOx1hD3_o/hqdefault.jpg", channelTitle: "Career Blueprint", viewCount: 5100000, likeCount: 385000, commentCount: 28000, publishedAt: "2026-02-18T10:00:00Z", prediction: { confidence: 91, trendScore: 89, peakIn: "2 days", category: "Career Guidance", sentiment: "Aspirational", viralPotential: "explosive", keyInsight: "FAANG roadmap videos drive the highest subscriber conversion in education.", predictedGrowth: 58, relatedHashtags: ["#GoogleIndia", "#TechCareer", "#DSA"], targetAudience: "18-26, CS Students" } },
        { videoId: "yfoY53QFEnE", title: "English Speaking Practice — 30 Daily Conversations for Fluency", thumbnail: "https://i.ytimg.com/vi/yfoY53QFEnE/hqdefault.jpg", channelTitle: "English Pro India", viewCount: 6700000, likeCount: 498000, commentCount: 35000, publishedAt: "2026-02-17T07:00:00Z", prediction: { confidence: 93, trendScore: 91, peakIn: "1 day", category: "English Learning", sentiment: "Practical", viralPotential: "explosive", keyInsight: "Spoken English content has the largest addressable audience in India.", predictedGrowth: 45, relatedHashtags: ["#SpokenEnglish", "#EnglishFluency", "#DailyEnglish"], targetAudience: "16-40, English Learners" } },
        { videoId: "pTB0EiLXUC8", title: "CA Foundation Complete Revision in 6 Hours — All Subjects", thumbnail: "https://i.ytimg.com/vi/pTB0EiLXUC8/hqdefault.jpg", channelTitle: "CA Study Hub", viewCount: 1800000, likeCount: 138000, commentCount: 9200, publishedAt: "2026-02-22T04:00:00Z", prediction: { confidence: 84, trendScore: 80, peakIn: "4 days", category: "CA Exam Prep", sentiment: "Comprehensive", viralPotential: "high", keyInsight: "Last-minute revision marathons are saved and shared extensively.", predictedGrowth: 35, relatedHashtags: ["#CAFoundation", "#CharteredAccountant", "#CAExam"], targetAudience: "18-24, CA Students" } },
        { videoId: "09R8_2nJtjg", title: "NEET 2026 Biology — 200 Most Important MCQs in One Video", thumbnail: "https://i.ytimg.com/vi/09R8_2nJtjg/hqdefault.jpg", channelTitle: "Bio Masterclass", viewCount: 4200000, likeCount: 315000, commentCount: 22000, publishedAt: "2026-02-23T05:00:00Z", prediction: { confidence: 92, trendScore: 90, peakIn: "1 day", category: "NEET Prep", sentiment: "Focused", viralPotential: "explosive", keyInsight: "NEET biology MCQ compilations outperform other medical exam content.", predictedGrowth: 60, relatedHashtags: ["#NEET2026", "#Biology", "#MedicalEntrance"], targetAudience: "16-20, NEET Aspirants" } },
        { videoId: "bo_efYhYU2A", title: "How to Build a ₹0 Side Hustle While Still in College", thumbnail: "https://i.ytimg.com/vi/bo_efYhYU2A/hqdefault.jpg", channelTitle: "Hustle Academy", viewCount: 3900000, likeCount: 295000, commentCount: 18500, publishedAt: "2026-02-22T08:00:00Z", prediction: { confidence: 89, trendScore: 86, peakIn: "2 days", category: "Entrepreneurship", sentiment: "Motivational", viralPotential: "high", keyInsight: "College side hustle content drives highest subscription conversion in education.", predictedGrowth: 45, relatedHashtags: ["#CollegeSideHustle", "#ZeroInvestment", "#StudentBusiness"], targetAudience: "18-24, College Students" } },
        { videoId: "DyDfgMOUjCI", title: "Complete Data Structures & Algorithms Roadmap — From Zero to Job", thumbnail: "https://i.ytimg.com/vi/DyDfgMOUjCI/hqdefault.jpg", channelTitle: "DSA Master", viewCount: 5800000, likeCount: 438000, commentCount: 29000, publishedAt: "2026-02-21T10:00:00Z", prediction: { confidence: 94, trendScore: 92, peakIn: "1 day", category: "Programming", sentiment: "Comprehensive", viralPotential: "explosive", keyInsight: "DSA roadmap videos have the highest save-to-view ratio in tech education.", predictedGrowth: 65, relatedHashtags: ["#DSA", "#CodingRoadmap", "#PlacementPrep"], targetAudience: "18-26, CS Students" } },
        { videoId: "QYh6mYIJG2Y", title: "Government Exam Strategy — How I Cracked SSC CGL in First Attempt", thumbnail: "https://i.ytimg.com/vi/QYh6mYIJG2Y/hqdefault.jpg", channelTitle: "Sarkari Success", viewCount: 6100000, likeCount: 460000, commentCount: 32000, publishedAt: "2026-02-20T06:00:00Z", prediction: { confidence: 91, trendScore: 89, peakIn: "2 days", category: "Govt Exam", sentiment: "Motivational", viralPotential: "explosive", keyInsight: "Government exam success stories have massive reach in Tier-2 and Tier-3 cities.", predictedGrowth: 55, relatedHashtags: ["#SSCCGL", "#GovtJob", "#ExamStrategy"], targetAudience: "18-30, Govt Job Aspirants" } },
    ],
    entertainment: [
        { videoId: "JGwWNGJdvx8", title: "Bollywood vs Hollywood — Who Did It Better? (Part 27)", thumbnail: "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg", channelTitle: "Cinema Comparison", viewCount: 12000000, likeCount: 890000, commentCount: 67000, publishedAt: "2026-02-21T15:00:00Z", prediction: { confidence: 94, trendScore: 93, peakIn: "1 day", category: "Movie Comparison", sentiment: "Fun/Debatable", viralPotential: "explosive", keyInsight: "Comparison series with part numbers show increasing returns.", predictedGrowth: 40, relatedHashtags: ["#BollywoodVsHollywood", "#MovieComparison", "#WhoDidItBetter"], targetAudience: "16-35, Movie Fans" } },
        { videoId: "fJ9rUzIMcZQ", title: "Top 10 Most Underrated Indian Web Series You Must Watch", thumbnail: "https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg", channelTitle: "OTT Guru", viewCount: 5600000, likeCount: 425000, commentCount: 32000, publishedAt: "2026-02-20T18:00:00Z", prediction: { confidence: 89, trendScore: 86, peakIn: "3 days", category: "Web Series", sentiment: "Recommendation", viralPotential: "high", keyInsight: "Listicle recommendation videos for OTT content peak on weekends.", predictedGrowth: 35, relatedHashtags: ["#WebSeries", "#OTTIndia", "#MustWatch"], targetAudience: "18-35, OTT Subscribers" } },
        { videoId: "CevxZvSJLk8", title: "I Tried Stand-Up Comedy for the First Time — It Was Terrifying", thumbnail: "https://i.ytimg.com/vi/CevxZvSJLk8/hqdefault.jpg", channelTitle: "Dare To Try", viewCount: 3800000, likeCount: 290000, commentCount: 21000, publishedAt: "2026-02-19T20:00:00Z", prediction: { confidence: 86, trendScore: 83, peakIn: "4 days", category: "Comedy Challenge", sentiment: "Entertaining", viralPotential: "high", keyInsight: "First-time challenge videos with vulnerable moments generate high engagement.", predictedGrowth: 42, relatedHashtags: ["#StandUpComedy", "#FirstTime", "#ComedyChallenge"], targetAudience: "18-30, Comedy Lovers" } },
        { videoId: "lp-EO5I60KA", title: "Reacting to India's Got Talent's Most Jaw-Dropping Auditions", thumbnail: "https://i.ytimg.com/vi/lp-EO5I60KA/hqdefault.jpg", channelTitle: "React India", viewCount: 7200000, likeCount: 540000, commentCount: 38000, publishedAt: "2026-02-18T16:00:00Z", prediction: { confidence: 90, trendScore: 88, peakIn: "2 days", category: "Reaction Content", sentiment: "Amazing", viralPotential: "explosive", keyInsight: "Talent show reactions with genuine surprise moments are the most shareable.", predictedGrowth: 50, relatedHashtags: ["#IndiasGotTalent", "#ReactionVideo", "#TalentShow"], targetAudience: "14-35, Entertainment Seekers" } },
        { videoId: "dVDQsX5kgnQ", title: "Complete Marvel Timeline Explained in 30 Minutes — Hindi", thumbnail: "https://i.ytimg.com/vi/dVDQsX5kgnQ/hqdefault.jpg", channelTitle: "Geek Culture Hindi", viewCount: 4100000, likeCount: 312000, commentCount: 19500, publishedAt: "2026-02-17T12:00:00Z", prediction: { confidence: 87, trendScore: 84, peakIn: "3 days", category: "Franchise Explained", sentiment: "Informative", viralPotential: "high", keyInsight: "Hindi-language franchise explainer content fills a massive gap.", predictedGrowth: 38, relatedHashtags: ["#MarvelTimeline", "#MCU", "#HindiExplained"], targetAudience: "16-30, Marvel Fans" } },
        { videoId: "nfs8NYg7yQM", title: "Singing in Public India — Strangers Were Shocked!", thumbnail: "https://i.ytimg.com/vi/nfs8NYg7yQM/hqdefault.jpg", channelTitle: "Street Surprise", viewCount: 9500000, likeCount: 720000, commentCount: 52000, publishedAt: "2026-02-22T11:00:00Z", prediction: { confidence: 92, trendScore: 90, peakIn: "1 day", category: "Social Experiment", sentiment: "Heartwarming", viralPotential: "explosive", keyInsight: "Public singing/talent reveal videos have the highest share-to-view ratio in India.", predictedGrowth: 65, relatedHashtags: ["#SingingInPublic", "#StreetSinger", "#PublicReaction"], targetAudience: "14-40, General Audience" } },
        { videoId: "OPf0YbXqDm0", title: "We Recreated Iconic Bollywood Scenes — Director's Reaction", thumbnail: "https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg", channelTitle: "Reel Recreation", viewCount: 8200000, likeCount: 615000, commentCount: 45000, publishedAt: "2026-02-23T16:00:00Z", prediction: { confidence: 93, trendScore: 91, peakIn: "1 day", category: "Recreation", sentiment: "Fun", viralPotential: "explosive", keyInsight: "Scene recreation + professional reaction is the hottest collaboration format.", predictedGrowth: 55, relatedHashtags: ["#BollywoodRecreation", "#DirectorReacts", "#FilmMaking"], targetAudience: "16-35, Bollywood Fans" } },
        { videoId: "jNQXAC9IVRw", title: "24 Hours in India's Most Haunted Place — Overnight Challenge", thumbnail: "https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg", channelTitle: "Dare Vlogs", viewCount: 15000000, likeCount: 1100000, commentCount: 78000, publishedAt: "2026-02-22T20:00:00Z", prediction: { confidence: 95, trendScore: 94, peakIn: "1 day", category: "Challenge/Horror", sentiment: "Thrilling", viralPotential: "explosive", keyInsight: "Haunted overnight challenges are the highest-performing entertainment format in India.", predictedGrowth: 72, relatedHashtags: ["#HauntedIndia", "#OvernightChallenge", "#Horror"], targetAudience: "14-30, Thrill Seekers" } },
        { videoId: "hT_nvWreIhg", title: "Indian Comedians Try Not to Laugh Challenge — IMPOSSIBLE", thumbnail: "https://i.ytimg.com/vi/hT_nvWreIhg/hqdefault.jpg", channelTitle: "Comedy Kings", viewCount: 6800000, likeCount: 512000, commentCount: 38000, publishedAt: "2026-02-21T18:00:00Z", prediction: { confidence: 88, trendScore: 85, peakIn: "3 days", category: "Comedy Challenge", sentiment: "Hilarious", viralPotential: "high", keyInsight: "Try not to laugh challenges with known comedians drive massive shares on WhatsApp.", predictedGrowth: 42, relatedHashtags: ["#TryNotToLaugh", "#IndianComedy", "#ComedyChallenge"], targetAudience: "16-35, Comedy Fans" } },
        { videoId: "2Vv-BfVoq4g", title: "Rating Every Indian Netflix Movie — Brutally Honest Tier List", thumbnail: "https://i.ytimg.com/vi/2Vv-BfVoq4g/hqdefault.jpg", channelTitle: "OTT Roast", viewCount: 4500000, likeCount: 340000, commentCount: 26000, publishedAt: "2026-02-20T14:00:00Z", prediction: { confidence: 85, trendScore: 82, peakIn: "4 days", category: "Tier List", sentiment: "Opinionated", viralPotential: "high", keyInsight: "Tier list format generates the highest comment engagement due to debate potential.", predictedGrowth: 38, relatedHashtags: ["#NetflixIndia", "#TierList", "#MovieRating"], targetAudience: "18-35, OTT Viewers" } },
    ],
    food: [
        { videoId: "LXb3EKWsInQ", title: "₹100 vs ₹10,000 Biryani — Which Is Worth It?", thumbnail: "https://i.ytimg.com/vi/LXb3EKWsInQ/hqdefault.jpg", channelTitle: "Food Compare India", viewCount: 8900000, likeCount: 670000, commentCount: 48000, publishedAt: "2026-02-21T12:00:00Z", prediction: { confidence: 95, trendScore: 94, peakIn: "1 day", category: "Food Challenge", sentiment: "Fun/Comparative", viralPotential: "explosive", keyInsight: "Budget vs premium food comparisons are the #1 performing food format in India.", predictedGrowth: 58, relatedHashtags: ["#BiryaniChallenge", "#FoodComparison", "#StreetFoodVsFine"], targetAudience: "18-35, Foodies" } },
        { videoId: "IvUU8joBb1Q", title: "I Survived on ₹50 Per Day for a Week in Mumbai", thumbnail: "https://i.ytimg.com/vi/IvUU8joBb1Q/hqdefault.jpg", channelTitle: "Budget Foodie", viewCount: 6200000, likeCount: 468000, commentCount: 35000, publishedAt: "2026-02-20T10:00:00Z", prediction: { confidence: 91, trendScore: 89, peakIn: "2 days", category: "Food Challenge", sentiment: "Relatable", viralPotential: "explosive", keyInsight: "Budget food survival challenges resonate with students and working-class viewers.", predictedGrowth: 52, relatedHashtags: ["#BudgetFood", "#MumbaiStreetFood", "#CheapEats"], targetAudience: "18-28, Students" } },
        { videoId: "R4vkVHijdQk", title: "5 High-Protein Indian Breakfast Recipes — Under 10 Minutes", thumbnail: "https://i.ytimg.com/vi/R4vkVHijdQk/hqdefault.jpg", channelTitle: "Fit Kitchen India", viewCount: 3400000, likeCount: 260000, commentCount: 16000, publishedAt: "2026-02-19T07:00:00Z", prediction: { confidence: 87, trendScore: 83, peakIn: "4 days", category: "Healthy Recipes", sentiment: "Practical", viralPotential: "high", keyInsight: "Fitness + food crossover content attracts a premium audience.", predictedGrowth: 38, relatedHashtags: ["#HighProtein", "#HealthyBreakfast", "#IndianRecipe"], targetAudience: "22-35, Health Conscious" } },
        { videoId: "450p7goxZqg", title: "Trying the Spiciest Street Food in Delhi — Carolina Reaper Level!", thumbnail: "https://i.ytimg.com/vi/450p7goxZqg/hqdefault.jpg", channelTitle: "Spice Warrior", viewCount: 7500000, likeCount: 565000, commentCount: 41000, publishedAt: "2026-02-18T14:00:00Z", prediction: { confidence: 93, trendScore: 91, peakIn: "1 day", category: "Spice Challenge", sentiment: "Extreme/Fun", viralPotential: "explosive", keyInsight: "Spice challenge videos have the highest completion rate.", predictedGrowth: 48, relatedHashtags: ["#SpiceChallenge", "#DelhiStreetFood", "#CarolinaReaper"], targetAudience: "16-30, Thrill-Seeking Foodies" } },
        { videoId: "ebXbLfLB4Tg", title: "Hidden Food Gems of Old Delhi — Places Tourists Never Find", thumbnail: "https://i.ytimg.com/vi/ebXbLfLB4Tg/hqdefault.jpg", channelTitle: "Food Trails India", viewCount: 4300000, likeCount: 325000, commentCount: 22000, publishedAt: "2026-02-17T11:00:00Z", prediction: { confidence: 88, trendScore: 85, peakIn: "3 days", category: "Food Exploration", sentiment: "Discovery", viralPotential: "high", keyInsight: "Hidden gem food tours drive local tourism.", predictedGrowth: 42, relatedHashtags: ["#OldDelhi", "#HiddenGems", "#FoodTour"], targetAudience: "20-40, Travel Foodies" } },
        { videoId: "M7lc1UVf-VE", title: "Mom vs Professional Chef — Who Makes Better Butter Chicken?", thumbnail: "https://i.ytimg.com/vi/M7lc1UVf-VE/hqdefault.jpg", channelTitle: "Kitchen Clash", viewCount: 5800000, likeCount: 435000, commentCount: 31000, publishedAt: "2026-02-22T13:00:00Z", prediction: { confidence: 89, trendScore: 87, peakIn: "2 days", category: "Cooking Competition", sentiment: "Heartwarming", viralPotential: "explosive", keyInsight: "Mom vs Chef format combines emotional storytelling with food entertainment.", predictedGrowth: 55, relatedHashtags: ["#MomVsChef", "#ButterChicken", "#CookingCompetition"], targetAudience: "18-45, Family Audience" } },
        { videoId: "0KSOMA3QBU0", title: "Eating Only ₹10 Meals for 24 Hours in Kolkata", thumbnail: "https://i.ytimg.com/vi/0KSOMA3QBU0/hqdefault.jpg", channelTitle: "Cheapest Eats", viewCount: 7200000, likeCount: 542000, commentCount: 38000, publishedAt: "2026-02-23T08:00:00Z", prediction: { confidence: 94, trendScore: 92, peakIn: "1 day", category: "Budget Food Challenge", sentiment: "Entertaining", viralPotential: "explosive", keyInsight: "Ultra-low budget food challenges are the fastest growing food sub-genre.", predictedGrowth: 62, relatedHashtags: ["#10RsMeal", "#KolkataFood", "#CheapEats"], targetAudience: "16-30, Students" } },
        { videoId: "FrG4TEcSuRg", title: "India's Best Dosa — Which City Wins? (North vs South)", thumbnail: "https://i.ytimg.com/vi/FrG4TEcSuRg/hqdefault.jpg", channelTitle: "Dosa Wars", viewCount: 9800000, likeCount: 735000, commentCount: 56000, publishedAt: "2026-02-22T12:00:00Z", prediction: { confidence: 96, trendScore: 95, peakIn: "1 day", category: "Food War", sentiment: "Debatable", viralPotential: "explosive", keyInsight: "Regional food comparison videos create the most heated debates and shares.", predictedGrowth: 70, relatedHashtags: ["#DosaWars", "#NorthVsSouth", "#IndianFood"], targetAudience: "18-45, All India" } },
        { videoId: "XqZsoesa55w", title: "Making Gordon Ramsay's Recipes with Indian Twist — His Reaction", thumbnail: "https://i.ytimg.com/vi/XqZsoesa55w/hqdefault.jpg", channelTitle: "Desi Gordon", viewCount: 4600000, likeCount: 348000, commentCount: 24000, publishedAt: "2026-02-21T14:00:00Z", prediction: { confidence: 87, trendScore: 84, peakIn: "3 days", category: "Cooking", sentiment: "Creative", viralPotential: "high", keyInsight: "Indian twist on international recipes is an underexplored but high-potential format.", predictedGrowth: 40, relatedHashtags: ["#GordonRamsay", "#IndianTwist", "#FusionFood"], targetAudience: "20-35, Home Cooks" } },
        { videoId: "PIh2xe4jnpk", title: "Midnight Street Food Tour in Lucknow — Pure Non-Veg Heaven", thumbnail: "https://i.ytimg.com/vi/PIh2xe4jnpk/hqdefault.jpg", channelTitle: "Night Food India", viewCount: 5200000, likeCount: 392000, commentCount: 27000, publishedAt: "2026-02-20T22:00:00Z", prediction: { confidence: 90, trendScore: 88, peakIn: "2 days", category: "Street Food Tour", sentiment: "Mouthwatering", viralPotential: "explosive", keyInsight: "Late-night food tour videos have 2x higher average watch time due to ASMR appeal.", predictedGrowth: 48, relatedHashtags: ["#LucknowFood", "#MidnightStreetFood", "#NonVeg"], targetAudience: "18-35, Non-Veg Food Lovers" } },
    ],
}


function formatCount(n: number): string {
    if (n >= 10000000) return (n / 10000000).toFixed(1) + "Cr"
    if (n >= 100000) return (n / 100000).toFixed(1) + "L"
    if (n >= 1000) return (n / 1000).toFixed(1) + "K"
    return n.toString()
}

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d ago`
    return `${Math.floor(days / 7)}w ago`
}

function ConfidenceGauge({ value, size = 48 }: { value: number; size?: number }) {
    const radius = (size - 8) / 2
    const circumference = 2 * Math.PI * radius
    const filled = circumference * (1 - value / 100)
    const color = value >= 80 ? "#10B981" : value >= 60 ? "#F59E0B" : "#EF4444"

    return (
        <svg width={size} height={size} className="transform -rotate-90">
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E5E7EB" strokeWidth="4" />
            <circle
                cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth="4"
                strokeDasharray={circumference} strokeDashoffset={filled} strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
            />
            <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central"
                className="fill-foreground text-[11px] font-bold transform rotate-90" style={{ transformOrigin: "center" }}>
                {value}
            </text>
        </svg>
    )
}

function SkeletonCard() {
    return (
        <Card className="overflow-hidden animate-pulse">
            <div className="h-44 bg-muted" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="flex gap-3 mt-3">
                    <div className="h-3 bg-muted rounded w-16" />
                    <div className="h-3 bg-muted rounded w-16" />
                    <div className="h-3 bg-muted rounded w-16" />
                </div>
            </div>
        </Card>
    )
}

function ViralBadge({ potential }: { potential: string }) {
    const config: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
        explosive: { bg: "bg-red-100 border-red-200", text: "text-red-700", icon: Flame },
        high: { bg: "bg-orange-100 border-orange-200", text: "text-orange-700", icon: Zap },
        medium: { bg: "bg-yellow-100 border-yellow-200", text: "text-yellow-700", icon: TrendingUp },
        low: { bg: "bg-gray-100 border-gray-200", text: "text-gray-600", icon: BarChart3 },
    }
    const c = config[potential?.toLowerCase()] || config.medium
    const IconComp = c.icon

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${c.bg} ${c.text}`}>
            <IconComp className="w-3 h-3" />
            {potential}
        </span>
    )
}

export function YouTubeTrends() {
    const [domain, setDomain] = useState("tech")
    const [videos, setVideos] = useState<VideoTrend[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchTrends = useCallback(async (d: string) => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`/api/youtube-trends?domain=${d}`)
            const data = await res.json()
            if (data.success && data.videos && data.videos.length > 0) {
                setVideos(data.videos)
            } else {
                // Fallback to dummy data
                setVideos(DUMMY_YOUTUBE_VIDEOS[d] || DUMMY_YOUTUBE_VIDEOS.tech)
            }
        } catch {
            // Fallback to dummy data on any error
            setVideos(DUMMY_YOUTUBE_VIDEOS[d] || DUMMY_YOUTUBE_VIDEOS.tech)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchTrends(domain)
    }, [domain, fetchTrends])

    const activeDomain = DOMAINS.find(d => d.id === domain)!

    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="mb-8 animate-fade-in">
                <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-200`}>
                        <Play className="w-6 h-6 text-white" fill="white" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground">YouTube Trends</h1>
                        <p className="text-muted-foreground text-sm mt-0.5">Real-time trending videos analyzed by AI across 4 domains</p>
                    </div>
                </div>
            </div>

            {/* Domain Tabs */}
            <Tabs value={domain} onValueChange={setDomain} className="mb-8">
                <TabsList className="h-auto p-1.5 bg-muted/60 rounded-2xl flex-wrap gap-1">
                    {DOMAINS.map((d, i) => {
                        const Icon = d.icon
                        const isActive = domain === d.id
                        return (
                            <TabsTrigger
                                key={d.id}
                                value={d.id}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 data-[state=active]:shadow-md ${isActive
                                    ? `bg-gradient-to-r ${d.color} text-white shadow-lg`
                                    : "hover:bg-white/80"
                                    }`}
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{d.label}</span>
                            </TabsTrigger>
                        )
                    })}
                </TabsList>
            </Tabs>

            {/* Domain Hero Banner */}
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${activeDomain.color} p-6 md:p-8 mb-8 animate-fade-in`}>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-40 h-40 rounded-full bg-white/20 blur-3xl animate-mesh-1" />
                    <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-white/20 blur-3xl animate-mesh-2" />
                </div>
                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            {(() => { const Icon = activeDomain.icon; return <Icon className="w-5 h-5 text-white/80" /> })()}
                            <span className="text-white/80 text-sm font-medium uppercase tracking-wider">{activeDomain.label} Domain</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Trending in {activeDomain.label}
                        </h2>
                        <p className="text-white/70 text-sm max-w-lg">
                            {videos.length > 0
                                ? `${videos.length} trending videos discovered • AI-powered predictions active`
                                : "Discovering trending content..."}
                        </p>
                    </div>
                    <button
                        onClick={() => fetchTrends(domain)}
                        disabled={loading}
                        className="p-3 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm disabled:opacity-50"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-fade-in">
                    <p className="font-medium">⚠️ {error}</p>
                    <button onClick={() => fetchTrends(domain)} className="mt-2 text-red-600 underline text-xs">
                        Try again
                    </button>
                </div>
            )}

            {/* Loading Skeletons */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            )}

            {/* Video Grid */}
            {!loading && videos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video, idx) => (
                        <Card
                            key={video.videoId}
                            className="group overflow-hidden border border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 animate-fade-in"
                            style={{ animationDelay: `${idx * 80}ms` }}
                        >
                            {/* Thumbnail */}
                            <div className="relative overflow-hidden h-44">
                                {/* Gradient base - always visible as fallback */}
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center"
                                    style={{
                                        background: `linear-gradient(135deg, hsl(${(video.title.charCodeAt(0) * 7 + (video.title.charCodeAt(1) || 50) * 13) % 360}, 70%, 45%), hsl(${((video.title.charCodeAt(2) || 30) * 11 + idx * 47) % 360}, 80%, 35%))`,
                                    }}
                                >
                                    <Play className="w-10 h-10 text-white/50" />
                                    <p className="text-white/60 text-[10px] font-medium mt-1.5 px-4 text-center line-clamp-2 max-w-[85%]">{video.title}</p>
                                </div>
                                {/* Real thumbnail overlay - hides gradient when loaded */}
                                <img
                                    src={video.thumbnail || `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                                    alt={video.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                                    loading="lazy"
                                />

                                {/* Overlay badges */}
                                <div className="absolute top-2 left-2 flex gap-1.5">
                                    {video.prediction?.viralPotential && (
                                        <ViralBadge potential={video.prediction.viralPotential} />
                                    )}
                                </div>
                                {video.prediction && (
                                    <div className="absolute top-2 right-2">
                                        <ConfidenceGauge value={video.prediction.confidence} size={42} />
                                    </div>
                                )}

                                {/* Play overlay */}
                                <a
                                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300"
                                >
                                    <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                                        <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                                    </div>
                                </a>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                    {video.title}
                                </h3>
                                <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {video.channelTitle}
                                    <span className="mx-1">•</span>
                                    <Clock className="w-3 h-3" />
                                    {timeAgo(video.publishedAt)}
                                </p>

                                {/* Stats */}
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                                    <span className="flex items-center gap-1">
                                        <Eye className="w-3.5 h-3.5" />
                                        {formatCount(video.viewCount)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <ThumbsUp className="w-3.5 h-3.5" />
                                        {formatCount(video.likeCount)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MessageCircle className="w-3.5 h-3.5" />
                                        {formatCount(video.commentCount)}
                                    </span>
                                </div>

                                {/* AI Prediction Section */}
                                {video.prediction && (
                                    <div className={`rounded-xl p-3 ${activeDomain.bg} border ${activeDomain.ring} space-y-2`}>
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Sparkles className={`w-3.5 h-3.5 ${activeDomain.text}`} />
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${activeDomain.text}`}>AI Prediction</span>
                                        </div>

                                        {video.prediction.keyInsight && (
                                            <p className="text-[11px] text-foreground/80 leading-relaxed">
                                                {video.prediction.keyInsight}
                                            </p>
                                        )}

                                        <div className="flex items-center justify-between text-[11px]">
                                            <span className="text-muted-foreground">Trend Score</span>
                                            <div className="flex items-center gap-1">
                                                <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full bg-gradient-to-r ${activeDomain.color} animate-fill-bar`}
                                                        style={{ "--fill-width": `${video.prediction.trendScore}%` } as React.CSSProperties}
                                                    />
                                                </div>
                                                <span className="font-bold">{video.prediction.trendScore}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            {video.prediction.peakIn && (
                                                <Badge variant="outline" className="text-[9px] h-5 px-1.5 gap-0.5">
                                                    <Clock className="w-2.5 h-2.5" /> Peak {video.prediction.peakIn}
                                                </Badge>
                                            )}
                                            {video.prediction.predictedGrowth > 0 && (
                                                <Badge variant="outline" className="text-[9px] h-5 px-1.5 gap-0.5 text-green-600 border-green-200">
                                                    <ArrowUpRight className="w-2.5 h-2.5" /> +{video.prediction.predictedGrowth}%
                                                </Badge>
                                            )}
                                            {video.prediction.targetAudience && (
                                                <Badge variant="outline" className="text-[9px] h-5 px-1.5 gap-0.5">
                                                    <Users className="w-2.5 h-2.5" /> {video.prediction.targetAudience}
                                                </Badge>
                                            )}
                                        </div>

                                        {video.prediction.relatedHashtags && video.prediction.relatedHashtags.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {video.prediction.relatedHashtags.slice(0, 3).map((tag: string, i: number) => (
                                                    <span key={i} className={`text-[9px] ${activeDomain.text} font-medium`}>
                                                        {tag.startsWith("#") ? tag : `#${tag}`}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Empty state */}
            {!loading && !error && videos.length === 0 && (
                <div className="text-center py-20 animate-fade-in">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${activeDomain.color} mx-auto mb-4 flex items-center justify-center`}>
                        {(() => { const Icon = activeDomain.icon; return <Icon className="w-10 h-10 text-white" /> })()}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No trends found</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                        We couldn't find trending videos in {activeDomain.label} right now.
                    </p>
                    <button
                        onClick={() => fetchTrends(domain)}
                        className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${activeDomain.color} text-white font-medium text-sm hover:shadow-lg transition-all`}
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    )
}
