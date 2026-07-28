"use client";
import { useEffect, useRef } from "react";

export default function PortalAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let w, h, cx, cy;
    let particles = [];
    let t = 0;

    const COLORS = ["#00D9FF", "#8B5CF6", "#FF3D9A"];

    function resize() {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      cx = w / 2;
      cy = h / 2;
    }

    function makeParticle() {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.15 + Math.random() * 0.5;
      return {
        angle,
        radius: 40 * window.devicePixelRatio + Math.random() * 20,
        speed,
        size: (0.8 + Math.random() * 1.8) * window.devicePixelRatio,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: Math.random(),
        maxRadius: Math.min(w, h) * (0.35 + Math.random() * 0.25),
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: 110 }, makeParticle);
    }

    function drawPortal() {
      const baseR = Math.min(w, h) * 0.16;
      for (let ring = 0; ring < 3; ring++) {
        const r = baseR + ring * 14 * window.devicePixelRatio;
        const rot = t * (0.15 + ring * 0.05) * (ring % 2 === 0 ? 1 : -1);
        const grad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
        grad.addColorStop(0, "#00D9FF");
        grad.addColorStop(0.5, "#8B5CF6");
        grad.addColorStop(1, "#FF3D9A");
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.98, 0, 0, Math.PI * 2);
        ctx.strokeStyle = grad;
        ctx.globalAlpha = 0.35 - ring * 0.08;
        ctx.lineWidth = 1.4 * window.devicePixelRatio;
        ctx.shadowColor = "#8B5CF6";
        ctx.shadowBlur = 18 * window.devicePixelRatio;
        ctx.stroke();
        ctx.restore();
      }
      // glowing core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 0.9);
      coreGrad.addColorStop(0, "rgba(0,217,255,0.25)");
      coreGrad.addColorStop(1, "rgba(0,217,255,0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 0.9, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawParticles() {
      particles.forEach((p) => {
        p.radius += p.speed * window.devicePixelRatio;
        p.life += 0.004;
        if (p.radius > p.maxRadius) {
          Object.assign(p, makeParticle());
          p.radius = 40 * window.devicePixelRatio;
        }
        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.72;
        const fade = 1 - p.radius / p.maxRadius;
        ctx.beginPath();
        ctx.globalAlpha = Math.max(0, fade) * 0.9;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6 * window.devicePixelRatio;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    function frame() {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);
      const vignette = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.6);
      vignette.addColorStop(0, "rgba(0,0,0,0.15)");
      vignette.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);
      drawPortal();
      drawParticles();
      raf = requestAnimationFrame(frame);
    }

    init();
    frame();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
