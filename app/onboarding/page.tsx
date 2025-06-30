"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "react-hot-toast"
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { VendoraLogo } from "@/components/ui/vendora-logo"
import { TemplateSelector } from "@/components/onboarding/template-selector"
import { StoreCustomizer } from "@/components/onboarding/store-customizer"
import { Alert } from "@/components/ui/alert"

// Form validation schemas
const storeInfoSchema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters"),
  storeDescription: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  currency: z.string().min(1, "Please select a currency"),
})

const businessInfoSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  ownerName: z.string().min(2, "Owner name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(4, "Postal code is required"),
})

const paymentSchema = z.object({
  paymentMethods: z.array(z.string()).min(1, "Select at least one payment method"),
  bankAccount: z.string().optional(),
  taxNumber: z.string().optional(),
})

type StoreInfoData = z.infer<typeof storeInfoSchema>
type BusinessInfoData = z.infer<typeof businessInfoSchema>
type PaymentData = z.infer<typeof paymentSchema>

interface OnboardingData {
  storeInfo: StoreInfoData
  businessInfo: BusinessInfoData
  template: string
  customization: {
    logo?: File
    colors: { primary: string; secondary: string }
    font: string
    layout: string
    banner?: File
  }
  payment: PaymentData
}

const steps = [
  { id: 1, name: "Store Information", description: "Basic store details" },
  { id: 2, name: "Business Information", description: "Your business details" },
  { id: 3, name: "Choose Template", description: "Select your store design" },
  { id: 4, name: "Customize Design", description: "Make it uniquely yours" },
  { id: 5, name: "Payment Setup", description: "Configure payment methods" },
  { id: 6, name: "Review & Launch", description: "Final review and launch" },
]

const categories = [
  "Fashion & Clothing",
  "Electronics & Tech",
  "Home & Garden",
  "Health & Beauty",
  "Sports & Outdoors",
  "Books & Media",
  "Food & Beverages",
  "Jewelry & Accessories",
  "Art & Crafts",
  "Other",
]

const currencies = [
  { code: "MKD", name: "Macedonian Denar (MKD)", symbol: "ден" },
  { code: "EUR", name: "Euro (EUR)", symbol: "€" },
  { code: "USD", name: "US Dollar (USD)", symbol: "$" },
]

const paymentMethods = [
  { id: "card", name: "Credit/Debit Cards", description: "Visa, Mastercard, etc." },
  { id: "paypal", name: "PayPal", description: "PayPal payments" },
  { id: "bank", name: "Bank Transfer", description: "Direct bank transfers" },
  { id: "cash", name: "Cash on Delivery", description: "Pay when delivered" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({
    customization: {
      colors: { primary: "#ff532a", secondary: "#f97316" },
      font: "Inter",
      layout: "grid-3",
    },
  })

  // Form hooks for each step
  const storeInfoForm = useForm<StoreInfoData>({
    resolver: zodResolver(storeInfoSchema),
    defaultValues: {
      storeName: "",
      storeDescription: "",
      category: "",
      currency: "MKD",
    },
  })

  const businessInfoForm = useForm<BusinessInfoData>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      businessName: "",
      ownerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },
  })

  const paymentForm = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethods: [],
      bankAccount: "",
      taxNumber: "",
    },
  })

  const nextStep = () => {
    setSubmitError(null)
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    setSubmitError(null)
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStoreInfoSubmit = (data: StoreInfoData) => {
    setOnboardingData((prev) => ({ ...prev, storeInfo: data }))
    nextStep()
  }

  const handleBusinessInfoSubmit = (data: BusinessInfoData) => {
    setOnboardingData((prev) => ({ ...prev, businessInfo: data }))
    nextStep()
  }

  const handleTemplateSelect = (templateId: string) => {
    setOnboardingData((prev) => ({ ...prev, template: templateId }))
    nextStep()
  }

  const handleCustomizationChange = (customization: OnboardingData["customization"]) => {
    setOnboardingData((prev) => ({ ...prev, customization }))
  }

  const handlePaymentSubmit = (data: PaymentData) => {
    setOnboardingData((prev) => ({ ...prev, payment: data }))
    nextStep()
  }

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)

      // Validate all data is present
      if (
        !onboardingData.storeInfo ||
        !onboardingData.businessInfo ||
        !onboardingData.template ||
        !onboardingData.payment
      ) {
        throw new Error("Missing required information. Please complete all steps.")
      }

      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random errors for demonstration
          if (Math.random() > 0.8) {
            reject(new Error("Failed to create store. Please try again."))
          } else {
            resolve(true)
          }
        }, 2000)
      })

      toast.success("🎉 Your store has been created successfully!")

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      setSubmitError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <form onSubmit={storeInfoForm.handleSubmit(handleStoreInfoSubmit)} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-poppins text-gray-900 mb-4">Tell us about your store</h2>
              <p className="text-gray-600">Let's start with the basics of your online store</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Name *</label>
                <input
                  {...storeInfoForm.register("storeName")}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                  placeholder="e.g., Fashion Boutique"
                />
                {storeInfoForm.formState.errors.storeName && (
                  <p className="text-red-500 text-sm mt-1">{storeInfoForm.formState.errors.storeName.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Description *</label>
                <textarea
                  {...storeInfoForm.register("storeDescription")}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                  placeholder="Describe what your store sells and what makes it special..."
                />
                {storeInfoForm.formState.errors.storeDescription && (
                  <p className="text-red-500 text-sm mt-1">{storeInfoForm.formState.errors.storeDescription.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  {...storeInfoForm.register("category")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {storeInfoForm.formState.errors.category && (
                  <p className="text-red-500 text-sm mt-1">{storeInfoForm.formState.errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency *</label>
                <select
                  {...storeInfoForm.register("currency")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.name}
                    </option>
                  ))}
                </select>
                {storeInfoForm.formState.errors.currency && (
                  <p className="text-red-500 text-sm mt-1">{storeInfoForm.formState.errors.currency.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-[#ff532a] text-white rounded-lg font-medium hover:bg-[#e6472a] transform hover:scale-105 transition-all duration-200"
              >
                Continue
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </button>
            </div>
          </form>
        )

      case 2:
        return (
          <form onSubmit={businessInfoForm.handleSubmit(handleBusinessInfoSubmit)} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-poppins text-gray-900 mb-4">Business Information</h2>
              <p className="text-gray-600">We need some details about your business for legal compliance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                <input
                  {...businessInfoForm.register("businessName")}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                  placeholder="Your registered business name"
                />
                {businessInfoForm.formState.errors.businessName && (
                  <p className="text-red-500 text-sm mt-1">{businessInfoForm.formState.errors.businessName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name *</label>
                <input
                  {...businessInfoForm.register("ownerName")}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                  placeholder="Your full name"
                />
                {businessInfoForm.formState.errors.ownerName && (
                  <p className="text-red-500 text-sm mt-1">{businessInfoForm.formState.errors.ownerName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  {...businessInfoForm.register("email")}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                  placeholder="your@email.com"
                />
                {businessInfoForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{businessInfoForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  {...businessInfoForm.register("phone")}
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                  placeholder="+389 XX XXX XXX"
                />
                {businessInfoForm.formState.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{businessInfoForm.formState.errors.phone.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <input
                  {...businessInfoForm.register("address")}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                  placeholder="Street address"
                />
                {businessInfoForm.formState.errors.address && (
                  <p className="text-red-500 text-sm mt-1">{businessInfoForm.formState.errors.address.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  {...businessInfoForm.register("city")}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                  placeholder="Skopje"
                />
                {businessInfoForm.formState.errors.city && (
                  <p className="text-red-500 text-sm mt-1">{businessInfoForm.formState.errors.city.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code *</label>
                <input
                  {...businessInfoForm.register("postalCode")}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                  placeholder="1000"
                />
                {businessInfoForm.formState.errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{businessInfoForm.formState.errors.postalCode.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back
              </button>
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-[#ff532a] text-white rounded-lg font-medium hover:bg-[#e6472a] transform hover:scale-105 transition-all duration-200"
              >
                Continue
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </button>
            </div>
          </form>
        )

      case 3:
        return (
          <div className="space-y-6">
            <TemplateSelector selectedTemplate={onboardingData.template || ""} onSelect={handleTemplateSelect} />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <StoreCustomizer data={onboardingData.customization!} onChange={handleCustomizationChange} />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-[#ff532a] text-white rounded-lg font-medium hover:bg-[#e6472a] transform hover:scale-105 transition-all duration-200"
              >
                Continue
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        )

      case 5:
        return (
          <form onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-poppins text-gray-900 mb-4">Payment Methods</h2>
              <p className="text-gray-600">Choose how your customers can pay for their orders</p>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Payment Methods * (Choose at least one)
              </label>
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={method.id}
                    {...paymentForm.register("paymentMethods")}
                    className="mt-1 h-4 w-4 text-[#ff532a] focus:ring-[#ff532a] border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-500">{method.description}</div>
                  </div>
                </label>
              ))}
              {paymentForm.formState.errors.paymentMethods && (
                <p className="text-red-500 text-sm mt-1">{paymentForm.formState.errors.paymentMethods.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account (Optional)</label>
                <input
                  {...paymentForm.register("bankAccount")}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                  placeholder="For bank transfers"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tax Number (Optional)</label>
                <input
                  {...paymentForm.register("taxNumber")}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
                  placeholder="Your tax identification number"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back
              </button>
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-[#ff532a] text-white rounded-lg font-medium hover:bg-[#e6472a] transform hover:scale-105 transition-all duration-200"
              >
                Continue
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </button>
            </div>
          </form>
        )

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <CheckIcon className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold font-poppins text-gray-900 mb-4">Ready to Launch!</h2>
              <p className="text-gray-600 mb-8">Review your store details and launch your online business</p>
            </div>

            {/* Review Summary */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Store Information</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Name:</span> {onboardingData.storeInfo?.storeName}
                    </p>
                    <p>
                      <span className="text-gray-600">Category:</span> {onboardingData.storeInfo?.category}
                    </p>
                    <p>
                      <span className="text-gray-600">Currency:</span> {onboardingData.storeInfo?.currency}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Business Information</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Business:</span> {onboardingData.businessInfo?.businessName}
                    </p>
                    <p>
                      <span className="text-gray-600">Owner:</span> {onboardingData.businessInfo?.ownerName}
                    </p>
                    <p>
                      <span className="text-gray-600">Email:</span> {onboardingData.businessInfo?.email}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Design</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Template:</span> {onboardingData.template}
                    </p>
                    <p>
                      <span className="text-gray-600">Primary Color:</span>
                      <span
                        className="inline-block w-4 h-4 rounded ml-2 border"
                        style={{ backgroundColor: onboardingData.customization?.colors.primary }}
                      />
                    </p>
                    <p>
                      <span className="text-gray-600">Font:</span> {onboardingData.customization?.font}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Payment Methods</h3>
                  <div className="space-y-1 text-sm">
                    {onboardingData.payment?.paymentMethods.map((method) => (
                      <p key={method} className="text-gray-600">
                        • {paymentMethods.find((pm) => pm.id === method)?.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {submitError && (
              <Alert variant="destructive" className="mb-6">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <div>
                  <h4 className="font-medium">Error Creating Store</h4>
                  <p className="text-sm mt-1">{submitError}</p>
                </div>
                <button onClick={() => setSubmitError(null)} className="ml-auto p-1 hover:bg-red-100 rounded">
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </Alert>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="flex items-center px-8 py-3 bg-[#ff532a] text-white rounded-lg font-medium hover:bg-[#e6472a] transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Creating Store...
                  </>
                ) : (
                  <>
                    🚀 Launch My Store
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <VendoraLogo size="lg" className="justify-center mb-6" />
          <h1 className="text-3xl font-bold font-poppins text-gray-900 mb-2">Create Your Online Store</h1>
          <p className="text-gray-600">Follow these simple steps to launch your business online</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold text-sm ${
                    currentStep > step.id
                      ? "bg-green-500 border-green-500 text-white"
                      : currentStep === step.id
                        ? "bg-[#ff532a] border-[#ff532a] text-white"
                        : "bg-white border-gray-300 text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? <CheckIcon className="h-5 w-5" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-full h-1 mx-4 ${currentStep > step.id ? "bg-green-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            {steps.map((step) => (
              <div key={step.id} className="text-center max-w-24">
                <div className="font-medium">{step.name}</div>
                <div className="text-gray-500">{step.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">{renderStepContent()}</div>
        </div>
      </div>
    </div>
  )
}
