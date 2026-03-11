import React, { useRef, useEffect, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const MeshBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const animFrameRef = useRef(null);
    const particlesRef = useRef([]);
    const orbsRef = useRef([]);
    const { isDark } = useTheme();
    const isDarkRef = useRef(isDark);
    const timeRef = useRef(0);

    useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

    const prefersReducedMotion = typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const initParticles = useCallback((w, h) => {
        const isMobile = w < 768;
        const count = isMobile ? 40 : 100;
        const particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                baseX: Math.random() * w,
                baseY: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: 1 + Math.random() * 2,
                alpha: 0.1 + Math.random() * 0.3,
                hue: Math.random() > 0.7 ? 48 : (Math.random() > 0.5 ? 187 : 263), // gold, cyan, violet
            });
        }
        return particles;
    }, []);

    const initOrbs = useCallback((w, h) => {
        return [
            { x: w * 0.2, y: h * 0.3, radius: Math.min(w, h) * 0.35, color: 'cyan', speed: 0.0003, phase: 0 },
            { x: w * 0.8, y: h * 0.7, radius: Math.min(w, h) * 0.30, color: 'violet', speed: 0.0005, phase: 2 },
            { x: w * 0.5, y: h * 0.5, radius: Math.min(w, h) * 0.25, color: 'gold', speed: 0.0004, phase: 4 },
        ];
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h;

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
            particlesRef.current = initParticles(w, h);
            orbsRef.current = initOrbs(w, h);
        };
        resize();
        window.addEventListener('resize', resize);

        const handleMouseMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
        const handleMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        const animate = () => {
            timeRef.current += 1;
            const t = timeRef.current;
            ctx.clearRect(0, 0, w, h);
            const dark = isDarkRef.current;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const isMobile = w < 768;
            const mouseRadius = 200;

            // ── Aurora Gradient Orbs ──
            orbsRef.current.forEach(orb => {
                const drift = 40;
                const ox = orb.x + Math.sin(t * orb.speed + orb.phase) * drift;
                const oy = orb.y + Math.cos(t * orb.speed * 0.7 + orb.phase) * drift;
                const pulseScale = 0.85 + Math.sin(t * orb.speed * 1.5 + orb.phase) * 0.15;
                const r = orb.radius * pulseScale;

                const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
                const baseAlpha = dark ? 0.07 : 0.04;
                if (orb.color === 'cyan') {
                    gradient.addColorStop(0, `rgba(6, 182, 212, ${baseAlpha * 1.5})`);
                    gradient.addColorStop(0.5, `rgba(6, 182, 212, ${baseAlpha * 0.5})`);
                    gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
                } else if (orb.color === 'violet') {
                    gradient.addColorStop(0, `rgba(139, 92, 246, ${baseAlpha * 1.2})`);
                    gradient.addColorStop(0.5, `rgba(139, 92, 246, ${baseAlpha * 0.4})`);
                    gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
                } else {
                    gradient.addColorStop(0, `rgba(255, 215, 0, ${baseAlpha})`);
                    gradient.addColorStop(0.5, `rgba(255, 215, 0, ${baseAlpha * 0.3})`);
                    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
                }
                ctx.fillStyle = gradient;
                ctx.fillRect(ox - r, oy - r, r * 2, r * 2);
            });

            // ── Particles with Cursor Attraction ──
            const particles = particlesRef.current;
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Gentle base drift
                p.x += p.vx;
                p.y += p.vy;

                // Cursor attraction (spring physics)
                const dx = mx - p.x;
                const dy = my - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouseRadius && dist > 0) {
                    const force = (mouseRadius - dist) / mouseRadius;
                    const attraction = force * 0.015;
                    p.x += dx * attraction;
                    p.y += dy * attraction;
                }

                // Slowly return to base position
                p.x += (p.baseX - p.x) * 0.003;
                p.y += (p.baseY - p.y) * 0.003;

                // Wrap edges
                if (p.x < -50) { p.x = w + 50; p.baseX = w + 50; }
                if (p.x > w + 50) { p.x = -50; p.baseX = -50; }
                if (p.y < -50) { p.y = h + 50; p.baseY = h + 50; }
                if (p.y > h + 50) { p.y = -50; p.baseY = -50; }

                // Glow intensity near cursor
                const glowFactor = dist < mouseRadius ? Math.pow(1 - dist / mouseRadius, 2) : 0;
                const alpha = p.alpha + glowFactor * 0.6;
                const size = p.size + glowFactor * 3;

                // Color based on hue
                let color;
                if (dark) {
                    if (p.hue === 48) color = `rgba(255, 215, 0, ${alpha})`;
                    else if (p.hue === 187) color = `rgba(6, 182, 212, ${alpha})`;
                    else color = `rgba(139, 92, 246, ${alpha})`;
                } else {
                    color = `rgba(0, 31, 63, ${alpha * 0.5})`;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();

                // Glow halo on bright particles
                if (glowFactor > 0.2 && dark) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
                    const haloGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3);
                    if (p.hue === 48) {
                        haloGrad.addColorStop(0, `rgba(255, 215, 0, ${glowFactor * 0.15})`);
                    } else if (p.hue === 187) {
                        haloGrad.addColorStop(0, `rgba(6, 182, 212, ${glowFactor * 0.15})`);
                    } else {
                        haloGrad.addColorStop(0, `rgba(139, 92, 246, ${glowFactor * 0.12})`);
                    }
                    haloGrad.addColorStop(1, 'rgba(0,0,0,0)');
                    ctx.fillStyle = haloGrad;
                    ctx.fill();
                }
            }

            // ── Connection Lines (desktop only) ──
            if (!isMobile) {
                const connectionDist = 120;
                for (let i = 0; i < particles.length; i++) {
                    const pi = particles[i];
                    const diI = Math.sqrt((mx - pi.x) ** 2 + (my - pi.y) ** 2);
                    if (diI > mouseRadius * 1.5) continue;
                    for (let j = i + 1; j < particles.length; j++) {
                        const pj = particles[j];
                        const d = Math.sqrt((pi.x - pj.x) ** 2 + (pi.y - pj.y) ** 2);
                        if (d < connectionDist) {
                            const lineAlpha = (1 - d / connectionDist) * 0.15;
                            ctx.beginPath();
                            ctx.moveTo(pi.x, pi.y);
                            ctx.lineTo(pj.x, pj.y);

                            if (dark) {
                                const grad = ctx.createLinearGradient(pi.x, pi.y, pj.x, pj.y);
                                grad.addColorStop(0, `rgba(6, 182, 212, ${lineAlpha})`);
                                grad.addColorStop(1, `rgba(255, 215, 0, ${lineAlpha})`);
                                ctx.strokeStyle = grad;
                            } else {
                                ctx.strokeStyle = `rgba(0, 31, 63, ${lineAlpha * 0.4})`;
                            }
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }
            }

            // ── Cursor Glow (large ambient) ──
            if (mx > 0 && my > 0 && mx < w && my < h) {
                const glowR = 250;
                const glow = ctx.createRadialGradient(mx, my, 0, mx, my, glowR);
                if (dark) {
                    glow.addColorStop(0, 'rgba(6, 182, 212, 0.06)');
                    glow.addColorStop(0.4, 'rgba(255, 215, 0, 0.02)');
                    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
                } else {
                    glow.addColorStop(0, 'rgba(6, 182, 212, 0.04)');
                    glow.addColorStop(0.4, 'rgba(0, 31, 63, 0.015)');
                    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
                }
                ctx.fillStyle = glow;
                ctx.fillRect(mx - glowR, my - glowR, glowR * 2, glowR * 2);
            }

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [prefersReducedMotion, initParticles, initOrbs]);

    if (prefersReducedMotion) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
            aria-hidden="true"
        />
    );
};

export default MeshBackground;
