"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { buildOrderWhatsAppLink } from "@/lib/whatsapp";
import { Trash2, MessageCircle, CheckCircle2 } from "lucide-react";

export default function CartPage() {
  const { cart, updateCartQty, removeFromCart, createOrder } = useStore();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [placedOrder, setPlacedOrder] = useState(null);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  function handleOrder(e) {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    const order = createOrder(form);
    setPlacedOrder(order);
    window.open(buildOrderWhatsAppLink(order), "_blank");
  }

  if (placedOrder) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center">
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle2 size={56} className="mx-auto text-[var(--accent-cyan)] mb-5" />
          <h1 className="text-2xl font-bold mb-3">Sifariş göndərildi!</h1>
          <p className="text-[var(--text-dim)] mb-2">
            Sifariş nömrəniz: <span className="text-white font-semibold">{placedOrder.id}</span>
          </p>
          <p className="text-[var(--text-dim)] mb-8 text-sm leading-relaxed">
            WhatsApp söhbətində kart-to-kart ödənişi tamamlayın. Ödənişiniz təsdiqlənən kimi
            sifarişinizin statusu &quot;Təsdiqləndi&quot; olaraq yenilənəcək.
          </p>
          <button onClick={() => router.push("/")} className="btn-primary text-white font-semibold px-6 py-3 rounded-xl">
            Ana səhifəyə qayıt
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">Səbətim</h1>

      {cart.length === 0 ? (
        <p className="text-[var(--text-dim)]">Səbətiniz boşdur.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="glass rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-[var(--text-dim)]">{item.price.toFixed(2)} ₼</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center glass rounded-full">
                    <button onClick={() => updateCartQty(item.id, item.qty - 1)} className="w-8 h-8">−</button>
                    <span className="w-6 text-center text-sm">{item.qty}</span>
                    <button onClick={() => updateCartQty(item.id, item.qty + 1)} className="w-8 h-8">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleOrder} className="glass rounded-2xl p-6 h-fit space-y-4">
            <div className="flex items-center justify-between text-lg font-bold mb-2">
              <span>Cəmi</span>
              <span className="glow-text">{total.toFixed(2)} ₼</span>
            </div>
            <input
              required
              placeholder="Adınız"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-cyan)]"
            />
            <input
              required
              placeholder="Telefon nömrəniz"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-cyan)]"
            />
            <input
              placeholder="Ünvan (istəyə görə)"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-cyan)]"
            />
            <button type="submit" className="btn-primary w-full text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
              <MessageCircle size={18} /> WhatsApp ilə sifariş et
            </button>
            <p className="text-[11px] text-[var(--text-dim)] text-center">
              Ödəniş kart-to-kart üsulu ilə WhatsApp üzərindən aparılır
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
