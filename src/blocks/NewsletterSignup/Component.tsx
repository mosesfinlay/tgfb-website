import React from "react";

import type { NewsletterSignupBlock as NewsletterSignupProps } from "@/payload-types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const NewsletterSignupBlock: React.FC<NewsletterSignupProps> = ({ title, description }) => {
  return (
    <section
      style={{
        background: "linear-gradient(223.96deg, #FF8A05 0%, #E2AD6C 27.03%, #BADEF8 63.59%)"
      }}
    >
      <div className="container">
        <div className="section-container relative py-16 md:border-white/20">
          <Image
            src="/newsletter-bg-pattern.svg"
            alt="Newsletter Background"
            fill
            className="absolute inset-0 object-cover"
          />

          <div className="relative z-10 flex flex-col gap-y-6">
            {title && (
              <h2 className="text-slate-800 font-title font-bold tracking-tight text-[2.5rem]">
                {title}
              </h2>
            )}

            {description && (
              <p className="text-slate-800 font-light whitespace-pre-line text-lg">{description}</p>
            )}

            <div className="max-w-2xl space-y-6">
              <p>Still have to add the Klaviyo form here</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                {/* <div className="klaviyo-form-U3u73n"></div> */}
                <Input
                  type="email"
                  placeholder="Your email address"
                  disabled
                  className="flex-1 rounded-[0.5rem] bg-white/90 py-4 text-gray-600 placeholder:text-gray-400 h-12 px-4 text-lg border-white border-0 focus-visible:ring-2 focus-visible:ring-neutral-500/50"
                />
                <Button
                  disabled
                  className="px-8 h-12 text-lg rounded-[0.5rem] whitespace-nowrap"
                  variant="red"
                >
                  Get the updates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
