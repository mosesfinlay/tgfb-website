"use client";

import React, { useState } from "react";

import type { Header as HeaderType } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/utilities/ui";

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || [];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full px-4 md:px-10 flex items-center">
      <nav className="hidden md:flex items-center justify-end">
        <ul className="flex justify-end lg:justify-start items-center space-x-6">
          {navItems.map(({ link }, i) => (
            <li key={i}>
              <CMSLink {...link} className="text-base text-white lg:text-lg" appearance="link" />
            </li>
          ))}
        </ul>
      </nav>

      <Popover open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="md:hidden ml-auto extend-touch-target size-10 touch-manipulation items-center justify-center gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent"
          >
            <div className="relative size-6">
              <span
                className={cn(
                  "bg-white absolute left-0 block h-[3px] w-6 transition-all duration-100",
                  mobileMenuOpen ? "top-2.5 rotate-45" : "top-1.5"
                )}
              ></span>
              <span
                className={cn(
                  "bg-white absolute left-0 block h-[3px] w-6 transition-all duration-100",
                  mobileMenuOpen ? "top-2.5 -rotate-45" : "top-3.5"
                )}
              ></span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-background/90 md:hidden no-scrollbar w-screen overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
          align="center"
          side="bottom"
          alignOffset={-16}
          sideOffset={20}
        >
          <ul className="flex flex-col p-4">
            {navItems.map(({ link }, i) => (
              <li key={i}>
                <CMSLink
                  {...link}
                  className="text-lg text-foreground hover:text-foreground/80 px-6 block py-2"
                  appearance="link"
                />
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

// 'use client'

// import React from 'react'

// import type { Header as HeaderType } from '@/payload-types'

// import { CMSLink } from '@/components/Link'
// import Link from 'next/link'
// import { SearchIcon } from 'lucide-react'

// export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
//   const navItems = data?.navItems || []

//   return (
//     <nav className="flex gap-3 items-center">
//       {navItems.map(({ link }, i) => {
//         return <CMSLink key={i} {...link} appearance="link" />
//       })}
//       <Link href="/search">
//         <span className="sr-only">Search</span>
//         <SearchIcon className="w-5 text-primary" />
//       </Link>
//     </nav>
//   )
// }
