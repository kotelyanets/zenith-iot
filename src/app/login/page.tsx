"use client"

import { SmokeyBackground } from "@/components/ui/smokey-background"
import { LoginForm } from "@/components/ui/login-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
            {/* Background Shader */}
            <SmokeyBackground color="#6D28D9" backdropBlurAmount="none" className="opacity-80" />

            {/* Optional overlay for better contrast if needed */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />

            {/* Back to Home Button */}
            <div className="absolute top-8 left-8 z-20">
                <Link href="/">
                    <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/10">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </Link>
            </div>

            {/* Login Form Container */}
            <div className="relative z-10 w-full flex justify-center px-4">
                <LoginForm />
            </div>
        </div>
    )
}
