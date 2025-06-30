"use client"

import { useState } from "react"
import {
  ShoppingBagIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ChartBarIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline"
import { StatsCard } from "@/components/ui/stats-card"
import { AddProductModal } from "@/components/dashboard/add-product-modal"

export function OverviewTab() {
  const [showAddProductModal, setShowAddProductModal] = useState(false)

  const [recentActivity] = useState([
    {
      id: 1,
      type: "order",
      message: "No recent orders",
      time: "-",
      amount: "-",
    },
    {
      id: 2,
      type: "product",
      message: "No product alerts",
      time: "-",
      amount: "-",
    },
    {
      id: 3,
      type: "customer",
      message: "No new customers",
      time: "-",
      amount: "-",
    },
  ])

  const [topProducts] = useState([
    {
      id: 1,
      name: "No products yet",
      sales: "-",
      revenue: "-",
      image: "/placeholder.svg?height=60&width=60",
    },
  ])

  const stats = [
    {
      title: "Total Revenue",
      value: "-",
      change: "-",
      changeType: "neutral" as const,
      icon: CurrencyDollarIcon,
    },
    {
      title: "Total Orders",
      value: "-",
      change: "-",
      changeType: "neutral" as const,
      icon: ShoppingBagIcon,
    },
    {
      title: "Total Customers",
      value: "-",
      change: "-",
      changeType: "neutral" as const,
      icon: UsersIcon,
    },
    {
      title: "Conversion Rate",
      value: "-",
      change: "-",
      changeType: "neutral" as const,
      icon: ChartBarIcon,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#ff532a] to-[#ff7849] rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
        <p className="text-orange-100 mb-4">Start building your store by adding your first product.</p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowAddProductModal(true)}
            className="bg-white text-[#ff532a] px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <PlusIcon className="h-4 w-4 inline mr-2" />
            Add Product
          </button>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
            <EyeIcon className="h-4 w-4 inline mr-2" />
            View Store
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 rounded-full mt-2 bg-gray-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500">{activity.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-400">{activity.time}</p>
                      <p className="text-xs text-gray-400">{activity.amount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 truncate">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setShowAddProductModal(true)}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <PlusIcon className="h-8 w-8 text-[#ff532a] mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Add New Product</p>
                <p className="text-sm text-gray-500">Create a new product listing</p>
              </div>
            </button>
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <PencilIcon className="h-8 w-8 text-[#ff532a] mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Customize Store</p>
                <p className="text-sm text-gray-500">Update your store design</p>
              </div>
            </button>
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <EyeIcon className="h-8 w-8 text-[#ff532a] mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-900">View Analytics</p>
                <p className="text-sm text-gray-500">Check your store performance</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal isOpen={showAddProductModal} onClose={() => setShowAddProductModal(false)} />
    </div>
  )
}
