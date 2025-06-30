"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock } from "lucide-react"

interface PaymentStepProps {
  onComplete: () => void
  onBack: () => void
}

export function PaymentStep({ onComplete }: PaymentStepProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">Complete Your Payment</CardTitle>
          <p className="text-gray-600 mt-2">Secure payment to unlock your prompt evaluation</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Prompt Evaluation</span>
              <span className="font-bold text-gray-900">$3.00</span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>$3.00</span>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="border-gray-200"
                onFocus={(e) => (e.target.style.borderColor = "#ebfc72")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="card">Card Information</Label>
              <div className="relative">
                <Input
                  id="card"
                  placeholder="1234 1234 1234 1234"
                  className="border-gray-200 pl-10"
                  onFocus={(e) => (e.target.style.borderColor = "#ebfc72")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  className="border-gray-200"
                  onFocus={(e) => (e.target.style.borderColor = "#ebfc72")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  className="border-gray-200"
                  onFocus={(e) => (e.target.style.borderColor = "#ebfc72")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-2 text-sm text-gray-600 p-3 rounded-lg"
            style={{ backgroundColor: "#f8fce8" }}
          >
            <Lock className="h-4 w-4" style={{ color: "#8b9f47" }} />
            <span>Your payment information is secure and encrypted</span>
          </div>

          <Button
            onClick={onComplete}
            className="w-full text-black py-3 text-lg font-medium"
            style={{ backgroundColor: "#ebfc72" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5f666")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ebfc72")}
          >
            Pay & Run Evaluation
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By completing this purchase, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
