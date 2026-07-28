"use client";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";
import { motion } from "framer-motion";

export default function Home() {
  const { products } = useStore();

  return (
    <>
      <Hero />

      <section id="products" className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--accent-cyan)]">Kataloq</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Ən çox seçilən <span className="glow-text">məhsullar</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
