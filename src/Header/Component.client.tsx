"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import type { Header } from "@/payload-types";

import { Logo } from "@/components/Logo/Logo";
import { HeaderNav } from "./Nav";

interface HeaderClientProps {
  data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  useEffect(() => {
    setHeaderTheme(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme]);

  return (
    <header className="bg-orange">
      <div className="container">
        <div className="border-x-2 h-20 flex border-x-white/20">
          <div className="px-4 w-48 md:border-r-2 md:border-r-white/20 shrink-0 justify-center flex items-center">
            <Link href="/">
              <Logo loading="eager" priority="high" />
            </Link>
          </div>

          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  );
};
