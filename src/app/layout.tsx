import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Zenith IoT Platform",
    template: "%s | Zenith IoT",
  },
  description: "Advanced Industrial IoT Monitoring & Control Platform. Real-time device management, analytics, and AI-powered insights for modern industrial operations.",
  keywords: ["IoT", "Industrial", "Monitoring", "Dashboard", "Smart Factory", "Analytics"],
  authors: [{ name: "Zenith IoT" }],
  openGraph: {
    title: "Zenith IoT Platform",
    description: "Advanced Industrial IoT Monitoring & Control Platform",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-black text-white min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200`}>
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#18181b',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#f4f4f5',
            },
          }}
        />
      </body>
    </html>
  )
}
