import { ProductGrid } from "@/components/product-grid";
import { Container } from "@/components/ui/container";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <Container>
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">Browse everything in the store</p>
      </header>

      {products.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No products yet.</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </Container>
  );
}
