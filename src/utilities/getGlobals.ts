import type { Config } from "src/payload-types";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import { unstable_cache } from "next/cache";

type Global = keyof Config["globals"];
type GlobalData<T extends Global> = Config["globals"][T];

async function getGlobal<T extends Global>(slug: T, depth = 0): Promise<GlobalData<T>> {
  const payload = await getPayload({ config: configPromise });

  const global = await payload.findGlobal({
    slug,
    depth
  });

  return global as GlobalData<T>;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`]
  });
