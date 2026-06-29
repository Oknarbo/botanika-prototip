"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/stores/cart-store";
import { useChatStore } from "@/stores/chat-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Početna" },
  { href: "/shop", label: "Shop" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);
  const openChat = useChatStore((s) => s.openChat);

  return (
    <header className="sticky top-0 z-30 border-b border-botanika-cream/10 bg-botanika-dark/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-botanika-green/20">
            <Leaf className="h-5 w-5 text-botanika-green" />
          </div>
          <span className="text-xl font-bold tracking-tight text-botanika-cream">
            Botanika
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-botanika-green",
                pathname === link.href
                  ? "text-botanika-green"
                  : "text-botanika-cream/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex"
            onClick={() => openChat()}
          >
            AI Asistent
          </Button>
          <Button variant="ghost" size="icon" onClick={openCart} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-botanika-green text-[10px] font-bold text-botanika-dark">
                {totalItems}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-botanika-cream/10 md:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium",
                    pathname === link.href
                      ? "bg-botanika-green/15 text-botanika-green"
                      : "text-botanika-cream/70"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  openChat();
                  setMobileOpen(false);
                }}
                className="rounded-lg px-4 py-3 text-left text-sm font-medium text-botanika-green"
              >
                AI Asistent
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
