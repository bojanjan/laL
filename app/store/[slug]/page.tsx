import { StorePageClient } from "./StorePageClient"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import type { Metadata } from "next"

interface StorePageProps {
  params: { slug: string }
}

// This would typically fetch from your API
async function getStoreData(slug: string) {
  // In a real app, this would be an API call
  const stores = {
    "demo-bakery": {
      name: "Demo Bakery",
      description: "Fresh baked goods made daily with love",
    },
    "fashion-boutique": {
      name: "Fashion Boutique",
      description: "Trendy fashion for the modern woman",
    },
    "tech-store": {
      name: "Tech Store",
      description: "Latest technology and gadgets for modern life",
    },
    "home-garden": {
      name: "Home & Garden",
      description: "Everything for your home and garden",
    },
  }

  return stores[slug as keyof typeof stores] || null
}

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  // In a real app, you would fetch store data here
  const storeName = params.slug.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `${storeName} - Vendora Store`,
    description: `Shop at ${storeName} - Quality products with fast delivery`,
  }
}

export default function StorePage({ params }: StorePageProps) {
  return (
    <ErrorBoundary>
      <StorePageClient params={params} />
    </ErrorBoundary>
  )
}

// Generate static params for known stores
export async function generateStaticParams() {
  return [{ slug: "demo-bakery" }, { slug: "fashion-boutique" }, { slug: "tech-store" }, { slug: "home-garden" }]
}
