import { formatDateTime } from "src/utilities/formatDateTime";
import React from "react";

import type { Post } from "@/payload-types";

import { Media } from "@/components/Media";
import { formatAuthors } from "@/utilities/formatAuthors";

export const PostHero: React.FC<{
  post: Post;
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post;

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== "";

  return (
    <div>
      <div className="container">
        <div className="section-container py-12">
          <div className="max-w-[48rem] mx-auto">
            <div className="uppercase text-sm mb-6">
              {categories?.map((category, index) => {
                if (typeof category === "object" && category !== null) {
                  const { title: categoryTitle } = category;

                  const titleToUse = categoryTitle || "Untitled category";

                  const isLast = index === categories.length - 1;

                  return (
                    <React.Fragment key={index}>
                      {titleToUse}
                      {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                    </React.Fragment>
                  );
                }
                return null;
              })}
            </div>

            <div className="">
              <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-16">
              {hasAuthors && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm">Author</p>

                    <p>{formatAuthors(populatedAuthors)}</p>
                  </div>
                </div>
              )}
              {publishedAt && (
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Date Published</p>

                  <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {heroImage && typeof heroImage !== "string" ? (
        <div className="w-full">
          <Media priority imgClassName="object-cover w-full h-auto" resource={heroImage} />
        </div>
      ) : (
        <div className="w-full border-b-2 border-muted"></div>
      )}
    </div>
  );
};
