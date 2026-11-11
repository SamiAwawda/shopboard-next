import { fetchProduct, fetchProducts, type ApiProduct } from "@/lib/api-client";
import { DEFAULT_DESCRIPTION, PLACEHOLDER_IMAGE, PRODUCT_DESCRIPTIONS } from "@/lib/product-data";

export type Product = {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  priceCents: number;
  inStock: boolean;
};

export type PhotoSize = "hero" | "card" | "thumb";

// "Leather Tote Bag" -> "leather-tote-bag"
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Converts the API's shape into the app's own shape, in one place.
function toProduct(p: ApiProduct): Product {
  const slug = slugify(p.title);
  return {
    id: p.id,
    name: p.title,
    slug,
    category: p.category_name,
    description: PRODUCT_DESCRIPTIONS[slug] ?? DEFAULT_DESCRIPTION,
    priceCents: p.price_cents,
    inStock: p.in_stock,
  };
}

export async function getProducts(): Promise<Product[]> {
  const data = await fetchProducts();
  return data.items.map(toProduct);
}

// Returns null when the product does not exist.
export async function getProduct(id: string): Promise<Product | null> {
  if (!/^\d+$/.test(id)) return null;
  const p = await fetchProduct(id);
  return p ? toProduct(p) : null;
}

// Photos exist only for the products listed in product-data.ts; the others get the placeholder.
export function productPhoto(product: Product, size: PhotoSize): string {
  return product.slug in PRODUCT_DESCRIPTIONS
    ? `/products/${product.slug}-${size}.webp`
    : PLACEHOLDER_IMAGE;
}

// Full class names (not built dynamically) so Tailwind can see them. Colours are tokens in globals.css.
const CATEGORY_CLASSES: Record<string, string> = {
  Bags: "bg-category-bags",
  Shoes: "bg-category-shoes",
  Accessories: "bg-category-accessories",
};

export function categoryClass(category: string) {
  return CATEGORY_CLASSES[category] ?? "bg-category-other";
}
