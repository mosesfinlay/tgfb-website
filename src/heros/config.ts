import type { Field } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor
} from "@payloadcms/richtext-lexical";

import { linkGroup } from "@/fields/linkGroup";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "lowImpact",
      label: "Type",
      options: [
        {
          label: "None",
          value: "none"
        },
        {
          label: "High Impact",
          value: "highImpact"
        },
        {
          label: "Low Impact",
          value: "lowImpact"
        }
      ],
      required: true
    },
    {
      name: "heading",
      type: "textarea",
      label: "Heading",
      required: true
    },
    {
      name: "description",
      type: "textarea",
      label: "Description"
    },
    linkGroup({
      overrides: {
        maxRows: 2
      }
    }),
    {
      name: "media",
      type: "upload",
      admin: {
        condition: (_, { type } = {}) => ["highImpact", "lowImpact"].includes(type)
      },
      relationTo: "media"
    }
  ],
  label: false
};
