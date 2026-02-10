"use client"

import { useState, useEffect } from "react"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap } from "lucide-react"

interface DataPoint {
    time: string
    power: number
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black/80 backdrop-blur border border-white/10 rounded-lg px-4 py-2 shadow-xl">
                <p className="text-sm text-zinc-400">Power Consumption</p>
                <p className="text-lg font-bold text-violet-400">
                    {payload[0].value.toFixed(1)} kW
                </p>
                <p className="text-xs text-zinc-500 mt-1">{payload[0].payload.time}</p>
            </div>
        )
    }
    return null
}

export function EnergyChart() {
    const [data, setData] = useState<DataPoint[]>(() => {
        // Initialize with 20 data points
        const initialData: DataPoint[] = []
        const now = Date.now()
        for (let i = 19; i >= 0; i--) {
            const timestamp = new Date(now - i * 2000)
            initialData.push({
                time: timestamp.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }),
                power: Math.random() * (250 - 150) + 150
            })
        }
        return initialData
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setData((prevData) => {
                // Remove oldest point and add new one
                const newData = [...prevData.slice(1)]
                const newTimestamp = new Date()

                newData.push({
                    time: newTimestamp.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    }),
                    power: Math.random() * (250 - 150) + 150
                })

                return newData
            })
        }, 2000) // Update every 2 seconds

        return () => clearInterval(interval)
    }, [])

    // Calculate current power (last data point)
    const currentPower = data[data.length - 1]?.power || 0
    const avgPower = data.reduce((sum, d) => sum + d.power, 0) / data.length
    const percentChange = ((currentPower - avgPower) / avgPower) * 100

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 row-span-2 h-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="w-6 h-6 text-amber-400" />
                            Real-time Power Consumption
                        </CardTitle>
                        <div className="flex items-center gap-3 mt-2">
                            <p className="text-sm text-zinc-400">
                                Live energy metrics across all facilities
                            </p>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-xs font-semibold text-emerald-400">LIVE</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-zinc-100">
                            {currentPower.toFixed(1)} kW
                        </div>
                        <div className={`text-sm font-semibold ${percentChange >= 0 ? "text-emerald-400" : "text-rose-400"
                            }`}>
                            {percentChange >= 0 ? "↑" : "↓"} {Math.abs(percentChange).toFixed(1)}% from avg
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-120px)]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            opacity={0.1}
                            stroke="#ffffff"
                        />
                        <XAxis
                            dataKey="time"
                            tick={{ fill: '#52525b', fontSize: 11 }}
                            tickLine={false}
                            axisLine={{ stroke: '#27272a' }}
                            interval="preserveStartEnd"
                            minTickGap={50}
                        />
                        <YAxis
                            tick={{ fill: '#52525b', fontSize: 11 }}
                            tickLine={false}
                            axisLine={{ stroke: '#27272a' }}
                            domain={[120, 280]}
                            tickFormatter={(value) => `${value}kW`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="power"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            fill="url(#colorPower)"
                            animationDuration={300}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
