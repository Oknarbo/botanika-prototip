"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useChatStore } from "@/stores/chat-store";

export function FloatingChatButton() {
  const { isOpen, openChat } = useChatStore();

  if (isOpen) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => openChat()}
      className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-botanika-green text-botanika-dark shadow-2xl shadow-botanika-green/40 ring-4 ring-botanika-green/20"
      aria-label="Otvori AI chat"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-botanika-cream text-[10px] font-bold text-botanika-dark">
        AI
      </span>
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-botanika-green"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  );
}
