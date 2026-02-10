"use client"

import { usePathname } from "next/navigation"
import FooterSection from "@/components/ui/footer"

export function ConditionalFooter() {
    const pathname = usePathname()

    // Hide footer on these pages
    const hiddenOn = ["/dashboard/ai-chat"]
    if (hiddenOn.includes(pathname)) return null

    return <FooterSection />
}
