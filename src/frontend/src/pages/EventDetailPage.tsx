import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  Info,
  MapPin,
  MapPin as MapPinIcon,
  ShoppingCart,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useCart } from "../contexts/CartContext";
import { ALL_EVENTS, MOCK_TICKET_LISTINGS } from "../data/mockData";

// TODO: Load seat map via backend getSeatMap(eventId) which proxies external mapping API

export default function EventDetailPage() {
  const router = useRouter();
  const pathParts = window.location.pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  const { addToCart, totalItems } = useCart();
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [selectedQty, setSelectedQty] = useState(2);

  const event = ALL_EVENTS.find((e) => e.id === id);

  if (!event) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(0.12 0.02 265)" }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Event not found
          </h1>
          <p className="text-muted-foreground mb-6">
            The event you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button
            onClick={() => router.navigate({ to: "/" })}
            variant="outline"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const selectedTicket = MOCK_TICKET_LISTINGS.find(
    (t) => t.id === selectedListing,
  );
  const orderTotal = selectedTicket
    ? selectedTicket.pricePerTicket * selectedQty
    : 0;
  const serviceFee = Math.round(orderTotal * 0.12);
  const grandTotal = orderTotal + serviceFee;

  const handleAddToCart = () => {
    if (!selectedTicket) {
      toast.error("Please select tickets first");
      return;
    }
    addToCart({
      eventId: event.id,
      eventName: event.name,
      eventDate: event.date,
      venue: event.venue,
      section: selectedTicket.section,
      row: selectedTicket.row,
      quantity: selectedQty,
      pricePerTicket: selectedTicket.pricePerTicket,
    });
    toast.success("Tickets added to cart!");
  };

  const handleProceedToCheckout = () => {
    if (!selectedTicket) {
      toast.error("Please select tickets first");
      return;
    }
    handleAddToCart();
    router.navigate({ to: "/checkout" });
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.12 0.02 265)" }}
    >
      <NavBar />

      <main className="flex-1 pt-16">
        <div
          className="py-10"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.14 0.03 280) 0%, oklch(0.12 0.02 265) 100%)",
          }}
        >
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
              data-ocid="event.button"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              {event.image && (
                <div className="w-full md:w-56 h-36 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <Badge
                  className="capitalize text-xs mb-3 border-0 text-white"
                  style={{ background: "oklch(0.45 0.22 290)" }}
                >
                  {event.category}
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-snug">
                  {event.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {event.venue}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPinIcon className="w-3 h-3" />
                    {event.city}
                  </span>
                </div>
                {event.description && (
                  <p className="mt-3 text-sm text-muted-foreground max-w-xl">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  Venue Map
                </h2>
                <div
                  className="rounded-xl p-8 flex flex-col items-center justify-center gap-4 border border-white/8 min-h-52"
                  style={{ background: "oklch(0.17 0.025 265)" }}
                  data-ocid="event.canvas_target"
                >
                  <MapPin
                    className="w-12 h-12"
                    style={{ color: "oklch(0.40 0.15 290)" }}
                  />
                  <div className="text-center">
                    <p className="text-foreground font-semibold text-sm mb-1">
                      Interactive Seat Map
                    </p>
                    <p className="text-xs text-muted-foreground max-w-sm">
                      Interactive seat map powered by external mapping API
                      &mdash; configure API endpoint to enable real-time seat
                      availability and selection.
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-2 text-xs rounded-lg px-3 py-2"
                    style={{
                      background: "oklch(0.22 0.04 290 / 40%)",
                      color: "oklch(0.70 0.15 290)",
                    }}
                  >
                    <Info className="w-3 h-3" />
                    API integration ready &mdash; see code comments
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  Available Tickets
                </h2>
                <div
                  className="rounded-xl overflow-hidden border border-white/8"
                  style={{ background: "oklch(0.17 0.025 265)" }}
                  data-ocid="event.table"
                >
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/8 hover:bg-transparent">
                        <TableHead className="text-xs text-muted-foreground">
                          Section
                        </TableHead>
                        <TableHead className="text-xs text-muted-foreground">
                          Row
                        </TableHead>
                        <TableHead className="text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" /> Qty
                          </span>
                        </TableHead>
                        <TableHead className="text-xs text-muted-foreground">
                          Price / Ticket
                        </TableHead>
                        <TableHead className="text-xs text-muted-foreground">
                          Seller
                        </TableHead>
                        <TableHead />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {MOCK_TICKET_LISTINGS.map((listing, i) => (
                        <TableRow
                          key={listing.id}
                          className="border-white/5 cursor-pointer transition-colors"
                          style={{
                            background:
                              selectedListing === listing.id
                                ? "oklch(0.25 0.06 290 / 40%)"
                                : undefined,
                          }}
                          onClick={() => {
                            setSelectedListing(listing.id);
                            setSelectedQty(
                              Math.min(selectedQty, listing.quantity),
                            );
                          }}
                          data-ocid={`event.row.${i + 1}`}
                        >
                          <TableCell className="font-medium text-sm">
                            {listing.section}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {listing.row}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {listing.quantity}
                          </TableCell>
                          <TableCell className="text-sm font-semibold">
                            ${listing.pricePerTicket}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {listing.seller}
                          </TableCell>
                          <TableCell>
                            <button
                              type="button"
                              className="text-xs px-3 py-1.5 rounded-full border transition-all whitespace-nowrap"
                              style={{
                                borderColor:
                                  selectedListing === listing.id
                                    ? "oklch(0.55 0.22 290)"
                                    : "oklch(1 0 0 / 15%)",
                                color:
                                  selectedListing === listing.id
                                    ? "oklch(0.70 0.18 290)"
                                    : "oklch(0.70 0.01 260)",
                                background:
                                  selectedListing === listing.id
                                    ? "oklch(0.25 0.06 290 / 30%)"
                                    : "transparent",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedListing(listing.id);
                                setSelectedQty(
                                  Math.min(selectedQty, listing.quantity),
                                );
                              }}
                              data-ocid={`event.button.${i + 1}`}
                            >
                              {selectedListing === listing.id
                                ? "Selected"
                                : "Select"}
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="rounded-xl p-6 border border-white/10 space-y-5"
                  style={{ background: "oklch(0.17 0.025 265)" }}
                  data-ocid="event.card"
                >
                  <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    Order Summary
                  </h2>

                  {selectedTicket ? (
                    <>
                      <div className="space-y-3">
                        <div
                          className="rounded-lg p-3 text-sm"
                          style={{ background: "oklch(0.20 0.025 265)" }}
                        >
                          <p className="font-semibold text-foreground">
                            {event.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {event.date} &middot; {event.venue}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {selectedTicket.section}, Row {selectedTicket.row}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Quantity
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedQty((q) => Math.max(1, q - 1))
                              }
                              className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-foreground hover:border-white/30 transition-colors"
                              data-ocid="event.secondary_button"
                            >
                              -
                            </button>
                            <span className="font-semibold w-4 text-center">
                              {selectedQty}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedQty((q) =>
                                  Math.min(q + 1, selectedTicket.quantity),
                                )
                              }
                              className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-foreground hover:border-white/30 transition-colors"
                              data-ocid="event.secondary_button"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-white/8">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {selectedQty} &times; $
                              {selectedTicket.pricePerTicket}
                            </span>
                            <span>${orderTotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Service fee
                            </span>
                            <span>${serviceFee}</span>
                          </div>
                          <div className="flex justify-between text-base font-bold pt-2 border-t border-white/8">
                            <span>Total</span>
                            <span>${grandTotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={handleProceedToCheckout}
                          className="w-full py-3 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-90"
                          style={{
                            background:
                              "linear-gradient(135deg, #7C3AED, #A855F7)",
                          }}
                          data-ocid="event.primary_button"
                        >
                          Proceed to Checkout
                        </button>
                        <button
                          type="button"
                          onClick={handleAddToCart}
                          className="w-full py-3 rounded-full font-medium text-sm border border-white/15 text-foreground hover:border-white/25 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                          data-ocid="event.secondary_button"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart {totalItems > 0 && `(${totalItems})`}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div
                      className="text-center py-8 text-muted-foreground text-sm"
                      data-ocid="event.empty_state"
                    >
                      <ShoppingCart
                        className="w-8 h-8 mx-auto mb-3"
                        style={{ color: "oklch(0.35 0.10 290)" }}
                      />
                      Select tickets from the table to see your order summary.
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
