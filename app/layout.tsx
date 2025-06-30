import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth"
import { I18nProvider } from "@/lib/i18n"
import { ErrorBoundary } from "@/components/ui/error-boundary"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vendora - Create Your Online Store in Minutes",
  description:
    "Build a professional e-commerce website for your Macedonian business with our easy-to-use platform. Start your free trial today!",
  keywords: "e-commerce, online store, Macedonia, Vendora, website builder, online business",
  authors: [{ name: "Vendora Team" }],
  creator: "Vendora",
  publisher: "Vendora",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vendora.mk"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "mk-MK": "/mk",
    },
  },
  openGraph: {
    title: "Vendora - Create Your Online Store in Minutes",
    description: "Build a professional e-commerce website for your Macedonian business with our easy-to-use platform.",
    url: "https://vendora.mk",
    siteName: "Vendora",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vendora - E-commerce Platform for Macedonia",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vendora - Create Your Online Store in Minutes",
    description: "Build a professional e-commerce website for your Macedonian business with our easy-to-use platform.",
    images: ["/og-image.png"],
    creator: "@vendora_mk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <ErrorBoundary>
          <I18nProvider>
            <AuthProvider>{children}</AuthProvider>
          </I18nProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
