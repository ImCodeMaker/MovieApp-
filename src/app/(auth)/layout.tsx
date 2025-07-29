import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-gray-100 text-gray-900`}>
        <div className="min-h-screen pt-4">{children}</div>
      </body>
    </html>
  );
}
