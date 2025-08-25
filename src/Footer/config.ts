import type { GlobalConfig } from "payload";

import { link } from "@/fields/link";
import { revalidateFooter } from "./hooks/revalidateFooter";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Footer Title",
      required: true
    },
    {
      name: "description",
      type: "textarea",
      label: "Footer Description"
    },
    {
      name: "twitterLink",
      type: "text",
      label: "Twitter/X Link"
    },
    {
      name: "instagramLink",
      type: "text",
      label: "Instagram Link"
    },
    {
      name: "tiktokLink",
      type: "text",
      label: "TikTok Link"
    },
    {
      name: "navItems",
      type: "array",
      fields: [
        link({
          appearances: false
        })
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/Footer/RowLabel#RowLabel"
        }
      }
    }
  ],
  hooks: {
    afterChange: [revalidateFooter]
  }
};
