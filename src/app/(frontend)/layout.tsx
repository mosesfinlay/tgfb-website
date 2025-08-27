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
        <script
          async
          type="text/javascript"
          src="https://static.klaviyo.com/onsite/js/Vk98Us/klaviyo.js?company_id=Vk98Us"
        ></script>
        <script
          suppressHydrationWarning
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `!function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();`
          }}
        />
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

        <script async src="https://platform.twitter.com/widgets.js" defer></script>
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
