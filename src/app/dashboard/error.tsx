'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ServerCrash, RotateCcw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Dashboard error:', error)
    }, [error])

    return (
        <div className="p-4 pt-16 lg:pt-8 lg:p-8 flex items-center justify-center min-h-[60vh]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-md w-full"
            >
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 text-center space-y-5">
                    <div className="mx-auto w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <ServerCrash className="w-7 h-7 text-red-400" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-white">
                            Dashboard Error
                        </h2>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Failed to load this section. This could be a temporary issue with data loading.
                        </p>
                        {error.digest && (
                            <p className="text-zinc-600 text-xs font-mono">
                                Ref: {error.digest}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3 justify-center">
                        <Button
                            onClick={reset}
                            size="sm"
                            className="bg-violet-600 hover:bg-violet-700 text-white rounded-lg gap-2"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Retry
                        </Button>
                        <Link href="/dashboard">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-lg gap-2"
                            >
                                <Home className="w-3.5 h-3.5" />
                                Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
