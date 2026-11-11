import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container layout="detail">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-96 rounded-xl" />
    </Container>
  );
}
