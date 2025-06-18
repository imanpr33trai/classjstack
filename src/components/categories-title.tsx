"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { LoadingSpinner } from "./loading-spinner";
import type { Category } from "@/types/category";
import Image from "next/image";
import Link from "next/link";

interface CategoriesIconsProps {
  className?: string;
  isIcon?: boolean;
  // 1. Accept state and a handler function from the parent
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export const CategoriesIcons = ({
  className,
  isIcon = false,
  selectedCategory,
  onCategorySelect,
}: CategoriesIconsProps) => {
  // This data fetching logic remains the same
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await client.category.getAllCategory.$get();
      return await response.json();
    },
  });

  // ... (isLoading and error states remain the same) ...

  return (
    <div
      className={cn(
        "flex flex-wrap cursor-default font-poppins items-center justify-center gap-1 px-4",
        className
      )}
    >
      {/* UX Improvement: Add an "All Categories" button to reset the filter */}
      <div
        className="group h-auto sm:h-40 md:h-48 w-full sm:w-1/2 md:w-1/3 lg:w-40"
        onClick={() => onCategorySelect(null)} // Call handler with null
      >
        <div
          className={`flex flex-col gap-2 items-center h-full py-4 sm:py-0 group-hover:bg-brand-100 justify-center transition-colors ${
            selectedCategory === null ? "bg-brand-100" : ""
          }`}
        >
          {/* You can use a generic icon for "All" */}
          <Image
            src="/path/to/all-icon.svg"
            width={40}
            height={40}
            alt="All Categories"
            className={cn(
              "w-8 h-8 sm:w-10 sm:h-10",
              selectedCategory === null ? "invert" : "group-hover:invert"
            )}
          />
          <h6
            className={cn(
              "transition-colors text-sm sm:text-base",
              selectedCategory === null
                ? "text-white"
                : "group-hover:text-white"
            )}
          >
            All Categories
          </h6>
        </div>
      </div>

      {categories?.map((category) => (
        // The `Link` is still useful for right-click -> open in new tab.
        // But the primary interaction is now the onClick on the div.
        <Link
          href={`/categories/${category.slug}`}
          key={category.id}
          onClick={(e) => e.preventDefault()}
        >
          <div
            className="group h-auto sm:h-40 md:h-48 w-full sm:w-1/2 md:w-1/3 lg:w-40"
            // 2. Remove internal state logic. Use the passed-in function.
            onClick={() => onCategorySelect(category.id)}
          >
            <div
              className={`flex flex-col gap-2 items-center h-full py-4 sm:py-0 group-hover:bg-brand-100 justify-center transition-colors ${
                // 3. Use the passed-in prop to determine active state
                selectedCategory === category.id ? "bg-brand-100" : ""
              }`}
            >
              <Image
                src={category.image}
                width={40}
                height={40}
                alt={category.name}
                className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10",
                  selectedCategory === category.id
                    ? "invert"
                    : "group-hover:invert"
                )}
              />
              <h6
                className={cn(
                  "transition-colors text-sm sm:text-base",
                  selectedCategory === category.id
                    ? "text-white"
                    : "group-hover:text-white"
                )}
              >
                {category.name}
              </h6>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
