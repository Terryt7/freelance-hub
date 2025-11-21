"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    id: 1,
    title: "Build a Professional Website",
    seller: "Alex Chen",
    rating: 4.9,
    reviews: 324,
    price: 499,
    image: "/website-design-mockup.png",
    category: "Web Development",
  },
  {
    id: 2,
    title: "Logo Design - Modern & Minimal",
    seller: "Sarah Design Studio",
    rating: 4.8,
    reviews: 512,
    price: 149,
    image: "/colorful-abstract-logo.png",
    category: "Graphics",
  },
  {
    id: 3,
    title: "Social Media Marketing Strategy",
    seller: "Marketing Pros",
    rating: 4.7,
    reviews: 198,
    price: 299,
    image: "/social-media-dashboard.png",
    category: "Digital Marketing",
  },
  {
    id: 4,
    title: "Professional Video Editing",
    seller: "CreativeEdits",
    rating: 4.9,
    reviews: 287,
    price: 199,
    image: "/video-editing-software-interface.png",
    category: "Video Editing",
  },
]

export default function FeaturedServices() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Featured Services</h2>
        <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
          Discover top-rated services from our best freelancers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service.id} href={`/service/${service.id}`}>
              <Card className="bg-card border-primary/20 hover:border-primary/50 overflow-hidden cursor-pointer transition-all hover:shadow-xl group glow-border">
                <div className="relative overflow-hidden h-40 bg-secondary">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-4">
                  <p className="text-xs text-foreground/60 mb-2">{service.category}</p>
                  <h3 className="font-semibold text-sm mb-3 line-clamp-2">{service.title}</h3>

                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{service.rating}</span>
                    <span className="text-xs text-foreground/60">({service.reviews})</span>
                  </div>

                  <p className="text-xs text-foreground/70 mb-3">By {service.seller}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">${service.price}</span>
                    <Button size="sm" variant="outline" className="border-primary/30 text-xs bg-transparent">
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
