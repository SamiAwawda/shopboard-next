// Prices are whole cents everywhere in the code. Only this turns them into text like "$89.00".
const priceFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const CENTS_PER_DOLLAR = 100;

export function formatPrice(cents: number): string {
  return priceFormat.format(cents / CENTS_PER_DOLLAR);
}
