import type { Block } from "payload";

export const AllPosts: Block = {
  slug: "allPosts",
  interfaceName: "AllPostsBlock",
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "Latest Articles",
      required: true
    }
  ],
  labels: {
    plural: "All Posts",
    singular: "All Posts"
  }
};
