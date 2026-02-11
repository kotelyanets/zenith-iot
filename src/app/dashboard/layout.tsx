import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Zenith IoT | Dashboard",
    description: "Monitor your industrial IoT infrastructure",
}

import { Sidebar } from "@/components/layout/sidebar"
import { ConditionalFooter } from "@/components/layout/conditional-footer"
import { BeamsBackground } from "@/components/ui/beams-background"
import { TopAvatar } from "@/components/layout/top-avatar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-[#09090b]">
            {/* Animated Beams Background */}
            <BeamsBackground intensity="subtle" />

            <Sidebar />
            <TopAvatar />
            <main className="flex-1 lg:ml-64 min-h-screen relative z-10">
                {children}
                <ConditionalFooter />
            </main>
        </div>
    )
}
