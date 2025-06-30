"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  UsersIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline"
import { getCurrentUser, type User } from "@/lib/auth"
import { PageLoader } from "@/components/ui/loading-spinner"
import { formatCurrency, formatDate } from "@/lib/utils"

interface AdminStats {
  totalUsers: number
  totalStores: number
  totalRevenue: number
  monthlyGrowth: number
}

interface RecentActivity {
  id: string
  type: "user_registered" | "store_created" | "payment_received"
  description: string
  timestamp: Date
  status: "success" | "warning" | "error"
}

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalStores: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.push("/login")
          return
        }
        if (currentUser.role !== "admin") {
          router.push("/dashboard")
          return
        }
        setUser(currentUser)
        await loadAdminData()
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const loadAdminData = async () => {
    // Simulate loading admin data
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setStats({
      totalUsers: 1247,
      totalStores: 89,
      totalRevenue: 45230,
      monthlyGrowth: 12.5,
    })

    setRecentActivity([
      {
        id: "1",
        type: "user_registered",
        description: "New user registered: john@example.com",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        status: "success",
      },
      {
        id: "2",
        type: "store_created",
        description: 'New store created: "Fashion Boutique"',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        status: "success",
      },
      {
        id: "3",
        type: "payment_received",
        description: "Payment received: 2,500 MKD from Store #45",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        status: "success",
      },
    ])
  }

  if (isLoading) {
    return <PageLoader />
  }

  if (!user) {
    return null
  }

  const getActivityIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "user_registered":
        return <UsersIcon className="h-5 w-5" />
      case "store_created":
        return <ShoppingBagIcon className="h-5 w-5" />
      case "payment_received":
        return <CurrencyDollarIcon className="h-5 w-5" />
      default:
        return <CheckCircleIcon className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: RecentActivity["status"]) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "error":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">Welcome back, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-[#ff532a] text-white px-4 py-2 rounded-lg hover:bg-[#e64a26] transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShoppingBagIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Stores</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStores}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-8 w-8 text-[#ff532a]" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                <p className="text-2xl font-bold text-gray-900">+{stats.monthlyGrowth}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 p-2 rounded-full ${getStatusColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <UsersIcon className="h-6 w-6 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Manage Users</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <ShoppingBagIcon className="h-6 w-6 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Review Stores</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <ChartBarIcon className="h-6 w-6 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">View Analytics</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <ExclamationTriangleIcon className="h-6 w-6 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">System Alerts</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
