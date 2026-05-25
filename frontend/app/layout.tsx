import type { Metadata } from "next";

import "./globals.css";

import { Inter, Bricolage_Grotesque, Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import ReduxProvider from "@/redux/provider";
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  subsets: ["latin"],

  variable: "--font-inter",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],

  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "VedaAI",
  description: "AI-powered assignment generation platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} ${bricolage.variable}`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
