export function CardSkeleton() {
  return (
    <div className="animate-pulse border rounded-lg p-4 shadow bg-white">
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-4" />
      <div className="h-3 bg-gray-200 rounded w-2/3 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />

      <div className="flex justify-between mt-4">
        <div className="h-4 bg-gray-300 rounded w-24" />
        <div className="h-8 bg-gray-300 rounded w-20" />
      </div>
    </div>
  );
}
