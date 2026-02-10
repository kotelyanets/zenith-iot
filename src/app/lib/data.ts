'use server'

import { prisma } from '@/lib/prisma'

// ─── Devices ────────────────────────────────────────────

export async function getDevices() {
    return prisma.device.findMany({
        orderBy: { lastSeen: 'desc' },
        include: {
            _count: {
                select: { incidents: true },
            },
        },
    })
}

export async function getDeviceById(id: string) {
    return prisma.device.findUnique({
        where: { id },
        include: {
            incidents: {
                orderBy: { createdAt: 'desc' },
                take: 5,
            },
        },
    })
}

export async function getDeviceStats() {
    const total = await prisma.device.count()
    const online = await prisma.device.count({ where: { status: 'online' } })
    const offline = await prisma.device.count({ where: { status: 'offline' } })
    const warning = await prisma.device.count({ where: { status: 'warning' } })

    return { total, online, offline, warning }
}

// ─── Incidents ──────────────────────────────────────────

export async function getRecentIncidents(limit = 10) {
    return prisma.incident.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
        include: {
            device: {
                select: { name: true },
            },
        },
    })
}

export async function getIncidentStats() {
    const total = await prisma.incident.count()
    const critical = await prisma.incident.count({ where: { severity: 'critical' } })
    const warnings = await prisma.incident.count({ where: { severity: 'warning' } })
    const info = await prisma.incident.count({ where: { severity: 'info' } })
    const unresolved = await prisma.incident.count({ where: { resolved: false } })

    return { total, critical, warnings, info, unresolved }
}

// ─── Energy Readings ────────────────────────────────────

export async function getEnergyReadings(hours = 24) {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000)

    const readings = await prisma.energyReading.findMany({
        where: { timestamp: { gte: since } },
        orderBy: { timestamp: 'asc' },
        select: { power: true, timestamp: true },
    })

    // Group by hour for chart display
    const grouped: Record<string, { total: number; count: number }> = {}

    for (const r of readings) {
        const hour = r.timestamp.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        })
        if (!grouped[hour]) grouped[hour] = { total: 0, count: 0 }
        grouped[hour].total += r.power
        grouped[hour].count += 1
    }

    return Object.entries(grouped).map(([time, data]) => ({
        time,
        power: Math.round((data.total / data.count) * 10) / 10,
    }))
}

export async function getCurrentPower() {
    const latest = await prisma.energyReading.findMany({
        orderBy: { timestamp: 'desc' },
        take: 8, // one per device
        distinct: ['deviceId'],
    })

    const totalPower = latest.reduce((sum, r) => sum + r.power, 0)
    return Math.round(totalPower * 10) / 10
}

// ─── System Health ──────────────────────────────────────

export async function getSystemHealth() {
    const devices = await prisma.device.findMany({
        select: { cpu: true, temperature: true, signal: true },
    })

    const count = devices.length || 1
    const avgCpu = Math.round(devices.reduce((s, d) => s + d.cpu, 0) / count)
    const avgTemp = Math.round(devices.reduce((s, d) => s + d.temperature, 0) / count)
    const avgSignal = Math.round(devices.reduce((s, d) => s + d.signal, 0) / count)

    // Derive memory usage from CPU (simulated correlation)
    const memoryUsage = Math.min(Math.round(avgCpu * 0.85 + 15), 100)

    // Network I/O derived from signal strength (simulated)
    const networkIO = Math.min(Math.round(((avgSignal + 100) / 100) * 80), 100)

    return {
        cpuLoad: avgCpu,
        memoryUsage,
        networkIO,
        temperature: avgTemp,
    }
}

// ─── Map Data ───────────────────────────────────────────

export async function getDeviceLocations() {
    return prisma.device.findMany({
        where: {
            lat: { not: null },
            lng: { not: null },
        },
        select: {
            id: true,
            name: true,
            status: true,
            region: true,
            lat: true,
            lng: true,
        },
    })
}
