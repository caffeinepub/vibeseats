import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { ALL_EVENTS } from "../data/mockData";

// TODO: Replace mock data with call to backend searchEvents(query, category) which proxies external inventory API

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "sports", label: "Sports" },
  { value: "concerts", label: "Concerts" },
  { value: "theater", label: "Theater" },
  { value: "festivals", label: "Festivals" },
];

export default function SearchResultsPage() {
  const searchStr = window.location.search;
  const params = new URLSearchParams(searchStr);
  const queryParam = params.get("q") || "";
  const categoryParam = params.get("category") || "all";

  const [localQuery, setLocalQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    return ALL_EVENTS.filter((event) => {
      const matchesQuery =
        !queryParam ||
        event.name.toLowerCase().includes(queryParam.toLowerCase()) ||
        event.venue.toLowerCase().includes(queryParam.toLowerCase()) ||
        event.city.toLowerCase().includes(queryParam.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || event.category === selectedCategory;

      const matchesPrice =
        event.minPrice >= priceRange[0] && event.minPrice <= priceRange[1];

      return matchesQuery && matchesCategory && matchesPrice;
    });
  }, [queryParam, selectedCategory, priceRange]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    if (localQuery.trim()) newParams.set("q", localQuery.trim());
    if (selectedCategory !== "all") newParams.set("category", selectedCategory);
    const qs = newParams.toString();
    window.location.href = qs ? `/search?${qs}` : "/search";
  };

  const clearSearch = () => {
    setLocalQuery("");
    window.location.href = "/search";
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.12 0.02 265)" }}
    >
      <NavBar />

      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-0 max-w-3xl rounded-full overflow-hidden"
              style={{
                background: "oklch(0.18 0.025 265)",
                border: "1px solid oklch(1 0 0 / 10%)",
              }}
              data-ocid="search.panel"
            >
              <div className="flex items-center pl-5 pr-3">
                <Search
                  className="w-5 h-5"
                  style={{ color: "oklch(0.62 0.05 290)" }}
                />
              </div>
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search artists, teams, venues..."
                className="flex-1 bg-transparent py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
                data-ocid="search.search_input"
              />
              {localQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="p-2 text-muted-foreground hover:text-foreground"
                  data-ocid="search.close_button"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="flex-shrink-0 m-1.5 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                }}
                data-ocid="search.submit_button"
              >
                Search
              </button>
            </form>
          </div>

          <div className="flex flex-wrap items-center gap-3 pb-6">
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all"
                style={{
                  background:
                    selectedCategory === cat.value
                      ? "oklch(0.45 0.22 290)"
                      : "transparent",
                  borderColor:
                    selectedCategory === cat.value
                      ? "oklch(0.50 0.22 290)"
                      : "oklch(1 0 0 / 12%)",
                  color:
                    selectedCategory === cat.value
                      ? "white"
                      : "oklch(0.70 0.01 260)",
                }}
                data-ocid="search.tab"
              >
                {cat.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="search.toggle"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </button>
          </div>

          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-xl p-5 mb-6 border border-white/8"
              style={{ background: "oklch(0.17 0.025 265)" }}
              data-ocid="search.panel"
            >
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
                    Price Range: ${priceRange[0]} &ndash; ${priceRange[1]}
                  </p>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={2000}
                    step={25}
                    className="max-w-xs"
                    data-ocid="search.select"
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">
                {results.length}
              </span>{" "}
              results
              {queryParam ? (
                <>
                  {" "}
                  for{" "}
                  <span className="text-foreground">
                    &ldquo;{queryParam}&rdquo;
                  </span>
                </>
              ) : selectedCategory !== "all" ? (
                <>
                  {" "}
                  in{" "}
                  <Badge variant="secondary" className="text-xs capitalize">
                    {selectedCategory}
                  </Badge>
                </>
              ) : null}
            </p>
          </div>

          {results.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              data-ocid="search.list"
            >
              {results.map((event, i) => (
                <EventCard key={event.id} event={event} index={i + 1} />
              ))}
            </motion.div>
          ) : (
            <div
              className="text-center py-20 rounded-xl border border-white/8"
              style={{ background: "oklch(0.17 0.025 265)" }}
              data-ocid="search.empty_state"
            >
              <Search
                className="w-10 h-10 mx-auto mb-4"
                style={{ color: "oklch(0.40 0.10 290)" }}
              />
              <p className="text-foreground font-semibold text-lg mb-2">
                No events found
              </p>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
