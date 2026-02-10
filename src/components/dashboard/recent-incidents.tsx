import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { AlertCircle } from "lucide-react"

interface Incident {
    id: string
    device: { name: string }
    issue: string
    severity: string
    createdAt: Date
}

function getSeverityBadge(severity: string) {
    const s = severity.toLowerCase()
    switch (s) {
        case "critical":
            return <Badge variant="destructive">Critical</Badge>
        case "warning":
            return (
                <Badge className="bg-amber-500/15 text-amber-500 hover:bg-amber-500/25 border-amber-500/20">
                    Warning
                </Badge>
            )
        case "info":
            return (
                <Badge className="bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 border-blue-500/20">
                    Info
                </Badge>
            )
        default:
            return <Badge>{severity}</Badge>
    }
}

function timeAgo(date: Date) {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} min ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
}

export function RecentIncidents({ incidents }: { incidents: Incident[] }) {
    return (
        <Card className="col-span-1 md:col-span-1 lg:col-span-2 row-span-2 overflow-hidden flex flex-col">
            <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-rose-400" />
                    Recent Incidents
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Device</TableHead>
                                <TableHead>Issue</TableHead>
                                <TableHead>Severity</TableHead>
                                <TableHead className="text-right">Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {incidents.map((incident) => (
                                <TableRow key={incident.id}>
                                    <TableCell className="font-medium text-zinc-100">
                                        {incident.device.name}
                                    </TableCell>
                                    <TableCell className="text-zinc-400">
                                        {incident.issue}
                                    </TableCell>
                                    <TableCell>{getSeverityBadge(incident.severity)}</TableCell>
                                    <TableCell className="text-right text-zinc-500 text-xs">
                                        {timeAgo(incident.createdAt)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
