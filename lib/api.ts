// Mock API functions for demo purposes
// In a real application, these would make actual HTTP requests

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  status: "active" | "draft" | "archived"
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: Date
  shippingAddress: {
    street: string
    city: string
    postalCode: string
    country: string
  }
}

export interface Store {
  id: string
  name: string
  slug: string
  description: string
  logo?: string
  theme: string
  domain?: string
  settings: {
    currency: string
    taxRate: number
    shippingEnabled: boolean
    paymentMethods: string[]
  }
  createdAt: Date
  updatedAt: Date
}

// Mock data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 2999,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    stock: 25,
    status: "active",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt in various colors",
    price: 899,
    image: "/placeholder.svg?height=200&width=200",
    category: "Clothing",
    stock: 50,
    status: "active",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    name: "Coffee Mug",
    description: "Ceramic coffee mug with custom design",
    price: 599,
    image: "/placeholder.svg?height=200&width=200",
    category: "Home & Garden",
    stock: 100,
    status: "active",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
]

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customerName: "Петар Петровски",
    customerEmail: "petar@example.com",
    items: [
      {
        productId: "1",
        productName: "Wireless Headphones",
        quantity: 1,
        price: 2999,
      },
    ],
    total: 2999,
    status: "delivered",
    createdAt: new Date("2024-01-20"),
    shippingAddress: {
      street: "Македонија 123",
      city: "Скопје",
      postalCode: "1000",
      country: "Macedonia",
    },
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customerName: "Ана Стојановска",
    customerEmail: "ana@example.com",
    items: [
      {
        productId: "2",
        productName: "Cotton T-Shirt",
        quantity: 2,
        price: 899,
      },
    ],
    total: 1798,
    status: "processing",
    createdAt: new Date("2024-01-22"),
    shippingAddress: {
      street: "Партизанска 45",
      city: "Битола",
      postalCode: "7000",
      country: "Macedonia",
    },
  },
]

// API Functions
export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockProducts
}

export async function getProduct(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockProducts.find((p) => p.id === id) || null
}

export async function createProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newProduct: Product = {
    ...productData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockProducts.push(newProduct)
  return newProduct
}

export async function updateProduct(id: string, productData: Partial<Product>): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const index = mockProducts.findIndex((p) => p.id === id)
  if (index === -1) return null

  mockProducts[index] = {
    ...mockProducts[index],
    ...productData,
    updatedAt: new Date(),
  }

  return mockProducts[index]
}

export async function deleteProduct(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = mockProducts.findIndex((p) => p.id === id)
  if (index === -1) return false

  mockProducts.splice(index, 1)
  return true
}

export async function getOrders(): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return mockOrders
}

export async function getOrder(id: string): Promise<Order | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockOrders.find((o) => o.id === id) || null
}

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<Order | null> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = mockOrders.findIndex((o) => o.id === id)
  if (index === -1) return null

  mockOrders[index].status = status
  return mockOrders[index]
}

export async function getDashboardStats() {
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    totalRevenue: 45230,
    totalOrders: 156,
    totalProducts: mockProducts.length,
    totalCustomers: 89,
    recentOrders: mockOrders.slice(0, 5),
    topProducts: mockProducts.slice(0, 3),
    salesData: [
      { month: "Jan", sales: 12000 },
      { month: "Feb", sales: 15000 },
      { month: "Mar", sales: 18000 },
      { month: "Apr", sales: 22000 },
      { month: "May", sales: 25000 },
      { month: "Jun", sales: 28000 },
    ],
  }
}

export async function uploadImage(file: File): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // In a real app, this would upload to a cloud storage service
  // For demo purposes, we'll return a placeholder URL
  return `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(file.name)}`
}

export async function createStore(storeData: Omit<Store, "id" | "createdAt" | "updatedAt">): Promise<Store> {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const newStore: Store = {
    ...storeData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return newStore
}

export async function getAnalytics(period: "7d" | "30d" | "90d" = "30d") {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const baseData = {
    visitors: 1250,
    pageViews: 3400,
    conversionRate: 2.4,
    averageOrderValue: 1850,
  }

  // Simulate different data based on period
  const multiplier = period === "7d" ? 0.25 : period === "30d" ? 1 : 3

  return {
    visitors: Math.round(baseData.visitors * multiplier),
    pageViews: Math.round(baseData.pageViews * multiplier),
    conversionRate: baseData.conversionRate,
    averageOrderValue: baseData.averageOrderValue,
    chartData: Array.from({ length: period === "7d" ? 7 : period === "30d" ? 30 : 90 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      visitors: Math.floor(Math.random() * 100) + 20,
      sales: Math.floor(Math.random() * 5000) + 1000,
    })).reverse(),
  }
}
