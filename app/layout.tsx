import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/projects.css";
import "./styles/story.css";
import "./styles/experience.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Tharindu Nimesh — Developer & Product Builder", template: "%s — Tharindu Nimesh" },
  description: "Thoughtful digital products, built right. Tharindu Nimesh is a developer in Sri Lanka building considered web and mobile experiences with React, Next.js, and Flutter.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body><a className="skip-link" href="#main-content">Skip to content</a>{children}</body>
    </html>
  );
}
