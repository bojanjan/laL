"use client"

import { useState, useEffect } from "react"
import { CheckoutModal } from "@/components/checkout-modal"
import { useI18n } from "@/lib/i18n"
import { ShoppingCartIcon, HeartIcon, ShareIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { PageLoader } from "@/components/ui/loading-spinner"
import { useToast } from "@/components/ui/toast"
import { formatCurrency } from "@/lib/utils"
import type { Store, Product } from "@/types/store"
import { STORE_DEFAULTS } from "@/lib/constants"

// Enhanced store data with better error handling
const storeData: Record<string, Store> = {
  "demo-bakery": {
    id: 1,
    name: "Demo Bakery",
    slug: "demo-bakery",
    logo: "/placeholder.svg?height=60&width=60",
    colors: { primary: "#ff532a", secondary: "#4F46E5" },
    font: "Inter",
    description: "Fresh baked goods made daily with love",
    status: "active",
    products: [
      {
        id: 1,
        name: "Artisan Sourdough Bread",
        price: 299,
        description: "Handcrafted sourdough bread with a perfect crust",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Bread",
        inventory: 15,
      },
      {
        id: 2,
        name: "Chocolate Croissants",
        price: 199,
        description: "Buttery croissants filled with rich chocolate",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Pastries",
        inventory: 8,
      },
      {
        id: 3,
        name: "Fresh Bagels",
        price: 149,
        description: "New York style bagels, baked fresh daily",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Bread",
        inventory: 20,
      },
      {
        id: 4,
        name: "Cinnamon Rolls",
        price: 249,
        description: "Warm cinnamon rolls with cream cheese frosting",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Pastries",
        inventory: 12,
      },
      {
        id: 5,
        name: "Blueberry Muffins",
        price: 179,
        description: "Fluffy muffins bursting with fresh blueberries",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Muffins",
        inventory: 6,
      },
      {
        id: 6,
        name: "Apple Pie",
        price: 599,
        description: "Classic apple pie with flaky crust",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Desserts",
        inventory: 3,
      },
    ],
  },
  "fashion-boutique": {
    id: 2,
    name: "Fashion Boutique",
    slug: "fashion-boutique",
    logo: "/placeholder.svg?height=60&width=60",
    colors: { primary: "#EC4899", secondary: "#8B5CF6" },
    font: "Poppins",
    description: "Trendy fashion for the modern woman",
    status: "active",
    products: [
      {
        id: 1,
        name: "Summer Dress",
        price: 2999,
        description: "Light and airy summer dress perfect for any occasion",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Dresses",
        inventory: 5,
      },
      {
        id: 2,
        name: "Designer Handbag",
        price: 4999,
        description: "Elegant handbag crafted from premium leather",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Accessories",
        inventory: 3,
      },
      {
        id: 3,
        name: "Silk Scarf",
        price: 1299,
        description: "Luxurious silk scarf with elegant patterns",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Accessories",
        inventory: 8,
      },
      {
        id: 4,
        name: "Evening Gown",
        price: 5999,
        description: "Stunning evening gown for special occasions",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Dresses",
        inventory: 2,
      },
    ],
  },
  "tech-store": {
    id: 3,
    name: "Tech Store",
    slug: "tech-store",
    logo: "/placeholder.svg?height=60&width=60",
    colors: { primary: "#3B82F6", secondary: "#1E40AF" },
    font: "Inter",
    description: "Latest technology and gadgets for modern life",
    status: "active",
    products: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 4999,
        description: "Premium noise-cancelling wireless headphones",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Audio",
        inventory: 10,
      },
      {
        id: 2,
        name: "Smartphone Case",
        price: 1299,
        description: "Durable protective case for your smartphone",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Accessories",
        inventory: 25,
      },
      {
        id: 3,
        name: "Bluetooth Speaker",
        price: 3499,
        description: "Portable speaker with crystal clear sound",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Audio",
        inventory: 7,
      },
      {
        id: 4,
        name: "USB-C Cable",
        price: 899,
        description: "Fast charging USB-C cable, 2 meters long",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Accessories",
        inventory: 50,
      },
      {
        id: 5,
        name: "Wireless Charger",
        price: 2299,
        description: "Qi-compatible wireless charging pad",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Accessories",
        inventory: 15,
      },
      {
        id: 6,
        name: "Power Bank",
        price: 1999,
        description: "10,000mAh portable power bank with fast charging",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Accessories",
        inventory: 12,
      },
    ],
  },
  "home-garden": {
    id: 4,
    name: "Home & Garden",
    slug: "home-garden",
    logo: "/placeholder.svg?height=60&width=60",
    colors: { primary: "#059669", secondary: "#0D9488" },
    font: "Inter",
    description: "Everything for your home and garden",
    status: "active",
    products: [
      {
        id: 1,
        name: "Indoor Plant Set",
        price: 1999,
        description: "Beautiful set of 3 indoor plants for your home",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Plants",
        inventory: 12,
      },
      {
        id: 2,
        name: "Garden Tools Kit",
        price: 3499,
        description: "Complete set of essential garden tools",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Tools",
        inventory: 8,
      },
      {
        id: 3,
        name: "Decorative Vase",
        price: 899,
        description: "Elegant ceramic vase for your flowers",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Decor",
        inventory: 15,
      },
      {
        id: 4,
        name: "Outdoor Cushions",
        price: 1599,
        description: "Weather-resistant cushions for outdoor furniture",
        images: ["/placeholder.svg?height=300&width=300"],
        status: "active",
        category: "Outdoor",
        inventory: 6,
      },
    ],
  },
}

interface StorePageClientProps {
  params: { slug: string }
}

export function StorePageClient({ params }: StorePageClientProps) {
  const { t } = useI18n()
  const { toast, showToast, hideToast } = useToast()

  // State management with proper typing
  const [store, setStore] = useState<Store | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number }>>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Load store data with error handling
  useEffect(() => {
    const loadStore = async () => {
      try {
        setLoading(true)
        setError(null)

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const foundStore = storeData[params.slug]

        if (!foundStore) {
          setError("Store not found")
          return
        }

        // Validate store data structure
        if (!foundStore.colors) {
          foundStore.colors = { primary: STORE_DEFAULTS.colors.primary, secondary: STORE_DEFAULTS.colors.secondary }
        }

        if (!foundStore.font) {
          foundStore.font = STORE_DEFAULTS.font
        }

        setStore(foundStore)
      } catch (err) {
        setError("Failed to load store")
        console.error("Store loading error:", err)
      } finally {
        setLoading(false)
      }
    }

    loadStore()
  }, [params.slug])

  // Filter products by category
  const categories = store?.products
    ? ["all", ...new Set(store.products.map((p) => p.category).filter(Boolean))]
    : ["all"]

  const filteredProducts =
    selectedCategory === "all"
      ? store?.products || []
      : store?.products.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()) || []

  const addToCart = (product: Product) => {
    if (!product.inventory || product.inventory <= 0) {
      showToast("Product is out of stock", "error")
      return
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { product, quantity: 1 }]
    })

    showToast(`${product.name} added to cart`, "success")
  }

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const shareStore = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: store?.name || "",
          text: store?.description || "",
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Store link copied to clipboard!")
    }
  }

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Loading state
  if (loading) {
    return <PageLoader />
  }

  // Error state
  if (error || !store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="text-6xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Store Not Found</h2>
          <p className="text-gray-600 mb-6">The store you're looking for doesn't exist or has been moved.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[#ff532a] text-white rounded-lg font-medium hover:bg-[#e6472a] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Store Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {store.logo && (
                  <Image
                    src={store.logo || "/placeholder.svg"}
                    alt={store.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                )}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{store.name}</h1>
                  <p className="text-gray-600 mt-1">{store.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500">Category: {store.category}</span>
                    {store.phone && <span className="text-sm text-gray-500">📞 {store.phone}</span>}
                    {store.email && <span className="text-sm text-gray-500">✉️ {store.email}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={shareStore}
                  className="p-2 text-gray-600 hover:text-[#ff532a] transition-colors"
                  title="Share store"
                >
                  <ShareIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="relative bg-[#ff532a] text-white px-6 py-2 rounded-lg hover:bg-[#e64a26] transition-colors flex items-center space-x-2"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Cart</span>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto py-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedCategory === category
                      ? "bg-[#ff532a] text-white"
                      : "text-gray-600 hover:text-[#ff532a] hover:bg-gray-100"
                  }`}
                >
                  {category === "all" ? "All Products" : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">This store doesn't have any products yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative">
                    <Image
                      src={product.images[0] || "/placeholder.svg?height=200&width=200"}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                    >
                      {favorites.has(product.id.toString()) ? (
                        <HeartIconSolid className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#ff532a]">{formatCurrency(product.price)}</span>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={product.inventory === 0}
                        className="bg-[#ff532a] text-white px-4 py-2 rounded-lg hover:bg-[#e64a26] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                      >
                        {product.inventory === 0 ? "Out of Stock" : "Add to Cart"}
                      </button>
                    </div>
                    {product.inventory > 0 && product.inventory <= 5 && (
                      <p className="text-orange-600 text-xs mt-1">Only {product.inventory} left!</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cart={cart}
          onUpdateCart={setCart}
          storeName={store.name}
        />
      </div>
    </ErrorBoundary>
  )
}
