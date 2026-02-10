"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="bg-slate-950 w-full min-h-screen">
            {/* Navigation Header - MOVED OUTSIDE LampContainer */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed top-0 left-0 w-full flex justify-between items-center p-6 z-[100] pointer-events-auto bg-transparent"
            >
                <div className="text-xl font-bold text-white tracking-widest uppercase z-50">Zenith</div>
                <div className="flex gap-4 z-50">
                    <Link href="/pricing">
                        <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/10 transition-colors">
                            Pricing
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/10 transition-colors">
                            Log In
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6 shadow-[0_0_15px_rgba(124,58,237,0.5)] transition-all">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </motion.div>

            <LampContainer>
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="mt-8 bg-gradient-to-br from-slate-100 to-slate-400 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                >
                    Zenith IoT <br /> Intelligent Monitoring
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.6,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="mt-4 text-center text-slate-400 max-w-lg mx-auto"
                >
                    Experience the future of industrial control. Real-time data, predictive analytics, and global device management in one unified platform.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.8,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="mt-8"
                >
                    <Link href="/login">
                        <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-8 gap-2">
                            Enter Platform
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>
            </LampContainer>
        </div>
    );
}
