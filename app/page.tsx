"use client"

import { useState, useEffect } from "react"
import {
  ShoppingCartIcon,
  PaintBrushIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  PlayIcon,
  CheckIcon,
  StarIcon,
  GlobeAltIcon,
  SparklesIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import Image from "next/image"
import { useI18n } from "@/lib/i18n"
import { LanguageToggle } from "@/components/language-toggle"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { VendoraLogo } from "@/components/ui/vendora-logo"

export default function LandingPage() {
  const { t } = useI18n()
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: ShoppingCartIcon,
      title: t("features.easy_setup"),
      description: t("features.easy_setup_desc"),
      color: "bg-green-100 text-green-600",
    },
    {
      icon: PaintBrushIcon,
      title: t("features.customizable"),
      description: t("features.customizable_desc"),
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: ChartBarIcon,
      title: t("features.analytics"),
      description: t("features.analytics_desc"),
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: t("features.support"),
      description: t("features.support_desc"),
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: RocketLaunchIcon,
      title: "Fast Launch",
      description: "Launch your store with one click.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: GlobeAltIcon,
      title: "Multi-Language",
      description: "Support for Macedonian and English.",
      color: "bg-indigo-100 text-indigo-600",
    },
  ]

  const showcaseStores = [
    {
      name: "Demo Bakery",
      url: "/store/demo-bakery",
      image: "/placeholder.svg?height=300&width=400",
      description: "Fresh baked goods made daily",
      category: "Food & Beverage",
    },
    {
      name: "Fashion Boutique",
      url: "/store/fashion-boutique",
      image: "/placeholder.svg?height=300&width=400",
      description: "Trendy fashion for modern women",
      category: "Fashion",
    },
    {
      name: "Tech Store",
      url: "/store/tech-store",
      image: "/placeholder.svg?height=300&width=400",
      description: "Latest technology and gadgets",
      category: "Electronics",
    },
    {
      name: "Home & Garden",
      url: "/store/home-garden",
      image: "/placeholder.svg?height=300&width=400",
      description: "Everything for your home and garden",
      category: "Home & Garden",
    },
  ]

  const testimonials = [
    {
      name: "Marko Petrovski",
      business: "Demo Bakery",
      content: "Vendora helped me launch my online bakery in just 2 hours. Sales increased by 300%!",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Ana Stojanovic",
      business: "Fashion Boutique",
      content: "The customization options are amazing. My store looks exactly how I envisioned it.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Stefan Nikolov",
      business: "Tech Store",
      content: "Customer support is excellent. They helped me every step of the way.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      features: ["1 Store", "Up to 10 Products", "Basic Templates", "Email Support"],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Premium",
      price: "999",
      period: "month",
      features: [
        "Unlimited Stores",
        "Unlimited Products",
        "Premium Templates",
        "Priority Support",
        "Analytics Dashboard",
        "Custom Domain",
      ],
      cta: "Start Premium",
      popular: true,
    },
  ]

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <VendoraLogo size="md" />
              <nav className="hidden md:flex space-x-8 items-center">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t("nav.features")}
                </a>
                <a href="#showcase" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t("nav.showcase")}
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t("nav.pricing")}
                </a>
                <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t("nav.login")}
                </Link>
                <LanguageToggle />
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-96 h-96 bg-gradient-to-br from-[#ff532a] to-blue-600 rounded-full opacity-10 animate-pulse-slow" />
            <div
              className="absolute -bottom-10 -left-10 w-96 h-96 bg-gradient-to-br from-purple-600 to-[#ff532a] rounded-full opacity-10 animate-pulse-slow"
              style={{ animationDelay: "2s" }}
            />
          </div>

          <div className="max-w-6xl mx-auto relative">
            <div className="text-center mb-16">
              <div
                className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-[#ff532a] rounded-full text-sm font-medium mb-6">
                  <SparklesIcon className="h-4 w-4 mr-2" />
                  Trusted by 500+ businesses in Macedonia
                </div>

                <h1 className="text-4xl md:text-6xl font-bold font-poppins text-gray-900 mb-6 leading-tight">
                  <span className="block">{t("hero.title").split(" ").slice(0, 4).join(" ")}</span>
                  <span className="block gradient-text">{t("hero.title").split(" ").slice(4).join(" ")}</span>
                </h1>

                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">{t("hero.subtitle")}</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Link
                    href="/onboarding"
                    className="group inline-flex items-center px-8 py-4 bg-[#ff532a] text-white font-semibold rounded-lg hover:bg-[#e6472a] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {t("hero.cta")}
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button className="group inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                    <PlayIcon className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Watch Demo (2 min)
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-1" />
                    No Credit Card Required
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-1" />
                    Setup in 5 Minutes
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-1" />
                    24/7 Support
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-3xl font-bold text-[#ff532a] mb-2 group-hover:scale-110 transition-transform">
                  500+
                </div>
                <div className="text-gray-600">Active Stores</div>
                <div className="text-xs text-gray-500 mt-1">Growing daily</div>
              </div>
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                  50K+
                </div>
                <div className="text-gray-600">Products Sold</div>
                <div className="text-xs text-gray-500 mt-1">This month</div>
              </div>
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">
                  99%
                </div>
                <div className="text-gray-600">Customer Satisfaction</div>
                <div className="text-xs text-gray-500 mt-1">Based on reviews</div>
              </div>
            </div>

            {/* Preview Video/Image */}
            <div className="relative max-w-4xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-2xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#ff532a]/10 to-blue-600/10 flex items-center justify-center">
                  <button className="group flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                    <PlayIcon className="h-8 w-8 text-[#ff532a] ml-1 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-3 animate-bounce-slow">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Store Online
                </div>
              </div>

              <div
                className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 animate-bounce-slow"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center text-sm">
                  <CurrencyDollarIcon className="h-4 w-4 text-green-500 mr-1" />
                  Sales Growing
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-4">{t("features.title")}</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("features.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-gray-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold font-poppins text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section id="showcase" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-4">{t("nav.showcase")}</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore example stores created with our platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {showcaseStores.map((store, index) => (
                <Link
                  key={index}
                  href={store.url}
                  className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={store.image || "/placeholder.svg"}
                      alt={store.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
                        {store.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold font-poppins text-gray-900 mb-2">{store.name}</h3>
                    <p className="text-gray-600 mb-3">{store.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#ff532a] font-medium">vendora.mk{store.url}</span>
                      <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-[#ff532a] group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-4">What Our Customers Say</h2>
              <p className="text-xl text-gray-600">Join hundreds of successful businesses</p>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl p-8 text-center">
                <div className="flex justify-center mb-4">
                  <Image
                    src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 mb-6 italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[currentTestimonial].business}</div>
                </div>
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? "bg-[#ff532a]" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-4">{t("nav.pricing")}</h2>
              <p className="text-xl text-gray-600">Choose the perfect plan for your business</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                    plan.popular ? "ring-2 ring-[#ff532a] transform scale-105" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#ff532a] text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-2">MKD/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-[#ff532a] mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/onboarding"
                    className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                      plan.popular
                        ? "bg-[#ff532a] text-white hover:bg-[#e6472a] transform hover:scale-105"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-600 mb-8">Get the latest updates and tips for your online store</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff532a] focus:border-transparent"
              />
              <button className="px-6 py-3 bg-[#ff532a] text-white rounded-lg font-semibold hover:bg-[#e6472a] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#ff532a] to-blue-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Launch Your Store?</h2>
            <p className="text-xl text-orange-100 mb-8">Join hundreds of local businesses already using Vendora</p>
            <Link
              href="/onboarding"
              className="inline-flex items-center px-8 py-4 bg-white text-[#ff532a] font-semibold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get Started Now
              <RocketLaunchIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-6">
                  <VendoraLogo size="md" />
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  Empowering Local Businesses in Macedonia with professional online stores.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Facebook
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Cookies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      GDPR
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Vendora. All rights reserved. Made with ❤️ in Macedonia.</p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  )
}
