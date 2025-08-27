"use client";
import React from "react";
import { cn } from "@/utilities/ui";
import { Tweet } from "react-tweet";

import type { TwitterEmbedBlock as TwitterEmbedBlockProps } from "@/payload-types";

type Props = TwitterEmbedBlockProps & {
  className?: string;
  disableInnerContainer?: boolean;
};

export const TwitterEmbedBlock: React.FC<Props> = (props) => {
  const { tweetUrl, className, disableInnerContainer } = props;

  if (!tweetUrl) {
    return null;
  }

  const getTweetId = (url: string) => {
    const match = url.match(/\/status\/(\d+)/);
    return match ? match[1] : null;
  };

  const tweetId = getTweetId(tweetUrl);

  if (!tweetId) {
    return (
      <div
        className={cn(
          "my-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg",
          {
            container: !disableInnerContainer
          },
          className
        )}
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Invalid Twitter/X URL. Please provide a valid tweet URL.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "my-8 flex justify-center not-prose",
        {
          container: !disableInnerContainer
        },
        className
      )}
    >
      <Tweet id={tweetId} />
    </div>
  );
};
