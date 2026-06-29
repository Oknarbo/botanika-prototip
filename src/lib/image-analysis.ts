export interface ImageDiagnosis {
  diagnosis: string;
  severity: "low" | "medium" | "high";
  recommendations: { id: string; reason: string }[];
}

const diagnoses: ImageDiagnosis[] = [
  {
    diagnosis:
      "Prepoznajem **interveinalno požutjeljenje** na starijim listovima — klasičan simptom **nedostatka magnezija (CalMag)**, čest kod LED rasvjete i kokos supstrata.",
    severity: "medium",
    recommendations: [
      {
        id: "gnoj-calmag",
        reason: "CalMag Pro nadoknađuje magnezij i kalcij — prvi korak za žuto lišće.",
      },
      {
        id: "sub-coco-brick",
        reason: "Kokos zahtijeva redoviti CalMag — provjeri i supstrat.",
      },
    ],
  },
  {
    diagnosis:
      "Vjerojatno **pregrijavanje ili svjetlosni stres** — listovi su uvijeni prema gore i imaju suhe rubove. LED preblizu ili nedovoljna ventilacija.",
    severity: "high",
    recommendations: [
      {
        id: "vent-ac-infinity-t6",
        reason: "Jači odvod vrućine smanjuje stres od LED rasvjete.",
      },
      {
        id: "vent-clip-fan",
        reason: "Unutarnja cirkulacija zraka ravnomjerno hladi biljku.",
      },
      {
        id: "led-mars-ts1000",
        reason: "Provjeri udaljenost LED-a — preporučeno 30-45 cm u vegetaciji.",
      },
    ],
  },
  {
    diagnosis:
      "Primjećujem **tamne mrlje s žutim rubovima** — moguće **prekomjerno zalijevanje** ili početak gljivične infekcije (Botrytis/Pythium).",
    severity: "high",
    recommendations: [
      {
        id: "sub-biobizz-light-mix",
        reason: "Dobro drenirani supstrat smanjuje rizik od root rota.",
      },
      {
        id: "mj-bluelab-combo",
        reason: "Mjeri EC i pH — previsok EC uzrokuje stres korijena.",
      },
    ],
  },
  {
    diagnosis:
      "Listovi izgledaju **svijetlo zeleno i usporen rast** — vjerojatan **nedostatak dušika** u fazi vegetacije.",
    severity: "medium",
    recommendations: [
      {
        id: "gnoj-biobizz-grow",
        reason: "Bio-Grow bogat dušikom za vegetativni rast.",
      },
      {
        id: "gnoj-biobizz-fishmix",
        reason: "Fish-Mix dodatno potiče zdrav razvoj mladih biljaka.",
      },
    ],
  },
  {
    diagnosis:
      "Biljka izgleda **zdravo** s blagim znakovima **povećane potrebe za hranjivima** u fazi cvjetanja — spremna za prelazak na bloom hranu.",
    severity: "low",
    recommendations: [
      {
        id: "gnoj-biobizz-bloom",
        reason: "Bio-Bloom za fazu cvjetanja i razvoj cvjetova.",
      },
      {
        id: "gnoj-guanokalong-powder",
        reason: "Guanokalong dodaje fosfor i kalij za gusto cvjetanje.",
      },
    ],
  },
];

export function analyzeImageDemo(_imageBase64: string): ImageDiagnosis {
  const index = Math.floor(Math.random() * diagnoses.length);
  return diagnoses[index];
}

export function formatDiagnosisResponse(result: ImageDiagnosis): string {
  const severityLabel = {
    low: "Niska",
    medium: "Srednja",
    high: "Visoka",
  }[result.severity];

  const productsJson = JSON.stringify(result.recommendations, null, 2);

  return `## 🔬 Analiza fotografije

${result.diagnosis}

**Ozbiljnost:** ${severityLabel}

**Preporučeni sljedeći koraci:**
- Prilagodi zalijevanje i provjeri EC/pH
- Primijeni preporučena gnojiva postupno (50% doze)
- Prati promjene 3-5 dana

\`\`\`botanika-products
${productsJson}
\`\`\``;
}
