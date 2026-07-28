"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ShieldCheck, Truck, Sparkles } from "lucide-react";
import PortalAnimation from "./PortalAnimation";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-start justify-center overflow-hidden bg-black pt-28 md:pt-20 pb-20">
      <PortalAnimation />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-deep)]" />

      <motion.div style={{ y: yText, opacity }} className="relative z-10 text-center px-6 max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs text-[var(--accent-cyan)] mb-6"
        >
          <Sparkles size={14} /> Yeni kolleksiya artıq satışda
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-5 drop-shadow-[0_0_35px_rgba(0,217,255,0.25)]"
        >
          Gələcəyin texnologiyası,<br />
          <span className="glow-text">bu gün əlinizdə</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-[var(--text-dim)] text-base md:text-lg mb-8"
        >
          Orijinal elektron məhsullar, sürətli sifariş prosesi və zəmanətli keyfiyyət.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#products" className="btn-primary text-white font-semibold px-7 py-3 rounded-xl">
            Məhsullara bax
          </a>
          <div className="flex items-center gap-4 text-xs text-[var(--text-dim)]">
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-[var(--accent-cyan)]" /> Zəmanətli</span>
            <span className="flex items-center gap-1.5"><Truck size={16} className="text-[var(--accent-cyan)]" /> Pulsuz çatdırılma</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#products"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-8 text-[var(--text-dim)] z-10"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
