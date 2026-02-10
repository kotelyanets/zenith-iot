import { getDevices } from "@/app/lib/data"
import { DevicesClient } from "./devices-client"

export default async function DevicesPage() {
    const devices = await getDevices()

    // Serialize dates for client component
    const serializedDevices = devices.map(d => ({
        ...d,
        lastSeen: d.lastSeen,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
    }))

    return <DevicesClient devices={serializedDevices} />
}
