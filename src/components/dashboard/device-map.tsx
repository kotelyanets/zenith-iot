"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, Wifi, WifiOff, AlertTriangle } from "lucide-react"
import Globe from "@/components/ui/globe"

interface DeviceInfo {
    id: string
    name: string
    status: string
    region: string | null
}

const statusConfig: Record<string, { color: string, textColor: string, icon: React.ElementType, label: string }> = {
    online: { color: 'bg-emerald-500', textColor: 'text-emerald-400', icon: Wifi, label: 'Online' },
    offline: { color: 'bg-rose-500', textColor: 'text-rose-400', icon: WifiOff, label: 'Offline' },
    warning: { color: 'bg-amber-500', textColor: 'text-amber-400', icon: AlertTriangle, label: 'Warning' },
}

export function DeviceMap({ devices }: { devices: DeviceInfo[] }) {
    const onlineCount = devices.filter(d => d.status === 'online').length
    const warningCount = devices.filter(d => d.status === 'warning').length
    const offlineCount = devices.filter(d => d.status === 'offline').length
    const regions = new Set(devices.map(d => d.region).filter(Boolean))

    return (
        <Card className="col-span-1 md:col-span-1 lg:col-span-2 row-span-2 h-full">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-indigo-400" />
                    Global Device Map
                </CardTitle>
                <CardDescription className="mt-1">
                    {onlineCount} devices online across {regions.size} regions
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-90px)] flex flex-col items-center justify-center relative overflow-hidden gap-4">
                <div className="flex-1 w-full flex items-center justify-center min-h-0">
                    <Globe />
                </div>

                <div className="w-full flex items-center justify-between gap-2 px-2">
                    <div className="flex gap-3 overflow-x-auto scrollbar-none">
                        {devices.slice(0, 4).map((device) => {
                            const config = statusConfig[device.status] || statusConfig.online
                            return (
                                <div key={device.id} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5 whitespace-nowrap">
                                    <div className={`w-2 h-2 rounded-full ${config.color}`} />
                                    <span className="text-xs text-zinc-300">{device.region || device.name}</span>
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex gap-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5 shrink-0">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-xs text-zinc-400">{onlineCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <span className="text-xs text-zinc-400">{warningCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-rose-500" />
                            <span className="text-xs text-zinc-400">{offlineCount}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
