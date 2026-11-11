import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto flex w-full max-w-6xl flex-1 flex-col px-4", {
  variants: {
    layout: {
      page: "gap-8 py-10",
      detail: "gap-6 py-10",
      center: "items-center justify-center gap-4 py-24 text-center",
    },
  },
  defaultVariants: { layout: "page" },
});

export function Container({
  className,
  layout,
  ...props
}: React.ComponentProps<"main"> & VariantProps<typeof containerVariants>) {
  return <main className={cn(containerVariants({ layout }), className)} {...props} />;
}
