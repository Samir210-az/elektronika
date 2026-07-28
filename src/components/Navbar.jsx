"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Menu, X, Zap } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function Navbar() {
  const { cart } = useStore();
  const [open, setOpen] = useState(false);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  const links = [
    { href: "/", label: "Ana səhifə" },
    { href: "/#products", label: "Məhsullar" },
    { href: "/#about", label: "Haqqımızda" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 glass"
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="w-8 h-8 rounded-lg btn-primary flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </span>
          <span className="glow-text">Elektronika</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--text-dim)]">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative w-10 h-10 rounded-full glass flex items-center justify-center">
            <ShoppingCart size={18} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--accent-pink)] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </Link>
          <button className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center" onClick={() => setOpen(!open)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass px-5 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-[var(--text-dim)] hover:text-white">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </motion.header>
  );
}
