import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import localFont from "next/font/local";

import { cn } from "@/utilities/ui";
import React from "react";

import { AdminBar } from "@/components/AdminBar";
import { Footer } from "@/Footer/Component";
import { Header } from "@/Header/Component";
import { Providers } from "@/providers";
import { InitTheme } from "@/providers/Theme/InitTheme";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { draftMode } from "next/headers";

import "./globals.css";
import { getServerSideURL } from "@/utilities/getURL";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-spectral"
});

const ppEiko = localFont({
  src: "../../../public/fonts/pp-eiko/PPEiko-Bold.woff2",
  weight: "700",
  variable: "--font-pp-eiko"
});

const fkGrotesk = localFont({
  src: [
    {
      path: "../../../public/fonts/fk-grotesk/woff2/FKGroteskNeue-Light.woff2",
      weight: "300",
      style: "normal"
    },
    {
      path: "../../../public/fonts/fk-grotesk/woff2/FKGroteskNeue-Regular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../../../public/fonts/fk-grotesk/woff2/FKGroteskNeue-Medium.woff2",
      weight: "500",
      style: "normal"
    },
    {
      path: "../../../public/fonts/fk-grotesk/woff2/FKGroteskNeue-Bold.woff2",
      weight: "700",
      style: "normal"
    }
  ],
  variable: "--font-fk-grotesk"
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className={cn(ppEiko.variable, fkGrotesk.variable, spectral.variable, "antialiased")}>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Thank God for Bitcoin",
  description:
    "Our goal is to educate and equip Christians to understand Bitcoin and use it for the glory of God and the good of people everywhere.",
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    creator: "@tgfb"
  }
};
