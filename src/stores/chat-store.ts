import { create } from "zustand";
import type { ProductRecommendation } from "@/lib/chat-parser";

export type ChatMode = "general" | "setup-builder" | "diagnosis";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: ProductRecommendation[];
  imageUrl?: string;
  isStreaming?: boolean;
}

interface ChatState {
  isOpen: boolean;
  mode: ChatMode;
  messages: ChatMessage[];
  isLoading: boolean;
  openChat: (mode?: ChatMode) => void;
  closeChat: () => void;
  toggleChat: () => void;
  setMode: (mode: ChatMode) => void;
  addMessage: (message: Omit<ChatMessage, "id">) => string;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  mode: "general",
  messages: [],
  isLoading: false,
  openChat: (mode = "general") =>
    set((state) => ({
      isOpen: true,
      mode,
      messages:
        state.messages.length === 0
          ? [
              {
                id: "welcome",
                role: "assistant",
                content:
                  "Bok! 👋 Ja sam Botanika AI Grow Asistent. Mogu ti pomoći odabrati opremu, dijagnosticirati probleme s biljkama (pošalji fotografiju!) ili sastaviti kompletan setup. Što te zanima?",
              },
            ]
          : state.messages,
    })),
  closeChat: () => set({ isOpen: false }),
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  setMode: (mode) => set({ mode }),
  addMessage: (message) => {
    const id = crypto.randomUUID();
    set((state) => ({
      messages: [...state.messages, { ...message, id }],
    }));
    return id;
  },
  updateMessage: (id, updates) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  clearMessages: () => set({ messages: [] }),
}));
