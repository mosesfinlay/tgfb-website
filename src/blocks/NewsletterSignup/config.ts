import { link } from "@/fields/link";
import type { Block } from "payload";

export const NewsletterSignup: Block = {
  slug: "newsletterSignup",
  interfaceName: "NewsletterSignupBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title"
    },
    {
      name: "description",
      type: "textarea",
      label: "Description"
    }
  ],
  labels: {
    singular: "Newsletter Signup",
    plural: "Newsletter Signups"
  }
};
