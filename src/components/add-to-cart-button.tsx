"use client";

import { Button } from "@/components/ui/button";
import { addToCart, useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export function AddToCartButton({
  product,
  size,
}: {
  product: Product;
  size?: "sm" | "md" | "lg";
}) {
  const { items } = useCart();
  return (
    <Button size={size} disabled={!product.inStock} onClick={() => addToCart(product)}>
      {!product.inStock
        ? "Sold out"
        : items.some((i) => i.id === product.id)
          ? "Add another"
          : "Add to cart"}
    </Button>
  );
}
