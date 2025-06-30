"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

export function LanguageToggle() {
  const { language, setLanguage } = useI18n()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "mk" : "en")
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center gap-2">
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">{language === "en" ? "MK" : "EN"}</span>
    </Button>
  )
}
