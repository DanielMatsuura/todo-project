import React from "react";
import { Spinner } from "../ui/spinner";

/**
 * Displays a full-page centered spinner, typically used to indicate
 * that content is loading or processing.
 */
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full py-10">
      <Spinner className="size-12 text-gray-500" />
    </div>
  );
};

export default LoadingSpinner;
