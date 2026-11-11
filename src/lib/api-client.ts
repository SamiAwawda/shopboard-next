// The only place that talks to the ShopBoard API. Returns the API's raw shapes.
// One base URL. Override with API_BASE_URL (e.g. .../delay/3000 or .../fail/500) to test states.
const BASE_URL = process.env.API_BASE_URL ?? "https://shopboard-api.vercel.app";

export type ApiProduct = {
  id: number;
  title: string;
  category_name: string;
  price_cents: number;
  in_stock: boolean;
};

export type ApiProductList = {
  items: ApiProduct[];
  total: number;
};

export async function fetchProducts(): Promise<ApiProductList> {
  const res = await fetch(`${BASE_URL}/api/products`, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Returns null when the product does not exist (404).
export async function fetchProduct(id: string): Promise<ApiProduct | null> {
  const res = await fetch(`${BASE_URL}/api/products/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
