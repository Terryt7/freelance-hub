"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Hero() {
  const popularTags = ["Logo Design", "Web Development", "Content Writing", "Video Editing"]

  return (
    <section className="min-h-[600px] flex items-center justify-center py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-4xl mx-auto text-center animate-slide-up">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
          Find Talent.
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            {" "}
            Get Things Done.
          </span>
        </h1>

        <p className="text-xl text-foreground/80 mb-12 max-w-2xl mx-auto">
          Connect with verified freelancers and scale your team on your terms. No commitment, no hassle.
        </p>

        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Input
              placeholder="What service are you looking for?"
              className="flex-1 max-w-md h-12 bg-secondary border-primary/30 glow-border"
            />
            <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
              Search
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-foreground/60 text-sm">Popular:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 text-sm bg-secondary text-foreground/80 rounded-full hover:bg-secondary/80 hover:text-foreground transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
            Start as Client
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10 px-8 bg-transparent"
          >
            Become a Freelancer
          </Button>
        </div>
      </div>
    </section>
  )
}
