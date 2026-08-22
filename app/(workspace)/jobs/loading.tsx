import { Skeleton } from "../../components/ui";

export default function JobsLoading() {
  return (
    <div className="space-y-4 max-w-7xl">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
