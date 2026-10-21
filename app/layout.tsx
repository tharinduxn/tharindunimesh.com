import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import "./styles/projects.css";
import "./styles/story.css";
import "./styles/experience.css";
import "./styles/expertise.css";
import "./styles/process.css";
import "./styles/contact.css";
import "./styles/navigation.css";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tharindu Nimesh — Developer & Product Builder",
    template: "%s — Tharindu Nimesh",
  },
  description:
    "Thoughtful digital products, built right. Tharindu Nimesh is a developer in Sri Lanka building considered web and mobile experiences with React, Next.js, and Flutter.",
  openGraph: {
    title: "Tharindu Nimesh — Developer & Product Builder",
    description:
      "Thoughtful digital products, built right. Selected web and mobile work engineered with React, Next.js, TypeScript, and Flutter.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tharindu Nimesh — Developer & Product Builder",
    description:
      "Thoughtful digital products, built right. Selected web and mobile work engineered with React, Next.js, TypeScript, and Flutter.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <Footer />
      </body>
    </html>
  );
}
