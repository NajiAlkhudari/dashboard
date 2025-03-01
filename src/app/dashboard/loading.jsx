import React from "react";

const Loading = () => {
  return (
    <div className="p-6">
      <div className="flex flex-row justify-between mb-4">
        <div className="h-8 w-40 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-10 w-28 bg-gray-300 rounded animate-pulse"></div>
      </div>

      <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-200 h-12 w-full animate-pulse"></div>
        <div className="divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex justify-between p-4 animate-pulse">
              <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
              <div className="h-6 w-1/6 bg-gray-300 rounded"></div>
              <div className="h-6 w-1/6 bg-gray-300 rounded"></div>
              <div className="h-6 w-1/6 bg-gray-300 rounded"></div>
              <div className="h-6 w-1/6 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
