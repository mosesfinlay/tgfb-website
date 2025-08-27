import React from "react";

import type { RiverAffiliateBlock as RiverAffiliateBlockProps } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import Image from "next/image";

export const RiverAffiliateBlock: React.FC<RiverAffiliateBlockProps> = ({
  affiliateLink,
  title,
  description
}) => {
  return (
    <section className="bg-[#252525]">
      <div className="container">
        <div className="section-container flex flex-col md:flex-row items-start justify-between md:items-center gap-x-8 gap-y-4 py-12 md:border-white/20">
          <div>
            <Image
              src="/river-logo.svg"
              alt="River Logo"
              width={100}
              height={100}
              className="w-28 mb-4"
            />

            {title && (
              <h2 className="text-white mb-2 font-title font-semibold tracking-tight text-4xl">
                {title}
              </h2>
            )}

            {description && <p className="text-white/80">{description}</p>}
          </div>

          <CMSLink {...affiliateLink} size="lg" appearance="orange" />
        </div>
      </div>
    </section>
  );
};
