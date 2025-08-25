import type { Block } from "payload";

export const LatestPodcasts: Block = {
  slug: "latestPodcasts",
  interfaceName: "LatestPodcastsBlock",
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "Latest Podcasts",
      required: true
    }
  ],
  labels: {
    plural: "Latest Podcasts",
    singular: "Latest Podcasts"
  }
};
