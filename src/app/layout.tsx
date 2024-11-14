import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import { StoreInitializer } from "./providers/StoreInitializer";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Gift Ideas Generator",
  description: "Get help if you dont know what to gift",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Suspense>
          <Toaster />
          <StoreInitializer />
          <main className=" bg-gradient-to-br from-indigo-950 via-primary/90 to-teal-500">
            <Navbar />
            {children}
          </main>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
