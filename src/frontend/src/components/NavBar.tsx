import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useRouter } from "@tanstack/react-router";
import { LogOut, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function NavBar() {
  const router = useRouter();
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const principal = identity?.getPrincipal().toString();
  const shortPrincipal = principal
    ? `${principal.slice(0, 5)}...${principal.slice(-4)}`
    : null;

  const navLinks = [
    { label: "Sports", href: "/search?category=sports" },
    { label: "Concerts", href: "/search?category=concerts" },
    { label: "Theater", href: "/search?category=theater" },
    { label: "Festivals", href: "/search?category=festivals" },
    { label: "Sell", href: "/" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
      style={{ background: "oklch(0.13 0.025 265 / 95%)" }}
    >
      <div
        style={{ backdropFilter: "blur(12px)" }}
        className="absolute inset-0"
      />
      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="/"
            className="flex items-center gap-2 flex-shrink-0"
            data-ocid="nav.link"
          >
            <span className="text-xl font-bold tracking-tight">
              <span
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Vibe
              </span>
              <span className="text-foreground">Seats</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.navigate({ to: "/search" })}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Search"
              data-ocid="nav.search_input"
            >
              <Search className="w-4 h-4" />
            </button>

            {totalItems > 0 && (
              <button
                type="button"
                onClick={() => router.navigate({ to: "/checkout" })}
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Cart: ${totalItems} items`}
                data-ocid="nav.link"
              >
                <ShoppingCart className="w-4 h-4" />
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-xs flex items-center justify-center text-white"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                  }}
                >
                  {totalItems}
                </span>
              </button>
            )}

            {identity ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden md:flex items-center gap-1.5 border-white/15 bg-white/5 text-foreground text-xs"
                    data-ocid="nav.dropdown_menu"
                  >
                    <User className="w-3 h-3" />
                    {shortPrincipal}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => clear()}
                    className="text-destructive focus:text-destructive"
                    data-ocid="nav.delete_button"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex border-white/20 bg-white/5 hover:bg-white/10 text-foreground text-xs"
                onClick={login}
                disabled={isLoggingIn}
                data-ocid="nav.button"
              >
                {isLoggingIn ? "Connecting..." : "Sign In"}
              </Button>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/5 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/5">
              {identity ? (
                <button
                  type="button"
                  onClick={() => {
                    clear();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 px-2 py-2 text-sm text-destructive"
                  data-ocid="nav.delete_button"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    login();
                    setMobileOpen(false);
                  }}
                  className="block px-2 py-2 text-sm text-foreground"
                  data-ocid="nav.button"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
