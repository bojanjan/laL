"use client"

import type React from "react"

import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline"

interface StatsCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ComponentType<{ className?: string }>
}

export function StatsCard({ title, value, change, changeType, icon: Icon }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="flex-shrink-0">
          <Icon className="h-8 w-8 text-gray-400" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {changeType === "positive" && <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />}
        {changeType === "negative" && <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />}
        <span
          className={`text-sm font-medium ${
            changeType === "positive" ? "text-green-600" : changeType === "negative" ? "text-red-600" : "text-gray-500"
          }`}
        >
          {change}
        </span>
        {changeType !== "neutral" && <span className="text-sm text-gray-500 ml-1">from last month</span>}
      </div>
    </div>
  )
}
