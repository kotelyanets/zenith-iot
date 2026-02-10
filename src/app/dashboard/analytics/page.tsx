'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts'

// Mock Data
const TRAFFIC_DATA = [
    { time: '00:00', upload: 240, download: 380 },
    { time: '04:00', upload: 139, download: 220 },
    { time: '08:00', upload: 580, download: 890 },
    { time: '12:00', upload: 690, download: 1020 },
    { time: '16:00', upload: 890, download: 1250 },
    { time: '20:00', upload: 480, download: 760 },
    { time: '24:00', upload: 320, download: 450 },
]

const INCIDENT_DATA = [
    { type: 'Overheat', count: 12, fill: '#ef4444' }, // red-500
    { type: 'Connection', count: 25, fill: '#f59e0b' }, // amber-500
    { type: 'Power', count: 8, fill: '#8b5cf6' }, // violet-500
    { type: 'Software', count: 18, fill: '#3b82f6' }, // blue-500
]

const HEALTH_DATA = [
    { name: 'Online', value: 75, color: '#10b981' }, // emerald-500
    { name: 'Offline', value: 10, color: '#f43f5e' }, // rose-500
    { name: 'Warning', value: 15, color: '#f59e0b' }, // amber-500
]

export default function AnalyticsPage() {
    return (
        <div className="p-4 pt-16 lg:pt-8 lg:p-8 space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-zinc-100 mb-2">System Analytics</h1>
                <p className="text-zinc-400">Deep dive into network performance and incident metrics</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart - Network Traffic (Spans 2 cols) */}
                <Card className="lg:col-span-2 bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle>Network Traffic</CardTitle>
                        <CardDescription>Inbound vs Outbound data flow (MB/s)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={TRAFFIC_DATA}>
                                    <defs>
                                        <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                    <XAxis dataKey="time" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }}
                                    />
                                    <Area type="monotone" dataKey="download" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorDown)" strokeWidth={2} />
                                    <Area type="monotone" dataKey="upload" stroke="#10b981" fillOpacity={1} fill="url(#colorUp)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* System Health Pie Chart */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle>System Health</CardTitle>
                        <CardDescription>Device status distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={HEALTH_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {HEALTH_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-zinc-100">92%</div>
                                    <div className="text-xs text-zinc-500 uppercase tracking-widest">Uptime</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Incidents Bar Chart (Full Width on Mobile, 3 cols on desktop) */}
                <Card className="lg:col-span-3 bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle>Incidents by Type</CardTitle>
                        <CardDescription>Breakdown of reported system alerts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={INCIDENT_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                    <XAxis dataKey="type" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        cursor={{ fill: '#27272a', opacity: 0.4 }}
                                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }}
                                    />
                                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                        {INCIDENT_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
