import Skeleton from "./Skeleton";

export default function ItemPostSkeleton({ isNew }: { isNew: any }) {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-2 space-y-2">
        <Skeleton className={`h-[${isNew ? "150px" : "250px"}] w-full mb-4`} />
        <Skeleton className="h-6 w-full" />
        {isNew && <Skeleton className="h-6 w-full" />}
      </div>
    </>
  );
}
