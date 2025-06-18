"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { LoadingSpinner } from "./loading-spinner";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { AdWithUser } from "@/types/ads";

interface AdsListProps {
  className?: string;
  limit?: number;
}

export const AdsList = ({ className, limit }: AdsListProps) => {
  const {
    data: ads,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      const response = await client.ads.getAll.$get();
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !ads) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-red-500">
          {error ? (error as Error).message : "Failed to load ads"}
        </p>
      </div>
    );
  }

  // Limit the number of ads if specified
  const displayedAds = limit ? ads.slice(0, limit) : ads;

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {displayedAds.map((ad: AdWithUser) => (
        <Card key={ad.id} className="overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{ad.title}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {ad.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">
                ₹{ad.price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(ad.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span>{ad.location}</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <span>
                Posted by: {ad.user.firstName} {ad.user.lastName}
              </span>
            </div>
            <Button href={`/ads/${ad.id}`} className="w-full mt-4">
              View Details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
