"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "mk"

interface Translations {
  [key: string]: {
    en: string
    mk: string
  }
}

const translations: Translations = {
  // Navigation
  "nav.home": {
    en: "Home",
    mk: "Дома",
  },
  "nav.features": {
    en: "Features",
    mk: "Функции",
  },
  "nav.pricing": {
    en: "Pricing",
    mk: "Цени",
  },
  "nav.login": {
    en: "Login",
    mk: "Најава",
  },
  "nav.register": {
    en: "Get Started",
    mk: "Започни",
  },
  "nav.dashboard": {
    en: "Dashboard",
    mk: "Контролна табла",
  },
  "nav.logout": {
    en: "Logout",
    mk: "Одјава",
  },

  // Hero Section
  "hero.title": {
    en: "Create Your Online Store in Minutes",
    mk: "Создајте ја вашата онлајн продавница за минути",
  },
  "hero.subtitle": {
    en: "Build a professional e-commerce website for your Macedonian business with our easy-to-use platform. Start your free trial today!",
    mk: "Изградете професионална е-трговска веб-страница за вашиот македонски бизнис со нашата лесна за користење платформа. Започнете го вашиот бесплатен пробен период денес!",
  },
  "hero.cta": {
    en: "Start Free Trial",
    mk: "Започни бесплатен пробен период",
  },
  "hero.demo": {
    en: "View Demo",
    mk: "Погледни демо",
  },

  // Features
  "features.title": {
    en: "Everything You Need to Succeed Online",
    mk: "Сè што ви треба за успех онлајн",
  },
  "features.easy_setup": {
    en: "Easy Setup",
    mk: "Лесно поставување",
  },
  "features.easy_setup_desc": {
    en: "Get your store online in minutes with our intuitive setup wizard",
    mk: "Поставете ја вашата продавница онлајн за минути со нашиот интуитивен волшебник за поставување",
  },
  "features.mobile_ready": {
    en: "Mobile Ready",
    mk: "Подготвено за мобилни",
  },
  "features.mobile_ready_desc": {
    en: "Your store will look perfect on all devices automatically",
    mk: "Вашата продавница ќе изгледа совршено на сите уреди автоматски",
  },
  "features.secure_payments": {
    en: "Secure Payments",
    mk: "Безбедни плаќања",
  },
  "features.secure_payments_desc": {
    en: "Accept payments safely with built-in security features",
    mk: "Прифаќајте плаќања безбедно со вградени безбедносни функции",
  },

  // Dashboard
  "dashboard.overview": {
    en: "Overview",
    mk: "Преглед",
  },
  "dashboard.products": {
    en: "Products",
    mk: "Производи",
  },
  "dashboard.orders": {
    en: "Orders",
    mk: "Нарачки",
  },
  "dashboard.analytics": {
    en: "Analytics",
    mk: "Аналитика",
  },
  "dashboard.settings": {
    en: "Settings",
    mk: "Поставки",
  },

  // Common
  "common.loading": {
    en: "Loading...",
    mk: "Се вчитува...",
  },
  "common.save": {
    en: "Save",
    mk: "Зачувај",
  },
  "common.cancel": {
    en: "Cancel",
    mk: "Откажи",
  },
  "common.delete": {
    en: "Delete",
    mk: "Избриши",
  },
  "common.edit": {
    en: "Edit",
    mk: "Уреди",
  },
  "common.add": {
    en: "Add",
    mk: "Додај",
  },
  "common.search": {
    en: "Search",
    mk: "Пребарај",
  },
  "common.email": {
    en: "Email",
    mk: "Е-пошта",
  },
  "common.password": {
    en: "Password",
    mk: "Лозинка",
  },
  "common.name": {
    en: "Name",
    mk: "Име",
  },
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("vendora-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "mk")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("vendora-language", lang)
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.en || key
  }

  return <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
