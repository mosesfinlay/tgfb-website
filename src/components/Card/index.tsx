"use client";
import { cn } from "@/utilities/ui";
import useClickableCard from "@/utilities/useClickableCard";
import Link from "next/link";
import React, { Fragment } from "react";

import type { Post } from "@/payload-types";

import { Media } from "@/components/Media";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";

export type CardPostData = Pick<
  Post,
  "slug" | "categories" | "meta" | "title" | "heroImage" | "content"
>;

export const Card: React.FC<{
  alignItems?: "center";
  className?: string;
  doc?: CardPostData;
  relationTo?: "posts";
  showCategories?: boolean;
  title?: string;
}> = (props) => {
  const { card, link } = useClickableCard({});
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props;

  const { slug, categories, meta, title, heroImage, content } = doc || {};

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0;
  const titleToUse = titleFromProps || title;

  const description = convertLexicalToPlaintext({ data: content });

  const href = `/${relationTo}/${slug}`;

  return (
    <article
      className={cn(
        "border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer",
        className
      )}
      ref={card.ref}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {heroImage && typeof heroImage !== "string" && (
          <Media
            resource={heroImage}
            size="33vw"
            className="w-full h-full object-center object-cover"
          />
        )}
        {!heroImage && (
          <Image
            src="/article-blank-image.jpg"
            alt="Placeholder"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-4">
        {titleToUse && (
          <h3 className="line-clamp-2 text-lg font-semibold">
            <Link className="not-prose" href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        )}
        {description && (
          <div className="mt-2 line-clamp-4 text-sm">
            <p>{description}</p>
          </div>
        )}
      </div>
    </article>
  );
};
