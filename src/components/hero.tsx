"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/money";
import { productPhoto, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

// The featured collection: one product at a time, with arrows and thumbnails.
// The page passes the products; the hero only owns which one is selected.
export function Hero({ products }: { products: Product[] }) {
  const [index, setIndex] = useState(0);
  const product = products[index];
  if (!product) return null;

  const step = (direction: 1 | -1) =>
    setIndex((index + direction + products.length) % products.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collection"
      className="grid items-center gap-8 rounded-3xl bg-linear-to-br from-hero-from to-hero-to p-6 md:grid-cols-2 md:p-10"
    >
      <div className="order-2 space-y-4 md:order-1">
        <Badge variant="secondary">{product.category}</Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h2>
        <p className="max-w-md text-foreground/80">{product.description}</p>
        <p className="text-2xl font-semibold">{formatPrice(product.priceCents)}</p>
        <div className="flex flex-wrap gap-2">
          <AddToCartButton product={product} size="lg" />
          <Link
            href={`/products/${product.id}`}
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
          >
            View details
          </Link>
        </div>
      </div>

      <div className="order-1 space-y-4 md:order-2">
        <div className="relative aspect-square w-full">
          <Image
            src={productPhoto(product, "hero")}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 460px, 100vw"
            priority
            className="object-contain"
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-1/2 left-0 -translate-y-1/2"
            onClick={() => step(-1)}
            aria-label="Previous product"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-1/2 right-0 -translate-y-1/2"
            onClick={() => step(1)}
            aria-label="Next product"
          >
            <ChevronRight />
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {products.map((p, i) => (
            <Button
              key={p.id}
              variant={i === index ? "primary" : "ghost"}
              size="icon"
              className="relative size-12 overflow-hidden"
              onClick={() => setIndex(i)}
              aria-label={`Show ${p.name}`}
              aria-pressed={i === index}
            >
              <Image
                src={productPhoto(p, "thumb")}
                alt=""
                fill
                sizes="48px"
                className="object-contain p-1"
              />
            </Button>
          ))}
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {product.name}, {formatPrice(product.priceCents)}, product {index + 1} of {products.length}.
      </p>
    </section>
  );
}
