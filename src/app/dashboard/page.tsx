import { EnergyChart } from "@/components/dashboard/energy-chart"
import { DeviceMap } from "@/components/dashboard/device-map"
import { SystemHealth } from "@/components/dashboard/system-health"
import { RecentIncidents } from "@/components/dashboard/recent-incidents"
import { getRecentIncidents, getSystemHealth, getDeviceLocations } from "@/app/lib/data"

export default async function Home() {
  const [incidents, health, devices] = await Promise.all([
    getRecentIncidents(8),
    getSystemHealth(),
    getDeviceLocations(),
  ])

  return (
    <div className="p-4 pt-16 lg:pt-8 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-zinc-100 mb-2">
          Dashboard
        </h1>
        <p className="text-zinc-400 text-sm lg:text-base">
          Real-time industrial IoT monitoring and analytics
        </p>
      </div>

      {/* Bento Grid - stacks on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[240px] gap-4 lg:gap-6">
        {/* Block 1: Real-time Power Consumption */}
        <EnergyChart />

        {/* Block 2: System Health */}
        <SystemHealth
          cpuLoad={health.cpuLoad}
          memoryUsage={health.memoryUsage}
          networkIO={health.networkIO}
        />

        {/* Block 3: Global Device Map */}
        <DeviceMap devices={devices} />

        {/* Block 4: Recent Incidents Table */}
        <RecentIncidents incidents={incidents} />
      </div>
    </div>
  )
}
