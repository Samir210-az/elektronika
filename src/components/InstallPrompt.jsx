"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handler(e) {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissedAt = localStorage.getItem("pwa_dismissed_at");
      const dismissedRecently =
        dismissedAt && Date.now() - Number(dismissedAt) < 7 * 24 * 60 * 60 * 1000;
      if (!dismissedRecently) {
        setTimeout(() => setVisible(true), 3500);
      }
    }
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
  }

  function dismiss() {
    localStorage.setItem("pwa_dismissed_at", String(Date.now()));
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 glass rounded-2xl p-4 flex items-center gap-3 shadow-2xl"
        >
          <div className="w-11 h-11 rounded-xl btn-primary flex items-center justify-center shrink-0">
            <Download size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Tətbiqi quraşdır</p>
            <p className="text-xs text-[var(--text-dim)]">Elektronika-nı telefonuna əlavə et, sürətli çıxış qazan</p>
          </div>
          <button
            onClick={handleInstall}
            className="btn-primary text-white text-xs font-semibold px-3 py-2 rounded-lg shrink-0"
          >
            Quraşdır
          </button>
          <button onClick={dismiss} className="text-[var(--text-dim)] hover:text-white shrink-0">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
