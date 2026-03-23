/**
 * Global Gemini Rate Limiter
 * Free tier: ~15 RPM for gemini-2.0-flash
 * This ensures minimum 4 seconds between any Gemini calls across ALL routes
 */

let lastGeminiCall = 0
const MIN_INTERVAL = 4000 // 4 seconds between calls

export async function waitForGeminiSlot(): Promise<void> {
    const now = Date.now()
    const elapsed = now - lastGeminiCall
    if (elapsed < MIN_INTERVAL) {
        const wait = MIN_INTERVAL - elapsed
        console.log(`[rate-limiter] Waiting ${wait}ms before Gemini call...`)
        await new Promise(r => setTimeout(r, wait))
    }
    lastGeminiCall = Date.now()
}

/**
 * Safe Gemini call wrapper — handles 429 gracefully
 * Returns null on any error (never throws)
 */
export async function safeGeminiCall<T>(
    fn: () => Promise<T>,
    label: string
): Promise<T | null> {
    await waitForGeminiSlot()
    try {
        const result = await fn()
        console.log(`[gemini] ${label}: success`)
        return result
    } catch (err) {
        const errStr = String(err)
        if (errStr.includes("429") || errStr.includes("Too Many")) {
            console.warn(`[gemini] ${label}: 429 rate-limited (will use fallback)`)
        } else {
            console.warn(`[gemini] ${label}: error — ${errStr.slice(0, 100)}`)
        }
        return null
    }
}
