"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { seedProducts } from "@/data/seedProducts";

const StoreContext = createContext(null);

const LS_CART = "elektronika_cart_v1";
const LS_ADMIN_SECRET = "elektronika_admin_secret_v1";

function mapProductFromDb(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    oldPrice: Number(row.old_price),
    stock: row.stock,
    description: row.description,
    images: row.images || [],
    video: row.video || "",
  };
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(seedProducts);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSecret, setAdminSecret] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);

  const refreshProducts = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase.from("products").select("*").order("created_at");
    if (!error && data) {
      setProducts(data.map(mapProductFromDb));
      setDbConnected(true);
    }
  }, []);

  useEffect(() => {
    try {
      const c = localStorage.getItem(LS_CART);
      const secret = localStorage.getItem(LS_ADMIN_SECRET);
      if (c) setCart(JSON.parse(c));
      if (secret) {
        setAdminSecret(secret);
        setIsAdmin(true);
      }
    } catch (e) {
      console.error("Local storage read error", e);
    }
    refreshProducts().finally(() => setHydrated(true));
  }, [refreshProducts]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(LS_CART, JSON.stringify(cart));
  }, [cart, hydrated]);

  function addToCart(product, qty = 1) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.images?.[0] || "", qty }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function updateCartQty(id, qty) {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  }

  function clearCart() {
    setCart([]);
  }

  async function createOrder(customerInfo) {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart, customer: customerInfo }),
    });
    if (!res.ok) throw new Error("Sifariş yaradıla bilmədi");
    const { order } = await res.json();
    clearCart();
    refreshProducts();
    return order;
  }

  const refreshOrders = useCallback(
    async (secret) => {
      const key = secret || adminSecret;
      if (!key) return;
      const res = await fetch("/api/admin/orders", { headers: { "x-admin-secret": key } });
      if (res.ok) {
        const { orders: data } = await res.json();
        setOrders(data);
      }
    },
    [adminSecret]
  );

  async function confirmOrder(orderId) {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-secret": adminSecret },
      body: JSON.stringify({ id: orderId, status: "Təsdiqləndi" }),
    });
    refreshOrders();
  }

  async function rejectOrder(orderId) {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-secret": adminSecret },
      body: JSON.stringify({ id: orderId, status: "İmtina edildi" }),
    });
    refreshOrders();
  }

  async function upsertProduct(product) {
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": adminSecret },
      body: JSON.stringify(product),
    });
    refreshProducts();
  }

  async function deleteProduct(id) {
    await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-secret": adminSecret },
      body: JSON.stringify({ id }),
    });
    refreshProducts();
  }

  async function loginAdmin(password) {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setIsAdmin(true);
      setAdminSecret(password);
      localStorage.setItem(LS_ADMIN_SECRET, password);
      refreshOrders(password);
      return true;
    }
    return false;
  }

  function logoutAdmin() {
    setIsAdmin(false);
    setAdminSecret(null);
    localStorage.removeItem(LS_ADMIN_SECRET);
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        cart,
        isAdmin,
        hydrated,
        dbConnected,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        createOrder,
        confirmOrder,
        rejectOrder,
        upsertProduct,
        deleteProduct,
        loginAdmin,
        logoutAdmin,
        refreshOrders,
        refreshProducts,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
