"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import {
  Bell, Shield, Eye, Globe, Moon, Smartphone,
  Mail, Lock, Key, Save, Check, Palette, Clock,
} from "lucide-react"

interface SettingToggle {
  id: string
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  enabled: boolean
}

export function Settings() {
  const [saved, setSaved] = useState(false)
  const [notifications, setNotifications] = useState<SettingToggle[]>([
    { id: "trend-alerts", label: "Trend Alerts", description: "Get notified when new trends are detected", icon: Bell, enabled: true },
    { id: "email-digest", label: "Daily Email Digest", description: "Receive daily summary of top trends", icon: Mail, enabled: true },
    { id: "push-notifications", label: "Push Notifications", description: "Browser push notifications for viral alerts", icon: Smartphone, enabled: false },
    { id: "weekly-report", label: "Weekly Report", description: "Detailed weekly performance report", icon: Clock, enabled: true },
  ])
  const [security, setSecurity] = useState<SettingToggle[]>([
    { id: "two-factor", label: "Two-Factor Authentication", description: "Add extra security to your account", icon: Shield, enabled: true },
    { id: "session-alerts", label: "Login Alerts", description: "Get notified of new device logins", icon: Key, enabled: true },
    { id: "api-access", label: "API Access", description: "Enable REST API access to your data", icon: Lock, enabled: false },
  ])
  const [preferences, setPreferences] = useState<SettingToggle[]>([
    { id: "dark-mode", label: "Dark Mode", description: "Switch to dark theme", icon: Moon, enabled: false },
    { id: "compact-view", label: "Compact View", description: "Use compact card layout", icon: Palette, enabled: false },
    { id: "public-profile", label: "Public Profile", description: "Make your profile visible on the leaderboard", icon: Eye, enabled: true },
    { id: "auto-refresh", label: "Auto Refresh Trends", description: "Automatically fetch new trends every 30min", icon: Globe, enabled: true },
  ])

  const toggle = (list: SettingToggle[], setList: React.Dispatch<React.SetStateAction<SettingToggle[]>>, id: string) => {
    setList(list.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-4 md:p-8 max-w-[900px] mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2 text-sm">Customize your experience</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${saved
              ? "bg-green-500 text-white shadow-lg shadow-green-200"
              : "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
            }`}
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-5">
        <SettingsSection title="Notifications" icon={Bell} settings={notifications} onToggle={(id) => toggle(notifications, setNotifications, id)} />
        <SettingsSection title="Security" icon={Shield} settings={security} onToggle={(id) => toggle(security, setSecurity, id)} />
        <SettingsSection title="Preferences" icon={Palette} settings={preferences} onToggle={(id) => toggle(preferences, setPreferences, id)} />

        {/* Danger Zone */}
        <Card className="p-5 border-red-200 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-200">
              <div>
                <p className="text-sm font-medium text-red-800">Delete Account</p>
                <p className="text-xs text-red-600">Permanently delete your account and all data</p>
              </div>
              <button className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-all">
                Delete
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-200">
              <div>
                <p className="text-sm font-medium text-red-800">Reset All Data</p>
                <p className="text-xs text-red-600">Reset predictions, rankings, and history</p>
              </div>
              <button className="px-3 py-1.5 bg-red-100 text-red-700 border border-red-300 rounded-lg text-xs font-medium hover:bg-red-200 transition-all">
                Reset
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function SettingsSection({ title, icon: Icon, settings, onToggle }: {
  title: string, icon: React.ComponentType<{ className?: string }>, settings: SettingToggle[], onToggle: (id: string) => void
}) {
  return (
    <Card className="p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="space-y-1">
        {settings.map(s => {
          const SIcon = s.icon
          return (
            <div key={s.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <SIcon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </div>
              </div>
              {/* Toggle Switch */}
              <button
                onClick={() => onToggle(s.id)}
                className={`w-11 h-6 rounded-full relative transition-all duration-300 ${s.enabled ? "bg-primary" : "bg-gray-300"}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${s.enabled ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
