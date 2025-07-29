import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { navigationItems } from "@/constants/navigation.bar";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MovieHub",
  description: "An app to display movies from the TMDB database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-gray-100 text-gray-900`}>
        <nav className="bg-black h-16 w-full sticky top-0 z-50 shadow-md">
          <div className="flex items-center justify-between max-w-screen-xl mx-auto px-6 w-full h-full">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-white text-xl font-bold tracking-wide">
                MovieHub
              </Link>
              {navigationItems.map((item, key) => (
                <Link
                  key={key}
                  href={item.href ?? "#"}
                  className="text-white text-md font-semibold hover:text-blue-400 transition-colors duration-150"
                >
                  {item.text}
                </Link>
              ))}
            </div>

          </div>
        </nav>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
