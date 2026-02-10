"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface VerticalCutRevealProps {
    children: string;
    splitBy?: "characters" | "words";
    staggerDuration?: number;
    staggerFrom?: "first" | "last" | "center";
    reverse?: boolean;
    containerClassName?: string;
    transition?: {
        type?: string;
        stiffness?: number;
        damping?: number;
        delay?: number;
    };
}

export function VerticalCutReveal({
    children,
    splitBy = "characters",
    staggerDuration = 0.05,
    staggerFrom = "first",
    reverse = false,
    containerClassName,
    transition = {
        type: "spring",
        stiffness: 250,
        damping: 40,
        delay: 0,
    },
}: VerticalCutRevealProps) {
    const items = splitBy === "words" ? children.split(" ") : children.split("");

    const getDelay = (index: number) => {
        switch (staggerFrom) {
            case "last":
                return (items.length - 1 - index) * staggerDuration;
            case "center": {
                const center = (items.length - 1) / 2;
                return Math.abs(center - index) * staggerDuration;
            }
            default:
                return index * staggerDuration;
        }
    };

    const variants: Variants = {
        hidden: {
            y: reverse ? -20 : 20,
            opacity: 0,
            filter: "blur(4px)",
        },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                ...transition,
                delay: (transition.delay || 0) + getDelay(i),
            },
        }),
    };

    return (
        <span className={cn("inline-flex flex-wrap", containerClassName)}>
            {items.map((item, index) => (
                <motion.span
                    key={`${item}-${index}`}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={variants}
                    className="inline-block"
                    style={{ marginRight: splitBy === "words" ? "0.25em" : undefined }}
                >
                    {item}
                </motion.span>
            ))}
        </span>
    );
}
