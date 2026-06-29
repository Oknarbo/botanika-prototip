"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useChatStore } from "@/stores/chat-store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

const setupPreview = {
  name: "Starter Setup 90×90",
  items: [
    "Mars Hydro Grow Tent 90×90",
    "Spider Farmer SF-2000 LED",
    "AC Infinity Cloudline T6",
    "BioBizz Light-Mix 50L",
    "BioBizz Bio-Grow + Bloom",
  ],
  total: 633.94,
};

export function SetupBuilderPreview() {
  const openChat = useChatStore((s) => s.openChat);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-botanika-cream sm:text-4xl">
              Smart Setup Builder
            </h2>
            <p className="mt-4 text-lg text-botanika-cream/50">
              Opiši prostor, budžet i iskustvo — AI sastavi kompletan grow
              setup prilagođen tebi, s točnom cijenom i svim potrebnim
              komponentama.
            </p>
            <Button
              className="mt-8"
              size="lg"
              onClick={() => openChat("setup-builder")}
            >
              Pokreni Setup Builder
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-botanika-green/20 bg-gradient-to-br from-botanika-green/10 to-transparent p-6 sm:p-8"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-botanika-cream">
                {setupPreview.name}
              </h3>
              <span className="rounded-full bg-botanika-green/20 px-3 py-1 text-xs font-medium text-botanika-green">
                AI generirano
              </span>
            </div>
            <ul className="space-y-3">
              {setupPreview.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-botanika-cream/70"
                >
                  <Check className="h-4 w-4 shrink-0 text-botanika-green" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-botanika-cream/10 pt-4">
              <span className="text-botanika-cream/50">Ukupna cijena</span>
              <span className="text-2xl font-bold text-botanika-green">
                {formatPrice(setupPreview.total)}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
