"use client";

import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineContentProps {
    children: React.ReactNode;
    animationNum: number;
    timelineRef: React.RefObject<HTMLDivElement | null>;
    className?: string;
    as?: React.ElementType;
    customVariants?: Variants;
}

export function TimelineContent({
    children,
    animationNum,
    timelineRef,
    className,
    as: Component = "div",
    customVariants,
}: TimelineContentProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start end", "end start"],
    });

    // Map scroll to opacity for staggered animations
    const startPoint = Math.min(animationNum * 0.08, 0.6);
    const endPoint = Math.min(startPoint + 0.15, 0.95);
    const opacity = useTransform(scrollYProgress, [startPoint, endPoint], [0, 1]);
    const y = useTransform(scrollYProgress, [startPoint, endPoint], [30, 0]);

    const MotionComponent = motion.create(Component);

    if (customVariants) {
        return (
            <MotionComponent
                ref={ref}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={animationNum}
                variants={customVariants}
                className={cn(className)}
            >
                {children}
            </MotionComponent>
        );
    }

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
