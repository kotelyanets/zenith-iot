import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // ─── Create Admin User ──────────────────────────────
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@zenith-iot.com' },
        update: {},
        create: {
            name: 'Admin User',
            email: 'admin@zenith-iot.com',
            password: hashedPassword,
            role: 'admin',
        },
    })
    console.log(`✅ Admin user created: ${admin.email}`)

    // ─── Create Devices ─────────────────────────────────
    const devicesData = [
        {
            name: 'Turbine-04',
            type: 'sensor',
            status: 'online',
            location: 'Building A - Floor 2',
            region: 'North America',
            lat: 40.7128,
            lng: -74.006,
            firmware: 'v3.2.1',
            uptime: 99.8,
            cpu: 45,
            temperature: 72,
            signal: -42,
        },
        {
            name: 'Server-A',
            type: 'gateway',
            status: 'warning',
            location: 'Data Center 1',
            region: 'Europe',
            lat: 51.5074,
            lng: -0.1278,
            firmware: 'v2.8.0',
            uptime: 98.2,
            cpu: 92,
            temperature: 85,
            signal: -38,
        },
        {
            name: 'Sensor-B12',
            type: 'sensor',
            status: 'online',
            location: 'Warehouse C',
            region: 'Asia',
            lat: 35.6762,
            lng: 139.6503,
            firmware: 'v3.1.0',
            uptime: 99.9,
            cpu: 22,
            temperature: 45,
            signal: -55,
        },
        {
            name: 'Controller-X1',
            type: 'controller',
            status: 'online',
            location: 'Plant B - Section 4',
            region: 'South America',
            lat: -23.5505,
            lng: -46.6333,
            firmware: 'v4.0.2',
            uptime: 99.5,
            cpu: 38,
            temperature: 58,
            signal: -48,
        },
        {
            name: 'Gateway-EU2',
            type: 'gateway',
            status: 'online',
            location: 'Frankfurt DC',
            region: 'Europe',
            lat: 50.1109,
            lng: 8.6821,
            firmware: 'v3.0.1',
            uptime: 99.7,
            cpu: 55,
            temperature: 62,
            signal: -35,
        },
        {
            name: 'Pump-07',
            type: 'actuator',
            status: 'offline',
            location: 'Facility D',
            region: 'Africa',
            lat: -1.2921,
            lng: 36.8219,
            firmware: 'v2.5.3',
            uptime: 87.3,
            cpu: 0,
            temperature: 25,
            signal: -78,
        },
        {
            name: 'Temp-Sensor-22',
            type: 'sensor',
            status: 'online',
            location: 'Cold Storage Unit 3',
            region: 'North America',
            lat: 34.0522,
            lng: -118.2437,
            firmware: 'v3.2.1',
            uptime: 99.6,
            cpu: 15,
            temperature: -18,
            signal: -52,
        },
        {
            name: 'Motor-Drive-3',
            type: 'actuator',
            status: 'warning',
            location: 'Assembly Line 2',
            region: 'Asia',
            lat: 31.2304,
            lng: 121.4737,
            firmware: 'v2.9.4',
            uptime: 95.1,
            cpu: 78,
            temperature: 88,
            signal: -60,
        },
    ]

    const devices = []
    for (const d of devicesData) {
        const device = await prisma.device.create({ data: d })
        devices.push(device)
    }
    console.log(`✅ ${devices.length} devices created`)

    // ─── Create Incidents ───────────────────────────────
    const incidentsData = [
        { deviceId: devices[0].id, issue: 'Overheating detected', severity: 'critical' },
        { deviceId: devices[1].id, issue: 'High CPU usage (92%)', severity: 'warning' },
        { deviceId: devices[2].id, issue: 'Packet loss detected', severity: 'warning' },
        { deviceId: devices[5].id, issue: 'Device offline — no heartbeat', severity: 'critical' },
        { deviceId: devices[7].id, issue: 'Temperature threshold exceeded', severity: 'warning' },
        { deviceId: devices[1].id, issue: 'Memory usage above 85%', severity: 'warning' },
        { deviceId: devices[3].id, issue: 'Firmware update available', severity: 'info' },
        { deviceId: devices[4].id, issue: 'SSL certificate expiring soon', severity: 'info' },
    ]

    for (const incident of incidentsData) {
        await prisma.incident.create({ data: incident })
    }
    console.log(`✅ ${incidentsData.length} incidents created`)

    // ─── Create Energy Readings (last 24 hours) ─────────
    const now = new Date()
    let readingCount = 0

    for (const device of devices) {
        for (let i = 24; i >= 0; i--) {
            const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)
            const basePower = 150 + Math.random() * 100
            const variation = Math.sin(i / 4) * 50

            await prisma.energyReading.create({
                data: {
                    deviceId: device.id,
                    power: Math.round((basePower + variation) * 10) / 10,
                    timestamp,
                },
            })
            readingCount++
        }
    }
    console.log(`✅ ${readingCount} energy readings created`)

    console.log('🎉 Seed complete!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
