import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductImage } from "@/components/product-image";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { formatPrice } from "@/lib/money";
import { getProduct } from "@/lib/products";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <Container layout="detail">
      <Link href="/products" className="w-fit text-sm text-muted-foreground hover:text-foreground">
        ← Back to products
      </Link>
      <div className="grid gap-8 md:grid-cols-2">
        <ProductImage product={product} size="detail" />
        <div className="space-y-4">
          <Badge variant="secondary">{product.category}</Badge>
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <p className="text-2xl font-semibold">{formatPrice(product.priceCents)}</p>
          <p className="text-muted-foreground">{product.description}</p>
          <p
            className={
              product.inStock ? "text-sm text-muted-foreground" : "text-sm text-destructive"
            }
          >
            {product.inStock ? "In stock" : "Sold out"}
          </p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </Container>
  );
}
