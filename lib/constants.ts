export const SITE_CONFIG = {
  name: "Vendora",
  description: "Create Your Online Store in Minutes",
  url: "https://vendora.mk",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/vendora_mk",
    facebook: "https://facebook.com/vendora.mk",
    instagram: "https://instagram.com/vendora.mk",
  },
}

export const DASHBOARD_TABS = [
  { id: "overview", label: "Overview", icon: "BarChart3" },
  { id: "products", label: "Products", icon: "Package" },
  { id: "orders", label: "Orders", icon: "ShoppingCart" },
  { id: "discounts", label: "Discounts", icon: "Percent" },
  { id: "analytics", label: "Analytics", icon: "TrendingUp" },
  { id: "settings", label: "Settings", icon: "Settings" },
] as const

export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports & Outdoors",
  "Books",
  "Health & Beauty",
  "Toys & Games",
  "Food & Beverages",
  "Automotive",
  "Other",
] as const

export const ORDER_STATUSES = [
  { value: "pending", label: "Pending", color: "yellow" },
  { value: "processing", label: "Processing", color: "blue" },
  { value: "shipped", label: "Shipped", color: "purple" },
  { value: "delivered", label: "Delivered", color: "green" },
  { value: "cancelled", label: "Cancelled", color: "red" },
] as const

export const PAYMENT_METHODS = [
  { value: "card", label: "Credit/Debit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cash_on_delivery", label: "Cash on Delivery" },
] as const

export const CURRENCIES = [
  { code: "MKD", symbol: "ден", name: "Macedonian Denar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "USD", symbol: "$", name: "US Dollar" },
] as const

export const STORE_THEMES = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design",
    preview: "/themes/modern.jpg",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional and elegant layout",
    preview: "/themes/classic.jpg",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and focused design",
    preview: "/themes/minimal.jpg",
  },
  {
    id: "bold",
    name: "Bold",
    description: "Eye-catching and vibrant",
    preview: "/themes/bold.jpg",
  },
] as const

export const MACEDONIAN_CITIES = [
  "Скопје",
  "Битола",
  "Куманово",
  "Прилеп",
  "Тетово",
  "Велес",
  "Штип",
  "Охрид",
  "Гостивар",
  "Струмица",
  "Кавадарци",
  "Кочани",
  "Кичево",
  "Струга",
  "Радовиш",
  "Гевгелија",
  "Дебар",
  "Кратово",
  "Титов Велес",
  "Ресен",
] as const

export const TAX_RATES = {
  standard: 0.18, // 18% VAT in North Macedonia
  reduced: 0.05, // 5% for certain goods
  zero: 0, // 0% for exports and certain services
} as const

export const SHIPPING_ZONES = [
  {
    id: "domestic",
    name: "Domestic (Macedonia)",
    rate: 150, // MKD
  },
  {
    id: "balkans",
    name: "Balkans",
    rate: 300, // MKD
  },
  {
    id: "europe",
    name: "Europe",
    rate: 500, // MKD
  },
  {
    id: "worldwide",
    name: "Worldwide",
    rate: 800, // MKD
  },
] as const
