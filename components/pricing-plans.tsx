"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Zap } from "lucide-react"

interface Plan {
  id: string
  name: string
  credits: string | number
  price: number
  popular?: boolean
  features: string[]
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    credits: 10,
    price: 0,
    features: ["10 Credits", "Basic trend predictions", "7 days history", "Email support"],
  },
  {
    id: "basic",
    name: "Basic",
    credits: 100,
    price: 299,
    features: ["100 Credits", "Standard trend predictions", "14 days history", "Email support", "Marketplace access"],
  },
  {
    id: "pro",
    name: "Pro",
    credits: 500,
    price: 699,
    popular: true,
    features: ["500 Credits", "Advanced analytics", "Unlimited history", "Priority support", "Export reports"],
  },
]

export function PricingPlans() {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handlePurchase = async (planId: string) => {
    setIsLoading(planId)
    try {
      const response = await fetch("/api/credits/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: planId }),
      })

      const data = await response.json()
      console.log("Payment initiated:", data)
      // In production, open Razorpay checkout
    } catch (error) {
      console.error("Purchase failed:", error)
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-foreground">Pricing Plans</h1>
        <p className="text-muted-foreground mt-2">
          Choose a plan that fits your prediction needs. 1 prediction = 15 credits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`p-8 border transition-all ${
              plan.popular ? "border-primary shadow-xl scale-105 relative" : "border-border"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
            )}

            <h2 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold text-foreground">₹{plan.price}</span>
              <span className="text-muted-foreground">one-time</span>
            </div>

            <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg mb-6">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground">{plan.credits} Credits</span>
              {/* <span className="text-sm text-muted-foreground">({Math.floor(plan.credits / 15)} predictions)</span> */}
            </div>

            <Button
              onClick={() => handlePurchase(plan.id)}
              disabled={isLoading !== null}
              className={`w-full mb-6 py-3 rounded-lg font-semibold transition-all ${
                plan.popular
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg"
                  : "bg-border text-foreground hover:bg-muted"
              }`}
            >
              {isLoading === plan.id ? "Processing..." : "Buy Now"}
            </Button>

            <div className="space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-6 bg-muted rounded-lg text-center">
        <h3 className="font-bold text-foreground mb-2">Free Credits</h3>
        <p className="text-muted-foreground">
          Start with 10 free credits when you sign up. No payment required to explore the marketplace.
        </p>
      </div>
    </div>
  )
}
