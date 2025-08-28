import type { CollectionConfig } from "payload";

import { authenticated } from "../../access/authenticated";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated
  },
  admin: {
    defaultColumns: ["name", "email"],
    useAsTitle: "name"
  },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 365 // 1 year
  },
  fields: [
    {
      name: "name",
      type: "text"
    }
  ],
  timestamps: true
};
