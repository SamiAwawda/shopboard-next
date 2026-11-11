import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { categoryClass, productPhoto, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const imageVariants = cva("relative w-full overflow-hidden", {
  variants: {
    size: {
      card: "aspect-square",
      detail: "aspect-square rounded-xl",
    },
  },
  defaultVariants: { size: "card" },
});

type Props = VariantProps<typeof imageVariants> & {
  product: Product;
  className?: string;
};

// The product photo on its category colour. The name is always written next to it, so alt is empty.
export function ProductImage({ product, size = "card", className }: Props) {
  const isDetail = size === "detail";
  return (
    <div className={cn(imageVariants({ size }), categoryClass(product.category), className)}>
      <Image
        src={productPhoto(product, isDetail ? "hero" : "card")}
        alt=""
        fill
        sizes={
          isDetail
            ? "(min-width: 768px) 576px, 100vw"
            : "(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
        }
        priority={isDetail}
        className="object-contain p-4"
      />
    </div>
  );
}
