"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ShoppingCart,
  TrendingUp,
  Tag,
  Settings,
  User,
  Play,
  Instagram,
  Sparkles,
  LogOut,
  ChevronRight,
  Zap,
} from "lucide-react"

const mainNav = [
  { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
  { icon: Play, label: "YouTube Trends", href: "/youtube-trends" },
  { icon: Instagram, label: "Instagram Trends", href: "/instagram-trends" },
  { icon: ShoppingCart, label: "Marketplace", href: "/marketplace" },
]

const insightsNav = [
  { icon: TrendingUp, label: "Analytics", href: "/analytics" },
  { icon: Tag, label: "Pricing", href: "/pricing" },
]

const accountNav = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: User, label: "Profile", href: "/profile" },
]

function NavSection({ title, items, pathname }: { title: string; items: typeof mainNav; pathname: string }) {
  return (
    <div className="mb-2">
      <p className="px-4 mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">
        {title}
      </p>
      <div className="space-y-0.5">
        {items.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-[13px] font-medium transition-all duration-200 relative ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary" />
              )}
              <Icon className={`w-[18px] h-[18px] transition-colors ${isActive ? "text-primary" : "text-muted-foreground/70 group-hover:text-foreground"}`} />
              <span className="flex-1">{label}</span>
              {isActive && (
                <ChevronRight className="w-3.5 h-3.5 text-primary/50" />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[260px] bg-card border-r border-border/60 h-screen sticky top-0 flex flex-col max-md:hidden lg:flex">
      {/* Logo */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center shadow-md shadow-primary/20">
            <TrendingUp className="w-[18px] h-[18px] text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground tracking-tight leading-none">
              TrendPredict
              <span className="text-primary">Pro</span>
            </h1>
            <p className="text-[10px] text-muted-foreground/60 font-medium mt-0.5">AI Trend Engine</p>
          </div>
        </div>
      </div>

      {/* User card */}
      <div className="mx-4 mb-4 p-3 rounded-xl bg-muted/40 border border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-chart-3 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">Ayush</p>
            <p className="text-[10px] text-muted-foreground truncate">Free Plan</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500 ring-2 ring-green-500/20" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-1 space-y-4">
        <NavSection title="Main" items={mainNav} pathname={pathname} />
        <NavSection title="Insights" items={insightsNav} pathname={pathname} />
        <NavSection title="Account" items={accountNav} pathname={pathname} />
      </nav>

      {/* Upgrade CTA */}
      <div className="mx-4 mb-3">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-chart-2/5 to-chart-3/10 border border-primary/20 p-4">
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-2">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-primary">Upgrade to Pro</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
              Unlock unlimited predictions & all platforms
            </p>
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all shadow-sm shadow-primary/20"
            >
              <Sparkles className="w-3 h-3" />
              Go Pro
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="px-4 py-3 border-t border-border/40">
        <button className="flex items-center gap-2.5 w-full px-2 py-2 rounded-lg text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
