"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePwaInstall } from "@/context/PwaInstallContext";
import { Check } from "lucide-react";

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const { canInstall, installed, promptInstall } = usePwaInstall();
  const [showHint, setShowHint] = useState(false);

  async function handleInstallClick() {
    if (canInstall) {
      await promptInstall();
    } else {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 5000);
    }
  }

  return (
    <footer id="about" className="border-t border-white/5 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h3 className="glow-text font-bold text-xl mb-3">Elektronika</h3>
          <p className="text-sm text-[var(--text-dim)] leading-relaxed">
            Etibarlı elektron məhsul mağazası. Orijinal texnika, sürətli sifariş
            və şəffaf ödəniş prosesi ilə sizinləyik.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Əlaqə</h4>
          <ul className="text-sm text-[var(--text-dim)] space-y-2">
            <li>WhatsApp üzərindən sifariş</li>
            <li>Pulsuz çatdırılma</li>
            <li>Bütün Azərbaycana çatdırılma</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Tətbiq</h4>
          {installed ? (
            <span className="inline-flex items-center gap-2 text-sm text-[var(--accent-cyan)]">
              <Check size={16} /> Artıq quraşdırılıb
            </span>
          ) : (
            <div className="relative">
              <button
                onClick={handleInstallClick}
                className="btn-primary inline-flex items-center gap-2.5 text-sm font-semibold text-white pl-2 pr-4 py-2 rounded-full"
              >
                <Image
                  src="/icons/icon-192.png"
                  alt=""
                  width={22}
                  height={22}
                  className="rounded-md"
                />
                Tətbiqi yüklə
              </button>
              <AnimatePresence>
                {showHint && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-full mt-2 left-0 w-64 text-xs text-[var(--text-dim)] glass rounded-lg p-3 leading-relaxed z-10"
                  >
                    Brauzerinizin menyusundan (⋮ və ya paylaş düyməsi) &quot;Ana ekrana əlavə et&quot; seçimini istifadə edin.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}
          <div className="mt-5">
            <h4 className="font-semibold mb-3 text-sm">Bizi izləyin</h4>
            <a
              href="https://instagram.com/security_group"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-dim)] hover:text-[var(--accent-cyan)] transition-colors"
            >
              <InstagramIcon /> @security_group
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-[var(--text-dim)]">
        Powered by{" "}
        <a
          href="https://instagram.com/security_group"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent-cyan)] hover:underline"
        >
          security_group
        </a>
      </div>
    </footer>
  );
}
