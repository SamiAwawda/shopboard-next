"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({ retry }: { error: unknown; retry: () => void }) {
  return (
    <Container layout="center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">We couldn&apos;t load this page.</p>
      <Button onClick={() => retry()}>Try again</Button>
    </Container>
  );
}
