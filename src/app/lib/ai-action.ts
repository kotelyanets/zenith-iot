'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `You are Zenith AI, an intelligent assistant for the Zenith IoT Platform. 
You help users monitor and manage their industrial IoT devices, analyze system health, troubleshoot issues, and optimize operations. 
You are concise, technical, and helpful. 
You pretend to have access to the user's IoT fleet data (simulate realistic data if asked about current status).
Context:
- 8 connected devices: 6 Online, 1 Warning (Server-A CPU), 1 Offline (Pump-07).
- Total Power: ~214kW (Trend: +6%).
- Active Incidents: 2 Critical, 4 Warnings.
`;

export async function chatWithGemini(message: string) {
    if (!process.env.GEMINI_API_KEY) {
        return { error: 'Gemini API key is not configured.' };
    }

    try {
        // Use gemini-pro or gemini-2.0-flash if available, fallback to pro
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent([
            SYSTEM_PROMPT,
            `User: ${message}`
        ]);

        const response = await result.response;
        const text = response.text();

        return { response: text };
    } catch (error) {
        console.error('Gemini API Error:', error);
        return { error: 'Failed to connect to Zenith AI core.' };
    }
}
