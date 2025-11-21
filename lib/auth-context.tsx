"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import localStorageManager from "./local-storage-manager"

export interface AuthUser {
  id: number
  name: string
  email: string
  role: "client" | "freelancer"
}

interface AuthContextType {
  user: AuthUser | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, name: string, role: "client" | "freelancer") => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const storedUser = localStorageManager.loadUser()
    if (storedUser) {
      setUser(storedUser)
      setIsLoggedIn(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      // Demo credentials check
      if (email === "client@demo.com" && password === "demo123") {
        const clientUser: AuthUser = {
          id: 1,
          name: "Demo Client",
          email: "client@demo.com",
          role: "client",
        }
        setUser(clientUser)
        setIsLoggedIn(true)
        localStorageManager.saveUser(clientUser)
        resolve()
      } else if (email === "freelancer@demo.com" && password === "demo123") {
        const freelancerUser: AuthUser = {
          id: 2,
          name: "Demo Freelancer",
          email: "freelancer@demo.com",
          role: "freelancer",
        }
        setUser(freelancerUser)
        setIsLoggedIn(true)
        localStorageManager.saveUser(freelancerUser)
        resolve()
      } else {
        reject(new Error("Invalid credentials"))
      }
    })
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorageManager.clearAllData()
  }

  const register = async (email: string, name: string, role: "client" | "freelancer") => {
    const newUser: AuthUser = {
      id: Date.now(),
      name,
      email,
      role,
    }
    setUser(newUser)
    setIsLoggedIn(true)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  return <AuthContext.Provider value={{ user, isLoggedIn, login, logout, register }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
