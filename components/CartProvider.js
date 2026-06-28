"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

const CartCtx = createContext(null);
export const useCart = () => useContext(CartCtx);

const STORAGE_KEY = "bb-cart-v1";

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const uid = useRef(1);

  // Chargement depuis le navigateur au montage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved.items)) setItems(saved.items);
        if (saved.uid) uid.current = saved.uid;
      }
    } catch {}
    setHydrated(true);
  }, []);

  // Sauvegarde à chaque changement
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, uid: uid.current }));
    } catch {}
  }, [items, hydrated]);

  const add = (item) => {
    setItems((cur) => {
      if (item.mergeId) {
        const ex = cur.find((l) => l.mergeId === item.mergeId);
        if (ex) return cur.map((l) => (l === ex ? { ...l, qty: l.qty + (item.qty || 1) } : l));
      }
      return [...cur, { ...item, key: uid.current++, qty: item.qty || 1 }];
    });
    setIsOpen(true);
  };
  const setQty = (key, d) =>
    setItems((cur) => cur.map((l) => (l.key === key ? { ...l, qty: Math.max(1, l.qty + d) } : l)));
  const remove = (key) => setItems((cur) => cur.filter((l) => l.key !== key));
  const clear = () => setItems([]);

  const count = items.reduce((s, l) => s + l.qty, 0);
  const subtotal = items.reduce((s, l) => s + l.prixUnit * l.qty, 0);

  return (
    <CartCtx.Provider
      value={{
        items,
        add,
        setQty,
        remove,
        clear,
        count,
        subtotal,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </CartCtx.Provider>
  );
}
