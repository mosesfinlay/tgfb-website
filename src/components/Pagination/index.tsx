"use client";
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
import { useRouter, usePathname } from "next/navigation";
import React from "react";

export const Pagination: React.FC<{
  className?: string;
  page: number;
  totalPages: number;
  basePath?: string;
  useSearchParams?: boolean;
}> = (props) => {
  const router = useRouter();
  const pathname = usePathname();

  const { className, page, totalPages, basePath, useSearchParams = false } = props;
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const hasExtraPrevPages = page - 1 > 1;
  const hasExtraNextPages = page + 1 < totalPages;

  const createUrl = (pageNum: number) => {
    if (useSearchParams) {
      return `${pathname}${pageNum > 1 ? `?page=${pageNum}` : ""}`;
    }
    return basePath ? `${basePath}/${pageNum}` : `/posts/page/${pageNum}`;
  };

  return (
    <div className={cn("my-8", className)}>
      <PaginationComponent>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!hasPrevPage}
              onClick={() => {
                router.push(createUrl(page - 1));
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
                  router.push(createUrl(page - 1));
                }}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              isActive
              onClick={() => {
                router.push(createUrl(page));
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  router.push(createUrl(page + 1));
                }}
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
              disabled={!hasNextPage}
              onClick={() => {
                router.push(createUrl(page + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  );
};
