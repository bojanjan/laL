"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface VendoraLogoProps {
  className?: string
  width?: number
  height?: number
}

export function VendoraLogo({ className, width = 120, height = 32 }: VendoraLogoProps) {
  return (
    <Image
      src="/vendora-logo.png"
      alt="Vendora"
      width={width}
      height={height}
      className={cn("object-contain", className)}
      priority
    />
  )
}
