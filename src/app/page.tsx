import Link from "next/link";
import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const products = await getProducts();

  return (
    <Container>
      <header className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Welcome to Shopboard</h1>
        <p className="max-w-md text-lg text-muted-foreground">
          Bags, shoes and accessories. Pick what you like and add it to your cart.
        </p>
        <Button size="lg" render={<Link href="/products" />} nativeButton={false}>
          Shop products
        </Button>
      </header>

      {products.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">The collection is on its way.</p>
      ) : (
        <Hero products={products} />
      )}
    </Container>
  );
}
