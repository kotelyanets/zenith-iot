"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SparkleProps {
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
    color: string;
}

interface SparklesProps {
    density?: number;
    speed?: number;
    color?: string;
    direction?: "top" | "bottom" | "left" | "right";
    className?: string;
}

export function Sparkles({
    density = 400,
    speed = 1,
    color = "#FFFFFF",
    direction = "bottom",
    className,
}: SparklesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const sparklesRef = useRef<SparkleProps[]>([]);
    const animationRef = useRef<number>(0);
    const dprRef = useRef<number>(1);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        dprRef.current = Math.min(window.devicePixelRatio || 1, 2);

        const updateDimensions = () => {
            const { width, height } = parent.getBoundingClientRect();
            const dpr = dprRef.current;
            setDimensions({ width, height });
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
        };

        updateDimensions();
        const observer = new ResizeObserver(updateDimensions);
        observer.observe(parent);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (dimensions.width === 0 || dimensions.height === 0) return;

        const sparkles: SparkleProps[] = [];
        for (let i = 0; i < density; i++) {
            sparkles.push({
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random(),
                speed: (Math.random() * 0.5 + 0.2) * speed,
                color,
            });
        }
        sparklesRef.current = sparkles;
    }, [density, speed, color, dimensions]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = dprRef.current;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const animate = () => {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);

            for (const sparkle of sparklesRef.current) {
                ctx.beginPath();
                ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
                ctx.fillStyle = sparkle.color;
                ctx.globalAlpha = sparkle.opacity;
                ctx.fill();

                // Animate opacity
                sparkle.opacity += (Math.random() - 0.5) * 0.05;
                sparkle.opacity = Math.max(0.1, Math.min(1, sparkle.opacity));

                // Move in direction
                switch (direction) {
                    case "bottom":
                        sparkle.y += sparkle.speed;
                        if (sparkle.y > dimensions.height) {
                            sparkle.y = 0;
                            sparkle.x = Math.random() * dimensions.width;
                        }
                        break;
                    case "top":
                        sparkle.y -= sparkle.speed;
                        if (sparkle.y < 0) {
                            sparkle.y = dimensions.height;
                            sparkle.x = Math.random() * dimensions.width;
                        }
                        break;
                    case "left":
                        sparkle.x -= sparkle.speed;
                        if (sparkle.x < 0) {
                            sparkle.x = dimensions.width;
                            sparkle.y = Math.random() * dimensions.height;
                        }
                        break;
                    case "right":
                        sparkle.x += sparkle.speed;
                        if (sparkle.x > dimensions.width) {
                            sparkle.x = 0;
                            sparkle.y = Math.random() * dimensions.height;
                        }
                        break;
                }
            }

            ctx.globalAlpha = 1;
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationRef.current);
    }, [dimensions, direction]);

    return (
        <canvas
            ref={canvasRef}
            className={cn("pointer-events-none", className)}
        />
    );
}
