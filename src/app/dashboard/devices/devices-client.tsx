'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HoverEffect } from "@/components/ui/hover-effect"
import BasicModal from "@/components/ui/basic-modal"
import {
    Search,
    Plus,
    Server,
    Wifi,
    Cpu,
    Fan,
    Activity,
    MapPin,
    Clock,
    Gauge,
    Thermometer,
    Signal,
    HardDrive
} from "lucide-react"

interface Device {
    id: string
    name: string
    type: string
    status: string
    location: string | null
    region: string | null
    firmware: string | null
    uptime: number
    cpu: number
    temperature: number
    signal: number
    lastSeen: Date
}

export function DevicesClient({ devices }: { devices: Device[] }) {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)

    const filteredDevices = devices.filter(device => {
        const matchesSearch = device.name.toLowerCase().includes(search.toLowerCase()) ||
            (device.location || '').toLowerCase().includes(search.toLowerCase())
        const matchesFilter = filter === 'all' || device.status === filter
        return matchesSearch && matchesFilter
    })

    const getIcon = (type: string) => {
        switch (type) {
            case 'gateway': return <Server className="w-5 h-5 text-indigo-400" />
            case 'controller': return <Wifi className="w-5 h-5 text-blue-400" />
            case 'actuator': return <Fan className="w-5 h-5 text-cyan-400" />
            case 'sensor': return <Activity className="w-5 h-5 text-emerald-400" />
            default: return <Cpu className="w-5 h-5 text-zinc-400" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
            case 'offline': return 'bg-rose-500/10 text-rose-500 border-rose-500/20'
            case 'warning': return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
            default: return 'bg-zinc-500/10 text-zinc-500'
        }
    }

    const getStatusDot = (status: string) => {
        switch (status) {
            case 'online': return 'bg-emerald-500'
            case 'warning': return 'bg-amber-500'
            default: return 'bg-rose-500'
        }
    }

    const handleCardClick = (id: string) => {
        const device = devices.find(d => d.id === id)
        if (device) setSelectedDevice(device)
    }

    const timeAgo = (date: Date) => {
        const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
        if (seconds < 60) return 'Just now'
        const minutes = Math.floor(seconds / 60)
        if (minutes < 60) return `${minutes} min ago`
        const hours = Math.floor(minutes / 60)
        if (hours < 24) return `${hours}h ago`
        return `${Math.floor(hours / 24)}d ago`
    }

    const hoverItems = filteredDevices.map((device) => ({
        id: device.id,
        content: (
            <Card className="bg-zinc-900/30 border-zinc-800 transition-colors group h-full">
                <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-indigo-500/20 transition-colors">
                        {getIcon(device.type)}
                    </div>
                    <div className={`w-2.5 h-2.5 rounded-full ${getStatusDot(device.status)} shadow-[0_0_8px_currentColor] opacity-80`} />
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <CardTitle className="text-lg font-semibold text-zinc-100 mb-1">{device.name}</CardTitle>
                        <div className="flex items-center text-xs text-zinc-500 gap-1">
                            <MapPin className="w-3 h-3" />
                            {device.location || device.region || 'Unknown'}
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <Badge variant="outline" className="font-mono text-xs text-zinc-400 border-zinc-800">
                            {device.firmware || 'N/A'}
                        </Badge>
                        <Badge variant="outline" className={`${getStatusColor(device.status)} border capitalize`}>
                            {device.status}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        ),
    }))

    return (
        <div className="p-4 pt-16 lg:pt-8 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-zinc-100 mb-2">Device Management</h1>
                    <p className="text-zinc-400 text-sm lg:text-base">Monitor and configure your customized IoT fleet</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Device
                </Button>
            </div>

            {/* Toolbar */}
            <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                            placeholder="Search by name or location..."
                            className="pl-9 bg-black/40 border-zinc-800 focus:border-indigo-500/50"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-full md:w-[200px] bg-black/40 border-zinc-800">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="warning">Warning</SelectItem>
                            <SelectItem value="offline">Offline</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Grid with Hover Effect */}
            <HoverEffect items={hoverItems} onItemClick={handleCardClick} />

            {/* Device Detail Modal */}
            <BasicModal
                isOpen={!!selectedDevice}
                onClose={() => setSelectedDevice(null)}
                title={selectedDevice?.name}
                size="lg"
            >
                {selectedDevice && (
                    <div className="space-y-6">
                        {/* Status & Type Row */}
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                                {getIcon(selectedDevice.type)}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${getStatusDot(selectedDevice.status)}`} />
                                    <span className="capitalize text-sm text-zinc-300">{selectedDevice.status}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-zinc-500">
                                    <MapPin className="w-3 h-3" />
                                    {selectedDevice.location || selectedDevice.region || 'Unknown'}
                                </div>
                            </div>
                            <Badge variant="outline" className="ml-auto font-mono text-xs text-zinc-400 border-zinc-700">
                                {selectedDevice.region || 'N/A'}
                            </Badge>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div className="rounded-lg bg-zinc-900/60 border border-zinc-800 p-3">
                                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    Uptime
                                </div>
                                <p className="text-lg font-semibold text-zinc-100">{selectedDevice.uptime}%</p>
                            </div>
                            <div className="rounded-lg bg-zinc-900/60 border border-zinc-800 p-3">
                                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                                    <Gauge className="w-3.5 h-3.5" />
                                    CPU Usage
                                </div>
                                <p className="text-lg font-semibold text-zinc-100">
                                    {selectedDevice.status === 'offline' ? '—' : `${selectedDevice.cpu}%`}
                                </p>
                            </div>
                            <div className="rounded-lg bg-zinc-900/60 border border-zinc-800 p-3">
                                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                                    <Thermometer className="w-3.5 h-3.5" />
                                    Temperature
                                </div>
                                <p className="text-lg font-semibold text-zinc-100">
                                    {selectedDevice.status === 'offline' ? '—' : `${selectedDevice.temperature}°C`}
                                </p>
                            </div>
                            <div className="rounded-lg bg-zinc-900/60 border border-zinc-800 p-3">
                                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                                    <Signal className="w-3.5 h-3.5" />
                                    Signal
                                </div>
                                <p className="text-lg font-semibold text-zinc-100">
                                    {selectedDevice.status === 'offline' ? '—' : `${selectedDevice.signal} dBm`}
                                </p>
                            </div>
                            <div className="rounded-lg bg-zinc-900/60 border border-zinc-800 p-3">
                                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                                    <HardDrive className="w-3.5 h-3.5" />
                                    Firmware
                                </div>
                                <p className="text-lg font-semibold text-zinc-100">{selectedDevice.firmware || 'N/A'}</p>
                            </div>
                            <div className="rounded-lg bg-zinc-900/60 border border-zinc-800 p-3">
                                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    Last Seen
                                </div>
                                <p className="text-lg font-semibold text-zinc-100">{timeAgo(selectedDevice.lastSeen)}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                                Configure
                            </Button>
                            <Button variant="outline" className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                                View Logs
                            </Button>
                        </div>
                    </div>
                )}
            </BasicModal>
        </div>
    )
}
