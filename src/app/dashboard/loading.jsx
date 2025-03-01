

"use client";

const SkeletonCard = () => (
  <div className="animate-pulse border border-dashed border-black p-6 bg-gray-200 rounded-lg">
    <div className="flex justify-center mb-4">
      <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
    </div>
    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
    <div className="h-10 bg-gray-300 rounded w-full mx-auto"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto mt-2"></div>
  </div>
);

const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default Loading;
