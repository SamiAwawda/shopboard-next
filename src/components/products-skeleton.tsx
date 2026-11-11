import { ProductList } from "@/components/product-list";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductsSkeleton() {
  return (
    <ProductList>
      {Array.from({ length: 8 }, (_, i) => (
        <Skeleton key={i} className="h-72 rounded-xl" />
      ))}
    </ProductList>
  );
}
