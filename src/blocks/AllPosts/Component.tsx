import React from "react";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import type { Post, AllPostsBlock as AllPostsBlockProps } from "@/payload-types";

import { SectionHeader } from "@/components/section-header";
import { AllPostsClient } from "./Component.client";

export const AllPostsBlock: React.FC<
  AllPostsBlockProps & {
    id?: string;
  }
> = async (props) => {
  const { id, title } = props;

  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 6,
    sort: "-publishedAt",
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
      content: true
    }
  });

  return (
    <section id={`block-${id}`}>
      <div className="container">
        <div className="section-container space-y-8 py-24">
          {title && <SectionHeader>{title}</SectionHeader>}

          <AllPostsClient
            initialPosts={posts.docs}
            hasNextPage={posts.hasNextPage}
            currentPage={posts.page || 1}
            totalPages={posts.totalPages}
          />
        </div>
      </div>
    </section>
  );
};
