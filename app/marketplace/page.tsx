"use client"

import { useState, useMemo } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { DEMO_SERVICES } from "@/lib/demo-data"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("rating")

  const categories = ["All", "Programming", "Graphics", "Digital Marketing", "Writing", "Video Editing"]

  const filteredServices = useMemo(() => {
    let result = DEMO_SERVICES

    if (selectedCategory !== "All") {
      result = result.filter((s) => s.category === selectedCategory)
    }

    if (searchQuery) {
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.seller.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    return result
  }, [searchQuery, selectedCategory, sortBy])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Marketplace</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        selectedCategory === cat
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary text-foreground/80"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground"
                >
                  <option value="rating">Highest Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 bg-secondary border-primary/30 glow-border"
              />
            </div>

            <p className="text-foreground/70 mb-6">{filteredServices.length} services found</p>

            <div className="space-y-4">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <Link key={service.id} href={`/service/${service.id}`}>
                    <Card className="bg-card border-primary/20 hover:border-primary/50 overflow-hidden cursor-pointer transition-all hover:shadow-xl p-4 glow-border">
                      <div className="flex gap-4">
                        <div className="w-32 h-24 rounded overflow-hidden flex-shrink-0 bg-secondary">
                          <img
                            src={service.image || "/placeholder.svg"}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <p className="text-xs text-foreground/60 mb-1">{service.category}</p>
                            <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                            <div className="flex items-center gap-3 text-sm text-foreground/70">
                              <span>By {service.seller}</span>
                              <span className="text-yellow-500">★ {service.rating}</span>
                              <span>({service.reviews} reviews)</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-primary font-semibold text-lg">${service.price}</p>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))
              ) : (
                <Card className="p-8 text-center bg-card border-primary/20">
                  <p className="text-foreground/60">No services found. Try adjusting your filters.</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
