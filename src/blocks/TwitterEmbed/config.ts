import type { Block } from "payload";

export const TwitterEmbed: Block = {
  slug: "twitterEmbed",
  interfaceName: "TwitterEmbedBlock",
  fields: [
    {
      name: "tweetUrl",
      type: "text",
      required: true,
      label: "Tweet URL",
      admin: {
        description:
          'Enter the full Twitter/X URL (e.g., "https://twitter.com/username/status/1234567890" or "https://x.com/username/status/1234567890")'
      },
      validate: (value: string | null | undefined) => {
        if (!value || typeof value !== "string") return "Tweet URL is required";
        const twitterRegex = /^https?:\/\/(twitter\.com|x\.com)\/\w+\/status\/\d+/;
        if (!twitterRegex.test(value)) {
          return "Please enter a valid Twitter/X tweet URL";
        }
        return true;
      }
    }
  ],
  labels: {
    plural: "Twitter/X Embeds",
    singular: "Twitter/X Embed"
  }
};
