"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Hammer,
  Leaf,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { parseProductRecommendations } from "@/lib/chat-parser";
import { useChatStore, type ChatMode } from "@/stores/chat-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChatMessageBubble,
  TypingIndicator,
} from "./message-bubble";
import { cn } from "@/lib/utils";

const modeLabels: Record<ChatMode, string> = {
  general: "Opći chat",
  "setup-builder": "Setup Builder",
  diagnosis: "Dijagnostika",
};

const quickPrompts = [
  "Trebam kompletan setup za 90×90, budžet 500€",
  "Zašto mi lišće požuti?",
  "Koja LED lampa za početnike?",
  "Preporuči gnojiva za cvjetanje",
];

export function ChatPanel() {
  const {
    isOpen,
    mode,
    closeChat,
    setMode,
    messages: storeMessages,
    addMessage,
    updateMessage,
    isLoading: storeLoading,
    setLoading,
  } = useChatStore();

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [localMessages, setLocalMessages] = useState<
    Array<{
      id: string;
      role: "user" | "assistant";
      content: string;
      products?: { id: string; reason: string }[];
      imageUrl?: string;
    }>
  >([]);

  const { messages: aiMessages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isStreaming = status === "streaming" || status === "submitted";
  const isAnalyzing = storeLoading;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localMessages, aiMessages, isStreaming, isAnalyzing]);

  useEffect(() => {
    if (storeMessages.length > 0 && localMessages.length === 0) {
      setLocalMessages(
        storeMessages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          products: m.products,
          imageUrl: m.imageUrl,
        }))
      );
    }
  }, [storeMessages, localMessages.length]);

  useEffect(() => {
    if (aiMessages.length === 0) return;

    const mapped = aiMessages.map((msg) => {
      const textContent = msg.parts
        ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join("") ?? "";

      const { text, products } = parseProductRecommendations(textContent);

      return {
        id: msg.id,
        role: msg.role as "user" | "assistant",
        content: text,
        products: products.length > 0 ? products : undefined,
      };
    });

    const welcome = storeMessages.filter((m) => m.id === "welcome");
    setLocalMessages([
      ...welcome.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        products: m.products,
        imageUrl: m.imageUrl,
      })),
      ...mapped,
    ]);
  }, [aiMessages, storeMessages]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    setInput("");

    if (mode === "setup-builder" && !text.toLowerCase().includes("setup")) {
      await sendMessage({
        text: `[Setup Builder mod] ${text}`,
      });
    } else {
      await sendMessage({ text });
    }
  }, [input, isStreaming, mode, sendMessage]);

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Molimo odaberite sliku.");
        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const imageUrl = base64;

        const userMsgId = addMessage({
          role: "user",
          content: "Analiziraj ovu fotografiju moje biljke",
          imageUrl,
        });

        setLocalMessages((prev) => [
          ...prev,
          {
            id: userMsgId,
            role: "user",
            content: "Analiziraj ovu fotografiju moje biljke",
            imageUrl,
          },
        ]);

        setLoading(true);

        try {
          const res = await fetch("/api/analyze-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64 }),
          });

          if (!res.ok) throw new Error("Analiza nije uspjela");

          const data = await res.json();
          const { text, products } = parseProductRecommendations(data.response);

          const assistantId = addMessage({
            role: "assistant",
            content: text,
            products,
          });

          setLocalMessages((prev) => [
            ...prev,
            {
              id: assistantId,
              role: "assistant",
              content: text,
              products,
            },
          ]);

          toast.success("Analiza fotografije završena (demo mod)");
        } catch {
          toast.error("Greška pri analizi fotografije.");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    },
    [addMessage, setLoading]
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-end p-0 sm:p-4 sm:items-center sm:justify-end"
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeChat}
        />

        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative flex h-[100dvh] w-full flex-col overflow-hidden border border-botanika-cream/10 bg-botanika-dark shadow-2xl sm:h-[680px] sm:max-w-md sm:rounded-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-botanika-cream/10 bg-botanika-dark/95 px-4 py-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-botanika-green/20">
                <Sparkles className="h-5 w-5 text-botanika-green" />
              </div>
              <div>
                <h2 className="font-semibold text-botanika-cream">
                  AI Grow Asistent
                </h2>
                <p className="text-xs text-botanika-cream/50">
                  {modeLabels[mode]} · Online
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={closeChat}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mode tabs */}
          <div className="flex gap-1 border-b border-botanika-cream/10 px-3 py-2">
            {(
              [
                { key: "general" as const, icon: Leaf, label: "Chat" },
                { key: "setup-builder" as const, icon: Hammer, label: "Setup" },
                { key: "diagnosis" as const, icon: Camera, label: "Foto" },
              ] as const
            ).map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => {
                  setMode(key);
                  if (key === "diagnosis") fileInputRef.current?.click();
                }}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium transition-colors",
                  mode === key
                    ? "bg-botanika-green/15 text-botanika-green"
                    : "text-botanika-cream/50 hover:text-botanika-cream/80"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
          >
            {localMessages.map((msg) => (
              <ChatMessageBubble key={msg.id} message={msg} />
            ))}
            {(isStreaming || isAnalyzing) && <TypingIndicator />}
          </div>

          {/* Quick prompts */}
          {localMessages.length <= 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="rounded-full border border-botanika-cream/15 px-3 py-1.5 text-xs text-botanika-cream/70 transition-colors hover:border-botanika-green/40 hover:text-botanika-green"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-botanika-cream/10 p-4">
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Button
                variant="secondary"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                title="Upload fotografije"
              >
                <Camera className="h-4 w-4" />
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Pitaj AI asistenta..."
                disabled={isStreaming || isAnalyzing}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!input.trim() || isStreaming || isAnalyzing}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-center text-[10px] text-botanika-cream/30">
              Demo analiza fotografije · Powered by Groq AI
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
