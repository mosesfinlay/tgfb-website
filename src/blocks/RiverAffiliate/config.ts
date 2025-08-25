import { link } from "@/fields/link";
import type { Block } from "payload";

export const RiverAffiliate: Block = {
  slug: "riverAffiliate",
  interfaceName: "RiverAffiliateBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title"
    },
    {
      name: "description",
      type: "text",
      label: "Description"
    },
    link({
      overrides: {
        name: "affiliateLink",
        label: "River Affiliate Link"
      }
    })
  ],
  labels: {
    singular: "River Affiliate",
    plural: "River Affiliates"
  }
};
