"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
    Home,
    Boxes,
    BarChart3,
    Settings,
    Activity,
    LogOut,
    Sparkles,
    LifeBuoy,
    Menu,
    X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { signOutAction } from "@/app/lib/signout"

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Devices", href: "/dashboard/devices", icon: Boxes },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Zenith AI", href: "/dashboard/ai-chat", icon: Sparkles },
    { name: "Support", href: "/dashboard/support", icon: LifeBuoy },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)

    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-zinc-100">Zenith</h1>
                            <p className="text-xs text-zinc-500">IoT Platform</p>
                        </div>
                    </div>
                    {/* Close button - mobile only */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                                isActive
                                    ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-zinc-100 border border-indigo-400/30"
                                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 space-y-4">
                <div className="px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm text-zinc-100 font-semibold">System Online</span>
                    </div>
                    <p className="text-xs text-zinc-400">All systems operational</p>
                </div>

                <form action={signOutAction}>
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </form>
            </div>
        </div>
    )

    return (
        <>
            {/* Mobile hamburger button */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-zinc-900/90 backdrop-blur border border-white/10 text-zinc-300 hover:text-white transition-colors"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar - Desktop: always visible, Mobile: slide-in drawer */}
            <aside className={cn(
                "fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-md border-r border-white/10 shadow-2xl shadow-black/50 z-50 transition-transform duration-300 ease-in-out",
                mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                {sidebarContent}
            </aside>
        </>
    )
}
