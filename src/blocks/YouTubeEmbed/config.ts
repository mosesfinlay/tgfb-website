import type { Block } from "payload";

export const YouTubeEmbed: Block = {
  slug: "youtubeEmbed",
  interfaceName: "YouTubeEmbedBlock",
  fields: [
    {
      name: "videoId",
      type: "text",
      required: true,
      label: "YouTube Video ID",
      admin: {
        description:
          'Enter the YouTube video ID (e.g., "dQw4w9WgXcQ" from https://youtube.com/watch?v=dQw4w9WgXcQ)'
      }
    },
    {
      name: "title",
      type: "text",
      label: "Video Title",
      admin: {
        description: "Optional title for accessibility and SEO"
      }
    },
    {
      name: "aspectRatio",
      type: "select",
      defaultValue: "16:9",
      options: [
        {
          label: "16:9 (Widescreen)",
          value: "16:9"
        },
        {
          label: "4:3 (Standard)",
          value: "4:3"
        },
        {
          label: "1:1 (Square)",
          value: "1:1"
        }
      ]
    }
  ],
  labels: {
    plural: "YouTube Embeds",
    singular: "YouTube Embed"
  }
};
