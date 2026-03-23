"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

export function DarkModeToggle() {
    const [dark, setDark] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem("theme")
        if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            setDark(true)
            document.documentElement.classList.add("dark")
        }
    }, [])

    const toggle = () => {
        setDark((prev) => {
            const next = !prev
            if (next) {
                document.documentElement.classList.add("dark")
                localStorage.setItem("theme", "dark")
            } else {
                document.documentElement.classList.remove("dark")
                localStorage.setItem("theme", "light")
            }
            return next
        })
    }

    return (
        <button
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-muted transition-smooth"
            aria-label="Toggle dark mode"
        >
            {dark ? <Sun className="w-4 h-4 text-foreground" /> : <Moon className="w-4 h-4 text-foreground" />}
        </button>
    )
}
