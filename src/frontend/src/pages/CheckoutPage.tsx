import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Lock,
  Ticket,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useCart } from "../contexts/CartContext";

// TODO: Call backend.createPaymentIntent(amount) and use returned clientSecret with Stripe.js
// This component is ready for Stripe Elements integration once the publishable key is configured

type CheckoutStep = "review" | "payment" | "confirmation";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>("review");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardName, setCardName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const serviceFee = Math.round(subtotal * 0.12);
  const grandTotal = subtotal + serviceFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !email || !cardNumber || !expiry || !cvc) {
      toast.error("Please fill in all payment details");
      return;
    }
    setIsProcessing(true);
    // TODO: Call backend.createPaymentIntent(grandTotal) and use returned clientSecret with Stripe.js
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setIsProcessing(false);
    setStep("confirmation");
    clearCart();
  };

  if (cart.length === 0 && step !== "confirmation") {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "oklch(0.12 0.02 265)" }}
      >
        <NavBar />
        <main className="flex-1 flex items-center justify-center pt-16">
          <div className="text-center">
            <Ticket
              className="w-12 h-12 mx-auto mb-4"
              style={{ color: "oklch(0.40 0.15 290)" }}
            />
            <h2 className="text-xl font-bold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Browse events and add tickets to your cart to proceed.
            </p>
            <Button
              onClick={() => router.navigate({ to: "/" })}
              className="text-white"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #A855F7)",
              }}
              data-ocid="checkout.primary_button"
            >
              Browse Events
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.12 0.02 265)" }}
    >
      <NavBar />

      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {step === "confirmation" ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto text-center py-20"
                data-ocid="checkout.success_state"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: "oklch(0.35 0.12 145 / 20%)",
                    border: "2px solid oklch(0.55 0.18 145)",
                  }}
                >
                  <CheckCircle
                    className="w-10 h-10"
                    style={{ color: "oklch(0.65 0.20 145)" }}
                  />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Order Confirmed!
                </h1>
                <p className="text-muted-foreground text-sm mb-8">
                  Your tickets have been secured. Check your email for
                  confirmation and delivery details.
                </p>
                <Button
                  onClick={() => router.navigate({ to: "/" })}
                  className="text-white"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                  }}
                  data-ocid="checkout.primary_button"
                >
                  Back to Home
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="checkout"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
                  data-ocid="checkout.button"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <h1 className="text-2xl font-bold text-foreground mb-8">
                  Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-3">
                    <div
                      className="rounded-xl p-4 mb-6 flex items-start gap-3 border"
                      style={{
                        background: "oklch(0.22 0.04 290 / 30%)",
                        borderColor: "oklch(0.40 0.18 290 / 40%)",
                      }}
                      data-ocid="checkout.panel"
                    >
                      <AlertCircle
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: "oklch(0.70 0.18 290)" }}
                      />
                      <div
                        className="text-xs"
                        style={{ color: "oklch(0.70 0.10 290)" }}
                      >
                        <p className="font-semibold mb-1">
                          Stripe Payment Integration
                        </p>
                        <p>
                          Configure your Stripe publishable key to enable secure
                          live payments. This form is wired and ready &mdash;
                          replace the mock handler with{" "}
                          <code className="text-xs">
                            backend.createPaymentIntent(amount)
                          </code>
                          .
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handlePlaceOrder} className="space-y-5">
                      <div
                        className="rounded-xl p-6 border border-white/8 space-y-5"
                        style={{ background: "oklch(0.17 0.025 265)" }}
                        data-ocid="checkout.card"
                      >
                        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                          Contact Information
                        </h2>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            className="bg-white/5 border-white/10 focus:border-purple-500/50"
                            data-ocid="checkout.input"
                          />
                        </div>
                      </div>

                      <div
                        className="rounded-xl p-6 border border-white/8 space-y-5"
                        style={{ background: "oklch(0.17 0.025 265)" }}
                        data-ocid="checkout.card"
                      >
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                            Payment Details
                          </h2>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Lock className="w-3 h-3" />
                            Secure
                          </div>
                        </div>

                        <div
                          className="rounded-lg p-4 flex items-center justify-center gap-3 border border-dashed"
                          style={{
                            borderColor: "oklch(0.40 0.15 290 / 50%)",
                            background: "oklch(0.20 0.03 290 / 20%)",
                          }}
                          data-ocid="checkout.panel"
                        >
                          <CreditCard
                            className="w-5 h-5"
                            style={{ color: "oklch(0.55 0.18 290)" }}
                          />
                          <p
                            className="text-xs"
                            style={{ color: "oklch(0.60 0.12 290)" }}
                          >
                            Stripe Elements will render here &mdash; configure
                            publishable key
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-name" className="text-sm">
                              Name on Card
                            </Label>
                            <Input
                              id="card-name"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              placeholder="John Doe"
                              required
                              className="bg-white/5 border-white/10"
                              data-ocid="checkout.input"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-number" className="text-sm">
                              Card Number
                            </Label>
                            <Input
                              id="card-number"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="4242 4242 4242 4242"
                              maxLength={19}
                              required
                              className="bg-white/5 border-white/10"
                              data-ocid="checkout.input"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry" className="text-sm">
                                Expiry Date
                              </Label>
                              <Input
                                id="expiry"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                placeholder="MM / YY"
                                maxLength={7}
                                required
                                className="bg-white/5 border-white/10"
                                data-ocid="checkout.input"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc" className="text-sm">
                                CVC
                              </Label>
                              <Input
                                id="cvc"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                                placeholder="123"
                                maxLength={4}
                                required
                                className="bg-white/5 border-white/10"
                                data-ocid="checkout.input"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full py-4 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        style={{
                          background:
                            "linear-gradient(135deg, #7C3AED, #A855F7)",
                        }}
                        data-ocid="checkout.submit_button"
                      >
                        {isProcessing ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" />
                            Place Order &middot; ${grandTotal.toLocaleString()}
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  <div className="lg:col-span-2">
                    <div
                      className="rounded-xl p-6 border border-white/8 sticky top-20"
                      style={{ background: "oklch(0.17 0.025 265)" }}
                      data-ocid="checkout.card"
                    >
                      <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-5">
                        Order Summary
                      </h2>

                      <div className="space-y-4">
                        {cart.map((item, i) => (
                          <div
                            key={`${item.eventId}-${item.section}-${i}`}
                            className="rounded-lg p-3 text-sm"
                            style={{ background: "oklch(0.20 0.025 265)" }}
                            data-ocid={`checkout.item.${i + 1}`}
                          >
                            <p className="font-semibold text-foreground">
                              {item.eventName}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.eventDate} &middot; {item.venue}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.section}, Row {item.row} &middot;{" "}
                              {item.quantity} ticket
                              {item.quantity > 1 ? "s" : ""}
                            </p>
                          </div>
                        ))}
                      </div>

                      <Separator className="my-5 bg-white/8" />

                      <div className="space-y-2.5 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span>${subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Service Fee (12%)
                          </span>
                          <span>${serviceFee.toLocaleString()}</span>
                        </div>
                        <Separator className="my-2 bg-white/8" />
                        <div className="flex justify-between font-bold text-base">
                          <span>Total</span>
                          <span>${grandTotal.toLocaleString()}</span>
                        </div>
                      </div>

                      <div
                        className="mt-5 flex items-center gap-2 text-xs text-muted-foreground rounded-lg p-3"
                        style={{ background: "oklch(0.20 0.025 265)" }}
                      >
                        <Lock className="w-3 h-3 flex-shrink-0" />
                        Payments are secured with 256-bit SSL encryption
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
