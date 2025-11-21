"use client"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import CategoriesGrid from "@/components/categories-grid"
import FeaturedServices from "@/components/featured-services"
import WhyChooseUs from "@/components/why-choose-us"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <CategoriesGrid />
      <FeaturedServices />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </main>
  )
}
