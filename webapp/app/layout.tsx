import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "LeetCode Solutions | Ammar Ahmad",
  description: "Browse Ammar Ahmad's LeetCode solutions — 174+ problems with syntax-highlighted code, organized by category, difficulty, and language.",
  keywords: ["LeetCode", "solutions", "algorithms", "data structures", "competitive programming"],
  authors: [{ name: "Ammar Ahmad", url: "https://ammar-ahmad.vercel.app" }],
  openGraph: {
    title: "LeetCode Solutions | Ammar Ahmad",
    description: "Browse 174+ LeetCode solutions with syntax-highlighted code previews.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-grid min-h-screen">
        <Navbar />
        <main>{children}</main>
        <footer className="mt-24 border-t border-white/5 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
            Built by{" "}
            <a href="https://ammar-ahmad.vercel.app" className="text-violet-400 hover:text-violet-300 transition-colors">
              Ammar Ahmad
            </a>{" "}
            · Auto-synced via{" "}
            <a href="https://github.com/arunbhardwaj/LeetHub-2.0" className="text-violet-400 hover:text-violet-300 transition-colors">
              LeetHub v2
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
