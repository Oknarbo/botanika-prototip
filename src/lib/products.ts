export type GrowthPhase = "kloniranje" | "vegetacija" | "cvjetanje" | "sve_faze";
export type ProductCategory =
  | "growbox"
  | "rasvjeta"
  | "ventilacija"
  | "supstrat"
  | "gnojiva"
  | "mjerenje"
  | "dodaci";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  brand: string;
  description: string;
  image: string;
  inStock: boolean;
  phase: GrowthPhase;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  growbox: "Growboxovi",
  rasvjeta: "Rasvjeta",
  ventilacija: "Ventilacija",
  supstrat: "Supstrati",
  gnojiva: "Gnojiva",
  mjerenje: "Mjerenje",
  dodaci: "Dodaci",
};

export const PHASE_LABELS: Record<GrowthPhase, string> = {
  kloniranje: "Kloniranje",
  vegetacija: "Vegetacija",
  cvjetanje: "Cvjetanje",
  sve_faze: "Sve faze",
};

export const products: Product[] = [
  {
    id: "gb-secret-120",
    name: "Secret Jardin Dark Room 120×120×200",
    price: 289.99,
    category: "growbox",
    brand: "Secret Jardin",
    description: "Profesionalni growbox 120×120 cm s reflektirajućom folijom Mylar 210D i čvrstim metalnim okvirom.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "gb-mars-90",
    name: "Mars Hydro Grow Tent 90×90×180",
    price: 149.99,
    category: "growbox",
    brand: "Mars Hydro",
    description: "Kompaktan growbox idealan za početnike — brza montaža, visoka refleksija i odlična zatamnjenost.",
    image: "https://images.unsplash.com/photo-1466692476866-aef1dfb1e735?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "led-spider-sf2000",
    name: "Spider Farmer SF-2000 LED 200W",
    price: 279.99,
    category: "rasvjeta",
    brand: "Spider Farmer",
    description: "Full-spectrum Samsung diodes LED panel za 90×90 do 120×120 cm. Visoka PAR vrijednost, niska potrošnja.",
    image: "https://images.unsplash.com/photo-1563565375-3cef8c5e2c2e?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "led-mars-ts1000",
    name: "Mars Hydro TS-1000 LED 150W",
    price: 159.99,
    category: "rasvjeta",
    brand: "Mars Hydro",
    description: "Efikasna LED rasvjeta za growbox do 90×90 cm. Idealna za vegetaciju i cvjetanje.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "vent-ac-infinity-t6",
    name: "AC Infinity Cloudline T6 Ventilator 6\"",
    price: 129.99,
    category: "ventilacija",
    brand: "AC Infinity",
    description: "Tihi inline ventilator s PWM kontrolom, idealan za odvod vrućine i vlage iz growboxa.",
    image: "https://images.unsplash.com/photo-1585779034823-6e8ae6256412?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "vent-carbon-filter",
    name: "Carbon Filter 150×400mm Aktivni Ugljen",
    price: 79.99,
    category: "ventilacija",
    brand: "Rhino Filter",
    description: "Visokokvalitetni carbon filter za uklanjanje mirisa. Kapacitet 600 m³/h.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4aaea?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "sub-biobizz-light-mix",
    name: "BioBizz Light-Mix 50L",
    price: 18.99,
    category: "supstrat",
    brand: "BioBizz",
    description: "Lagani organski supstrat s perliteom. Savršen za mlade biljke i autoflowere.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop",
    inStock: true,
    phase: "vegetacija",
  },
  {
    id: "sub-plagron-lightmix",
    name: "Plagron Lightmix 50L",
    price: 16.99,
    category: "supstrat",
    brand: "Plagron",
    description: "Univerzalni supstrat s niskim EC-om, pogodan za sjemenke i presadnice.",
    image: "https://images.unsplash.com/photo-1466692476866-aef1dfb1e735?w=600&h=600&fit=crop",
    inStock: true,
    phase: "vegetacija",
  },
  {
    id: "sub-coco-brick",
    name: "Coco Coir Brick 650g",
    price: 4.99,
    category: "supstrat",
    brand: "Plagron",
    description: "Stisnuti kokos za hidroponiju. Ekspandira na ~9L supstrata nakon namakanja.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4aaea?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "gnoj-biobizz-grow",
    name: "BioBizz Bio-Grow 1L",
    price: 14.99,
    category: "gnojiva",
    brand: "BioBizz",
    description: "Organsko tekuće gnojivo za fazu vegetacije. Bogato dušikom iz šećerne repice.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop",
    inStock: true,
    phase: "vegetacija",
  },
  {
    id: "gnoj-biobizz-bloom",
    name: "BioBizz Bio-Bloom 1L",
    price: 14.99,
    category: "gnojiva",
    brand: "BioBizz",
    description: "Organsko gnojivo za fazu cvjetanja. Potiče razvoj cvjetova i korijena.",
    image: "https://images.unsplash.com/photo-1466692476866-aef1dfb1e735?w=600&h=600&fit=crop",
    inStock: true,
    phase: "cvjetanje",
  },
  {
    id: "gnoj-guanokalong-powder",
    name: "Guanokalong Bat Guano Powder 1kg",
    price: 22.99,
    category: "gnojiva",
    brand: "Guanokalong",
    description: "Prirodno guano gnojivo bogato fosforom i kalijem. Idealno za cvjetanje.",
    image: "https://images.unsplash.com/photo-1585779034823-6e8ae6256412?w=600&h=600&fit=crop",
    inStock: true,
    phase: "cvjetanje",
  },
  {
    id: "gnoj-guanokalong-pellets",
    name: "Guanokalong Pellets 3kg",
    price: 34.99,
    category: "gnojiva",
    brand: "Guanokalong",
    description: "Spore otpuštanje hranjivih tvari. Odlično za organski uzgoj u supstratu.",
    image: "https://images.unsplash.com/photo-1563565375-3cef8c5e2c2e?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "gnoj-calmag",
    name: "CalMag Pro 1L",
    price: 12.99,
    category: "gnojiva",
    brand: "Plagron",
    description: "Kalcij-magnezij dodatak za LED uzgoj. Sprječava žutilo lišća i deficite.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "mj-bluelab-combo",
    name: "Bluelab Combo Meter pH/EC/Temp",
    price: 249.99,
    category: "mjerenje",
    brand: "Bluelab",
    description: "Profesionalni 3-u-1 mjerač za hidroponiju. Precizno mjerenje pH, EC i temperature.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4aaea?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "mj-ph-meter",
    name: "Milwaukee MW102 pH Meter",
    price: 89.99,
    category: "mjerenje",
    brand: "Milwaukee",
    description: "Pouzdan ručni pH meter s automatskom kalibracijom. Ideal za tlo i hidro.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "mj-ec-meter",
    name: "Essentials EC Meter",
    price: 49.99,
    category: "mjerenje",
    brand: "Essentials",
    description: "Jednostavan EC/TDS meter za praćenje koncentracije hranjivih tvari u vodi.",
    image: "https://images.unsplash.com/photo-1466692476866-aef1dfb1e735?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "dod-timer-digital",
    name: "Digitalni Timer 24h",
    price: 19.99,
    category: "dodaci",
    brand: "GSE",
    description: "Precizni digitalni timer za rasvjetu i ventilaciju. 15-min intervali.",
    image: "https://images.unsplash.com/photo-1585779034823-6e8ae6256412?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "dod-trening-net",
    name: "SCROG Net 120×120",
    price: 24.99,
    category: "dodaci",
    brand: "Secret Jardin",
    description: "Mreža za SCROG/LST trening. Ravnomjerna distribucija svjetla i veći prinos.",
    image: "https://images.unsplash.com/photo-1563565375-3cef8c5e2c2e?w=600&h=600&fit=crop",
    inStock: true,
    phase: "vegetacija",
  },
  {
    id: "dod-ph-up-down",
    name: "pH Up & Down Set 1L",
    price: 16.99,
    category: "dodaci",
    brand: "Plagron",
    description: "Set za podešavanje pH vrijednosti u hidroponiji. Up (baza) i Down (kiselina).",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "led-mars-fc3000",
    name: "Mars Hydro FC-3000 LED 300W",
    price: 349.99,
    category: "rasvjeta",
    brand: "Mars Hydro",
    description: "Bar LED rasvjeta za growbox 120×120 do 150×150 cm. Profesionalni rezultati.",
    image: "https://images.unsplash.com/photo-1563565375-3cef8c5e2c2e?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "gb-secret-60",
    name: "Secret Jardin Dark Room 60×60×160",
    price: 119.99,
    category: "growbox",
    brand: "Secret Jardin",
    description: "Mali growbox za discretan uzgoj. Savršen za balkon ili ormar.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
  {
    id: "gnoj-biobizz-fishmix",
    name: "BioBizz Fish-Mix 1L",
    price: 13.99,
    category: "gnojiva",
    brand: "BioBizz",
    description: "Organsko gnojivo s ribljim ekstraktom. Odlično za mlade biljke i outdoor.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4aaea?w=600&h=600&fit=crop",
    inStock: true,
    phase: "vegetacija",
  },
  {
    id: "vent-clip-fan",
    name: "Oscilating Clip Fan 15W",
    price: 29.99,
    category: "ventilacija",
    brand: "Secret Jardin",
    description: "Mali oscilirajući ventilator za cirkulaciju zraka unutar growboxa.",
    image: "https://images.unsplash.com/photo-1585779034823-6e8ae6256412?w=600&h=600&fit=crop",
    inStock: true,
    phase: "sve_faze",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsCatalogForAI(): string {
  return products
    .map(
      (p) =>
        `- ID: ${p.id} | ${p.name} | ${p.brand} | ${p.price}€ | ${CATEGORY_LABELS[p.category]} | Faza: ${PHASE_LABELS[p.phase]} | ${p.inStock ? "Na zalihi" : "Nema na zalihi"} | ${p.description}`
    )
    .join("\n");
}

export const brands = [...new Set(products.map((p) => p.brand))].sort();
