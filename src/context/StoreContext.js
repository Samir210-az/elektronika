"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { seedProducts } from "@/data/seedProducts";

const StoreContext = createContext(null);

const LS_PRODUCTS = "elektronika_products_v1";
const LS_ORDERS = "elektronika_orders_v1";
const LS_CART = "elektronika_cart_v1";
const LS_ADMIN = "elektronika_admin_auth_v1";

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(seedProducts);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem(LS_PRODUCTS);
      const o = localStorage.getItem(LS_ORDERS);
      const c = localStorage.getItem(LS_CART);
      const a = localStorage.getItem(LS_ADMIN);
      if (p) setProducts(JSON.parse(p));
      else localStorage.setItem(LS_PRODUCTS, JSON.stringify(seedProducts));
      if (o) setOrders(JSON.parse(o));
      if (c) setCart(JSON.parse(c));
      if (a === "1") setIsAdmin(true);
    } catch (e) {
      console.error("Local storage read error", e);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(LS_PRODUCTS, JSON.stringify(products));
  }, [products, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(LS_ORDERS, JSON.stringify(orders));
  }, [orders, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(LS_CART, JSON.stringify(cart));
  }, [cart, hydrated]);

  function addToCart(product, qty = 1) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty }];
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

  function createOrder(customerInfo) {
    const order = {
      id: "SF-" + Date.now().toString().slice(-8),
      items: cart,
      total: cart.reduce((s, i) => s + i.price * i.qty, 0),
      customer: customerInfo,
      status: "Gözləmədə",
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    // reduce stock
    setProducts((prev) =>
      prev.map((p) => {
        const item = cart.find((c) => c.id === p.id);
        if (item) return { ...p, stock: Math.max(0, p.stock - item.qty) };
        return p;
      })
    );
    clearCart();
    return order;
  }

  function confirmOrder(orderId) {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "Təsdiqləndi" } : o))
    );
  }

  function rejectOrder(orderId) {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "İmtina edildi" } : o))
    );
  }

  function upsertProduct(product) {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.map((p) => (p.id === product.id ? product : p));
      return [...prev, { ...product, id: product.id || "p" + Date.now() }];
    });
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function loginAdmin(password) {
    if (password === "AN2026EA") {
      setIsAdmin(true);
      localStorage.setItem(LS_ADMIN, "1");
      return true;
    }
    return false;
  }

  function logoutAdmin() {
    setIsAdmin(false);
    localStorage.setItem(LS_ADMIN, "0");
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        cart,
        isAdmin,
        hydrated,
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
