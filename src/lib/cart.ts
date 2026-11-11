"use client";

import { useSyncExternalStore } from "react";
import type { Product } from "@/lib/products";

export type CartItem = { id: number; name: string; priceCents: number; qty: number };

const KEY = "shopboard-cart-v2"; // v2: prices are cents
const EMPTY: CartItem[] = [];
let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

function isCartItem(value: unknown): value is CartItem {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "priceCents" in value &&
    "qty" in value &&
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    typeof value.priceCents === "number" &&
    typeof value.qty === "number"
  );
}

function load(): CartItem[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return Array.isArray(raw) && raw.every(isCartItem) ? raw : EMPTY;
  } catch {
    return EMPTY;
  }
}

function read(): CartItem[] {
  if (cache === null) cache = load();
  return cache;
}

function write(items: CartItem[]) {
  cache = items;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  // keep tabs in sync
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = load();
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);
  return {
    items,
    count: items.reduce((n, i) => n + i.qty, 0),
    totalCents: items.reduce((n, i) => n + i.qty * i.priceCents, 0),
  };
}

export function addToCart(p: Product) {
  const items = read();
  const found = items.find((i) => i.id === p.id);
  write(
    found
      ? items.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
      : [...items, { id: p.id, name: p.name, priceCents: p.priceCents, qty: 1 }],
  );
}

export function changeQty(id: number, delta: number) {
  write(
    read()
      .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
      .filter((i) => i.qty > 0),
  );
}

export function removeFromCart(id: number) {
  write(read().filter((i) => i.id !== id));
}

export function clearCart() {
  write(EMPTY);
}
