"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "lucide-react"

export function TopAvatar() {
    const pathname = usePathname()
    const isProfile = pathname === "/dashboard/profile"

    return (
        <Link
            href="/dashboard/profile"
            className={`fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${isProfile
                    ? "bg-violet-600 border-violet-500 shadow-lg shadow-violet-500/30"
                    : "bg-zinc-900/90 backdrop-blur border-white/10 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/20"
                }`}
            title="Profile"
        >
            <User className="w-5 h-5 text-zinc-200" />
        </Link>
    )
}
