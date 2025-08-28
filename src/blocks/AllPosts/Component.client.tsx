"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { Post } from "@/payload-types";

import { Card, CardPostData } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/Pagination";
import { PageRange } from "@/components/PageRange";
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { cn } from "@/utilities/ui";

type InternalPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading: boolean;
};

const InternalPagination: React.FC<InternalPaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  loading
}) => {
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  const hasExtraPrevPages = page - 1 > 1;
  const hasExtraNextPages = page + 1 < totalPages;

  return (
    <div className={cn("my-8")}>
      <PaginationComponent>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!hasPrevPage || loading}
              onClick={() => {
                if (hasPrevPage && !loading) onPageChange(page - 1);
              }}
            />
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  if (!loading) onPageChange(page - 1);
                }}
                disabled={loading}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive disabled={loading}>
              {loading ? "..." : page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  if (!loading) onPageChange(page + 1);
                }}
                disabled={loading}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              disabled={!hasNextPage || loading}
              onClick={() => {
                if (hasNextPage && !loading) onPageChange(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  );
};

export type AllPostsClientProps = {
  initialPosts: CardPostData[];
  hasNextPage: boolean;
  currentPage: number;
  totalPages: number;
  totalDocs: number;
  enablePagination?: boolean;
  postsPerPage?: number;
};

export const AllPostsClient: React.FC<AllPostsClientProps> = ({
  initialPosts,
  hasNextPage,
  currentPage,
  totalPages,
  totalDocs,
  enablePagination = false,
  postsPerPage = 6
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

  if (enablePagination) {
    const loadPage = async (pageNum: number) => {
      if (loading || pageNum === page) return;

      setLoading(true);

      try {
        const response = await fetch(
          `/api/posts?page=${pageNum}&limit=${postsPerPage}&depth=1&where[_status][equals]=published&sort=-publishedAt`
        );
        const data = await response.json();

        if (data.docs) {
          setPosts(data.docs);
          setPage(pageNum);
        }
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="space-y-4">
        <div className="mb-8">
          <PageRange
            collection="posts"
            currentPage={page}
            limit={postsPerPage}
            totalDocs={totalDocs}
          />
        </div>

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

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <InternalPagination
              page={page}
              totalPages={totalPages}
              onPageChange={loadPage}
              loading={loading}
            />
          </div>
        )}
      </div>
    );
  }

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
