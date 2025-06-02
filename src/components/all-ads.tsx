"use client";

import { useEffect, useState } from "react";
import Product from "./product";
import type { Ad } from "../../generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { AdWithUser, CreateAdInput } from "@/types/ads";
import { notFound } from "next/navigation";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { LoadingSpinner } from "./loading-spinner";

export default function AllAds() {
  const {
    data: ads,
    isLoading: loading,
    error,
  } = useQuery<AdWithUser[]>({
    queryKey: ["get-all-ads"],
    queryFn: async () => {
      const res = await client.ads.getAll.$get();
      // Call .json() as a method, not a property
      const data = await res.json();
      // if (res.ok) return notFound();
      return data;
    },
  });

  // if (!ads) return <div>not Fetched</div>;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="grid mt-5 grid-cols-4 grid-rows-2 gap-6 items-center justify-center">
        {ads?.map((ad) => (
          <Product
            key={ad.id}
            location={ad.location}
            name={ad.title}
            href={`/ads/${ad.id}`}
            price={String(ad.price)}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
