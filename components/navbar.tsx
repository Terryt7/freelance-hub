"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import WalletModal from "@/components/wallet-modal";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">FH</span>
              </div>
              <span className="text-xl font-bold hidden sm:inline">
                FreelanceHub
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/marketplace"
                className="text-foreground/80 hover:text-foreground transition"
              >
                Browse
              </Link>
              <Link
                href="/how-it-works"
                className="text-foreground/80 hover:text-foreground transition"
              >
                How it works
              </Link>
              <Link
                href="/pricing"
                className="text-foreground/80 hover:text-foreground transition"
              >
                Pricing
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowWallet(true)}
                className="border-primary/30 hidden sm:flex items-center gap-2"
              >
                🔗 Wallet
              </Button>

              {isLoggedIn && user ? (
                <>
                  <Link href="/messages">
                    <Button
                      variant="outline"
                      className="border-primary/30 bg-transparent"
                    >
                      Messages
                    </Button>
                  </Link>
                  <Link
                    href={
                      user.role === "client"
                        ? "/client-dashboard"
                        : "/freelancer-dashboard"
                    }
                  >
                    <Button
                      variant="outline"
                      className="border-primary/30 bg-transparent"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="border-primary/30 bg-transparent"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90" asChild>
                    <Link href="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <WalletModal isOpen={showWallet} onClose={() => setShowWallet(false)} />
    </>
  );
}
