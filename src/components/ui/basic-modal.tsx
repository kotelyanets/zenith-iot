"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useOnClickOutside } from "usehooks-ts"

interface BasicModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    size?: "sm" | "md" | "lg" | "xl" | "full"
}

const modalSizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-4xl",
}

export default function BasicModal({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
}: BasicModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const modalRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
    useOnClickOutside(modalRef, () => onClose())

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) onClose()
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose])

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        ref={overlayRef}
                        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => {
                            if (e.target === overlayRef.current) onClose()
                        }}
                    />

                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 sm:p-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            ref={modalRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={title ? "basic-modal-title" : undefined}
                            className={`${modalSizes[size]} relative mx-auto w-full rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-100 shadow-xl ring-1 ring-zinc-800 sm:p-6`}
                            initial={{ scale: 0.96, y: 16, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.98, y: 8, opacity: 0, transition: { duration: 0.15 } }}
                            transition={{ type: "spring", damping: 24, stiffness: 300 }}
                        >
                            <div className="mb-4 flex items-center justify-between gap-2">
                                {title && (
                                    <h3 id="basic-modal-title" className="text-xl font-medium leading-6">
                                        {title}
                                    </h3>
                                )}
                                <motion.button
                                    className="ml-auto rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                                    onClick={onClose}
                                    whileHover={{ rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                    aria-label="Close"
                                >
                                    <X className="h-5 w-5" />
                                </motion.button>
                            </div>

                            <div className="relative">{children}</div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
