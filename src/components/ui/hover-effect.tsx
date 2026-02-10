"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({
    items,
    className,
    onItemClick,
}: {
    items: {
        id: string;
        content: React.ReactNode;
    }[];
    className?: string;
    onItemClick?: (id: string) => void;
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                className
            )}
        >
            {items.map((item, idx) => (
                <div
                    key={item.id}
                    className={cn("relative group block h-full w-full", onItemClick && "cursor-pointer")}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => onItemClick?.(item.id)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-violet-500/[0.08] block rounded-xl border border-violet-500/30"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <div className="relative z-20">
                        {item.content}
                    </div>
                </div>
            ))}
        </div>
    );
};
