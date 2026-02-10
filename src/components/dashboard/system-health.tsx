"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Cpu, HardDrive, Network } from "lucide-react"

interface SystemHealthProps {
    cpuLoad: number
    memoryUsage: number
    networkIO: number
}

interface MetricData {
    label: string
    value: number
    icon: React.ElementType
    color: string
    gradient: string
}

function CircularProgress({ value, color, gradient, id }: { value: number, color: string, gradient: string, id: string }) {
    const radius = 30
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (value / 100) * circumference

    const gradientColors: Record<string, { start: string, end: string }> = {
        'from-emerald-400 to-emerald-500': { start: '#34d399', end: '#10b981' },
        'from-indigo-400 to-indigo-500': { start: '#818cf8', end: '#6366f1' },
        'from-violet-400 to-violet-500': { start: '#a78bfa', end: '#8b5cf6' }
    }

    const colors = gradientColors[gradient] || { start: '#818cf8', end: '#6366f1' }

    return (
        <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-white/5"
                />
                <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    stroke={`url(#gradient-${id})`}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                />
                <defs>
                    <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colors.start} stopOpacity="1" />
                        <stop offset="100%" stopColor={colors.end} stopOpacity="1" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${color}`}>{value}%</span>
            </div>
        </div>
    )
}

export function SystemHealth({ cpuLoad, memoryUsage, networkIO }: SystemHealthProps) {
    const metrics: MetricData[] = [
        {
            label: "CPU Load",
            value: cpuLoad,
            icon: Cpu,
            color: "text-emerald-400",
            gradient: "from-emerald-400 to-emerald-500"
        },
        {
            label: "Memory Usage",
            value: memoryUsage,
            icon: HardDrive,
            color: "text-indigo-400",
            gradient: "from-indigo-400 to-indigo-500"
        },
        {
            label: "Network I/O",
            value: networkIO,
            icon: Network,
            color: "text-violet-400",
            gradient: "from-violet-400 to-violet-500"
        }
    ]

    const allNormal = metrics.every(m => m.value < 85)

    return (
        <Card className="col-span-1 row-span-2 h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                    <span>System Health</span>
                    <Activity className="w-5 h-5 text-indigo-400" />
                </CardTitle>
                <div className="mt-2">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${allNormal
                        ? 'bg-emerald-500/10 border border-emerald-500/20'
                        : 'bg-amber-500/10 border border-amber-500/20'
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${allNormal ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-pulse'
                            }`} />
                        <span className={`text-xs font-semibold ${allNormal ? 'text-emerald-400' : 'text-amber-400'
                            }`}>
                            {allNormal ? 'All systems normal' : 'Attention needed'}
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3 flex flex-col items-center pt-2">
                {metrics.map((metric) => {
                    const Icon = metric.icon
                    return (
                        <div key={metric.label} className="flex flex-col items-center">
                            <CircularProgress
                                value={metric.value}
                                color={metric.color}
                                gradient={metric.gradient}
                                id={metric.label.toLowerCase().replace(/\s+/g, '-')}
                            />
                            <div className="mt-1.5 flex items-center gap-1.5">
                                <Icon className={`w-4 h-4 ${metric.color}`} />
                                <span className="text-sm text-zinc-400 font-medium">{metric.label}</span>
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}
