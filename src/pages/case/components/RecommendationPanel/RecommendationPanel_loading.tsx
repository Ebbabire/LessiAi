import { Skeleton } from "@/components/ui/Skeleton";

const RecommendationsPanelLoading = () => {
  return (
    <div className="animate-in fade-in duration-300 my-4">
      {/* Recommendations Skeleton */}
      <section>
        <div className="grid grid-cols-1 gap-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </section>
    </div>
  );
};

export default RecommendationsPanelLoading;
