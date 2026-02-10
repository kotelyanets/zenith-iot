"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, RefreshCw } from "lucide-react"

interface Insight {
    id: number
    text: string
    emoji: string
}

const mockInsights: Insight[] = [
    {
        id: 1,
        emoji: "⚠️",
        text: "Anomaly detected in Sector 7: Temperature spike (+15%)."
    },
    {
        id: 2,
        emoji: "✅",
        text: "Optimization: Energy consumption stabilized."
    },
    {
        id: 3,
        emoji: "🔮",
        text: "Predictive Maintenance: Check cooling fan in Server B within 48h."
    }
]

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
    const [displayedText, setDisplayedText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        setDisplayedText("")
        setCurrentIndex(0)
    }, [text])

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex])
                setCurrentIndex(prev => prev + 1)
            }, delay + 20) // 20ms per character

            return () => clearTimeout(timeout)
        }
    }, [currentIndex, text, delay])

    return (
        <span className="text-sm text-zinc-300">
            {displayedText}
            {currentIndex < text.length && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5"
                />
            )}
        </span>
    )
}

export function AIInsights() {
    const [insights, setInsights] = useState(mockInsights)
    const [isRegenerating, setIsRegenerating] = useState(false)
    const [key, setKey] = useState(0)

    const handleRegenerate = () => {
        setIsRegenerating(true)

        // Shuffle insights
        setTimeout(() => {
            const shuffled = [...mockInsights].sort(() => Math.random() - 0.5)
            setInsights(shuffled)
            setKey(prev => prev + 1)
            setIsRegenerating(false)
        }, 500)
    }

    return (
        <Card className="col-span-2 row-span-1 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-indigo-500/20 hover:border-indigo-400/30 transition-all duration-300 shadow-lg shadow-indigo-500/10 overflow-hidden">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                        <motion.div
                            animate={isRegenerating ? { rotate: 360 } : { scale: [1, 1.1, 1] }}
                            transition={
                                isRegenerating
                                    ? { duration: 1, repeat: Infinity, ease: "linear" }
                                    : { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }
                        >
                            <Sparkles className="w-5 h-5 text-indigo-400" />
                        </motion.div>
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                            Zenith AI Analysis
                        </span>
                    </CardTitle>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRegenerate}
                        disabled={isRegenerating}
                        className="p-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-400/20 transition-colors disabled:opacity-50"
                    >
                        <motion.div
                            animate={isRegenerating ? { rotate: 360 } : {}}
                            transition={{ duration: 1, repeat: isRegenerating ? Infinity : 0, ease: "linear" }}
                        >
                            <RefreshCw className="w-4 h-4 text-indigo-400" />
                        </motion.div>
                    </motion.button>
                </div>
            </CardHeader>

            <CardContent>
                <ScrollArea className="h-[200px] w-full pr-4">
                    <div className="space-y-3">
                        <AnimatePresence mode="wait">
                            {insights.map((insight, index) => (
                                <motion.div
                                    key={`${key}-${insight.id}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: index * 0.2, duration: 0.3 }}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-white/5 backdrop-blur-sm"
                                >
                                    <span className="text-lg mt-0.5 flex-shrink-0">{insight.emoji}</span>
                                    <div className="flex-1 min-w-0">
                                        <TypewriterText
                                            text={insight.text}
                                            delay={index * 1500} // Stagger typewriter effect
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* AI Processing Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isRegenerating ? 1 : 0 }}
                        className="mt-4 flex items-center gap-2 text-xs text-indigo-400"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-indigo-400"
                        />
                        <span>Analyzing system patterns...</span>
                    </motion.div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
