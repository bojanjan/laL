"use client"

import type React from "react"

import { useState } from "react"
import { XMarkIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (product: any) => void
}

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

export function AddProductModal({ isOpen, onClose, onSubmit }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    inventory: "",
    sku: "",
    status: "active",
  })
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + images.length > 5) {
      setErrors((prev) => ({ ...prev, images: "Максимум 5 слики се дозволени" }))
      return
    }

    const newImages = [...images, ...files]
    setImages(newImages)

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })

    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: "" }))
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Името е задолжително"
    if (!formData.description.trim()) newErrors.description = "Описот е задолжителен"
    if (!formData.price || Number.parseFloat(formData.price) <= 0) newErrors.price = "Цената мора да биде поголема од 0"
    if (!formData.category) newErrors.category = "Категоријата е задолжителна"
    if (!formData.inventory || Number.parseInt(formData.inventory) < 0)
      newErrors.inventory = "Залихите мора да бидат 0 или повеќе"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const productData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        inventory: Number.parseInt(formData.inventory),
        images: images,
        createdAt: new Date().toISOString(),
      }

      await onSubmit(productData)
      onClose()
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        inventory: "",
        sku: "",
        status: "active",
      })
      setImages([])
      setImagePreviews([])
    } catch (error) {
      console.error("Error adding product:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Додај нов производ</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Слики на производот (максимум 5)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#ff532a] transition-colors h-32 flex flex-col items-center justify-center">
                  <PhotoIcon className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Додај слика</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
            {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Име на производот *</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Внесете име на производот"
              className={cn(errors.name && "border-red-500")}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Опис *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Опишете го вашиот производ..."
              className={cn(
                "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent resize-none",
                errors.description && "border-red-500",
              )}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Цена (МКД) *</label>
              <Input
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                className={cn(errors.price && "border-red-500")}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Категорија *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={cn(
                  "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent",
                  errors.category && "border-red-500",
                )}
              >
                <option value="">Изберете категорија</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
          </div>

          {/* Inventory and SKU */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Залихи *</label>
              <Input
                name="inventory"
                type="number"
                min="0"
                value={formData.inventory}
                onChange={handleInputChange}
                placeholder="0"
                className={cn(errors.inventory && "border-red-500")}
              />
              {errors.inventory && <p className="text-red-500 text-sm mt-1">{errors.inventory}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SKU (опционално)</label>
              <Input name="sku" value={formData.sku} onChange={handleInputChange} placeholder="SKU-001" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
            >
              <option value="active">Активен</option>
              <option value="draft">Нацрт</option>
              <option value="inactive">Неактивен</option>
            </select>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Откажи
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-[#ff532a] hover:bg-[#e6472a]">
              {isSubmitting ? "Се зачувува..." : "Додај производ"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
