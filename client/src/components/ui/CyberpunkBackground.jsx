import React, { useEffect, useRef } from 'react';

const COLORS = [
    '#60a5fa', // Blue
    '#f472b6', // Pink
    '#4ade80', // Green
    '#fb923c'  // Orange
];

const SHAPES = ['square', 'triangle', 'hexagon', 'cross'];

export default function CyberpunkBackground({ children }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Resize handler
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Particle System
        class Particle {
            constructor() {
                this.reset(true);
            }

            reset(randomPosition = false) {
                this.x = randomPosition ? Math.random() * canvas.width : Math.random() * canvas.width;
                this.y = randomPosition ? Math.random() * canvas.height : -50;

                // Faster Speed: 1-3 px/frame
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() * 2) + 1;

                this.size = Math.random() * 30 + 15; // 15-45px
                this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
                this.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];

                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.05;

                this.history = []; // For trails
                this.maxHistory = 15;
            }

            update() {
                // Save history
                this.history.push({ x: this.x, y: this.y, rotation: this.rotation });
                if (this.history.length > this.maxHistory) {
                    this.history.shift();
                }

                // Move
                this.x += this.vx;
                this.y += this.vy;
                this.rotation += this.rotationSpeed;

                // Reset if out of bounds (bottom or sides)
                if (this.y > canvas.height + 100 ||
                    this.x < -100 ||
                    this.x > canvas.width + 100) {
                    this.reset();
                }
            }

            draw(ctx) {
                // Draw Trail
                for (let i = 0; i < this.history.length; i++) {
                    const point = this.history[i];
                    const alpha = (i / this.history.length) * 0.2; // Max opacity 0.2
                    this.drawShape(ctx, point.x, point.y, this.size, point.rotation, this.color, alpha);
                }

                // Draw Head
                this.drawShape(ctx, this.x, this.y, this.size, this.rotation, this.color, 0.8);
            }

            drawShape(ctx, x, y, size, rotation, color, alpha) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(rotation);
                ctx.strokeStyle = color;
                ctx.lineWidth = 2; // Hollow objects
                ctx.globalAlpha = alpha;

                ctx.beginPath();
                if (this.shape === 'square') {
                    ctx.rect(-size / 2, -size / 2, size, size);
                } else if (this.shape === 'triangle') {
                    ctx.moveTo(0, -size / 1.5);
                    ctx.lineTo(size / 1.5, size / 1.5);
                    ctx.lineTo(-size / 1.5, size / 1.5);
                    ctx.closePath();
                } else if (this.shape === 'hexagon') {
                    for (let i = 0; i < 6; i++) {
                        const angle = (Math.PI / 3) * i;
                        const hx = Math.cos(angle) * (size / 1.5);
                        const hy = Math.sin(angle) * (size / 1.5);
                        if (i === 0) ctx.moveTo(hx, hy);
                        else ctx.lineTo(hx, hy);
                    }
                    ctx.closePath();
                } else if (this.shape === 'cross') {
                    // X shape
                    ctx.moveTo(-size / 2, -size / 2);
                    ctx.lineTo(size / 2, size / 2);
                    ctx.moveTo(size / 2, -size / 2);
                    ctx.lineTo(-size / 2, size / 2);
                }
                ctx.stroke();
                ctx.restore();
            }
        }

        // Initialize particles
        const particles = Array.from({ length: 40 }, () => new Particle());

        // Loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Re-draw grid here if not using CSS for it? 
            // CSS grid is better for performance, so we keep the canvas transparent.

            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-black overflow-hidden font-mono text-gray-200 selection:bg-white selection:text-black">

            {/* 1. RETRO GRID BACKGROUND (CSS Static) */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #333 1px, transparent 1px),
                        linear-gradient(to bottom, #333 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* 2. CANVAS ANIMATION */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 pointer-events-none"
            />

            {/* 3. CONTENT OVERLAY */}
            <div className="relative z-10 w-full min-h-screen flex flex-col">
                {children}
            </div>
        </div>
    );
}
