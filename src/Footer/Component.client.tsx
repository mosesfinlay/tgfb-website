"use client";

import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import Image from "next/image";
import React from "react";

import type { Footer } from "@/payload-types";
import { CMSLink } from "@/components/Link";

interface FooterClientProps extends Footer {}

export const FooterClient: React.FC<FooterClientProps> = ({
  title,
  description,
  twitterLink,
  instagramLink,
  tiktokLink,
  navItems
}) => {
  return (
    <footer className="bg-white text-neutral-700">
      <div className="container">
        <div className="relative section-container space-y-8 py-12 md:border-x-2 md:border-muted">
          <div className="flex flex-col flex-wrap md:flex-row md:items-start gap-8">
            <div className="shrink-0">
              <Image src="/tgfb-logo-icon.svg" alt="TGFB Logo" width={42} height={42} />
            </div>

            <div className="flex flex-col grow justify-between lg:flex-row md:items-start gap-8">
              <div className="space-y-2">
                {title && <h3 className="font-medium leading-none">{title}</h3>}

                {description && <p className="text-sm max-w-[15rem]">{description}</p>}

                {/* Social media icons */}
                <div className="flex space-x-6 pt-1 text-neutral-500">
                  {twitterLink && (
                    <a href={twitterLink} aria-label="Twitter">
                      <FaXTwitter className="size-5" />
                    </a>
                  )}
                  {instagramLink && (
                    <a href={instagramLink} aria-label="Instagram">
                      <FaInstagram className="size-5" />
                    </a>
                  )}
                  {tiktokLink && (
                    <a href={tiktokLink} aria-label="TikTok">
                      <FaTiktok className="size-5" />
                    </a>
                  )}
                </div>
              </div>

              <nav>
                <ul className="flex flex-col md:flex-row justify-center gap-2 md:gap-6">
                  {navItems?.map(({ link }, i) => (
                    <li key={i}>
                      <CMSLink {...link} className="text-base text-neutral-700" appearance="link" />
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="bg-neutral-100">
        <div className="container">
          <div className="border-x-2 border-muted space-y-8 py-4 section-container">
            <p className="text-neutral-400 text-sm">
              Copyright {new Date().getFullYear()} TGFB. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
