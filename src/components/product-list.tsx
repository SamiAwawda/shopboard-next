import * as React from "react";
import { cn } from "@/lib/utils";

// The responsive grid used by the products list and its loading skeleton.
export function ProductList({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-4", className)} {...props} />;
}
