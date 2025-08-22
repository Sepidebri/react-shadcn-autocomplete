import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sepideh Borazjani - Frontend Developer",
  description:
    "Portfolio and components library by Sepideh Borazjani, showcasing Next.js, TypeScript, and Tailwind UI components.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-800`}
      >
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <footer className="text-center text-sm text-gray-500 py-4 border-t border-gray-200">
            Built with ❤️ by Sepideh Borazjani | Frontend Developer |{" "}
            <a
              href="https://www.linkedin.com/in/sepide-borazjani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              LinkedIn
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}