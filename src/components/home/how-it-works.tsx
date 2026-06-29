"use client";

import { motion } from "framer-motion";
import { Camera, MessageSquare, ShoppingBag, Wrench } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Postavi pitanje",
    description:
      "Pitaj bilo što — od LED lampe do deficita hranjiva. AI poznaje cijeli katalog.",
  },
  {
    icon: Camera,
    title: "Upload fotografije",
    description:
      "Pošalji sliku biljke i dobij dijagnozu — žuto lišće, stres, deficiti.",
  },
  {
    icon: ShoppingBag,
    title: "Preporuke proizvoda",
    description:
      "AI predlaže točne proizvode kao kartice — dodaj u košaricu jednim klikom.",
  },
  {
    icon: Wrench,
    title: "Setup Builder",
    description:
      "Opiši prostor i budžet — AI sastavi kompletan grow setup s ukupnom cijenom.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-botanika-cream/10 bg-botanika-dark/30 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-botanika-cream sm:text-4xl">
            Kako radi AI Agent
          </h2>
          <p className="mt-3 text-botanika-cream/50">
            Budućnost grow shopa — personalizirano, instant, stručno
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl border border-botanika-cream/10 bg-botanika-dark/60 p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-botanika-green/15">
                <step.icon className="h-6 w-6 text-botanika-green" />
              </div>
              <span className="text-xs font-medium text-botanika-green">
                Korak {i + 1}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-botanika-cream">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-botanika-cream/50">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
