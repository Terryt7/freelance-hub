"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CheckoutModal from "@/components/checkout-modal"
import { DEMO_SERVICES } from "@/lib/demo-data"
import { useAuth } from "@/lib/auth-context"
import { Card } from "@/components/ui/card"

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const { isLoggedIn, user } = useAuth()
  const serviceId = Number.parseInt(params.id as string)
  const service = DEMO_SERVICES.find((s) => s.id === serviceId)
  const [showCheckout, setShowCheckout] = useState(true)

  useEffect(() => {
    // Check if the user is logged in
    if (!isLoggedIn) {
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Card className="p-8 text-center bg-card">
            <p className="text-foreground/60 mb-4">Please sign in to proceed with checkout</p>
            <Link href="/login" className="text-primary hover:text-primary/80">
              Go to Login
            </Link>
          </Card>
        </div>
        <Footer />
      </main>
    )
  }

  if (!service) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Card className="p-8 text-center bg-card">
            <p className="text-foreground/60">Service not found</p>
          </Card>
        </div>
        <Footer />
      </main>
    )
  }

  const handleCheckoutSuccess = () => {
    setShowCheckout(false)
    setTimeout(() => {
      router.push("/client-dashboard")
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => router.back()}
        onSuccess={handleCheckoutSuccess}
        serviceTitle={service.title}
        price={service.price}
        sellerName={service.seller}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href={`/service/${service.id}`} className="text-primary hover:text-primary/80 mb-6 inline-block">
          ← Back to Service
        </Link>
      </div>

      <Footer />
    </main>
  )
}
