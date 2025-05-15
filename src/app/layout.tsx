import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Web Application",
  description: "A secure and modern web application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <nav className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">
                Your App
              </Link>
              <div className="space-x-4">
                <Link href="/" className="hover:text-gray-300">
                  Home
                </Link>
                <Link href="/about" className="hover:text-gray-300">
                  About
                </Link>
                <Link href="/login" className="hover:text-gray-300">
                  Login
                </Link>
                <Link href="/signup" className="hover:text-gray-300">
                  Sign Up
                </Link>
              </div>
            </div>
          </nav>
          {children}
          <footer className="bg-gray-900 text-white p-4 mt-8">
            <div className="container mx-auto text-center">
              <p>&copy; {new Date().getFullYear()} Your App. All rights reserved.</p>
            </div>
          </footer>
        </ErrorBoundary>
      </body>
    </html>
  );
}
