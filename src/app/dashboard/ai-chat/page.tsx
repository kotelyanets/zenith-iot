"use client"

import { PromptBox } from "@/components/ui/prompt-box"
import { Bot, Sparkles, Loader2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { chatWithGemini } from "@/app/lib/ai-action"

interface Message {
    role: 'user' | 'assistant'
    content: string
}

export default function AIChat() {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }, [messages])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const textarea = e.currentTarget.querySelector('textarea')
        const userMessage = textarea?.value || ''

        if (!userMessage.trim() || isLoading) return

        setMessages(prev => [...prev, { role: 'user', content: userMessage }])
        // Clear textarea and trigger React state update in PromptBox
        if (textarea) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLTextAreaElement.prototype, 'value'
            )?.set
            nativeInputValueSetter?.call(textarea, '')
            textarea.dispatchEvent(new Event('input', { bubbles: true }))
        }
        setIsLoading(true)

        try {
            const data = await chatWithGemini(userMessage)

            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: data.response || data.error || 'Something went wrong.' }
            ])
        } catch {
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: 'Network error. Please check your connection.' }
            ])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-2rem)] p-4 pt-16 lg:pt-8 lg:p-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-zinc-100 mb-2 flex items-center gap-3">
                    <Sparkles className="w-7 h-7 lg:w-8 lg:h-8 text-violet-400" />
                    Zenith AI
                </h1>
                <p className="text-zinc-400 text-sm lg:text-base">
                    Your intelligent IoT platform assistant
                </p>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-none">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-6 px-4">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/30 flex items-center justify-center">
                            <Bot className="w-8 h-8 lg:w-10 lg:h-10 text-violet-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-zinc-200 mb-2">How can I help?</h2>
                            <p className="text-zinc-500 max-w-md text-sm lg:text-base">
                                Ask me about device status, energy consumption, incident analysis, or system health.
                            </p>
                        </div>

                        {/* Suggestion chips */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {[
                                "Show device status overview",
                                "Analyze energy consumption",
                                "List active incidents",
                                "System health report",
                            ].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => {
                                        const form = document.querySelector('form')
                                        const textarea = form?.querySelector('textarea')
                                        if (textarea) {
                                            textarea.value = suggestion
                                            form?.requestSubmit()
                                        }
                                    }}
                                    className="px-4 py-2 rounded-full text-sm bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-violet-500/50 hover:text-violet-300 transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                                    <Bot className="w-4 h-4 text-violet-400" />
                                </div>
                            )}
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-violet-600 text-white rounded-br-sm'
                                    : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-sm'
                                    }`}
                                style={{ whiteSpace: 'pre-wrap' }}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4 text-violet-400" />
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                            <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                            <span className="text-sm text-zinc-400">Thinking...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="shrink-0">
                <form onSubmit={handleSubmit}>
                    <PromptBox />
                </form>
            </div>
        </div>
    )
}
