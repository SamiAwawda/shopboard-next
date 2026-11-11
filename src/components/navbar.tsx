import Link from "next/link";
import { CartButton } from "@/components/cart-button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold tracking-tight">
            Shopboard
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">
            Products
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <CartButton />
        </div>
      </nav>
    </header>
  );
}
