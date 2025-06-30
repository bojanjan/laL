"use client"

import type React from "react"

import { useState } from "react"
import { CogIcon, UserIcon, CreditCardIcon, BellIcon, ShieldCheckIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function SettingsTab() {
  const [activeSection, setActiveSection] = useState("general")
  const [formData, setFormData] = useState({
    // General Settings
    storeName: "",
    storeDescription: "",
    storeUrl: "",
    contactEmail: "",
    contactPhone: "",

    // Profile Settings
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Payment Settings
    paypalEmail: "",
    stripeKey: "",
    bankAccount: "",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    marketingEmails: false,
  })

  const sections = [
    { id: "general", name: "Општо", icon: CogIcon },
    { id: "profile", name: "Профил", icon: UserIcon },
    { id: "payments", name: "Плаќања", icon: CreditCardIcon },
    { id: "notifications", name: "Известувања", icon: BellIcon },
    { id: "security", name: "Безбедност", icon: ShieldCheckIcon },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Settings saved:", formData)
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Општи поставки</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Име на продавница *</label>
            <Input
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              placeholder="Мојата продавница"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL на продавница</label>
            <Input
              name="storeUrl"
              value={formData.storeUrl}
              onChange={handleInputChange}
              placeholder="mojata-prodavnica"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Опис на продавница</label>
          <textarea
            name="storeDescription"
            value={formData.storeDescription}
            onChange={handleInputChange}
            rows={4}
            placeholder="Опишете ја вашата продавница..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Контакт е-пошта *</label>
            <Input
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleInputChange}
              placeholder="contact@mojata-prodavnica.mk"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Контакт телефон</label>
            <Input
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              placeholder="+389 XX XXX XXX"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Профил поставки</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Име *</label>
            <Input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Вашето име" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Презиме *</label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Вашето презиме"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Е-пошта *</label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="vashata@email.mk"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
            <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+389 XX XXX XXX" />
          </div>
        </div>
      </div>
    </div>
  )

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Плаќања поставки</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PayPal е-пошта</label>
            <Input
              name="paypalEmail"
              type="email"
              value={formData.paypalEmail}
              onChange={handleInputChange}
              placeholder="paypal@email.com"
            />
            <p className="text-sm text-gray-500 mt-1">Е-поштата поврзана со вашиот PayPal акаунт</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stripe API клуч</label>
            <Input
              name="stripeKey"
              type="password"
              value={formData.stripeKey}
              onChange={handleInputChange}
              placeholder="sk_test_..."
            />
            <p className="text-sm text-gray-500 mt-1">Вашиот Stripe API клуч за обработка на картички</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Банкарска сметка</label>
            <Input
              name="bankAccount"
              value={formData.bankAccount}
              onChange={handleInputChange}
              placeholder="IBAN или број на сметка"
            />
            <p className="text-sm text-gray-500 mt-1">За директни банкарски трансфери</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Известувања поставки</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Е-пошта известувања</h4>
              <p className="text-sm text-gray-500">Примајте известувања на е-пошта</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.emailNotifications}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff532a]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900">SMS известувања</h4>
              <p className="text-sm text-gray-500">Примајте известувања преку SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={formData.smsNotifications}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff532a]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Известувања за нарачки</h4>
              <p className="text-sm text-gray-500">Известувања за нови нарачки</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="orderNotifications"
                checked={formData.orderNotifications}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff532a]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Маркетинг е-пошти</h4>
              <p className="text-sm text-gray-500">Промотивни и маркетинг содржини</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="marketingEmails"
                checked={formData.marketingEmails}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff532a]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Безбедност поставки</h3>
        <div className="space-y-6">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Промена на лозинка</h4>
            <p className="text-sm text-yellow-700 mb-4">Редовно менувајте ја вашата лозинка за подобра безбедност</p>
            <Button variant="outline" className="text-yellow-800 border-yellow-300 hover:bg-yellow-100 bg-transparent">
              Промени лозинка
            </Button>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Двофакторска автентификација</h4>
            <p className="text-sm text-blue-700 mb-4">Додајте дополнителен слој на безбедност на вашиот акаунт</p>
            <Button variant="outline" className="text-blue-800 border-blue-300 hover:bg-blue-100 bg-transparent">
              Овозможи 2FA
            </Button>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="text-sm font-medium text-red-800 mb-2">Избриши акаунт</h4>
            <p className="text-sm text-red-700 mb-4">Трајно избришете го вашиот акаунт и сите податоци</p>
            <Button variant="outline" className="text-red-800 border-red-300 hover:bg-red-100 bg-transparent">
              Избриши акаунт
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return renderGeneralSettings()
      case "profile":
        return renderProfileSettings()
      case "payments":
        return renderPaymentSettings()
      case "notifications":
        return renderNotificationSettings()
      case "security":
        return renderSecuritySettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Поставки</h2>
        <p className="text-gray-600">Управувајте со поставките на вашата продавница</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    activeSection === section.id ? "bg-[#ff532a] text-white" : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {section.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {renderContent()}

            {activeSection !== "security" && (
              <div className="flex justify-end pt-6 border-t border-gray-200 mt-8">
                <Button type="submit" className="bg-[#ff532a] hover:bg-[#e6472a] text-white">
                  Зачувај промени
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
