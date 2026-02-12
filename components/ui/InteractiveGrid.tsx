"use client";

import { useEffect, useRef } from "react";

interface InteractiveGridProps {
    className?: string; // Allow custom classes (e.g., z-index, opacity)
}

interface Cell {
    x: number;
    y: number;
    opacity: number;
}

export function InteractiveGrid({ className = "" }: InteractiveGridProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        // Grid config
        const gridSize = 40;
        const gridColor = "rgba(29, 43, 47, 0.6)";
        const cellFadeSpeed = 0.015; // Tuning for "some seconds" fade
        const map = new Map<string, Cell>(); // Key: "x,y", Value: Cell

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize(); // Initial resize

        // Track mouse to add new cells
        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            // Adjust for canvas position (e.g., if sticky header affects layout)
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Snap to grid
            const col = Math.floor(x / gridSize);
            const row = Math.floor(y / gridSize);

            const cellX = col * gridSize;
            const cellY = row * gridSize;
            const key = `${cellX},${cellY}`;

            // Add or refresh cell
            // We set opacity to 1. 
            // If cell exists, it resets to 1 (full brightness).
            map.set(key, {
                x: cellX,
                y: cellY,
                opacity: 1 // Start fully opaque (white/grey)
            });
        };
        window.addEventListener("mousemove", onMouseMove);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Draw base grid
            ctx.beginPath();
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 1;

            for (let x = 0; x <= canvas.width; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
            }
            for (let y = 0; y <= canvas.height; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }
            ctx.stroke();

            // 2. Draw and update fading cells
            map.forEach((cell, key) => {
                // Draw filled square
                // Use a white/grey fill as per screenshot
                // Max opacity 0.15 to keep it subtle/transparent like the reference
                ctx.fillStyle = `rgba(255, 255, 255, ${cell.opacity * 0.15})`;
                ctx.fillRect(cell.x + 1, cell.y + 1, gridSize - 2, gridSize - 2); // Inset slightly to not cover lines

                // Decay
                cell.opacity -= cellFadeSpeed;
                if (cell.opacity <= 0) {
                    map.delete(key);
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}
