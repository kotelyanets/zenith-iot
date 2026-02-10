import React from "react";
import { SmokeyBackground } from "@/components/ui/smokey-background";
import { SignUpForm } from "@/components/ui/signup-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-zinc-950 flex items-center justify-center">
            <SmokeyBackground className="absolute inset-0 z-0" />

            {/* Back to Home Button */}
            <div className="absolute top-8 left-8 z-20">
                <Link href="/" className="flex items-center text-white/50 hover:text-white transition-colors gap-2 text-sm font-medium">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </div>

            <SignUpForm />
        </div>
    );
}
