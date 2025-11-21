"use client";

import { Card } from "@/components/ui/card";

const features = [
  {
    icon: "🔒",
    title: "Secure Payments",
    description: "Payment held in escrow until work is complete",
  },
  {
    icon: "⭐",
    title: "Verified Professionals",
    description: "All freelancers are vetted and reviewed",
  },
  {
    icon: "💬",
    title: "Direct Communication",
    description: "Message your freelancer in real-time",
  },
  {
    icon: "✅",
    title: "Quality Guaranteed",
    description: "Get revisions until you are satisfied",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Why Choose FreelanceHub?
        </h2>
        <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
          We make hiring talents simple, transparent, and secure
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="p-8 bg-card border-primary/20 hover:border-primary/50 hover:shadow-lg transition-all glow-border"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
