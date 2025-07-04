"use client"

import type React from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { cn } from "@/lib/utils"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: "sm" | "md" | "lg" | "xl"
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, size = "md", children }: ModalProps) {
  if (!isOpen) return null

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

        {/* Modal */}
        <div className={cn("relative bg-white rounded-lg shadow-xl w-full", sizeClasses[size])}>
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          )}

          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
