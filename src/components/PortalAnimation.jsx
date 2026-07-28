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

    const COLORS = ["#00D9FF", "#8B5CF6", "#FF3D9A", "#FFD166"];

    function resize() {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      cx = w / 2;
      cy = h / 2;
    }

    function makeParticle() {
      const angle = Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 1.5;
      const speed = 0.2 + Math.random() * 0.6;
      return {
        angle,
        radius: 40 * window.devicePixelRatio + Math.random() * 20,
        speed,
        drift: 0.15 + Math.random() * 0.35,
        size: (0.8 + Math.random() * 1.8) * window.devicePixelRatio,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: Math.random(),
        maxRadius: Math.min(w, h) * (0.4 + Math.random() * 0.3),
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: 160 }, makeParticle);
    }

    function drawAurora() {
      const auroraX = w * 0.12;
      const auroraY = h * 0.1;
      const auroraR = Math.max(w, h) * 0.5;
      const aurora = ctx.createRadialGradient(auroraX, auroraY, 0, auroraX, auroraY, auroraR);
      aurora.addColorStop(0, "rgba(0,217,255,0.12)");
      aurora.addColorStop(0.5, "rgba(139,92,246,0.06)");
      aurora.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = aurora;
      ctx.fillRect(0, 0, w, h);
    }

    function drawFacetedCore(baseR) {
      const sides = 6;
      const coreR = baseR * 0.42;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.3);
      ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const a = (i / sides) * Math.PI * 2;
        const px = Math.cos(a) * coreR;
        const py = Math.sin(a) * coreR;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      const facetGrad = ctx.createLinearGradient(-coreR, -coreR, coreR, coreR);
      facetGrad.addColorStop(0, "rgba(0,217,255,0.55)");
      facetGrad.addColorStop(0.5, "rgba(139,92,246,0.4)");
      facetGrad.addColorStop(1, "rgba(255,61,154,0.5)");
      ctx.fillStyle = facetGrad;
      ctx.shadowColor = "#00D9FF";
      ctx.shadowBlur = 24 * window.devicePixelRatio;
      ctx.fill();
      ctx.lineWidth = 1 * window.devicePixelRatio;
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.stroke();
      ctx.restore();
    }

    function drawPortal() {
      const baseR = Math.min(w, h) * 0.17;
      for (let ring = 0; ring < 4; ring++) {
        const r = baseR + ring * 13 * window.devicePixelRatio;
        const rot = t * (0.12 + ring * 0.04) * (ring % 2 === 0 ? 1 : -1);
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
        ctx.globalAlpha = 0.4 - ring * 0.07;
        ctx.lineWidth = 1.3 * window.devicePixelRatio;
        ctx.shadowColor = "#8B5CF6";
        ctx.shadowBlur = 20 * window.devicePixelRatio;
        ctx.stroke();
        ctx.restore();
      }
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.1);
      coreGrad.addColorStop(0, "rgba(0,217,255,0.28)");
      coreGrad.addColorStop(1, "rgba(0,217,255,0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 1.1, 0, Math.PI * 2);
      ctx.fill();
      drawFacetedCore(baseR);
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
        const y = cy + Math.sin(p.angle) * p.radius * 0.55 + p.radius * p.drift * 0.35;
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
      vignette.addColorStop(0, "rgba(0,0,0,0.1)");
      vignette.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);
      drawAurora();
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
