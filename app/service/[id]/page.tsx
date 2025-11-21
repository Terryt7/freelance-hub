"use client"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DEMO_SERVICES, DEMO_FREELANCERS } from "@/lib/demo-data"

export default function ServiceDetailPage() {
  const params = useParams()
  const serviceId = Number.parseInt(params.id as string)
  const service = DEMO_SERVICES.find((s) => s.id === serviceId)
  const freelancer = service ? DEMO_FREELANCERS.find((f) => f.id === service.sellerId) : null

  if (!service || !freelancer) {
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

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/marketplace" className="text-primary hover:text-primary/80 mb-6 inline-block">
          ← Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="w-full h-96 rounded-lg overflow-hidden bg-secondary mb-6">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-4xl font-bold mb-4">{service.title}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="font-semibold">{service.rating}</span>
                  <span className="text-foreground/60">({service.reviews} reviews)</span>
                </div>
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">{service.category}</span>
              </div>

              <div className="prose prose-invert max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4">About This Service</h2>
                <p className="text-foreground/80 leading-relaxed">{service.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-secondary rounded-lg">
                <div>
                  <p className="text-foreground/60 text-sm mb-2">Delivery Time</p>
                  <p className="font-semibold">{service.deliveryTime} days</p>
                </div>
                <div>
                  <p className="text-foreground/60 text-sm mb-2">Revisions</p>
                  <p className="font-semibold">Up to {service.revisions}</p>
                </div>
                <div>
                  <p className="text-foreground/60 text-sm mb-2">Price</p>
                  <p className="font-semibold text-primary text-lg">${service.price}</p>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-4">About the Seller</h2>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 bg-card border-primary/20 p-6 glow-border mb-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{freelancer.avatar}</div>
                <h3 className="text-xl font-semibold mb-2">{freelancer.name}</h3>
                {freelancer.verified && (
                  <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm mb-2">
                    ✓ Verified Seller
                  </div>
                )}
                <p className="text-foreground/70 text-sm">{freelancer.bio}</p>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Response Time:</span>
                  <span className="font-semibold">~2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Completion Rate:</span>
                  <span className="font-semibold">98%</span>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 mb-3 py-6" asChild>
                <Link href={`/checkout/${service.id}`}>Order Now</Link>
              </Button>

              <Button variant="outline" className="w-full border-primary/30 py-6 bg-transparent" asChild>
                <Link href={`/messages/freelancer-${service.sellerId}`}>Contact Seller</Link>
              </Button>
            </Card>

            <Card className="bg-secondary/50 border-border p-4">
              <h4 className="font-semibold mb-3">Service Package Includes:</h4>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>✓ Professional work</li>
                <li>✓ Unlimited communication</li>
                <li>✓ {service.revisions} revisions</li>
                <li>✓ {service.deliveryTime}-day delivery</li>
                <li>✓ 100% Satisfaction guarantee</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
