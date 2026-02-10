'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Application error:', error)
    }, [error])

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full text-center space-y-6"
            >
                <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">
                        Something went wrong
                    </h2>
                    <p className="text-zinc-400 text-sm">
                        An unexpected error occurred. Please try again or contact support if the problem persists.
                    </p>
                    {error.digest && (
                        <p className="text-zinc-600 text-xs font-mono mt-2">
                            Error ID: {error.digest}
                        </p>
                    )}
                </div>

                <div className="flex gap-3 justify-center">
                    <Button
                        onClick={reset}
                        className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6 gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Try again
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => window.location.href = '/'}
                        className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-full px-6"
                    >
                        Go home
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}
