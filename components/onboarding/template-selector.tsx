"use client"

import type React from "react"
import { useState } from "react"
import { BuildingStorefrontIcon, SparklesIcon, EyeIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { cn } from "@/lib/utils"

interface Template {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  preview: string
  features: string[]
  recommended?: boolean
}

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelect: (templateId: string) => void
  error?: string
}

const templates: Template[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design that lets your products shine",
    icon: BuildingStorefrontIcon,
    preview: "/templates/minimal-preview.jpg",
    features: ["Clean layout", "Fast loading", "Mobile optimized", "Easy to navigate"],
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with smooth animations",
    icon: SparklesIcon,
    preview: "/templates/modern-preview.jpg",
    features: ["Animated elements", "Modern typography", "Gradient effects", "Interactive design"],
    recommended: true,
  },
  {
    id: "colorful",
    name: "Colorful",
    description: "Vibrant and eye-catching design for creative businesses",
    icon: BuildingStorefrontIcon,
    preview: "/templates/colorful-preview.jpg",
    features: ["Bold colors", "Creative layouts", "Visual emphasis", "Brand focused"],
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated design for premium brands",
    icon: BuildingStorefrontIcon,
    preview: "/templates/elegant-preview.jpg",
    features: ["Luxury feel", "Premium styling", "Refined layouts", "Professional"],
  },
  {
    id: "bold",
    name: "Bold",
    description: "Strong and impactful design that makes a statement",
    icon: BuildingStorefrontIcon,
    preview: "/templates/bold-preview.jpg",
    features: ["Strong typography", "High contrast", "Impact focused", "Memorable design"],
  },
  {
    id: "classic",
    name: "Classic",
    description: "Timeless design that never goes out of style",
    icon: BuildingStorefrontIcon,
    preview: "/templates/classic-preview.jpg",
    features: ["Timeless appeal", "Traditional layout", "Reliable design", "Universal appeal"],
  },
]

export function TemplateSelector({ selectedTemplate, onSelect, error }: TemplateSelectorProps) {
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <BuildingStorefrontIcon className="h-16 w-16 text-[#ff532a] mx-auto mb-6" />
        <h2 className="text-2xl font-bold font-poppins text-gray-900 mb-4">Choose Your Template</h2>
        <p className="text-gray-600 mb-8">Select a design that matches your business style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="relative group">
            <button
              type="button"
              onClick={() => onSelect(template.id)}
              className={cn(
                "w-full p-6 rounded-xl border-2 transition-all duration-300 text-left",
                "hover:shadow-lg hover:scale-105",
                selectedTemplate === template.id
                  ? "border-[#ff532a] bg-orange-50 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 bg-white",
              )}
            >
              {template.recommended && (
                <div className="absolute -top-3 left-4">
                  <span className="bg-[#ff532a] text-white px-3 py-1 rounded-full text-xs font-medium">
                    Recommended
                  </span>
                </div>
              )}

              <template.icon className="h-12 w-12 mx-auto mb-4 text-gray-600" />
              <h3 className="font-semibold text-gray-900 mb-2 text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-4 text-center">{template.description}</p>

              <ul className="space-y-1 mb-4">
                {template.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="text-xs text-gray-500 flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#ff532a] rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPreviewTemplate(template)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <EyeIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* Preview Modal */}
      <Modal
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        title={`${previewTemplate?.name} Template Preview`}
        size="lg"
      >
        {previewTemplate && (
          <div className="space-y-6">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <previewTemplate.icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Template preview will be shown here</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{previewTemplate.name}</h3>
              <p className="text-gray-600 mb-4">{previewTemplate.description}</p>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {previewTemplate.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-[#ff532a] rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  onSelect(previewTemplate.id)
                  setPreviewTemplate(null)
                }}
                className="flex-1"
              >
                Select This Template
              </Button>
              <Button variant="outline" onClick={() => setPreviewTemplate(null)} className="flex-1">
                Continue Browsing
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
