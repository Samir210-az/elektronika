"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { Lock, Trash2, Plus, Save, LogOut, Package, ClipboardList } from "lucide-react";

const emptyProduct = {
  id: "",
  name: "",
  category: "",
  price: 0,
  oldPrice: 0,
  stock: 0,
  description: "",
  images: [""],
  video: "",
};

export default function AdminPage() {
  const { isAdmin, loginAdmin, logoutAdmin, products, upsertProduct, deleteProduct, orders, confirmOrder, rejectOrder } = useStore();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("products");
  const [editing, setEditing] = useState(null);

  function handleLogin(e) {
    e.preventDefault();
    if (!loginAdmin(password)) setError("Şifrə yanlışdır");
  }

  if (!isAdmin) {
    return (
      <div className="max-w-sm mx-auto px-6 py-32">
        <form onSubmit={handleLogin} className="glass rounded-2xl p-8 text-center">
          <Lock size={32} className="mx-auto text-[var(--accent-cyan)] mb-4" />
          <h1 className="font-bold text-lg mb-6">Admin Girişi</h1>
          <input
            type="password"
            placeholder="Şifrə"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm mb-3 outline-none focus:border-[var(--accent-cyan)]"
          />
          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
          <button className="btn-primary w-full text-white font-semibold py-2.5 rounded-lg">Daxil ol</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button onClick={logoutAdmin} className="flex items-center gap-1.5 text-sm text-[var(--text-dim)] hover:text-white">
          <LogOut size={15} /> Çıxış
        </button>
      </div>

      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setTab("products")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm ${tab === "products" ? "btn-primary text-white" : "glass text-[var(--text-dim)]"}`}
        >
          <Package size={15} /> Məhsullar
        </button>
        <button
          onClick={() => setTab("orders")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm ${tab === "orders" ? "btn-primary text-white" : "glass text-[var(--text-dim)]"}`}
        >
          <ClipboardList size={15} /> Sifarişlər ({orders.length})
        </button>
      </div>

      {tab === "products" && (
        <div>
          <button
            onClick={() => setEditing({ ...emptyProduct })}
            className="mb-6 flex items-center gap-1.5 btn-primary text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            <Plus size={15} /> Yeni məhsul
          </button>

          <div className="grid md:grid-cols-2 gap-4">
            {products.map((p) => (
              <div key={p.id} className="glass rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{p.name}</p>
                  <p className="text-xs text-[var(--text-dim)]">
                    {p.price.toFixed(2)} ₼ · {p.stock > 0 ? `${p.stock} ədəd` : "Bitib"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(p)} className="text-xs glass px-3 py-1.5 rounded-lg">Redaktə</button>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-400">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {editing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              onClick={() => setEditing(null)}
            >
              <motion.form
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={(e) => {
                  e.preventDefault();
                  upsertProduct({
                    ...editing,
                    price: Number(editing.price),
                    oldPrice: Number(editing.oldPrice),
                    stock: Number(editing.stock),
                    images: editing.images.filter(Boolean),
                  });
                  setEditing(null);
                }}
                className="glass rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto space-y-3"
              >
                <h2 className="font-bold mb-2">{editing.id ? "Məhsulu redaktə et" : "Yeni məhsul"}</h2>
                <input required placeholder="Ad" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
                <input placeholder="Kateqoriya" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
                <div className="grid grid-cols-3 gap-2">
                  <input type="number" step="0.01" placeholder="Qiymət" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
                  <input type="number" step="0.01" placeholder="Köhnə qiymət" value={editing.oldPrice} onChange={(e) => setEditing({ ...editing, oldPrice: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
                  <input type="number" placeholder="Stok" value={editing.stock} onChange={(e) => setEditing({ ...editing, stock: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
                </div>
                <textarea placeholder="Təsvir" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
                <input placeholder="Şəkil URL 1" value={editing.images[0] || ""} onChange={(e) => setEditing({ ...editing, images: [e.target.value, editing.images[1] || ""] })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
                <input placeholder="Şəkil URL 2" value={editing.images[1] || ""} onChange={(e) => setEditing({ ...editing, images: [editing.images[0] || "", e.target.value] })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
                <input placeholder="Video URL (istəyə görə)" value={editing.video} onChange={(e) => setEditing({ ...editing, video: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm" />
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-primary flex-1 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5">
                    <Save size={15} /> Yadda saxla
                  </button>
                  <button type="button" onClick={() => setEditing(null)} className="glass px-4 rounded-lg text-sm">Ləğv et</button>
                </div>
              </motion.form>
            </motion.div>
          )}
        </div>
      )}

      {tab === "orders" && (
        <div className="space-y-3">
          {orders.length === 0 && <p className="text-[var(--text-dim)] text-sm">Hələ sifariş yoxdur.</p>}
          {orders.map((o) => (
            <div key={o.id} className="glass rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="font-semibold text-sm">{o.id} — {o.customer.name}</p>
                <p className="text-xs text-[var(--text-dim)]">{o.customer.phone} · {o.total.toFixed(2)} ₼ · {o.items.length} məhsul</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    o.status === "Təsdiqləndi"
                      ? "bg-green-500/20 text-green-400"
                      : o.status === "İmtina edildi"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {o.status}
                </span>
                {o.status === "Gözləmədə" && (
                  <>
                    <button onClick={() => confirmOrder(o.id)} className="text-xs btn-primary text-white px-3 py-1.5 rounded-lg">Təsdiqlə</button>
                    <button onClick={() => rejectOrder(o.id)} className="text-xs glass px-3 py-1.5 rounded-lg text-red-400">İmtina</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
