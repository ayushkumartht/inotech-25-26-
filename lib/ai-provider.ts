/**
 * AI Provider - Gemini Only
 */

async function wait(ms: number) {
    return new Promise(r => setTimeout(r, ms))
}

let queuePromise: Promise<void> = Promise.resolve()

function enqueue<T>(fn: () => Promise<T>): Promise<T> {
    const result = queuePromise.then(fn, fn)
    queuePromise = result.then(() => {}, () => {})
    return result
}

async function _callGemini(prompt: string, label: string): Promise<string | null> {
    const key = process.env.GEMINI_API_KEY
    if (!key) return null

    const { GoogleGenerativeAI } = await import("@google/generative-ai")
    const genAI = new GoogleGenerativeAI(key)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" })

    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const result = await model.generateContent(prompt)
            const text = result.response.text().trim()
            if (text) return text
        } catch (err: any) {
            if (err.status === 429) {
                await wait(3000 * Math.pow(2, attempt))
                continue
            }
            if (attempt < 2) await wait(2000)
        }
    }
    return null
}

let lastCallTime = 0

export async function generateAI(prompt: string, label: string = "ai"): Promise<string | null> {
    return enqueue(async () => {
        const elapsed = Date.now() - lastCallTime
        if (lastCallTime > 0 && elapsed < 1500) await wait(1500 - elapsed)
        lastCallTime = Date.now()
        return _callGemini(prompt, label)
    })
}

export async function generateAIJSON<T = any>(prompt: string, label: string = "ai"): Promise<T[]> {
    const text = await generateAI(prompt, label)
    if (!text) return []
    try {
        let s = text.indexOf("["), e = text.lastIndexOf("]")
        if (s !== -1 && e === -1) {
            e = text.lastIndexOf("}")
            if (e !== -1) {
                try { return JSON.parse(text.slice(s, e + 1) + "]") } catch { }
            }
        }
        if (s === -1 || e === -1) {
            const os = text.indexOf("{"), oe = text.lastIndexOf("}")
            if (os !== -1 && oe !== -1) return [JSON.parse(text.slice(os, oe + 1))]
            return []
        }
        return JSON.parse(text.slice(s, e + 1).replace(/,\s*([}\]])/g, '$1'))
    } catch {
        return []
    }
}
