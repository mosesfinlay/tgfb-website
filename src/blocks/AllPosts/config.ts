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
    },
    {
      name: "postsPerPage",
      type: "number",
      defaultValue: 12,
      required: true,
      admin: {
        description: "Number of posts to display per page"
      }
    },
    {
      name: "enablePagination",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Enable pagination instead of load more functionality"
      }
    }
  ],
  labels: {
    plural: "All Posts",
    singular: "All Posts"
  }
};
