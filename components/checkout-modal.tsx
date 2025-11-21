"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import localStorageManager from "@/lib/local-storage-manager"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  serviceTitle: string
  price: number
  sellerName: string
}

export default function CheckoutModal({
  isOpen,
  onClose,
  onSuccess,
  serviceTitle,
  price,
  sellerName,
}: CheckoutModalProps) {
  const [step, setStep] = useState(1)
  const [orderDetails, setOrderDetails] = useState({
    projectScope: "",
    deliveryDate: "",
  })
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    if (isOpen) {
      const savedState = localStorageManager.load("checkoutState", null)
      if (savedState) {
        setStep(savedState.step || 1)
        setOrderDetails(savedState.orderDetails || orderDetails)
        setPaymentDetails(savedState.paymentDetails || paymentDetails)
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      localStorageManager.save("checkoutState", {
        step,
        orderDetails,
        paymentDetails,
      })
    }
  }, [step, orderDetails, paymentDetails, isOpen])

  if (!isOpen) return null

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleConfirm = () => {
    const orders = localStorageManager.loadOrders()
    const newOrder = {
      id: Date.now(),
      serviceTitle,
      seller: sellerName,
      amount: price,
      status: "in-progress",
      createdAt: new Date().toISOString().split("T")[0],
    }
    orders[newOrder.id] = newOrder
    localStorageManager.saveOrders(orders)

    // Clear checkout state
    localStorageManager.clear("checkoutState")

    onSuccess()
    setStep(1)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-card border-primary/20 glow-border max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>

            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex-1 flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                      step >= num ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/60"
                    }`}
                  >
                    {num}
                  </div>
                  {num < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded transition ${step > num ? "bg-primary" : "bg-secondary"}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2 text-sm">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full">Step {step} of 3</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Order Details</h3>
                <div className="space-y-4 p-4 bg-secondary/30 rounded-lg mb-6">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Service</span>
                    <span className="font-semibold">{serviceTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Seller</span>
                    <span className="font-semibold">{sellerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Price</span>
                    <span className="font-semibold text-primary">${price}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Scope</label>
                <textarea
                  placeholder="Describe what you need..."
                  value={orderDetails.projectScope}
                  onChange={(e) => setOrderDetails({ ...orderDetails, projectScope: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Delivery Date</label>
                <Input
                  type="date"
                  value={orderDetails.deliveryDate}
                  onChange={(e) => setOrderDetails({ ...orderDetails, deliveryDate: e.target.value })}
                  className="bg-secondary border-primary/30 glow-border"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
                <p className="text-foreground/60 text-sm mb-4">Amount will be held in escrow until work is delivered</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                <Input
                  placeholder="John Doe"
                  value={paymentDetails.cardName}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                  className="bg-secondary border-primary/30 glow-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                  className="bg-secondary border-primary/30 glow-border font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <Input
                    placeholder="MM/YY"
                    value={paymentDetails.expiryDate}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                    className="bg-secondary border-primary/30 glow-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <Input
                    placeholder="123"
                    type="password"
                    value={paymentDetails.cvv}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                    className="bg-secondary border-primary/30 glow-border"
                  />
                </div>
              </div>

              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-foreground/70 mb-2">Order Summary</p>
                <div className="flex justify-between mb-2">
                  <span>Service Fee</span>
                  <span className="font-semibold">${price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Platform Fee (5%)</span>
                  <span className="font-semibold">${(price * 0.05).toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary text-lg">${(price * 1.05).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✓</div>
                <h3 className="text-2xl font-bold mb-2">Order Confirmed!</h3>
                <p className="text-foreground/70 mb-6">
                  Your order has been placed successfully. The amount has been held in escrow.
                </p>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Order ID</span>
                  <span className="font-mono font-semibold">#HS2025{Date.now().toString().slice(-4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Service</span>
                  <span className="font-semibold">{serviceTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Total Amount</span>
                  <span className="font-bold text-primary text-lg">${(price * 1.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Status</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                    In Progress
                  </span>
                </div>
              </div>

              <p className="text-sm text-foreground/60 text-center">
                You will receive updates as the seller makes progress. Check your dashboard for more details.
              </p>
            </div>
          )}

          <div className="mt-8 flex gap-3 justify-end">
            {step < 3 && (
              <>
                <Button
                  variant="outline"
                  onClick={step === 1 ? onClose : handlePrevious}
                  className="border-primary/30 bg-transparent"
                >
                  {step === 1 ? "Cancel" : "Back"}
                </Button>
                <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                  Next
                </Button>
              </>
            )}
            {step === 3 && (
              <>
                <Button variant="outline" onClick={onClose} className="border-primary/30 bg-transparent">
                  Close
                </Button>
                <Button onClick={handleConfirm} className="bg-primary hover:bg-primary/90">
                  Go to Dashboard
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
