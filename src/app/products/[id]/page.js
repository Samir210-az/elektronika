"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { ShoppingCart, ChevronLeft, ShieldCheck, Truck } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { products, addToCart } = useStore();
  const product = products.find((p) => p.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <p className="text-[var(--text-dim)]">Məhsul tapılmadı.</p>
      </div>
    );
  }

  const soldOut = product.stock <= 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-[var(--text-dim)] hover:text-white mb-8">
        <ChevronLeft size={16} /> Geri
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <div className="relative aspect-square rounded-2xl overflow-hidden glass mb-4">
            <Image src={product.images[activeImg]} alt={product.name} fill className="object-cover" />
            {soldOut && (
              <div className="absolute top-4 left-4 badge-sold text-white text-xs font-bold px-3 py-1.5 rounded-full">
                BİTİB
              </div>
            )}
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 ${
                  activeImg === i ? "border-[var(--accent-cyan)]" : "border-transparent"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
          {product.video && (
            <div className="mt-6 aspect-video rounded-2xl overflow-hidden glass">
              <video src={product.video} controls className="w-full h-full object-cover" />
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <span className="text-xs uppercase tracking-widest text-[var(--accent-cyan)]">{product.category}</span>
          <h1 className="text-3xl font-bold mt-2 mb-4">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold glow-text">{product.price.toFixed(2)} ₼</span>
            {product.oldPrice > product.price && (
              <span className="text-lg text-[var(--text-dim)] line-through">{product.oldPrice.toFixed(2)} ₼</span>
            )}
          </div>

          <p className="text-[var(--text-dim)] leading-relaxed mb-8">{product.description}</p>

          {soldOut ? (
            <div className="glass rounded-xl p-4 text-center text-sm text-red-400 font-semibold mb-6">
              Bu məhsul hazırda anbarda yoxdur
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-[var(--text-dim)]">Say:</span>
                <div className="flex items-center glass rounded-full">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center">−</button>
                  <span className="w-8 text-center">{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="w-9 h-9 flex items-center justify-center">+</button>
                </div>
                <span className="text-xs text-[var(--text-dim)]">{product.stock} ədəd mövcuddur</span>
              </div>

              <button
                onClick={() => addToCart(product, qty)}
                className="btn-primary text-white font-semibold w-full py-3.5 rounded-xl flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} /> Səbətə əlavə et
              </button>
            </>
          )}

          <div className="flex items-center gap-6 mt-8 text-xs text-[var(--text-dim)]">
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-[var(--accent-cyan)]" /> 12 ay zəmanət</span>
            <span className="flex items-center gap-1.5"><Truck size={16} className="text-[var(--accent-cyan)]" /> Sürətli çatdırılma</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
