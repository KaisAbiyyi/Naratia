import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/layout/Navbar";

const geistSans = GeistSans;
const geistMono = GeistMono;

// Metadata yang dioptimalkan untuk SEO dan Social Sharing
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

// Metadata yang sudah bersih dari themeColor
export const metadata: Metadata = {
  title: {
    default: "Naratia: Collaborative Story Platform",
    template: "%s | Naratia",
  },
  description:
    "Naratia is a collaborative story-writing web platform where narratives are built paragraph by paragraph by a global community through a voting system.",
  metadataBase: new URL("https://naratia.vercel.app"),
  keywords: [
    "collaborative storytelling",
    "writing together",
    "writing platform",
    "collective story",
    "story voting",
    "Naratia",
    "creative writing",
  ],
  authors: [{ name: "SORAMULA", url: "https://soramula.com" }],
  creator: "SORAMULA",
  publisher: "SORAMULA",
  openGraph: {
    title: "Naratia: Write Stories with a Global Community",
    description:
      "Join Naratia and help decide the plot. Contribute your paragraph, vote for the best one, and build a unique narrative together.",
    url: "https://naratia.vercel.app",
    siteName: "Naratia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Naratia Illustration - Collaborative Writing Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naratia: Collaborative Story Platform",
    description:
      "Build unique narratives with writers from around the world on Naratia. One paragraph, one vote, one limitless story.",
    creator: "@naratia_app",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  // themeColor sudah dipindahkan
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Navbar />
          <main className="container pt-6 mx-auto">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}