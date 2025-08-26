import React from "react";
import { cn } from "@/utilities/ui";

import type { YouTubeEmbedBlock as YouTubeEmbedBlockProps } from "@/payload-types";

type Props = YouTubeEmbedBlockProps & {
  className?: string;
  disableInnerContainer?: boolean;
};

export const YouTubeEmbedBlock: React.FC<Props> = (props) => {
  const { videoId, title, aspectRatio, className, disableInnerContainer } = props;

  if (!videoId) {
    return null;
  }

  const getAspectRatioClass = (ratio: string | null | undefined) => {
    switch (ratio) {
      case "4:3":
        return "aspect-[4/3]";
      case "1:1":
        return "aspect-square";
      case "16:9":
      default:
        return "aspect-video";
    }
  };

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div
      className={cn(
        "my-8",
        {
          container: !disableInnerContainer
        },
        className
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-lg",
          getAspectRatioClass(aspectRatio)
        )}
      >
        <iframe
          src={embedUrl}
          title={title ?? "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
};
