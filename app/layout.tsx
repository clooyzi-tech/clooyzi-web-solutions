import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "Clooyzi Web Solutions | Website Design & Development in Moodbidri, Mangalore (DK)",
  description:
    "Clooyzi Web Solutions builds responsive, SEO-optimized websites for businesses in Moodbidri, Mangalore, Dakshina Kannada (DK). We specialize in custom web design, development, and digital branding to help your business grow online.",
  keywords: [
    "Clooyzi",
    "web development Moodbidri",
    "website design Mangalore",
    "business website DK",
    "SEO optimization Moodbidri",
    "web development Dakshina Kannada",
    "digital marketing Mangalore",
    "web solutions Moodbidri",
    "web service for businesses DK",
    "custom website design Mangalore",
  ],
  alternates: {
    canonical: "https://clooyzi.com",
  },
  openGraph: {
    title:
      "Clooyzi Web Solutions | Web Design & Development in Moodbidri, Mangalore (DK)",
    description:
      "Professional web design and development services based in Moodbidri, Mangalore, Dakshina Kannada. Clooyzi helps businesses grow with creative and secure digital solutions.",
    url: "https://clooyzi.com",
    siteName: "Clooyzi Web Solutions",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Clooyzi Web Solutions - Moodbidri Mangalore DK",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@clooyzi",
    title:
      "Clooyzi Web Solutions | Website Design & Development in Moodbidri, Mangalore (DK)",
    description:
      "Build your business website with Clooyzi Web Solutions — creative, professional, and secure web development in Moodbidri, Mangalore, Dakshina Kannada.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/logo.ico", // main favicon
    shortcut: "/logo.ico", // shortcut icon
    apple: "/logo.ico", // Apple touch icon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
