"use client"

import type React from "react"

import { useState } from "react"
import { PlusIcon, PencilIcon, TrashIcon, TagIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn, formatCurrency, formatDate } from "@/lib/utils"

interface Discount {
  id: string
  code: string
  description: string
  type: "percentage" | "fixed"
  value: number
  minOrderAmount?: number
  maxUses?: number
  currentUses: number
  startDate: string
  endDate: string
  isActive: boolean
  createdAt: string
}

export function DiscountsTab() {
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    type: "percentage" as "percentage" | "fixed",
    value: "",
    minOrderAmount: "",
    maxUses: "",
    startDate: "",
    endDate: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newDiscount: Discount = {
      id: Date.now().toString(),
      code: formData.code.toUpperCase(),
      description: formData.description,
      type: formData.type,
      value: Number.parseFloat(formData.value),
      minOrderAmount: formData.minOrderAmount ? Number.parseFloat(formData.minOrderAmount) : undefined,
      maxUses: formData.maxUses ? Number.parseInt(formData.maxUses) : undefined,
      currentUses: 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
      isActive: true,
      createdAt: new Date().toISOString(),
    }

    setDiscounts((prev) => [newDiscount, ...prev])
    setIsAddModalOpen(false)
    setFormData({
      code: "",
      description: "",
      type: "percentage",
      value: "",
      minOrderAmount: "",
      maxUses: "",
      startDate: "",
      endDate: "",
    })
  }

  const handleDelete = (id: string) => {
    if (confirm("Дали сте сигурни дека сакате да го избришете овој попуст?")) {
      setDiscounts((prev) => prev.filter((d) => d.id !== id))
    }
  }

  const toggleActive = (id: string) => {
    setDiscounts((prev) => prev.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d)))
  }

  const getStatusBadge = (discount: Discount) => {
    const now = new Date()
    const startDate = new Date(discount.startDate)
    const endDate = new Date(discount.endDate)

    if (!discount.isActive) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Неактивен</span>
    }

    if (now < startDate) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Планиран</span>
    }

    if (now > endDate) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Истечен</span>
    }

    if (discount.maxUses && discount.currentUses >= discount.maxUses) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Исцрпен</span>
    }

    return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Активен</span>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Попусти</h2>
          <p className="text-gray-600">Управувајте со вашите промотивни кодови</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-[#ff532a] hover:bg-[#e6472a] text-white">
          <PlusIcon className="h-5 w-5 mr-2" />
          Додај попуст
        </Button>
      </div>

      {/* Discounts List */}
      {discounts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TagIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Немате попусти</h3>
          <p className="text-gray-600 mb-6">Создајте промотивни кодови за да ги привлечете купувачите</p>
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-[#ff532a] hover:bg-[#e6472a] text-white">
            <PlusIcon className="h-5 w-5 mr-2" />
            Додај попуст
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Код
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Опис
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Вредност
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Употреба
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Период
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Акции
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {discounts.map((discount) => (
                  <tr key={discount.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {discount.code}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{discount.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {discount.type === "percentage" ? `${discount.value}%` : formatCurrency(discount.value)}
                      </div>
                      {discount.minOrderAmount && (
                        <div className="text-xs text-gray-500">Мин. {formatCurrency(discount.minOrderAmount)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {discount.currentUses}
                      {discount.maxUses && ` / ${discount.maxUses}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{formatDate(discount.startDate)}</div>
                      <div>{formatDate(discount.endDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(discount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => toggleActive(discount.id)}
                          className={cn(
                            "px-2 py-1 text-xs rounded",
                            discount.isActive
                              ? "bg-red-100 text-red-800 hover:bg-red-200"
                              : "bg-green-100 text-green-800 hover:bg-green-200",
                          )}
                        >
                          {discount.isActive ? "Деактивирај" : "Активирај"}
                        </button>
                        <button className="text-gray-400 hover:text-[#ff532a] p-1">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(discount.id)}
                          className="text-gray-400 hover:text-red-600 p-1"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Discount Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Додај нов попуст</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Промотивен код *</label>
                <Input
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="ПОПУСТ20"
                  required
                  className="uppercase"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Опис *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Опишете го попустот..."
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Тип *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                  >
                    <option value="percentage">Процент (%)</option>
                    <option value="fixed">Фиксен износ (МКД)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Вредност *</label>
                  <Input
                    name="value"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.value}
                    onChange={handleInputChange}
                    placeholder={formData.type === "percentage" ? "20" : "100"}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Мин. износ (МКД)</label>
                  <Input
                    name="minOrderAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.minOrderAmount}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Макс. употреби</label>
                  <Input
                    name="maxUses"
                    type="number"
                    min="1"
                    value={formData.maxUses}
                    onChange={handleInputChange}
                    placeholder="Неограничено"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Почетен датум *</label>
                  <Input
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Краен датум *</label>
                  <Input name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Откажи
                </Button>
                <Button type="submit" className="bg-[#ff532a] hover:bg-[#e6472a]">
                  Додај попуст
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
