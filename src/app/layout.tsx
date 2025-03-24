import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider"
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-inter",
  subsets: ["latin"],
})
export const metadata: Metadata = {
  title: {
    template: "%s - Flickers",
    default: "Flickers",
  },
  description: "A social media platform that allows users to share photos, videos, and updates with their friends and followers. Connect with others, discover new content, and stay updated with the latest trends.",
};

interface RootLayoutProps {
  children: React.ReactNode,
}
export default function RootLayout({
  children
}: RootLayoutProps) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased !pointer-events-auto`}
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SessionProvider>
              {children}
              <SpeedInsights />
              <Toaster />
            </SessionProvider>
          </ThemeProvider>

      </body>
    </html>
  );
}
