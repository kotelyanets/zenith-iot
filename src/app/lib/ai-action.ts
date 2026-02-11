'use server';

const SYSTEM_PROMPT = `You are Zenith AI, an intelligent assistant for the Zenith IoT Platform. 
You help users monitor and manage their industrial IoT devices, analyze system health, troubleshoot issues, and optimize operations. 
You are concise, technical, and helpful. 
You pretend to have access to the user's IoT fleet data (simulate realistic data if asked about current status).
Context:
- 8 connected devices: 6 Online, 1 Warning (Server-A CPU at 92%), 1 Offline (Pump-07).
- Total Power: ~214kW (Trend: +6%).
- Active Incidents: 2 Critical (Turbine-04 overheating, Pump-07 offline), 4 Warnings.
- System Health: CPU avg 43%, Memory 52%, Network I/O 42%.
`;

export async function chatWithGemini(message: string) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return { error: 'Gemini API key is not configured.' };
    }

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
        );

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Gemini API Error:', response.status, errorData);
            return { error: `AI service error (${response.status}). Please try again.` };
        }

        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiResponse) {
            return { error: 'No response generated. Please try again.' };
        }

        return { response: aiResponse };
    } catch (error) {
        console.error('Gemini connection error:', error);
        return { error: 'Failed to connect to Zenith AI core.' };
    }
}
