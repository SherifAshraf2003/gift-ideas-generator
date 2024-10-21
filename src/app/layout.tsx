import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

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
        <Toaster />
        <main className="h-screen bg-gradient-to-r from-gradientFrom to-gradientTo ">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
