"use client"

import { useState } from "react"
import { ChartBarIcon, EyeIcon, ShoppingCartIcon, CurrencyDollarIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import { StatsCard } from "@/components/ui/stats-card"

export function AnalyticsTab() {
  const [timeRange, setTimeRange] = useState("7d")

  const timeRanges = [
    { value: "24h", label: "Последни 24 часа" },
    { value: "7d", label: "Последни 7 дена" },
    { value: "30d", label: "Последни 30 дена" },
    { value: "90d", label: "Последни 90 дена" },
    { value: "1y", label: "Последна година" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Аналитика</h2>
          <p className="text-gray-600">Следете ги перформансите на вашата продавница</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
        >
          {timeRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Вкупни продажби" value="-" change="-" changeType="neutral" icon={CurrencyDollarIcon} />
        <StatsCard title="Нарачки" value="-" change="-" changeType="neutral" icon={ShoppingCartIcon} />
        <StatsCard title="Посетители" value="-" change="-" changeType="neutral" icon={UserGroupIcon} />
        <StatsCard title="Конверзија" value="-" change="-" changeType="neutral" icon={ChartBarIcon} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Продажби по денови</h3>
            <ChartBarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Графикот ќе се прикаже кога ќе имате продажби</p>
            </div>
          </div>
        </div>

        {/* Traffic Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Посетители по денови</h3>
            <EyeIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <EyeIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Графикот ќе се прикаже кога ќе имате посетители</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Најпродавани производи</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <ShoppingCartIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Нема податоци за најпродавани производи</p>
            <p className="text-sm text-gray-400 mt-1">Додајте производи и започнете со продажба</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Последни активности</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-gray-400 text-xl">📊</span>
            </div>
            <p className="text-gray-500">Нема последни активности</p>
            <p className="text-sm text-gray-400 mt-1">Активностите ќе се прикажат овде</p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-700">Просечна вредност на нарачка</h4>
            <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">-</div>
          <div className="flex items-center text-sm text-gray-500">
            <span>Нема податоци</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-700">Стапка на конверзија</h4>
            <ChartBarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">-</div>
          <div className="flex items-center text-sm text-gray-500">
            <span>Нема податоци</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-700">Време на страница</h4>
            <EyeIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">-</div>
          <div className="flex items-center text-sm text-gray-500">
            <span>Нема податоци</span>
          </div>
        </div>
      </div>
    </div>
  )
}
