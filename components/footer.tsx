"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">HigherStream</h3>
            <p className="text-foreground/60 text-sm">Connecting talent with opportunity</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Clients</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <Link href="/" className="hover:text-foreground transition">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Freelancers</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <Link href="/" className="hover:text-foreground transition">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition">
                  Earnings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <Link href="/" className="hover:text-foreground transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition">
                  Terms & Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-foreground/60 text-sm">
          <p>© 2025 HigherStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
