"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import Navbar from "@/components/navbar"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState<"client" | "freelancer">("client")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await register(email, name, role)
      router.push(role === "client" ? "/client-dashboard" : "/freelancer-dashboard")
    } catch (err) {
      setError((err as Error).message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <Card className="w-full max-w-md bg-card border-primary/20 p-8 glow-border">
          <h1 className="text-3xl font-bold mb-2 text-center">Get Started</h1>
          <p className="text-center text-foreground/60 mb-8">Create your HigherStream account</p>

          {error && (
            <div className="mb-4 p-4 bg-destructive/20 border border-destructive rounded text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-secondary border-primary/30 glow-border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary border-primary/30 glow-border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Account Type</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border border-primary/30 rounded cursor-pointer hover:bg-primary/10 transition">
                  <input
                    type="radio"
                    value="client"
                    checked={role === "client"}
                    onChange={(e) => setRole(e.target.value as "client" | "freelancer")}
                  />
                  <span>I'm looking to hire (Client)</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-primary/30 rounded cursor-pointer hover:bg-primary/10 transition">
                  <input
                    type="radio"
                    value="freelancer"
                    checked={role === "freelancer"}
                    onChange={(e) => setRole(e.target.value as "client" | "freelancer")}
                  />
                  <span>I'm looking to work (Freelancer)</span>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-foreground/60 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80">
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </main>
  )
}
