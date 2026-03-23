export interface EnhancedPrediction {
  id: string
  platform: "youtube" | "instagram"
  domain: string
  title: string
  description: string
  fullDescription: string
  howToMake: {
    visuals: string[]
    audio: string
    script: string
    editingStyle: string
  }
  peakIn: string
  confidence: number
  engagement: string
  tags: string[]
}

export const MOCK_PREDICTIONS: EnhancedPrediction[] = [
  // --- LATEST: YouTube (3) ---
  {
    id: "yt-latest-1",
    platform: "youtube",
    domain: "Tech",
    title: "ChatGPT-5: First Real Leaks",
    description: "Analyzing the rumored capabilities of the next-gen multimodal model.",
    fullDescription: "Initial reports suggest localized processing, 10M token window, and real-time vision capabilities. We break down the technical implications for developers.",
    howToMake: {
      visuals: ["Abstract AI neural network animations", "Comparison table vs GPT-4o", "Leak source screenshots"],
      audio: "Clarity-focused voiceover with futuristic ambient pad",
      script: "Hook: 'GPT-5 is closer than we thought.' Technical breakdown. Developer impact.",
      editingStyle: "Sharp, clean, professional tech review style."
    },
    peakIn: "3 days",
    confidence: 98,
    engagement: "Very High",
    tags: ["GPT5", "OpenAI", "AILeaks"]
  },
  {
    id: "yt-latest-2",
    platform: "youtube",
    domain: "Entertainment",
    title: "GTA VI: New Trailer Breakdown",
    description: "Every hidden detail in the 2026 footage.",
    fullDescription: "Frame-by-frame analysis of the latest Lucia and Jason footage, uncovering map locations, physics improvements, and NPC AI behaviors.",
    howToMake: {
      visuals: ["High-res gameplay zooming", "Map overlays", "Character model comparisons"],
      audio: "Exciting, fast-paced narration",
      script: "Start with the 'blink-and-you-miss-it' detail. Show the map growth. End with release date rumors.",
      editingStyle: "Dynamic, zoom-heavy, gaming breakdown style."
    },
    peakIn: "2 days",
    confidence: 97,
    engagement: "Viral",
    tags: ["GTAVI", "RockstarGames", "GamingNews"]
  },
  {
    id: "yt-latest-3",
    platform: "youtube",
    domain: "Food",
    title: "The Zero-Waste Indian Kitchen",
    description: "How to run a high-end restaurant kitchen with zero food waste.",
    fullDescription: "Behind the scenes with India's first zero-waste Michelin star chef, showing innovative composting and ingredient reuse techniques.",
    howToMake: {
      visuals: ["Cinematic kitchen prep", "Composting system tour", "Final plating of 'rescued' food"],
      audio: "Atmospheric kitchen sounds, calm authoritative voiceover",
      script: "Show the waste problem first. Introduce the chef. Show the solutions. Call to action for home cooks.",
      editingStyle: "Warm, docu-style grading, smooth transitions."
    },
    peakIn: "5 days",
    confidence: 92,
    engagement: "High",
    tags: ["Sustainability", "ZeroWaste", "IndianFood"]
  },

  // --- LATEST: Instagram (3) ---
  {
    id: "ig-latest-1",
    platform: "instagram",
    domain: "Tech",
    title: "Vision Pro 2 vs Real Life",
    description: "Trying the new lighter form factor in a busy cafe.",
    fullDescription: "30-second reel showing the passthrough quality and hand tracking improvements of the next-gen headset in a real-world social setting.",
    howToMake: {
      visuals: ["Point-of-view headset footage", "Third-person reaction shot", "Split screen UI vs reality"],
      audio: "Trending spatial audio track, crisp sound effects",
      script: "Text overlay: 'Is it finally light enough?' Show the eye-contact feature. Direct comparison with glasses.",
      editingStyle: "Hyper-smooth stabilization, fast cuts, glowing text overlays."
    },
    peakIn: "24 hours",
    confidence: 95,
    engagement: "Very High",
    tags: ["VisionPro", "SpatialComputing", "Apple"]
  },
  {
    id: "ig-latest-2",
    platform: "instagram",
    domain: "Entertainment",
    title: "AI Bollywood Mashup: 2026 Edition",
    description: "What if Arijit Singh sang K-Pop?",
    fullDescription: "Viral audio mashup using high-quality AI voice cloning to blend popular Indian vocals with trending global beats.",
    howToMake: {
      visuals: ["Dynamic waveform animations", "Overlay of both artists", "Reaction clips of fans"],
      audio: "The mashup track itself (high quality)",
      script: "Text: 'AI has gone too far!' 'Drop your favorite crossover below!'",
      editingStyle: "Audio-synced glitches, bright rhythmic lighting effects."
    },
    peakIn: "12 hours",
    confidence: 99,
    engagement: "Viral",
    tags: ["AIMusic", "Bollywood", "KPop"]
  },
  {
    id: "ig-latest-3",
    platform: "instagram",
    domain: "Education",
    title: "How I Learned Python in 30 Days",
    description: "The exact prompt sequence I used with AI.",
    fullDescription: "A fast-paced reel listing 5 specific AI prompts that take a beginner from zero to building their first data-scraper.",
    howToMake: {
      visuals: ["Phone recording of ChatGPT prompts", "Resulting code output", "Happy facial reaction"],
      audio: "Motivational trending speech, typing sound effects",
      script: "Hook: 'Python is easy now.' Prompt 1. Prompt 2. Result. Save this reel.",
      editingStyle: "Zoom-ins on code, popping text bubbles, high energy."
    },
    peakIn: "2 days",
    confidence: 96,
    engagement: "Highly Shared",
    tags: ["Python", "LearnToCode", "AITutor"]
  },

  // --- TECH: YouTube (5) ---
  {
    id: "yt-tech-1",
    platform: "youtube",
    domain: "Tech",
    title: "The Rise of Personal AI Agents",
    description: "Deep dive into how local LLMs are changing personal productivity.",
    fullDescription: "Detailed analysis of the shift from cloud-based AI to local, private AI agents running on consumer hardware. This trend is driven by privacy concerns and the availability of powerful small language models like Phi-3 and Llama 3.",
    howToMake: {
      visuals: ["Screen recording of local LLM setup", "Comparison charts: Local vs Cloud", "Hardware show-and-tell"],
      audio: "Clarity-focused voiceover, subtle tech-ambient background track",
      script: "Start with a privacy hook. Show, don't just tell. End with a tutorial on setting up Ollama.",
      editingStyle: "Clean, fast-paced cuts, high-quality on-screen text overlays."
    },
    peakIn: "2 weeks",
    confidence: 95,
    engagement: "High",
    tags: ["AI", "LocalLLM", "TechTrends"]
  },
  {
    id: "yt-tech-2",
    platform: "youtube",
    domain: "Tech",
    title: "Building a $500 AI PC in 2026",
    description: "Budget hardware guide for running local inference.",
    fullDescription: "A comprehensive guide to buying used hardware and specific budget components that excel at AI tasks, specifically focused on VRAM per dollar.",
    howToMake: {
      visuals: ["Unboxing used GPUs", "Build montage", "Benchmarking local LLMs"],
      audio: "Engaging, conversational tone with upbeat lo-fi hip hop",
      script: "Focus on 'Price to Performance'. Clear step-by-step instructions. Community budget tips.",
      editingStyle: "Relaxed but informative, clear text callouts for part names and prices."
    },
    peakIn: "10 days",
    confidence: 93,
    engagement: "High",
    tags: ["BudgetPC", "AIGaming", "TechHacks"]
  },
  {
    id: "yt-tech-3",
    platform: "youtube",
    domain: "Tech",
    title: "Tesla vs Waymo: Total Autonomy Test",
    description: "Real-world comparison of FSD and Level 4 Waymo in traffic.",
    fullDescription: "Side-by-side drive test analysis in a busy urban environment, comparing reaction times, safety interventions, and overall smoothness of both systems.",
    howToMake: {
      visuals: ["Dashcam side-by-side footage", "In-car reaction shots", "Data overlays of safety events"],
      audio: "Exciting, slightly analytical narration",
      script: "Highlight the specific scenarios where each system struggles. Use 'Zero Intervention' as the bar.",
      editingStyle: "Fast-forward segments for routine driving, slo-mo for critical events."
    },
    peakIn: "1 week",
    confidence: 94,
    engagement: "Very High",
    tags: ["Autonomous", "Tesla", "Waymo"]
  },
  {
    id: "yt-tech-4",
    platform: "youtube",
    domain: "Tech",
    title: "What's Inside Your Smart Home?",
    description: "Analyzing the security of common IoT devices.",
    fullDescription: "A deep dive into the network traffic and hardware of popular smart home devices to see what data they really collect.",
    howToMake: {
      visuals: ["Packet sniffing software view", "Teardown of a smart plug", "Privacy settings walkthrough"],
      audio: "Serious but accessible, investigative style voiceover",
      script: "Hook: 'Is your toaster spying on you?' Facts about data encryption. Actionable privacy tips.",
      editingStyle: "Documentary-like transitions, screen-in-screen for data views."
    },
    peakIn: "3 weeks",
    confidence: 89,
    engagement: "Moderate",
    tags: ["Privacy", "IoT", "CyberSecurity"]
  },
  {
    id: "yt-tech-5",
    platform: "youtube",
    domain: "Tech",
    title: "The GPU Mining Crisis: Returns in 2026",
    description: "Is it worth mining for decentralized AI networks?",
    fullDescription: "Investigating the shift from Ethereum mining to providing compute for LLM training and DePIN (Decentralized Physical Infrastructure Networks).",
    howToMake: {
      visuals: ["GPU farm b-roll", "Profitability spreadsheets", "Software dashboards"],
      audio: "Tech-focused, data-heavy but clear",
      script: "Explain DePIN in 30 seconds. Calculate ROI with current power costs in India.",
      editingStyle: "Chart animations, clean transitions, focus on the 'Bottom Line'."
    },
    peakIn: "4 weeks",
    confidence: 91,
    engagement: "High",
    tags: ["CryptoMining", "DePIN", "AICompute"]
  },

  // --- TECH: Instagram (5) ---
  {
    id: "ig-tech-1",
    platform: "instagram",
    domain: "Tech",
    title: "iPhone 17 Pro 'Buttonless' Leaks",
    description: "Conceptual preview of the upcoming all-solid-state interface.",
    fullDescription: "Interactive reel showcasing the latest CAD renders and component leaks suggesting Apple is moving to a fully buttonless design with haptic feedback surfaces.",
    howToMake: {
      visuals: ["3D CAD renders of smartphone edges", "Side-by-side comparison with older models", "Haptic wave animations"],
      audio: "Futuristic synth swells, crisp sound effects",
      script: "Hook: 'The end of buttons?' Fast facts on solid-state tech. Ask: 'Would you buy this?'",
      editingStyle: "Hyper-dynamic pacing, 3D camera sweeps, neon color accents."
    },
    peakIn: "5 days",
    confidence: 91,
    engagement: "Very High",
    tags: ["iPhone17", "AppleLeaks", "FutureTech"]
  },
  {
    id: "ig-tech-2",
    platform: "instagram",
    domain: "Tech",
    title: "Coding with Voice Only",
    description: "Showcasing the latest voice-to-code IDE extensions.",
    fullDescription: "A high-speed reel demonstration of building a React component using only natural language voice commands in real-time.",
    howToMake: {
      visuals: ["Split screen: Voice commands vs code appearing", "Close-up of microphone", "Final app demo"],
      audio: "Voice-over explaining commands, snappy keyboard sound effects",
      script: "Quick intro. Show the 'magic' of voice coding. Mention the extension name clearly.",
      editingStyle: "Fast cuts, screen magnifying effects on specific code changes."
    },
    peakIn: "4 days",
    confidence: 92,
    engagement: "Trending",
    tags: ["Programming", "AITools", "DeveloperMindset"]
  },
  {
    id: "ig-tech-3",
    platform: "instagram",
    domain: "Tech",
    title: "Setup Tour: Minimalist AI Engineer",
    description: "Curated aesthetic of a workspace optimized for deep work.",
    fullDescription: "Aesthetic panning shots of a minimalist desk setup featuring ultra-wide monitors, mechanical keyboards, and subtle ambient lighting.",
    howToMake: {
      visuals: ["Slow pans across the desk", "Close-ups of key hardware", "Lighting transitions (Day/Night)"],
      audio: "Relaxing lofi beats, mechanical keyboard typing clicks",
      script: "No talking. Just text overlays listing the gear and 'Optimized for Focus'.",
      editingStyle: "Smooth transitions, high-contrast grading, satisfying product shots."
    },
    peakIn: "6 days",
    confidence: 96,
    engagement: "High",
    tags: ["SetupWars", "DeveloperSetup", "Minimalism"]
  },
  {
    id: "ig-tech-4",
    platform: "instagram",
    domain: "Tech",
    title: "3 Websites to Automate Your Side Hustle",
    description: "Quick-fire list of low-code AI tools.",
    fullDescription: "A fast-paced reel identifying three relatively unknown platforms that allow for zero-code automation of marketing and sales.",
    howToMake: {
      visuals: ["Mobile screenshots of the sites", "Facial reaction to 'results'", "Screen recordings of the UI"],
      audio: "Upbeat trending audio, energetic voice-over",
      script: "Hook: 'Stop overworking!' Introduce Site 1, 2, then 3. Call to action: 'Save this for later!'.",
      editingStyle: "Fast rhythmic cuts, bright text bubbles, zoom effects."
    },
    peakIn: "3 days",
    confidence: 93,
    engagement: "Viral Potential",
    tags: ["AIHacks", "Automation", "SideHustle"]
  },
  {
    id: "ig-tech-5",
    platform: "instagram",
    domain: "Tech",
    title: "Does this AI Ring actually work?",
    description: "Honest 30-second review of the latest health wearable.",
    fullDescription: "Quick summary of a week-long experience with an AI integration health ring, focusing on sleep tracking and focus scores.",
    howToMake: {
      visuals: ["Wearing the ring in different settings", "App interface shots", "Thumbs up/down verdict"],
      audio: "Clear voiceover, subtle 'ding' sound effects for pros/cons",
      script: "Intro: 'Better than a smartwatch?' Pros list. Cons list. Final result.",
      editingStyle: "Text overlays for key stats, split-screen comparison with phone app."
    },
    peakIn: "2 days",
    confidence: 90,
    engagement: "High",
    tags: ["HealthTech", "Wearables", "AIReview"]
  },

  // --- EDUCATION: YouTube (5) ---
  {
    id: "yt-edu-1",
    platform: "youtube",
    domain: "Education",
    title: "The Pomodoro 2.0 Revolution",
    description: "Enhancing the classic study technique with neuro-science backed breaks.",
    fullDescription: "Explores advanced productivity techniques for competitive exam aspirants in India. Focuses on 'deep work' sessions followed by NSDR (Non-Sleep Deep Rest) instead of doom-scrolling during breaks.",
    howToMake: {
      visuals: ["Aesthetic desk setup", "Animated brain diagrams", "Timer overlays"],
      audio: "Calm, authoritative narration, Lofi-study beats",
      script: "Explain the 'why' before the 'how'. Use relatable student struggles as the hook.",
      editingStyle: "Soft transitions, warm lighting, minimalistic UI elements."
    },
    peakIn: "1 week",
    confidence: 90,
    engagement: "Medium",
    tags: ["Productivity", "UPSC", "StudyTips"]
  },
  {
    id: "yt-edu-2",
    platform: "youtube",
    domain: "Education",
    title: "Mastering the Feynman Technique",
    description: "How to learn anything faster by teaching it to a child.",
    fullDescription: "Showcases the step-by-step process of breaking down complex quantum physics or machine learning concepts into simple, everyday analogies.",
    howToMake: {
      visuals: ["Whiteboard drawings", "Simple analogies (using kitchen items)", "Rapid-fire explanation clips"],
      audio: "High enthusiasm, clear articulation, minimalist background music",
      script: "Identify a tough topic. Simplify it. Identify the gaps in your knowledge.",
      editingStyle: "Quick-paced sketches, emphasis on keywords through animation."
    },
    peakIn: "12 days",
    confidence: 94,
    engagement: "High",
    tags: ["LearningHacks", "FeynmanTechnique", "EffectiveStudy"]
  },
  {
    id: "yt-edu-3",
    platform: "youtube",
    domain: "Education",
    title: "The Zero-Budget Career Roadmap",
    description: "Mapping out a path to high-paying jobs using only free resources.",
    fullDescription: "A comprehensive video guide listing specific free courses from MIT, Stanford, and Harvard that lead to a job-ready skill set in 6 months.",
    howToMake: {
      visuals: ["Roadmap infographic", "Screen share of top free platforms", "Interviews with self-taught pros"],
      audio: "Inspiring, supportive, clear and detailed",
      script: "Focus on the 'myth' that you need to pay for degrees. Give a specific 6-month schedule.",
      editingStyle: "Chapter markers, resource links in descriptions, encouraging overlay text."
    },
    peakIn: "2 weeks",
    confidence: 88,
    engagement: "High",
    tags: ["SelfTaught", "FreeCourses", "CareerAdvice"]
  },
  {
    id: "yt-edu-4",
    platform: "youtube",
    domain: "Education",
    title: "How to Hack Your Focus Molecule",
    description: "Dopamine management for long-term study goals.",
    fullDescription: "Scientific but accessible video explaining how dopamine works during studying and why phones kill motivation.",
    howToMake: {
      visuals: ["Science animations", "Student life b-roll", "Microscope shots (stock)"],
      audio: "Educational but high-energy, clear and articulate",
      script: "Why do you feel bored? The chemistry of focus. How to 'reset' your brain.",
      editingStyle: "Dynamic text popups, engaging storytelling, focus on life-changing habits."
    },
    peakIn: "10 days",
    confidence: 95,
    engagement: "Very High",
    tags: ["BrainHealth", "Focus", "StudentMotivation"]
  },
  {
    id: "yt-edu-5",
    platform: "youtube",
    domain: "Education",
    title: "Study with Me: 4 Hours in Old Rajinder Nagar",
    description: "Real-time aesthetic study session with an UPSC aspirant.",
    fullDescription: "A 'Study With Me' vlog capturing the intensity and atmosphere of India's most famous coaching hub.",
    howToMake: {
      visuals: ["Stacks of books", "The street lights at night", "Silent studying shots"],
      audio: "Ambient street noises (muted), soft transition sounds",
      script: "No talking. Use timestamp overlays for breaks. Include a 'To-Do' list on screen.",
      editingStyle: "Longer shots, cozy color grading, focus on the 'grind' aesthetic."
    },
    peakIn: "3 weeks",
    confidence: 86,
    engagement: "High (Watch Time)",
    tags: ["RajinderNagar", "UPSC", "StudyWithMe"]
  },

  // --- EDUCATION: Instagram (5) ---
  {
    id: "ig-edu-1",
    platform: "instagram",
    domain: "Education",
    title: "3 Flashcard Hacks for Med Students",
    description: "Optimizing Anki for maximum retention in record time.",
    fullDescription: "Concise reel showing the specific settings and card structures that help medical students memorize vast amounts of anatomical data efficiently.",
    howToMake: {
      visuals: ["Phone screen showing Anki", "Medical diagrams with occlusions", "Reaction to successful recall"],
      audio: "Fast-talking productivity guru style, energetic background",
      script: "Hook: 'Anki is hard. Here's how to fix it.' Tip 1: Image Occlusion. Tip 2: Cloze Deletions. Tip 3: Spaced Repetition settings.",
      editingStyle: "Pop-up UI bubbles, zoom-ins on specific settings, high-contrast text."
    },
    peakIn: "4 days",
    confidence: 92,
    engagement: "Very High",
    tags: ["MedStudent", "StudyVlog", "StudentProductivity"]
  },
  {
    id: "ig-edu-2",
    platform: "instagram",
    domain: "Education",
    title: "How to Read 1 Book a Week",
    description: "The 'Skimming and Scanning' technique for non-fiction.",
    fullDescription: "A quick reel showing the physical process of scanning a book's table of contents, index, and key chapters to extract 80% of the value in 20% of the time.",
    howToMake: {
      visuals: ["Flipping pages rapidly", "Highlighting key sentences", "Stack of books"],
      audio: "Smooth jazz, rhythmic flipping sounds",
      script: "Stop reading every word! Here's the 80/20 rule of reading. Focus on headings.",
      editingStyle: "Fast motion page-turning, clear text overlays for the 'rules'.",
    },
    peakIn: "6 days",
    confidence: 91,
    engagement: "Trending",
    tags: ["ReadingTips", "Bookstagram", "PersonalGrowth"]
  },
  {
    id: "ig-edu-3",
    platform: "instagram",
    domain: "Education",
    title: "AI as Your Personal Tutor",
    description: "Using ChatGPT to simplify complex equations.",
    fullDescription: "Reel showing the prompt 'Explain this like I'm 5' applied to advanced calculus or organic chemistry.",
    howToMake: {
      visuals: ["Screen recording of the chat", "Surprised face at the simple answer", "Final solved math problem"],
      audio: "Exciting, helpful voiceover",
      script: "Struggling with homework? Watch this. The prompt you need is... See the result.",
      editingStyle: "Smooth transitions between phone and creator face, highlight the AI text."
    },
    peakIn: "3 days",
    confidence: 97,
    engagement: "High",
    tags: ["AIEducation", "StudentHacks", "ChatGPT"]
  },
  {
    id: "ig-edu-4",
    platform: "instagram",
    domain: "Education",
    title: "Note-Taking in 2026",
    description: "Digital vs Analog: What really sticks?",
    fullDescription: "Quick comparison of iPad handwriting vs physical journal for long-term memory based on recent studies.",
    howToMake: {
      visuals: ["iPad Apple Pencil shots", "Fountain pen on paper", "Memory test results infographic"],
      audio: "Classical music (remix), satisfying writing sounds",
      script: "Digital is faster. Analog is better? Here is why. My final choice.",
      editingStyle: "Juxtaposition splitscreen, focus on textures and writing aesthetics."
    },
    peakIn: "5 days",
    confidence: 89,
    engagement: "Moderate",
    tags: ["DigitalNotes", "StationeryAddict", "LearningScience"]
  },
  {
    id: "ig-edu-5",
    platform: "instagram",
    domain: "Education",
    title: "Stop Using Highlighters!",
    description: "The science of 'Active Recall' explained in 15 seconds.",
    fullDescription: "A 'Stop' hook followed by a quick explanation that highlighting is passive and active recall is the only way to retain data.",
    howToMake: {
      visuals: ["Tossing a highlighter away", "Quick diagrams of recall loops", "Confident nodding results"],
      audio: "Energetic trending sound, sharp sound effects for the 'Stop'",
      script: "Stop highlighting. It's useless. Do this instead: Active Recall. Thank me later.",
      editingStyle: "High-energy cuts, bold text, focus on the 'Aha!' moment."
    },
    peakIn: "1 day",
    confidence: 96,
    engagement: "Viral",
    tags: ["StudySmart", "ActiveRecall", "EducationTrends"]
  },

  // --- ENTERTAINMENT: YouTube (5) ---
  {
    id: "yt-ent-1",
    platform: "youtube",
    domain: "Entertainment",
    title: "Recreating MrBeast's Hardest Challenge",
    description: "Budget version of an extreme survival challenge with a local twist.",
    fullDescription: "A group of friends attempts a high-stakes challenge but with zero budget and local Indian settings, relying on personality and humor.",
    howToMake: {
      visuals: ["GoPro footage", "Multi-angle setups", "Reaction shots to tiredness/hunger"],
      audio: "Fast-paced commentary, funny sound bits, high-energy music",
      script: "Establish the goal immediately. Show the struggle. Keep the pacing incredibly tight.",
      editingStyle: "MrBeast-style rapid cuts, loud graphics, constant zooming."
    },
    peakIn: "8 days",
    confidence: 90,
    engagement: "High",
    tags: ["Challenge", "MrBeastStyle", "GroupVlog"]
  },
  {
    id: "yt-ent-2",
    platform: "youtube",
    domain: "Entertainment",
    title: "Top 10 Cancelled Bollywood Movies",
    description: "Uncovering the stories behind big-budget films that never released.",
    fullDescription: "An investigative video essay using archival footage and interviews to explain why massive star-studded projects were scrapped at the last minute.",
    howToMake: {
      visuals: ["Rare film posters", "Behind-the-scenes clips", "Timeline graphics"],
      audio: "Intriguing, mysterious narrator style, cinematic score",
      script: "Hook: 'The movie that would've changed everything.' Fact-check every claim. Add 'What could've been' segments.",
      editingStyle: "Slow zooms on old photos, smooth transitions, high production value feel."
    },
    peakIn: "10 days",
    confidence: 87,
    engagement: "Solid",
    tags: ["BollywoodSecrets", "CinemaHistory", "MovieBuzz"]
  },
  {
    id: "yt-ent-3",
    platform: "youtube",
    domain: "Entertainment",
    title: "The Indian VFX Revolution: Is it World Class?",
    description: "Breaking down the CGI in recent Bollywood and South Indian epics.",
    fullDescription: "Analysis of the technical progress made by Indian VFX studios, comparing them with Hollywood standards.",
    howToMake: {
      visuals: ["VFX breakdown reels", "Comparison shots with older films", "Studio tour snippets"],
      audio: "Informative, technical but exciting, industry-expert tone",
      script: "How much did that scene cost? The hidden studios in Mumbai. The future of AI in Indian VFX.",
      editingStyle: "Layers of footage being 'built', focus on technical details, side-by-side comps."
    },
    peakIn: "12 days",
    confidence: 91,
    engagement: "High",
    tags: ["VFX", "IndianCinema", "BehindTheScenes"]
  },
  {
    id: "yt-ent-4",
    platform: "youtube",
    domain: "Entertainment",
    title: "The Rise of South Indian Superstars",
    description: "How 'Pan-India' stars are redefining stardom in 2026.",
    fullDescription: "Exploring the shift in the Indian film industry where regional stars from the South are now dominating the box office across the country.",
    howToMake: {
      visuals: ["Box office charts", "Fan frenzy clips", "Interview mashups"],
      audio: "Cinematic, powerful narration, high-energy background music",
      script: "Is the era of typical Bollywood superstars over? The power of regional storytelling. What's next?",
      editingStyle: "Flashy title cards, fast-paced montage, focus on fan culture."
    },
    peakIn: "15 days",
    confidence: 93,
    engagement: "Very High",
    tags: ["PanIndia", "SouthCinema", "StarPower"]
  },
  {
    id: "yt-ent-5",
    platform: "youtube",
    domain: "Entertainment",
    title: "Every Indian Sitcom Trope Ever",
    description: "A parody of the most common and funny clichés in TV shows.",
    fullDescription: "A comedic sketch identifying all the typical character archetypes and plot points found in popular Indian family sitcoms.",
    howToMake: {
      visuals: ["Sketch comedy clips", "Over-the-top acting", "Family living room sets"],
      audio: "Funny sound effects (laugh track parody), quirky background music",
      script: "The 'over-acting' mom. The 'confused' dad. The 'mischievous' kid. The recurring neighbor.",
      editingStyle: "Quick skits, funny text bubbles, focus on comedic timing."
    },
    peakIn: "5 days",
    confidence: 95,
    engagement: "High",
    tags: ["IndianSitcom", "Parody", "ComedySketch"]
  },

  // --- ENTERTAINMENT: Instagram (5) ---
  {
    id: "ig-ent-1",
    platform: "instagram",
    domain: "Entertainment",
    title: "POV: You're in a 90s Bollywood Movie",
    description: "Nostalgic transition reels using retro filters and iconic songs.",
    fullDescription: "Nostalgia remains a powerful driver on Instagram. This trend uses vintage color grading, slow-motion walks, and evergreen Bollywood hits to create high-shareability aesthetic content.",
    howToMake: {
      visuals: ["Retro color filtering (sepia/grain)", "Slow-motion hair flips", "Dramatic dupatta shots"],
      audio: "90s Bollywood remix (lofi version)",
      script: "No dialogue needed. Focus on 'the vibe'. Use text like 'Taking it back to 1995'.",
      editingStyle: "Film burn transitions, slightly shaky cam, high saturation."
    },
    peakIn: "5 days",
    confidence: 94,
    engagement: "Viral Potential",
    tags: ["Bollywood", "Nostalgia", "RetroVibes"]
  },
  {
    id: "ig-ent-2",
    platform: "instagram",
    domain: "Entertainment",
    title: "AI-Generated Celeb Parodies",
    description: "Deepfake voice-overs of celebrities reacting to everyday Indian struggles.",
    fullDescription: "Using AI voice cloning to make famous Bollywood actors or cricketers narrate funny situations.",
    howToMake: {
      visuals: ["Relevant celeb stock footage", "Stock footage of everyday struggles", "Funny subtitles"],
      audio: "AI-cloned celeb voice, background crowd noises",
      script: "Write a script that sounds like the celeb's specific speech patterns. Focus on relatability.",
      editingStyle: "Simple A/B cuts, perfectly synced audio, comedic timing on the punchlines."
    },
    peakIn: "3 days",
    confidence: 96,
    engagement: "Very High",
    tags: ["FunnyAI", "BollywoodMeme", "DesiHumor"]
  },
  {
    id: "ig-ent-3",
    platform: "instagram",
    domain: "Entertainment",
    title: "The 7-Day Dance Challenge",
    description: "Learning a complex choreography in a week.",
    fullDescription: "A daily progress series where a creator goes from 'clueless' to 'pro' over 7 days, culminating in a final performance.",
    howToMake: {
      visuals: ["Day 1-7 title cards", "Sweaty rehearsal clips", "Final polished dance"],
      audio: "Trending upbeat anthem, motivational voice snippet",
      script: "Short intro on why the challenge is hard. Daily captions on progress.",
      editingStyle: "Transition from rehearsal to final outfit during the beat drop."
    },
    peakIn: "9 days",
    confidence: 93,
    engagement: "High",
    tags: ["DanceChallenge", "ProgressReel", "IGTrends"]
  },
  {
    id: "ig-ent-4",
    platform: "instagram",
    domain: "Entertainment",
    title: "Cinema Aesthetic: How to Grade like Mani Ratnam",
    description: "Quick tutorial on achieving the iconic 'Mani Ratnam' color look.",
    fullDescription: "Reel showing the grading process in VN or CapCut to get those signature soft blues and oranges.",
    howToMake: {
      visuals: ["Before/after color grading shots", "App interface screen recordings", "Final cinematic result"],
      audio: "Mani Ratnam movie soundtrack (lofi remix)",
      script: "Want the Mani Ratnam look? Step 1: Lower contrast. Step 2: Push the blues. Step 3: Add soft light.",
      editingStyle: "Side-by-side splitscreen, focus on color accuracy and aesthetic transitions."
    },
    peakIn: "4 days",
    confidence: 92,
    engagement: "High",
    tags: ["Cinematography", "ColorGrading", "ManiRatnam"]
  },
  {
    id: "ig-ent-5",
    platform: "instagram",
    domain: "Entertainment",
    title: "What I Spent in a Day as a Creator in Mumbai",
    description: "Relatable 'Spend with Me' reel for freelancers.",
    fullDescription: "A breakdown of typical expenses in Mumbai from coffee shops to rickshaw rides, showing the reality of the creator life.",
    howToMake: {
      visuals: ["Shot of the bill", "Travel clips (auto/local)", "Creator working shots"],
      audio: "Upbeat rhythmic background, fast voiceover",
      script: "Total spent today: ₹1500. Let's see where it went. Start with breakfast... and end with that late-night chai.",
      editingStyle: "Fast-paced editing, text bubbles for prices, focus on relatability."
    },
    peakIn: "2 days",
    confidence: 90,
    engagement: "Highly Shared",
    tags: ["CreatorEconomy", "MumbaiLife", "FinanceReels"]
  },

  // --- FOOD: YouTube (5) ---
  {
    id: "yt-food-1",
    platform: "youtube",
    domain: "Food",
    title: "The Ultimate $1 vs $100 Thali",
    description: "Comparing street thali vs luxury hotel thali side-by-side.",
    fullDescription: "A high-production food review comparing value, taste, and experience.",
    howToMake: {
      visuals: ["Side-by-side plating shots", "Macro food textures", "Cinematic intros"],
      audio: "Informative but fun narration, contrasting music styles",
      script: "Focus on 'Value for Money'. Interview the street vendor. Show the luxury service.",
      editingStyle: "Professional color grading, split-screen transitions, clear price tags."
    },
    peakIn: "7 days",
    confidence: 95,
    engagement: "High",
    tags: ["FoodReview", "ThaliChallenge", "IndianStreetFood"]
  },
  {
    id: "yt-food-2",
    platform: "youtube",
    domain: "Food",
    title: "Hidden Gems of Chandni Chowk",
    description: "A localized guide to the best unexplored food stalls.",
    fullDescription: "A deep-dive travel and food vlog focusing on stalls that have been running for 50+ years.",
    howToMake: {
      visuals: ["Gritty street shots", "Stall owner interviews", "Authentic eating reactions"],
      audio: "Crowd noises, authentic sitar background",
      script: "Tell history. Show 'secret' ingredient. Give map directions.",
      editingStyle: "Raw feel, minimal filtering, handheld camera movements."
    },
    peakIn: "15 days",
    confidence: 89,
    engagement: "Growing",
    tags: ["DelhiFood", "ChandniChowk", "FoodHistorian"]
  },
  {
    id: "yt-food-3",
    platform: "youtube",
    domain: "Food",
    title: "Recreating the World's Spiciest Ramen at Home",
    description: "Testing the limits of survival with extreme food challenges.",
    fullDescription: "A high-energy video where the creator tries to cook and finish the spiciest noodles available, with funny reaction shots.",
    howToMake: {
      visuals: ["Extreme close-ups of red chili oil", "Sweating/crying reactions", "Milk/water bottles nearby"],
      audio: "Intense high-energy music, comical screams of pain",
      script: "Why am I doing this? The ingredients. The first bite. The regret. The final verdict.",
      editingStyle: "Rapid cuts, focus on facial expressions, loud graphics and sound effects."
    },
    peakIn: "8 days",
    confidence: 91,
    engagement: "Very High",
    tags: ["SpicyChallenge", "FoodVlog", "ExtremeFood"]
  },
  {
    id: "yt-food-4",
    platform: "youtube",
    domain: "Food",
    title: "Modernizing Ancient Indian Recipes",
    description: "Bringing 1000-year-old dishes to 2026 kitchens.",
    fullDescription: "A cinematic cooking series where the creator researches ancient texts and recreates forgotten Indian dishes with a modern presentation.",
    howToMake: {
      visuals: ["Slow cinematic cooking shots", "Archival text snippets", "Aesthetic final plating"],
      audio: "Atmospheric, spiritual background music, calm soft narration",
      script: "The history of this dish. The rare ingredients. The modern twist. The final taste test.",
      editingStyle: "Soft transitions, warm lighting, focus on the 'art' of cooking."
    },
    peakIn: "2 weeks",
    confidence: 88,
    engagement: "High",
    tags: ["IndianHistory", "HeritageFood", "FineDining"]
  },
  {
    id: "yt-food-5",
    platform: "youtube",
    domain: "Food",
    title: "What I Eat in a Day: Healthy Desi Version",
    description: "Budget-friendly healthy eating roadmap for students.",
    fullDescription: "Focuses on high-protein, low-cost Indian meals from oats chilla to sattu shakes.",
    howToMake: {
      visuals: ["Meal prep shots", "Clean aesthetic kitchen", "Calorie count graphics on screen"],
      audio: "Supportive, clear voiceover, lo-fi beats",
      script: "Breakfast: Sattu shake. Lunch: Paneer bhurji. Why this works for your budget.",
      editingStyle: "Fast-motion cooking, focus on ingredients list, clear text callouts."
    },
    peakIn: "10 days",
    confidence: 93,
    engagement: "High",
    tags: ["HealthyDesi", "StudentMealPrep", "FitnessFood"]
  },

  // --- FOOD: Instagram (5) ---
  {
    id: "ig-food-1",
    platform: "instagram",
    domain: "Food",
    title: "15-Minute One-Pot Desi Pasta",
    description: "Fusion pasta recipe designed for quick student meals.",
    fullDescription: "Quick, relatable, and high-energy cooking reel. Combines Italian pasta with Indian spices.",
    howToMake: {
      visuals: ["Extreme close-ups of sizzling spices", "The 'one-pot' reveal", "B-roll of the final creamy texture"],
      audio: "Trending upbeat instrumental, ASMR sizzle sounds",
      script: "Hook: 'Stop ordering out!' Instructions. Text-on-screen ingredients.",
      editingStyle: "Rhythmic cuts synced to beat, vibrant color grading."
    },
    peakIn: "3 days",
    confidence: 92,
    engagement: "Very High",
    tags: ["QuickRecipes", "DesiFusion", "StudentMeals"]
  },
  {
    id: "ig-food-2",
    platform: "instagram",
    domain: "Food",
    title: "Coffee in a Cone",
    description: "Aesthetic cafe-style trend coming to Indian home kitchens.",
    fullDescription: "A visual-heavy reel showing how to coat a cone and serve hot coffee inside.",
    howToMake: {
      visuals: ["Chocolate melting", "Pouring coffee", "The first sip shot"],
      audio: "Satisfying crunch sounds, chill bossa nova",
      script: "No talking. Just sounds and aesthetic. Simple 1-2-3 steps overlay.",
      editingStyle: "Slow-motion pours, high brightness, soft focus."
    },
    peakIn: "2 days",
    confidence: 97,
    engagement: "Viral Potential",
    tags: ["HomeCafe", "CoffeeArt", "FoodAesthetic"]
  },
  {
    id: "ig-food-3",
    platform: "instagram",
    domain: "Food",
    title: "Air-Fryer Indian Snacks",
    description: "Healthy versions of samosas and pakoras in 10 minutes.",
    fullDescription: "Targets the health-conscious Indian audience with zero-oil snacks.",
    howToMake: {
      visuals: ["Before/after oil-free comparison", "Crunch test with microphone", "Golden brown results"],
      audio: "Crisp air fryer sounds, upbeat Indian instrumental",
      script: "Hook: 'Zero oil, 100% crunch!' Recipe overview. Health benefits.",
      editingStyle: "Fast edits, side-by-side text graphics."
    },
    peakIn: "4 days",
    confidence: 94,
    engagement: "High",
    tags: ["HealthySnacks", "AirFryerRecipes", "FitFoodie"]
  },
  {
    id: "ig-food-4",
    platform: "instagram",
    domain: "Food",
    title: "Aesthetic Indian Tea Party",
    description: "Styling tips for a modern Desi evening snacks setup.",
    fullDescription: "Reel showing creative ways to style classic chai, biscuits, and pakoras for a premium aesthetic.",
    howToMake: {
      visuals: ["Close-up of tea pouring in ceramic cups", "Floral arrangements", "Finger-food plating"],
      audio: "Calm, acoustic guitar background, soft steaming sounds",
      script: "No dialogue. Focus on 'the vibe'. Use text like 'Elevating your evening chai'.",
      editingStyle: "Slow smooth transitions, soft lighting, focus on color harmony."
    },
    peakIn: "5 days",
    confidence: 91,
    engagement: "High",
    tags: ["TeaTime", "DesiAesthetic", "TableStyling"]
  },
  {
    id: "ig-food-5",
    platform: "instagram",
    domain: "Food",
    title: "5 Healthy Breakfasts in 5 Minutes",
    description: "Quick-fire morning routine for busy professionals.",
    fullDescription: "Fast-paced reel showing five different 5-minute Indian breakfast ideas.",
    howToMake: {
      visuals: ["Ingredients flying into the bowl", "The final dish result", "Happy reaction/tucking in"],
      audio: "Fast rhythmic trending audio, energetic voice-over",
      script: "No time for breakfast? Try these 5 ideas. 1, 2, 3, 4, 5. Done!",
      editingStyle: "Extremely fast cuts, pop-up text for ingredients, bright color grading."
    },
    peakIn: "1 day",
    confidence: 95,
    engagement: "Viral Potential",
    tags: ["FastCooking", "BreakfastIdeas", "BusyLife"]
  }
]
