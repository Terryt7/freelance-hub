"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"

const categories = [
  { name: "Programming", icon: "💻", count: 2400 },
  { name: "Graphics", icon: "🎨", count: 1850 },
  { name: "Digital Marketing", icon: "📊", count: 1200 },
  { name: "Writing", icon: "✍️", count: 950 },
  { name: "Video Editing", icon: "🎬", count: 780 },
  { name: "Music & Audio", icon: "🎵", count: 620 },
  { name: "3D & Animation", icon: "🎭", count: 540 },
  { name: "Consulting", icon: "💼", count: 430 },
]

export default function CategoriesGrid() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Browse by Category</h2>
        <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
          Explore thousands of services from talented professionals
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link key={category.name} href={`/marketplace?category=${category.name}`}>
              <Card className="p-6 bg-card border-primary/20 hover:border-primary/50 cursor-pointer transition-all hover:shadow-lg glow-border group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-foreground/60 text-sm">{category.count} services</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
