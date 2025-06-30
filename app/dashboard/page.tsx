"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  TagIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import { useAuth } from "@/lib/auth"
import { useI18n } from "@/lib/i18n"
import { OverviewTab } from "@/components/dashboard/overview-tab"
import { ProductsTab } from "@/components/dashboard/products-tab"
import { OrdersTab } from "@/components/dashboard/orders-tab"
import { DiscountsTab } from "@/components/dashboard/discounts-tab"
import { AnalyticsTab } from "@/components/dashboard/analytics-tab"
import { SettingsTab } from "@/components/dashboard/settings-tab"
import { VendoraLogo } from "@/components/ui/vendora-logo"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ClientDashboard() {
  const { user, logout, loading } = useAuth()
  const { t } = useI18n()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const navigationItems = [
    { id: "overview", name: t("dashboard.overview") || "Overview", icon: BuildingStorefrontIcon },
    { id: "products", name: t("dashboard.products") || "Products", icon: ShoppingBagIcon },
    { id: "orders", name: t("dashboard.orders") || "Orders", icon: ClipboardDocumentListIcon },
    { id: "discounts", name: "Discounts", icon: TagIcon },
    { id: "analytics", name: t("dashboard.analytics") || "Analytics", icon: ChartBarIcon },
    { id: "settings", name: t("dashboard.settings") || "Settings", icon: Cog6ToothIcon },
  ]

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />
      case "products":
        return <ProductsTab />
      case "orders":
        return <OrdersTab />
      case "discounts":
        return <DiscountsTab />
      case "analytics":
        return <AnalyticsTab />
      case "settings":
        return <SettingsTab />
      default:
        return <OverviewTab />
    }
  }

  const handleViewStore = () => {
    // Navigate to the user's store
    if (user?.storeSlug) {
      window.open(`/store/${user.storeSlug}`, "_blank")
    } else {
      // If no store slug, redirect to onboarding
      router.push("/onboarding")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <VendoraLogo className="h-8" />
            <button type="button" className="text-gray-400 hover:text-gray-600" onClick={() => setSidebarOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium ${
                  activeTab === item.id
                    ? "bg-[#ff532a] text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <VendoraLogo className="h-8" />
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium ${
                  activeTab === item.id
                    ? "bg-[#ff532a] text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-lg font-semibold text-gray-900">
                {navigationItems.find((item) => item.id === activeTab)?.name}
              </h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button
                onClick={handleViewStore}
                className="bg-[#ff532a] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#e6472a] transition-colors text-sm"
              >
                View Store
              </button>

              <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                <BellIcon className="h-6 w-6" />
              </button>

              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-x-2 text-sm font-semibold text-gray-900"
                  onClick={logout}
                >
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  <span className="hidden lg:block">{user.name || "User"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">{renderActiveTab()}</main>
      </div>
    </div>
  )
}
