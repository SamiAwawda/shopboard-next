import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container>
      <div className="space-y-3">
        <Skeleton className="h-12 w-80 max-w-full" />
        <Skeleton className="h-6 w-96 max-w-full" />
      </div>
      <Skeleton className="h-96 rounded-3xl" />
    </Container>
  );
}
