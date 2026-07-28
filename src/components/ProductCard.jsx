"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useStore();
  const soldOut = product.stock <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="glass card-hover rounded-2xl overflow-hidden flex flex-col"
    >
      <Link href={`/products/${product.id}`} className="relative block aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 hover:scale-110"
        />
        {soldOut && (
          <div className="absolute top-3 left-3 badge-sold text-white text-[11px] font-bold px-3 py-1 rounded-full">
            BİTİB
          </div>
        )}
        {!soldOut && product.oldPrice > product.price && (
          <div className="absolute top-3 left-3 bg-[var(--accent-pink)] text-white text-[11px] font-bold px-3 py-1 rounded-full">
            ENDİRİM
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-[11px] uppercase tracking-wider text-[var(--accent-cyan)]">{product.category}</span>
        <Link href={`/products/${product.id}`} className="font-semibold text-sm leading-snug hover:text-[var(--accent-cyan)] transition-colors">
          {product.name}
        </Link>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-white">{product.price.toFixed(2)} ₼</span>
            {product.oldPrice > product.price && (
              <span className="text-xs text-[var(--text-dim)] line-through">{product.oldPrice.toFixed(2)} ₼</span>
            )}
          </div>
          <button
            disabled={soldOut}
            onClick={() => addToCart(product)}
            className="w-9 h-9 rounded-full btn-primary flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={15} className="text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
