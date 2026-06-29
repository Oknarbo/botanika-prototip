"use client";

import { Toaster } from "sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ChatPanel } from "@/components/chat/chat-panel";
import { FloatingChatButton } from "@/components/chat/floating-button";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <ChatPanel />
      <FloatingChatButton />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#0f1a14",
            border: "1px solid rgba(34, 197, 94, 0.2)",
            color: "#f5f0e8",
          },
        }}
      />
    </>
  );
}
