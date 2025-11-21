"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { CLIENT_ORDERS, CLIENT_MESSAGES } from "@/lib/dashboard-data"
import localStorageManager from "@/lib/local-storage-manager"

export default function ClientDashboardPage() {
  const router = useRouter()
  const { user, isLoggedIn } = useAuth()
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "messages">("overview")
  const [orderStates, setOrderStates] = useState<Record<number, string>>(
    CLIENT_ORDERS.reduce((acc, order) => ({ ...acc, [order.id]: order.status }), {}),
  )

  useEffect(() => {
    const savedStates = localStorageManager.loadJobStates()
    if (Object.keys(savedStates).length > 0) {
      setOrderStates(savedStates)
    }
  }, [])

  useEffect(() => {
    localStorageManager.saveJobStates(orderStates)
  }, [orderStates])

  if (!isLoggedIn || user?.role !== "client") {
    router.push("/login")
    return null
  }

  const handleApproveWork = (orderId: number) => {
    setOrderStates((prev) => ({ ...prev, [orderId]: "completed" }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-yellow-500/20 text-yellow-400"
      case "in-progress":
        return "bg-blue-500/20 text-blue-400"
      case "completed":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-foreground/20 text-foreground"
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-foreground/60">Manage your projects and messages</p>
        </div>

        <div className="flex gap-4 mb-8 border-b border-border">
          {["overview", "orders", "messages"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 font-medium transition capitalize ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-card border-primary/20 p-6 glow-border">
                <p className="text-foreground/60 text-sm mb-2">Active Orders</p>
                <p className="text-3xl font-bold text-primary">3</p>
              </Card>
              <Card className="bg-card border-primary/20 p-6 glow-border">
                <p className="text-foreground/60 text-sm mb-2">Total Spent</p>
                <p className="text-3xl font-bold">$947</p>
              </Card>
              <Card className="bg-card border-primary/20 p-6 glow-border">
                <p className="text-foreground/60 text-sm mb-2">Completed</p>
                <p className="text-3xl font-bold text-green-400">2</p>
              </Card>
              <Card className="bg-card border-primary/20 p-6 glow-border">
                <p className="text-foreground/60 text-sm mb-2">In Escrow</p>
                <p className="text-3xl font-bold">$798</p>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
              <div className="space-y-3">
                {CLIENT_ORDERS.slice(0, 3).map((order) => (
                  <Card key={order.id} className="bg-card border-primary/20 p-4 glow-border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{order.serviceTitle}</h3>
                        <p className="text-sm text-foreground/60">By {order.seller}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getStatusColor(orderStates[order.id] || order.status)}`}
                      >
                        {orderStates[order.id] || order.status}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
              <Button variant="outline" className="mt-4 bg-transparent" asChild>
                <Link href="#orders">View All Orders</Link>
              </Button>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-4">
            {CLIENT_ORDERS.map((order) => (
              <Card key={order.id} className="bg-card border-primary/20 p-6 glow-border">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{order.serviceTitle}</h3>
                    <div className="flex gap-4 text-sm text-foreground/60">
                      <span>By {order.seller}</span>
                      <span>Order #00{order.id}</span>
                      <span>Created {order.createdAt}</span>
                    </div>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full font-medium ${getStatusColor(orderStates[order.id] || order.status)}`}
                  >
                    {orderStates[order.id] || order.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-primary">${order.amount}</div>
                  <div className="flex gap-2">
                    {(orderStates[order.id] || order.status) === "in-progress" && (
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => handleApproveWork(order.id)}
                      >
                        Approve Work
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="border-primary/30 bg-transparent" asChild>
                      <Link href={`/messages/freelancer-${order.id}`}>Message Seller</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "messages" && (
          <div className="space-y-3">
            {CLIENT_MESSAGES.map((msg) => (
              <Link key={msg.id} href={`/messages/${msg.senderId}`}>
                <Card
                  className={`bg-card border-primary/20 p-4 glow-border cursor-pointer hover:border-primary/50 transition ${msg.unread ? "border-primary/50" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{msg.sender}</h3>
                        {msg.unread && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                      </div>
                      <p className="text-foreground/70 text-sm line-clamp-1">{msg.lastMessage}</p>
                    </div>
                    <span className="text-xs text-foreground/60 whitespace-nowrap ml-2">{msg.timestamp}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
