"use client";
import { usePwaInstall } from "@/context/PwaInstallContext";
import { Download, Check } from "lucide-react";

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
          ) : canInstall ? (
            <button
              onClick={promptInstall}
              className="inline-flex items-center gap-2 text-sm glass px-4 py-2 rounded-full hover:border-[var(--accent-cyan)] transition-colors"
            >
              <Download size={15} /> Tətbiqi yüklə
            </button>
          ) : (
            <p className="text-xs text-[var(--text-dim)] leading-relaxed">
              Brauzer menyusundan &quot;Ana ekrana əlavə et&quot; seçimi ilə tətbiqi quraşdıra bilərsiniz.
            </p>
          )}
          <div className="mt-5">
            <h4 className="font-semibold mb-3 text-sm">Bizi izləyin</h4>
            <a
              href="https://instagram.com/s_akhundoff"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-dim)] hover:text-[var(--accent-cyan)] transition-colors"
            >
              <InstagramIcon /> @s_akhundoff
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-[var(--text-dim)]">
        By{" "}
        <a
          href="https://instagram.com/s_akhundoff"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent-cyan)] hover:underline"
        >
          s_akhundoff
        </a>
      </div>
    </footer>
  );
}
