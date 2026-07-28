"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ShieldCheck, Truck, Sparkles } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-[-10%] left-[10%] w-[420px] h-[420px] rounded-full bg-[var(--accent-cyan)] opacity-20 blur-[120px] float" />
        <div className="absolute bottom-[-10%] right-[10%] w-[420px] h-[420px] rounded-full bg-[var(--accent-violet)] opacity-25 blur-[120px] float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[40%] right-[30%] w-[280px] h-[280px] rounded-full bg-[var(--accent-pink)] opacity-10 blur-[100px] float" style={{ animationDelay: "3s" }} />
      </motion.div>

      <motion.div style={{ y: yText, opacity }} className="text-center px-6 max-w-3xl">
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
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-5"
        >
          Gələcəyin texnologiyası,<br />
          <span className="glow-text">bu gün əlinizdə</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-[var(--text-dim)] text-base md:text-lg mb-8"
        >
          Orijinal elektron məhsullar, sürətli sifariş prosesi və zəmanətli keyfiyyət.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#products" className="btn-primary text-white font-semibold px-7 py-3 rounded-xl">
            Məhsullara bax
          </a>
          <div className="flex items-center gap-4 text-xs text-[var(--text-dim)]">
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-[var(--accent-cyan)]" /> Zəmanətli</span>
            <span className="flex items-center gap-1.5"><Truck size={16} className="text-[var(--accent-cyan)]" /> Sürətli çatdırılma</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#products"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-8 text-[var(--text-dim)]"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
