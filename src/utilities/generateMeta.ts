import type { Metadata } from "next";

import type { Media, Page, Post, Config } from "../payload-types";

import { mergeOpenGraph } from "./mergeOpenGraph";
import { getServerSideURL } from "./getURL";

const getImageURL = (image?: Media | Config["db"]["defaultIDType"] | null) => {
  const serverUrl = getServerSideURL();

  let url = serverUrl + "/website-template-OG.webp";

  if (image && typeof image === "object" && "url" in image) {
    const ogUrl = image.sizes?.og?.url;

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
  }

  return url;
};

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null;
}): Promise<Metadata> => {
  const { doc } = args;

  const isPost = doc && "publishedAt" in doc;
  const serverUrl = getServerSideURL();

  // Determine the best image: meta.image -> heroImage -> fallback
  let ogImage = getImageURL(doc?.meta?.image);
  if ((!doc?.meta?.image || ogImage.includes("/website-template-OG.webp")) && isPost) {
    const postDoc = doc as Partial<Post>;
    if (postDoc.heroImage) {
      ogImage = getImageURL(postDoc.heroImage);
    }
  }

  // Determine the best title: meta.title -> post.title -> fallback
  let title = doc?.meta?.title;
  if (!title && isPost) {
    const postDoc = doc as Partial<Post>;
    title = postDoc.title;
  }
  title = title ? title + " | TGFB" : "Thank God For Bitcoin";

  // Build canonical URL
  let canonicalUrl = "/";
  if (doc?.slug) {
    if (isPost) {
      canonicalUrl = `/articles/${doc.slug}`;
    } else {
      canonicalUrl = Array.isArray(doc.slug) ? `/${doc.slug.join("/")}` : `/${doc.slug}`;
    }
  }
  const fullCanonicalUrl = serverUrl + canonicalUrl;

  // Build Open Graph metadata
  const openGraphData: any = {
    description: doc?.meta?.description || "",
    images: ogImage
      ? [
          {
            url: ogImage,
            alt: title
          }
        ]
      : undefined,
    title,
    url: fullCanonicalUrl,
    type: isPost ? "article" : "website"
  };

  // Add post-specific Open Graph data
  if (isPost) {
    const postDoc = doc as Partial<Post>;

    if (postDoc.publishedAt) {
      openGraphData.publishedTime = postDoc.publishedAt;
    }

    if (postDoc.populatedAuthors && postDoc.populatedAuthors.length > 0) {
      const validAuthors = postDoc.populatedAuthors.filter((author) => author && author.name);
      if (validAuthors.length > 0) {
        openGraphData.authors = validAuthors.map((author) => author.name!);
      }
    }
  }

  const metadata: Metadata = {
    title,
    description: doc?.meta?.description,
    alternates: {
      canonical: fullCanonicalUrl
    },
    openGraph: mergeOpenGraph(openGraphData)
  };

  // Add structured data for authors
  if (isPost) {
    const postDoc = doc as Partial<Post>;
    if (postDoc.populatedAuthors && postDoc.populatedAuthors.length > 0) {
      const validAuthors = postDoc.populatedAuthors.filter((author) => author && author.name);
      if (validAuthors.length > 0) {
        metadata.authors = validAuthors.map((author) => ({
          name: author.name!
        }));
      }
    }
  }

  return metadata;
};
