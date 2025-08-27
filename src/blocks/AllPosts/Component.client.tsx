"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { Post } from "@/payload-types";

import { Card, CardPostData } from "@/components/Card";
import { Button } from "@/components/ui/button";

export type AllPostsClientProps = {
  initialPosts: CardPostData[];
  hasNextPage: boolean;
  currentPage: number;
  totalPages: number;
};

export const AllPostsClient: React.FC<AllPostsClientProps> = ({
  initialPosts,
  hasNextPage,
  currentPage,
  totalPages
}) => {
  const router = useRouter();
  const [posts, setPosts] = useState<CardPostData[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(currentPage);
  const [hasMore, setHasMore] = useState(hasNextPage);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const nextPage = page + 1;
      const response = await fetch(
        `/api/posts?page=${nextPage}&limit=6&depth=1&where[_status][equals]=published`
      );
      const data = await response.json();

      if (data.docs && data.docs.length > 0) {
        setPosts((prev) => [...prev, ...data.docs]);
        setPage(nextPage);
        setHasMore(data.hasNextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewAllPosts = () => {
    router.push("/articles/all-articles");
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post, index) => {
          if (typeof post === "object" && post !== null) {
            return (
              <Card
                key={`${post.slug}-${index}`}
                className="h-full"
                doc={post}
                relationTo="posts"
                showCategories
              />
            );
          }
          return null;
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {hasMore && (
          <Button onClick={loadMore} disabled={loading} variant="outline" size="lg">
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}

        <Button onClick={viewAllPosts} variant="default" size="lg">
          View All Articles
        </Button>
      </div>
    </div>
  );
};
