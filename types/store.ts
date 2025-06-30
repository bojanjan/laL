export interface Store {
  id: number
  name: string
  slug: string
  logo?: string
  colors: {
    primary: string
    secondary: string
  }
  font: string
  description: string
  status: "active" | "inactive"
  products: Product[]
  createdAt?: string
  updatedAt?: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image?: string
  status: "active" | "inactive"
  category?: string
  inventory?: number
  sku?: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  tags?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  totalOrders: number
  totalSpent: number
  createdAt: string
  lastOrderAt?: string
}

export interface Discount {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  description?: string
  minOrderAmount?: number
  maxUses?: number
  usedCount: number
  startDate: string
  endDate?: string
  isActive: boolean
  createdAt: string
}

export interface StoreSettings {
  general: {
    storeName: string
    storeDescription: string
    storeEmail: string
    storePhone?: string
    currency: string
    timezone: string
    language: string
  }
  appearance: {
    primaryColor: string
    secondaryColor: string
    font: string
    logo?: string
  }
  shipping: {
    freeShippingThreshold?: number
    shippingRates: Array<{
      name: string
      price: number
      estimatedDays: string
    }>
  }
  payments: {
    enabledMethods: string[]
    stripePublishableKey?: string
    paypalClientId?: string
  }
  notifications: {
    emailNotifications: boolean
    orderNotifications: boolean
    lowStockAlerts: boolean
    marketingEmails: boolean
  }
  seo: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    googleAnalyticsId?: string
    facebookPixelId?: string
  }
}

export interface Analytics {
  overview: {
    totalSales: number
    totalOrders: number
    totalProducts: number
    conversionRate: number
    averageOrderValue: number
    returningCustomers: number
  }
  salesData: Array<{
    date: string
    sales: number
    orders: number
  }>
  topProducts: Array<{
    id: number
    name: string
    sales: number
    revenue: number
  }>
  customerInsights: {
    newCustomers: number
    returningCustomers: number
    customerLifetimeValue: number
  }
  trafficSources: Array<{
    source: string
    visitors: number
    conversions: number
  }>
}
