"use client"

import { useState } from "react"
import { MagnifyingGlassIcon, PlusIcon, PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AddProductModal } from "./add-product-modal"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  inventory: number
  sku?: string
  status: "active" | "draft" | "inactive"
  images: string[]
  createdAt: string
}

export function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const categories = [
    "Облека и мода",
    "Електроника",
    "Дом и градина",
    "Спорт и рекреација",
    "Убавина и здравје",
    "Книги и медиуми",
    "Играчки и игри",
    "Автомобили",
    "Храна и пијалаци",
    "Услуги",
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    const matchesStatus = !selectedStatus || product.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleAddProduct = (productData: any) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...productData,
      images: productData.images.map((file: File) => URL.createObjectURL(file)),
    }
    setProducts((prev) => [newProduct, ...prev])
  }

  const handleDeleteProduct = (id: string) => {
    if (confirm("Дали сте сигурни дека сакате да го избришете овој производ?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      inactive: "bg-red-100 text-red-800",
    }

    const labels = {
      active: "Активен",
      draft: "Нацрт",
      inactive: "Неактивен",
    }

    return (
      <span className={cn("px-2 py-1 rounded-full text-xs font-medium", styles[status as keyof typeof styles])}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Производи</h2>
          <p className="text-gray-600">Управувајте со вашите производи</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-[#ff532a] hover:bg-[#e6472a] text-white">
          <PlusIcon className="h-5 w-5 mr-2" />
          Додај производ
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Пребарај производи..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
          >
            <option value="">Сите категории</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
          >
            <option value="">Сите статуси</option>
            <option value="active">Активни</option>
            <option value="draft">Нацрти</option>
            <option value="inactive">Неактивни</option>
          </select>

          <div className="text-sm text-gray-600 flex items-center">Вкупно: {filteredProducts.length} производи</div>
        </div>
      </div>

      {/* Products List */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlusIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {products.length === 0 ? "Немате производи" : "Нема резултати"}
          </h3>
          <p className="text-gray-600 mb-6">
            {products.length === 0
              ? "Започнете со додавање на вашиот прв производ"
              : "Пробајте со различни филтри за пребарување"}
          </p>
          {products.length === 0 && (
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-[#ff532a] hover:bg-[#e6472a] text-white">
              <PlusIcon className="h-5 w-5 mr-2" />
              Додај производ
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Производ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Категорија
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Цена
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Залихи
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
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          {product.images.length > 0 ? (
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400 text-xs">Нема слика</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                          {product.sku && <div className="text-xs text-gray-400">SKU: {product.sku}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.price.toLocaleString("mk-MK")} МКД
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span
                        className={cn(
                          "font-medium",
                          product.inventory === 0
                            ? "text-red-600"
                            : product.inventory < 10
                              ? "text-yellow-600"
                              : "text-green-600",
                        )}
                      >
                        {product.inventory}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(product.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-[#ff532a] p-1">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
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

      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddProduct} />
    </div>
  )
}
