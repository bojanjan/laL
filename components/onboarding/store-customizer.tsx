"use client"

import type React from "react"

import { useState } from "react"
import { SparklesIcon } from "@heroicons/react/24/outline"
import { cn } from "@/lib/utils"

interface CustomizationData {
  colors: { primary: string; secondary: string }
  font: string
  layout: string
  logo?: File
  banner?: File
}

interface StoreCustomizerProps {
  data: CustomizationData
  onChange: (data: CustomizationData) => void
  errors?: Record<string, string>
}

const fonts = [
  { id: "Inter", name: "Inter", preview: "Modern and clean" },
  { id: "Poppins", name: "Poppins", preview: "Friendly and rounded" },
  { id: "Roboto", name: "Roboto", preview: "Professional and readable" },
  { id: "Open Sans", name: "Open Sans", preview: "Classic and versatile" },
]

const layouts = [
  { id: "grid-2", name: "2 Columns", description: "Perfect for fewer products" },
  { id: "grid-3", name: "3 Columns", description: "Balanced layout (recommended)" },
  { id: "grid-4", name: "4 Columns", description: "Great for many products" },
  { id: "sidebar-left", name: "Left Sidebar", description: "Categories on the left" },
  { id: "sidebar-right", name: "Right Sidebar", description: "Categories on the right" },
  { id: "none", name: "Full Width", description: "No sidebar, full width" },
]

const colorPresets = [
  { name: "Vendora Orange", primary: "#ff532a", secondary: "#f97316" },
  { name: "Ocean Blue", primary: "#0ea5e9", secondary: "#3b82f6" },
  { name: "Forest Green", primary: "#10b981", secondary: "#059669" },
  { name: "Royal Purple", primary: "#8b5cf6", secondary: "#7c3aed" },
  { name: "Sunset Red", primary: "#ef4444", secondary: "#dc2626" },
  { name: "Golden Yellow", primary: "#f59e0b", secondary: "#d97706" },
]

export function StoreCustomizer({ data, onChange, errors }: StoreCustomizerProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)

  const handleColorChange = (type: "primary" | "secondary", color: string) => {
    onChange({
      ...data,
      colors: {
        ...data.colors,
        [type]: color,
      },
    })
  }

  const handleFontChange = (font: string) => {
    onChange({
      ...data,
      font,
    })
  }

  const handleLayoutChange = (layout: string) => {
    onChange({
      ...data,
      layout,
    })
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onChange({
        ...data,
        logo: file,
      })

      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onChange({
        ...data,
        banner: file,
      })

      const reader = new FileReader()
      reader.onload = (e) => {
        setBannerPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const applyColorPreset = (preset: (typeof colorPresets)[0]) => {
    onChange({
      ...data,
      colors: {
        primary: preset.primary,
        secondary: preset.secondary,
      },
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <SparklesIcon className="h-16 w-16 text-[#ff532a] mx-auto mb-6" />
        <h2 className="text-2xl font-bold font-poppins text-gray-900 mb-4">Customize Your Store</h2>
        <p className="text-gray-600 mb-8">Make it uniquely yours with colors, fonts, and layout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customization Options */}
        <div className="space-y-8">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Store Logo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#ff532a] transition-colors">
              {logoPreview ? (
                <div className="space-y-4">
                  <img src={logoPreview || "/placeholder.svg"} alt="Logo preview" className="max-h-20 mx-auto" />
                  <p className="text-sm text-gray-600">Logo uploaded successfully</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-gray-400">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Upload your store logo</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Color Presets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Color Presets</label>
            <div className="grid grid-cols-2 gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => applyColorPreset(preset)}
                  className={cn(
                    "p-3 rounded-lg border-2 text-left transition-all duration-200",
                    data.colors.primary === preset.primary
                      ? "border-gray-400 bg-gray-50"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }} />
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.secondary }} />
                  </div>
                  <p className="text-xs font-medium text-gray-900">{preset.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={data.colors.primary}
                  onChange={(e) => handleColorChange("primary", e.target.value)}
                  className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={data.colors.primary}
                  onChange={(e) => handleColorChange("primary", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                  placeholder="#ff532a"
                />
              </div>
              {errors?.["colors.primary"] && <p className="text-red-500 text-sm mt-1">{errors["colors.primary"]}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={data.colors.secondary}
                  onChange={(e) => handleColorChange("secondary", e.target.value)}
                  className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={data.colors.secondary}
                  onChange={(e) => handleColorChange("secondary", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                  placeholder="#f97316"
                />
              </div>
              {errors?.["colors.secondary"] && (
                <p className="text-red-500 text-sm mt-1">{errors["colors.secondary"]}</p>
              )}
            </div>
          </div>

          {/* Font Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Typography</label>
            <div className="space-y-2">
              {fonts.map((font) => (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => handleFontChange(font.id)}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 text-left transition-all duration-200",
                    data.font === font.id ? "border-[#ff532a] bg-orange-50" : "border-gray-200 hover:border-gray-300",
                  )}
                  style={{ fontFamily: font.id }}
                >
                  <div className="font-semibold text-gray-900 mb-1">{font.name}</div>
                  <div className="text-sm text-gray-600">{font.preview}</div>
                </button>
              ))}
            </div>
            {errors?.font && <p className="text-red-500 text-sm mt-1">{errors.font}</p>}
          </div>

          {/* Layout Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Layout Style</label>
            <div className="space-y-2">
              {layouts.map((layout) => (
                <button
                  key={layout.id}
                  type="button"
                  onClick={() => handleLayoutChange(layout.id)}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 text-left transition-all duration-200",
                    data.layout === layout.id
                      ? "border-[#ff532a] bg-orange-50"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <div className="font-semibold text-gray-900 mb-1">{layout.name}</div>
                  <div className="text-sm text-gray-600">{layout.description}</div>
                </button>
              ))}
            </div>
            {errors?.layout && <p className="text-red-500 text-sm mt-1">{errors.layout}</p>}
          </div>

          {/* Banner Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Hero Banner (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#ff532a] transition-colors">
              {bannerPreview ? (
                <div className="space-y-4">
                  <img
                    src={bannerPreview || "/placeholder.svg"}
                    alt="Banner preview"
                    className="max-h-32 mx-auto rounded"
                  />
                  <p className="text-sm text-gray-600">Banner uploaded successfully</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-gray-400">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m14 0l-3.172-3.172a4 4 0 00-5.656 0L20 16m-6 6l2 2m0 0l2 2m-2-2l-2-2m2 2l2 2m6-6l2-2m0 0l2-2m-2 2l-2 2m2-2l2-2"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Upload a hero banner image</p>
                  <p className="text-xs text-gray-500">Recommended: 1200x400px</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-gray-100 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Header */}
            <div className="h-16 flex items-center px-6" style={{ backgroundColor: data.colors.primary }}>
              {logoPreview ? (
                <img src={logoPreview || "/placeholder.svg"} alt="Logo" className="h-8" />
              ) : (
                <div className="text-white font-bold text-lg" style={{ fontFamily: data.font }}>
                  Your Store
                </div>
              )}
            </div>

            {/* Banner */}
            {bannerPreview && (
              <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${bannerPreview})` }} />
            )}

            {/* Content */}
            <div className="p-6" style={{ fontFamily: data.font }}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Welcome to Your Store</h2>

              {/* Product Grid Preview */}
              <div
                className={cn(
                  "grid gap-4",
                  data.layout === "grid-2" && "grid-cols-2",
                  data.layout === "grid-3" && "grid-cols-3",
                  data.layout === "grid-4" && "grid-cols-4",
                  (data.layout === "sidebar-left" || data.layout === "sidebar-right") && "grid-cols-2",
                  data.layout === "none" && "grid-cols-3",
                )}
              >
                {[1, 2, 3, 4, 5, 6].slice(0, data.layout === "grid-2" ? 4 : 6).map((i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-3">
                    <div className="h-20 bg-gray-200 rounded mb-2" />
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Product {i}</h4>
                    <p className="font-semibold text-sm" style={{ color: data.colors.primary }}>
                      $29.99
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>© 2024 Your Store</span>
                  <div className="flex space-x-4">
                    <span>About</span>
                    <span>Contact</span>
                    <span>Privacy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
