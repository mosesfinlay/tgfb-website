"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import React, { useEffect } from "react";

import type { Page } from "@/payload-types";

import { CMSLink } from "@/components/Link";

export const HighImpactHero: React.FC<Page["hero"]> = ({ heading, links, media, description }) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("dark");
  });

  return (
    <div
      style={{
        backgroundImage: media && typeof media === "object" ? `url(${media.url})` : undefined,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top center"
      }}
    >
      <div className="container relative z-10">
        <div className="border-x-2 px-4 md:px-10 space-y-4 md:space-y-10 py-32 border-white/20">
          <div className="border-l-2 pl-4 md:pl-10 -ml-[calc(1rem+2px)] md:-ml-[calc(2.5rem+2px)] border-orange">
            {heading && (
              <h1 className="text-orange tracking-tight font-bold text-5xl md:text-7xl lg:text-[5rem] whitespace-pre-line">
                {heading}
              </h1>
            )}
          </div>

          {description && (
            <p className="lg:text-[1.4rem] max-w-md text-xl leading-relaxed font-light text-white/95 whitespace-pre-line">
              {description}
            </p>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} appearance="lightBlue" size="lg" />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// return (
//   <div
//     className="relative -mt-[10.4rem] flex items-center justify-center text-white"
//     data-theme="dark"
//   >
//     <div className="container mb-8 z-10 relative flex items-center justify-center">
//       <div className="max-w-[36.5rem] md:text-center">
//         {heading && <h1 className="text-orange tracking-tight text-5xl md:text-7xl">{heading}</h1>}
//         {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
//         {Array.isArray(links) && links.length > 0 && (
//           <ul className="flex md:justify-center gap-4">
//             {links.map(({ link }, i) => {
//               return (
//                 <li key={i}>
//                   <CMSLink {...link} />
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </div>
//     </div>
//     <div className="min-h-[80vh] select-none">
//       {media && typeof media === "object" && (
//         <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
//       )}
//     </div>
//   </div>
// );
