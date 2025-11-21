"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/navbar";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/client-dashboard");
    } catch (err) {
      setError((err as Error).message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fillClientDemo = () => {
    setEmail("client@demo.com");
    setPassword("demo123");
  };

  const fillFreelancerDemo = () => {
    setEmail("freelancer@demo.com");
    setPassword("demo123");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <Card className="w-full max-w-md bg-card border-primary/20 p-8 glow-border animate-slide-up">
          <h1 className="text-3xl font-bold mb-2 text-center">Sign In</h1>
          <p className="text-center text-foreground/60 mb-8">
            Welcome back to FreelanceHub
          </p>

          {error && (
            <div className="mb-4 p-4 bg-destructive/20 border border-destructive rounded text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary border-primary/30 glow-border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary border-primary/30 glow-border"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 py-6 transition-all"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="space-y-2 mb-6">
            <p className="text-xs text-foreground/50 text-center mb-3">
              Demo Credentials:
            </p>
            <Button
              type="button"
              variant="outline"
              className="w-full border-primary/30 text-xs bg-transparent"
              onClick={fillClientDemo}
            >
              Demo: Client
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-primary/30 text-xs bg-transparent"
              onClick={fillFreelancerDemo}
            >
              Demo: Freelancer
            </Button>
          </div>

          <div className="text-center">
            <p className="text-foreground/60 text-sm">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-primary/80"
              >
                Register here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
