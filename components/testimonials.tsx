"use client";

import { Card } from "@/components/ui/card";

const testimonials = [
  {
    text: "Found the perfect developer for my project within 2 days. Exceeded expectations!",
    author: "Jessica Miller",
    role: "Startup Founder",
    avatar: "👩‍💼",
  },
  {
    text: "FreelanceHub made it easy to scale my design work. Great interface and support.",
    author: "Marcus Johnson",
    role: "Design Agency Owner",
    avatar: "👨‍🎨",
  },
  {
    text: "Best platform Ive used for connecting with clients. Highly recommended!",
    author: "Emma Chen",
    role: "Freelance Writer",
    avatar: "👩‍💻",
  },
  {
    text: "The quality of talent here is incredible. Our project finished ahead of schedule.",
    author: "David Brown",
    role: "Marketing Director",
    avatar: "👨‍💼",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">
          What Our Users Say
        </h2>
        <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
          Join thousands of happy clients and freelancers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <Card
              key={idx}
              className="p-6 bg-card border-primary/20 glow-border"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-foreground/80 mb-4 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-foreground/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
