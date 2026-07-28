"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ShieldCheck, Truck, Sparkles } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100vh] overflow-hidden flex items-center pt-24 pb-16 md:pt-16">
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[10%] w-[420px] h-[420px] rounded-full bg-[var(--accent-cyan)] opacity-20 blur-[120px] float" />
        <div className="absolute bottom-[-10%] right-[10%] w-[420px] h-[420px] rounded-full bg-[var(--accent-violet)] opacity-25 blur-[120px] float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[40%] right-[30%] w-[280px] h-[280px] rounded-full bg-[var(--accent-pink)] opacity-10 blur-[100px] float" style={{ animationDelay: "3s" }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12 w-full">
        <motion.div style={{ y: yText, opacity }} className="text-center md:text-left">
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
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5"
          >
            Gələcəyin texnologiyası,{" "}
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
            className="flex flex-wrap items-center justify-center md:justify-start gap-4"
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

        <motion.div
          style={{ y: yImage }}
          initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-tr from-[var(--accent-cyan)] via-[var(--accent-violet)] to-[var(--accent-pink)] opacity-30 blur-3xl rounded-[2.5rem]" />
          <div className="relative glass rounded-[2rem] p-3 float" style={{ animationDuration: "6s" }}>
            <div className="relative aspect-[4/5] md:aspect-square rounded-[1.5rem] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80"
                alt="Ən son elektron texnika"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)]/60 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#products"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--text-dim)]"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
