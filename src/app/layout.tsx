import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Psypher Event Showcase",
  description: "A tier-based event showcase app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body className="bg-gray-50 min-h-screen flex flex-col">
          <Header />
          <main className="container mx-auto px-4 flex-grow">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
