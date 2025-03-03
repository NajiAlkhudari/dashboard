'use client'; 

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error logged:', error.message);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-800">
      <h2 className="text-xl font-semibold text-red-300">Something went wrong!</h2>
      <p className="border border-spacing-1 border-black px-24 py-2 bg-gray-950 mt-2 text-2xl text-red-600 font-sans font-bold">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-300 "
      >
        Try again
      </button>
    </div>
  );
}