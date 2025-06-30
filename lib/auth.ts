"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  storeId?: string
  storeName?: string
  storeSlug?: string
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<boolean>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data for demo purposes
const mockUsers: User[] = [
  {
    id: "1",
    email: "demo@vendora.mk",
    name: "Demo User",
    role: "user",
    storeId: "store-1",
    storeName: "Demo Store",
    storeSlug: "demo-store",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "admin@vendora.mk",
    name: "Admin User",
    role: "admin",
    createdAt: new Date("2024-01-01"),
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem("auth-token")
    const userData = localStorage.getItem("user-data")

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user-data")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const foundUser = mockUsers.find((u) => u.email === email)

      if (!foundUser) {
        setLoading(false)
        return false
      }

      // In a real app, you'd verify the password hash
      if (password !== "password123") {
        setLoading(false)
        return false
      }

      setUser(foundUser)
      localStorage.setItem("auth-token", "mock-token")
      localStorage.setItem("user-data", JSON.stringify(foundUser))
      setLoading(false)
      return true
    } catch (error) {
      console.error("Login error:", error)
      setLoading(false)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      const existingUser = mockUsers.find((u) => u.email === email)
      if (existingUser) {
        setLoading(false)
        return false
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: "user",
        createdAt: new Date(),
      }

      mockUsers.push(newUser)
      setUser(newUser)
      localStorage.setItem("auth-token", "mock-token")
      localStorage.setItem("user-data", JSON.stringify(newUser))
      setLoading(false)
      return true
    } catch (error) {
      console.error("Registration error:", error)
      setLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user-data")
    window.location.href = "/"
  }

  return <AuthContext.Provider value={{ user, login, logout, register, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
