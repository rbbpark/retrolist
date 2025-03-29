"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  const handleReset = () => {
    // First reset the error state
    reset();
    // Then force a hard navigation to clear any stale state
    window.location.href = "/device";
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Something Went Wrong</h1>
      <p className="mt-4 text-gray-600">
        We're sorry, but something went wrong. Please try again.
      </p>
      <button
        className="bg-primary hover:bg-primary/90 mt-8 rounded-md px-4 py-2 text-white"
        onClick={handleReset}
      >
        Return
      </button>
    </div>
  );
}
