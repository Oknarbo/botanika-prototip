"use client";

import { motion } from "framer-motion";
import { Shield, Truck, HeadphonesIcon, Award } from "lucide-react";

const items = [
  { icon: Shield, label: "Provjerena oprema", sub: "Premium brendovi" },
  { icon: Truck, label: "Brza dostava", sub: "1-3 radna dana" },
  { icon: HeadphonesIcon, label: "AI podrška 24/7", sub: "Uvijek dostupan" },
  { icon: Award, label: "15+ godina iskustva", sub: "Stručni tim" },
];

export function TrustBar() {
  return (
    <section className="border-y border-botanika-cream/10 bg-botanika-dark/50 py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-botanika-green/10">
              <item.icon className="h-5 w-5 text-botanika-green" />
            </div>
            <div>
              <p className="text-sm font-medium text-botanika-cream">
                {item.label}
              </p>
              <p className="text-xs text-botanika-cream/40">{item.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
