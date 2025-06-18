// This is a hypothetical AllAds.tsx component. Adapt it to your actual file.
"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { Product } from "./product"; // Assuming you have a Product component
import { LoadingSpinner } from "./loading-spinner";

interface AllAdsProps {
  categoryId: string | null; // Accept the category ID as a prop
}

const AllAds = ({ categoryId }: AllAdsProps) => {
  const {
    data: ads,
    isLoading,
    error,
  } = useQuery({
    // 1. Make the query key dynamic.
    // When `categoryId` changes, React Query sees a new key and refetches.
    queryKey: ["ads", categoryId],

    // 2. Adjust the query function to use the categoryId.
    queryFn: async () => {
      // Pass the categoryId as a query parameter to your API endpoint.
      // If categoryId is null, the query param will be omitted, fetching all ads.
      const response = await client.ads.getAll.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch ads");
      }
      return await response.json();
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return <p className="text-red-500 text-center py-10">Error loading ads.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {ads?.length > 0 ? (
        ads.map((ad) => <Product key={ad.id} ad={ad} />)
      ) : (
        <p className="col-span-full text-center text-gray-500 py-10">
          No ads found for this category.
        </p>
      )}
    </div>
  );
};

export default AllAds;
