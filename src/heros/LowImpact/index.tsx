import React from "react";

import type { Page } from "@/payload-types";
import { Media } from "@/components/Media";
import Image from "next/image";

export const LowImpactHero: React.FC<Page["hero"]> = ({ heading, description }) => {
  return (
    <div className="bg-gradient-to-b from-slate-800 to-slate-900 text-white">
      <div className="container">
        <div className="section-container relative md:border-white/20 py-16 md:py-24">
          <div className="border-l-2 pl-4 md:pl-10 -ml-[calc(1rem+2px)] md:-ml-[calc(2.5rem+2px)] border-orange mb-4">
            {heading && (
              <h1 className="text-orange font-title tracking-tight font-bold text-5xl whitespace-pre-line">
                {heading}
              </h1>
            )}
          </div>

          {description && (
            <p className="md:text-lg max-w-[80%] leading-relaxed font-light text-white/95 whitespace-pre-line">
              {description}
            </p>
          )}

          <Image
            src={"/low-impact-hero-icon.svg"}
            alt={"Low Impact Hero"}
            width={200}
            height={200}
            className="absolute top-1/2 right-12 transform -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
};
