import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-botanika-cream/10 bg-botanika-dark/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-botanika-green" />
            <span className="font-semibold text-botanika-cream">Botanika</span>
            <span className="text-botanika-cream/40">· AI-first grow shop</span>
          </div>
          <p className="text-sm text-botanika-cream/40">
            © 2026 Botanika. Prototip — indoor growing reimagined.
          </p>
          <div className="flex gap-6 text-sm text-botanika-cream/50">
            <Link href="/shop" className="hover:text-botanika-green">
              Shop
            </Link>
            <button className="hover:text-botanika-green">Kontakt</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
