import React from "react";

import { SectionHeader } from "@/components/section-header";

export type LatestPodcastsProps = {
  className?: string;
  title: string;
};

export const LatestPodcastsBlock: React.FC<LatestPodcastsProps> = ({ title }) => {
  return (
    <section>
      <div className="container">
        <div className="section-container space-y-8 py-24">
          {title && <SectionHeader>{title}</SectionHeader>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-[28.5rem] rounded-lg overflow-hidden">
              <iframe
                style={{
                  width: "100%",
                  height: "100%"
                }}
                loading="lazy"
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src="https://embed.podcasts.apple.com/us/podcast/thank-god-for-bitcoin/id1694063686"
              />
            </div>
            <div className="h-[28.5rem] rounded-lg overflow-hidden">
              <iframe
                style={{
                  width: "100%",
                  height: "100%"
                }}
                loading="lazy"
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src="https://embed.podcasts.apple.com/us/podcast/thank-god-for-bitcoin/id1694064646"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
