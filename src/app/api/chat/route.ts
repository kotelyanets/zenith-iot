import { NextRequest, NextResponse } from 'next/server'

// AI Chat API route — fallback to local responses when no API key is configured
const SYSTEM_PROMPT = `You are Zenith AI, an intelligent assistant for the Zenith IoT Platform. You help users monitor and manage their industrial IoT devices, analyze system health, troubleshoot issues, and optimize operations. You are concise, technical, and helpful.`

// Simulated IoT-aware responses when no external AI API is available
const LOCAL_RESPONSES: Record<string, string> = {
    'device': 'Based on your IoT fleet analysis, I can see 8 devices across 5 regions. 6 devices are online, 1 has warnings (Server-A with high CPU), and 1 is offline (Pump-07 in Africa). Would you like me to run diagnostics on any specific device?',
    'energy': 'Current power consumption across all facilities is approximately 214.4 kW. The trend shows a 6.4% increase from the daily average. Peak consumption occurs between 12:00-16:00. I recommend checking Turbine-04 and Server-A which are contributing most to the load.',
    'incident': 'There are 8 active incidents: 2 critical (Turbine-04 overheating, Pump-07 offline), 4 warnings (Server-A CPU, Sensor-B12 packet loss, Motor-Drive-3 temperature, Server-A memory), and 2 informational (Controller-X1 firmware update, Gateway-EU2 SSL expiry).',
    'health': 'System health overview: Average CPU load is 43%, memory usage at 52%, and network I/O at 42%. Server-A is a concern with 92% CPU utilization — consider load balancing or scaling resources.',
    'help': 'I can help you with:\n• **Device Management** — Monitor status, configure settings\n• **Incident Analysis** — Review and resolve alerts\n• **Energy Monitoring** — Track power consumption trends\n• **System Health** — CPU, memory, and network diagnostics\n• **Predictive Insights** — Forecast potential issues\n\nWhat would you like to know?',
}

function getLocalResponse(message: string): string {
    const lower = message.toLowerCase()

    if (lower.includes('device') || lower.includes('sensor') || lower.includes('server')) {
        return LOCAL_RESPONSES['device']
    }
    if (lower.includes('energy') || lower.includes('power') || lower.includes('consumption')) {
        return LOCAL_RESPONSES['energy']
    }
    if (lower.includes('incident') || lower.includes('alert') || lower.includes('issue')) {
        return LOCAL_RESPONSES['incident']
    }
    if (lower.includes('health') || lower.includes('cpu') || lower.includes('memory') || lower.includes('status')) {
        return LOCAL_RESPONSES['health']
    }
    if (lower.includes('help') || lower.includes('what can') || lower.includes('hi') || lower.includes('hello')) {
        return LOCAL_RESPONSES['help']
    }

    return `I've analyzed your query about "${message.slice(0, 50)}". Based on the current system state, all core services are operational. 6 of 8 devices are online with an average uptime of 97.5%. Would you like me to provide more specific insights on any particular aspect of your IoT infrastructure?`
}

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json()

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 })
        }

        // Check for Gemini API key
        const apiKey = process.env.GEMINI_API_KEY

        if (apiKey) {
            // Use Google Gemini API
            try {
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [
                                {
                                    role: 'user',
                                    parts: [{ text: `${SYSTEM_PROMPT}\n\nUser: ${message}` }],
                                },
                            ],
                        }),
                    }
                )

                if (response.ok) {
                    const data = await response.json()
                    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I was unable to generate a response.'
                    return NextResponse.json({ response: aiResponse })
                }
            } catch {
                // Fall through to local response
            }
        }

        // Fallback: local IoT-aware responses
        // Simulate a small delay for realism
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))

        const response = getLocalResponse(message)
        return NextResponse.json({ response })

    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
