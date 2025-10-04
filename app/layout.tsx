import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
title: "Clooyzi - Innovative Software Solutions",
  description:
    "Professional software development company offering app development, web development, cyber security, AI bots, VR/AR services, and blockchain technology.",
  generator: "v0.dev",
  icons: {
    icon: "/logo.ico",       // main favicon
    shortcut: "/logo.ico",   // shortcut icon
    apple: "/iogo.ico"       // Apple touch icon
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'