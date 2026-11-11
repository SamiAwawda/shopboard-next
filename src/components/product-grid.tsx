"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductImage } from "@/components/product-image";
import { ProductList } from "@/components/product-list";
import { formatPrice } from "@/lib/money";
import type { Product } from "@/lib/products";

export function ProductGrid({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products],
  );

  const filtered = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={c === category ? "primary" : "secondary"}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No products found.</p>
      ) : (
        <ProductList>
          {filtered.map((p) => (
            <Card key={p.id} className="overflow-hidden pt-0">
              <ProductImage product={p} />
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">
                    <Link href={`/products/${p.id}`} className="hover:underline">
                      {p.name}
                    </Link>
                  </CardTitle>
                  <Badge variant={p.inStock ? "secondary" : "destructive"}>
                    {p.inStock ? "In stock" : "Sold out"}
                  </Badge>
                </div>
                <CardDescription>{p.category}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto justify-between">
                <span className="text-lg font-semibold">{formatPrice(p.priceCents)}</span>
                <AddToCartButton product={p} size="sm" />
              </CardFooter>
            </Card>
          ))}
        </ProductList>
      )}
    </div>
  );
}
