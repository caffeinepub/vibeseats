import { useRouter } from "@tanstack/react-router";
import { CheckCircle, Lock, Mic2, Search, Shield, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { FEATURED_EVENTS } from "../data/mockData";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.navigate({ to: "/search", search: { q: searchQuery.trim() } });
    } else {
      router.navigate({ to: "/search" });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.11 0.025 265) 0%, oklch(0.13 0.02 265) 100%)",
      }}
    >
      <NavBar />

      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative pt-16 min-h-[85vh] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.11 0.025 270) 0%, oklch(0.13 0.03 285) 40%, oklch(0.12 0.025 265) 100%)",
          }}
        >
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, oklch(0.45 0.22 290 / 12%) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, oklch(0.40 0.18 285 / 10%) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div
                className="rounded-2xl px-6 py-12 sm:py-16 sm:px-12"
                style={{
                  background: "oklch(0.15 0.025 265 / 80%)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid oklch(1 0 0 / 8%)",
                }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-xs font-semibold tracking-widest uppercase mb-4"
                  style={{ color: "oklch(0.65 0.18 290)" }}
                >
                  Secondary Market Tickets &middot; Secure &middot; Authentic
                  &middot; Guaranteed
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase mb-4 text-foreground"
                  style={{ lineHeight: 1.05 }}
                >
                  Unlock the Best
                  <br />
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #7C3AED, #A855F7, #C084FC)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Live Experiences
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="text-base text-muted-foreground mb-8 max-w-md mx-auto"
                >
                  Your access to millions of live events worldwide.
                </motion.p>

                <motion.form
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  onSubmit={handleSearch}
                  className="flex items-center gap-0 max-w-2xl mx-auto rounded-full overflow-hidden"
                  style={{
                    background: "oklch(0.20 0.025 265)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                    boxShadow: "0 4px 32px oklch(0 0 0 / 30%)",
                  }}
                  data-ocid="search.panel"
                >
                  <div className="flex items-center pl-5 pr-3">
                    <Search
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: "oklch(0.62 0.05 290)" }}
                    />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search artists, teams, venues, or events..."
                    className="flex-1 bg-transparent py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
                    data-ocid="search.search_input"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 m-1.5 px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                    }}
                    data-ocid="search.submit_button"
                  >
                    FIND TICKETS
                  </button>
                </motion.form>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                  className="text-xs text-muted-foreground mt-4"
                >
                  Millions of live events at your fingertips
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-8 border-y border-white/5">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { icon: Shield, label: "Buyer Guarantee" },
                { icon: CheckCircle, label: "Verified Tickets" },
                { icon: Lock, label: "Secure Checkout" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: "oklch(0.65 0.18 290)" }}
                  />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                  Featured Events
                </h2>
                <a
                  href="/search"
                  className="text-xs font-medium transition-colors"
                  style={{ color: "oklch(0.65 0.18 290)" }}
                  data-ocid="events.link"
                >
                  View All &rarr;
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {FEATURED_EVENTS.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i + 1} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Blocks */}
        <section className="py-14 border-t border-white/5">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">
                Browse by Category
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <a
                  href="/search?category=sports"
                  className="group rounded-2xl overflow-hidden flex justify-between items-stretch transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "oklch(0.17 0.025 265)",
                    boxShadow:
                      "0 0 0 1px oklch(0.40 0.22 260), 0 4px 24px oklch(0.45 0.22 260 / 20%)",
                  }}
                  data-ocid="categories.sports.button"
                >
                  <div className="flex flex-col justify-center px-7 py-8 gap-3 flex-1">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "oklch(0.25 0.08 265)" }}
                    >
                      <Trophy
                        className="w-5 h-5"
                        style={{ color: "oklch(0.70 0.18 265)" }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        Sports
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        NFL, NBA, MLB, NHL &amp; more
                      </p>
                    </div>
                    <span
                      className="inline-flex w-fit text-xs px-4 py-1.5 rounded-full border transition-all group-hover:bg-white/5"
                      style={{
                        borderColor: "oklch(0.40 0.18 265)",
                        color: "oklch(0.70 0.18 265)",
                      }}
                    >
                      Browse Sports
                    </span>
                  </div>
                  <div className="w-40 h-40 self-center mr-4 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src="/assets/generated/category-sports.dim_300x180.jpg"
                      alt="Sports"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </a>

                <a
                  href="/search?category=concerts"
                  className="group rounded-2xl overflow-hidden flex justify-between items-stretch transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "oklch(0.17 0.025 265)",
                    boxShadow:
                      "0 0 0 1px oklch(0.40 0.22 290), 0 4px 24px oklch(0.45 0.22 290 / 20%)",
                  }}
                  data-ocid="categories.concerts.button"
                >
                  <div className="flex flex-col justify-center px-7 py-8 gap-3 flex-1">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "oklch(0.25 0.08 290)" }}
                    >
                      <Mic2
                        className="w-5 h-5"
                        style={{ color: "oklch(0.70 0.18 290)" }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        Concerts
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Pop, Rock, Hip-Hop &amp; more
                      </p>
                    </div>
                    <span
                      className="inline-flex w-fit text-xs px-4 py-1.5 rounded-full border transition-all group-hover:bg-white/5"
                      style={{
                        borderColor: "oklch(0.40 0.18 290)",
                        color: "oklch(0.70 0.18 290)",
                      }}
                    >
                      Browse Concerts
                    </span>
                  </div>
                  <div className="w-40 h-40 self-center mr-4 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src="/assets/generated/category-concerts.dim_300x180.jpg"
                      alt="Concerts"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
