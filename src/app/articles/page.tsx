// app/articles/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { client } from "@/lib/client";
import type { Category, BlogPost, BlogPostsResponse } from "@/types/category";
import { useUser } from "@/lib/useUser";

const ARTICLES_POST_URL = "/articles/post";
const ASSET_BASE_URL = process.env.NEXT_PUBLIC_ASSET_BASE_URL || "";

export default function ArticlesPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles", isActive: true },
  ];

  // Fetch Blog Categories using TanStack Query
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery<Category[]>({
    queryKey: ["blogCategories"],
    queryFn: async () => {
      const res = await client.category.getAllCategory.$get();
      return (res.body || []) as Category[];
    },
    staleTime: 1000 * 60 * 15,
  });

  // Fetch Blog Posts using TanStack Query
  const {
    data: postsData,
    isLoading: isLoadingPosts,
    error: postsError,
    isFetching: isFetchingPosts,
  } = useQuery({
    queryKey: ["blogPosts", selectedCategoryId, currentPage],
    queryFn: async () => {
      const res = await client.blog.getAll.$get();
      return res.json;
    },
  });

  const handleCategoryFilter = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const isLoading = isLoadingCategories || isLoadingPosts;
  const displayError = categoriesError || postsError;
  console.log(useUser);
  // if (postsData?.posts.length === 0 && !isLoadingPosts && !displayError) {
  //   return <div>not get</div>;
  // }

  return (
    <>
      <div>{}</div>
    </>
  );
  {
    /* <Breadcrumbs items={breadcrumbItems} />

      <section className="mb-12 md:mb-16 mt-8 md:mt-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-playfair font-medium m-0 text-center md:text-left mb-4 md:mb-0">
              Our Latest Articles
            </h1>
            <Link
              href={ARTICLES_POST_URL}
              className="theme-btn no-underline shrink-0"
            >
              Post Articles
            </Link>
          </div>
          <div className="all-blog-cats flex flex-wrap gap-x-4 md:gap-x-8 gap-y-2 justify-center md:justify-start border-b border-gray-200 pb-3">
            <button
              onClick={() => handleCategoryFilter(null)}
              disabled={isLoading}
              className={`blog-category-filter px-3 py-1 rounded text-sm hover:text-theme-pink transition-colors ${
                selectedCategoryId === null
                  ? "text-theme-pink font-semibold border-b-2 border-theme-pink"
                  : "text-gray-600"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              All
            </button>
            {Array.isArray(categories) &&
              categories.map((cat) => (
                <div key={cat.id} className="category-group">
                  <button
                    onClick={() => handleCategoryFilter(cat.id)}
                    disabled={isLoading}
                    className={`blog-category-filter px-3 py-1 rounded text-sm hover:text-theme-pink transition-colors ${
                      selectedCategoryId === cat.id
                        ? "text-theme-pink font-semibold border-b-2 border-theme-pink"
                        : "text-gray-600"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {cat.name}
                  </button>
                  {selectedCategoryId === cat.id &&
                    cat.subCategories &&
                    cat.subCategories.length > 0 && (
                      <div className="subcategories ml-4 mt-2">
                        {cat.subCategories.map((subcat) => (
                          <button
                            key={subcat.id}
                            onClick={() => handleCategoryFilter(subcat.id)}
                            disabled={isLoading}
                            className={`blog-category-filter px-3 py-1 rounded text-sm hover:text-theme-pink transition-colors ${
                              selectedCategoryId === subcat.id
                                ? "text-theme-pink font-semibold border-b-2 border-theme-pink"
                                : "text-gray-600"
                            } ${
                              isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            {subcat.name}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            {isLoadingCategories && (
              <p className="text-gray-500 text-sm">Loading categories...</p>
            )}
            {!isLoadingCategories &&
              !categoriesError &&
              (!categories || categories.length === 0) && (
                <p className="text-gray-500">No categories found.</p>
              )}
          </div>
        </div>
      </section>

      <section className="articles-blogs pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          {(isLoadingPosts || (isFetchingPosts && !postsData)) && (
            <div className="text-center py-10">
              <p className="text-xl text-gray-500">Loading articles...</p>
            </div>
          )}
          {!isLoadingPosts && displayError && (
            <div className="text-center py-10 text-red-500">
              <p>Error: {displayError.message}</p>
            </div>
          )}
          {!isLoadingPosts &&
            !displayError &&
            postsData &&
            postsData.posts.length > 0 && (
              <div
                id="blog-container"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              >
                {postsData.posts.map((post) => (
                  <ArticleCard
                    key={post.id}
                    post={post}
                    assetBaseUrl={ASSET_BASE_URL}
                  />
                ))}
              </div>
            )}
          {!isLoadingPosts &&
            !displayError &&
            (!postsData || postsData.posts.length === 0) && (
              <p className="text-center text-gray-500 py-10">
                No blog posts found for the selected criteria.
              </p>
            )}
        </div>
      </section>

      {!isLoadingPosts &&
        !displayError &&
        postsData?.totalPages &&
        postsData.totalPages > 1 && (
          <Pagination
            currentPage={postsData.currentPage}
            totalPages={postsData.totalPages}
            onPageChange={handlePageChange}
          />
        )} */
  }
}
