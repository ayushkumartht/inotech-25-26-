"use client"
import { useState, useEffect, useRef } from "react"

export function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true) },
            { threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])
    return { ref, inView }
}

export function AnimatedCounter({ target, suffix = "", inView }: { target: number; suffix?: string; inView: boolean }) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!inView) return
        let start = 0
        const duration = 1600
        const step = target / (duration / 16)
        const timer = setInterval(() => {
            start += step
            if (start >= target) { setCount(target); clearInterval(timer) }
            else setCount(Math.floor(start))
        }, 16)
        return () => clearInterval(timer)
    }, [inView, target])
    return <>{count.toLocaleString()}{suffix}</>
}
