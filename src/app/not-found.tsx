import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container layout="center">
      <p className="text-6xl font-bold">404</p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">
        The page or product you are looking for doesn&apos;t exist.
      </p>
      <Button render={<Link href="/products" />} nativeButton={false}>
        Back to products
      </Button>
    </Container>
  );
}
