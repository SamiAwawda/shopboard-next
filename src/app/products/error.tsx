"use client"; // Error boundaries must be Client Components

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function Error({ retry }: { error: unknown; retry: () => void }) {
  return (
    <Container layout="center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">We couldn&apos;t load the products.</p>
      <Button onClick={() => retry()}>Try again</Button>
    </Container>
  );
}
