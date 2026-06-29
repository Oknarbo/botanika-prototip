import { NextRequest } from "next/server";
import { groq } from "@ai-sdk/groq";
import {
  streamText,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";
import { buildSystemPrompt } from "@/lib/ai-prompt";

export const maxDuration = 30;

function getDemoResponse(lastUserMessage: string): string {
  const msg = lastUserMessage.toLowerCase();

  if (msg.includes("setup") || msg.includes("90") || msg.includes("500")) {
    return `Odlično! Za **starter setup 90×90** s budžetom oko 500€ preporučujem:

**Growbox:** Mars Hydro Grow Tent 90×90×180 — kompaktan i pouzdan
**Rasvjeta:** Mars Hydro TS-1000 LED — savršena za ovu veličinu
**Ventilacija:** AC Infinity Cloudline T6 — tih i učinkovit
**Supstrat:** BioBizz Light-Mix 50L — idealan za početnike
**Gnojiva:** BioBizz Bio-Grow + Bio-Bloom set

**Ukupna cijena: ~633€** — malo iznad budžeta, ali kompletan kvalitetan setup.

\`\`\`botanika-products
[
  {"id": "gb-mars-90", "reason": "Kompaktan growbox idealan za 90×90 prostor"},
  {"id": "led-mars-ts1000", "reason": "LED rasvjeta savršene snage za ovaj growbox"},
  {"id": "vent-ac-infinity-t6", "reason": "Tihi ventilator za odvod vrućine"},
  {"id": "sub-biobizz-light-mix", "reason": "Lagani supstrat za početnike"}
]
\`\`\``;
  }

  if (msg.includes("žut") || msg.includes("zut") || msg.includes("lišće") || msg.includes("lisce")) {
    return `**Žuto lišće** je jedan od najčešćih problema u indoor uzgoju. Najčešći uzroci:

1. **Nedostatak magnezija (CalMag)** — posebno kod LED rasvjete i kokosa
2. **Prekomjerno zalijevanje** — žuti donji listovi
3. **Nedostatak dušika** — svijetlo zelena boja + žutilo

Za LED setup s kokos supstratom, prvo dodaj **CalMag Pro** — riješava 80% slučajeva.

\`\`\`botanika-products
[
  {"id": "gnoj-calmag", "reason": "CalMag Pro — prvi korak protiv žutog lišća kod LED-a"},
  {"id": "mj-ph-meter", "reason": "Provjeri pH — nepravilan pH uzrokuje deficite"}
]
\`\`\``;
  }

  if (msg.includes("led") || msg.includes("lampa") || msg.includes("rasvjeta")) {
    return `Za odabir LED rasvjete, ključna je **veličina growboxa**:

| Growbox | Preporuka | Cijena |
|---------|-----------|--------|
| 60×60 | Mars TS-1000 (smanjen output) | 159€ |
| 90×90 | Mars TS-1000 ili Spider SF-2000 | 160-280€ |
| 120×120 | Spider SF-2000 ili Mars FC-3000 | 280-350€ |

Za **početnike** preporučujem **Mars Hydro TS-1000** — odličan omjer cijene i kvalitete.

\`\`\`botanika-products
[
  {"id": "led-mars-ts1000", "reason": "Najbolji omjer cijene i kvalitete za početnike"},
  {"id": "led-spider-sf2000", "reason": "Premium opcija s Samsung diodama"}
]
\`\`\``;
  }

  if (msg.includes("cvjet") || msg.includes("bloom") || msg.includes("gnojiv")) {
    return `Za **fazu cvjetanja** preporučujem organski pristup:

**BioBizz Bio-Bloom** — tekuće gnojivo za cvjetanje
**Guanokalong Bat Guano** — prirodni fosfor i kalij

Kombinacija daje gusto cvjetanje s punim aromama.

\`\`\`botanika-products
[
  {"id": "gnoj-biobizz-bloom", "reason": "Organsko gnojivo za fazu cvjetanja"},
  {"id": "gnoj-guanokalong-powder", "reason": "Guano za gusto cvjetanje i aromu"}
]
\`\`\``;
  }

  return `Bok! Ja sam Botanika AI Grow Asistent. 🌱

Mogu ti pomoći s:
- **Odabirom opreme** — LED, growbox, ventilacija
- **Dijagnostikom** — pošalji fotografiju biljke
- **Setup Builderom** — reci mi veličinu prostora i budžet
- **Gnojivima** — preporuke za svaku fazu rasta

Što te zanima? Probaj pitati npr. "Trebam setup za 90×90" ili "Zašto mi lišće požuti?"

\`\`\`botanika-products
[
  {"id": "gb-mars-90", "reason": "Najpopularniji growbox za početnike"},
  {"id": "led-mars-ts1000", "reason": "Najprodavanija LED rasvjeta"}
]
\`\`\``;
}

function createDemoStream(text: string, messages: UIMessage[]) {
  const textId = "demo-response";

  return createUIMessageStream({
    originalMessages: messages,
    async execute({ writer }) {
      writer.write({ type: "text-start", id: textId });

      const chunkSize = 12;
      for (let i = 0; i < text.length; i += chunkSize) {
        writer.write({
          type: "text-delta",
          id: textId,
          delta: text.slice(i, i + chunkSize),
        });
        await new Promise((r) => setTimeout(r, 20));
      }

      writer.write({ type: "text-end", id: textId });
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const lastUserMsg = [...messages]
      .reverse()
      .find((m) => m.role === "user");

    const lastText =
      lastUserMsg?.parts
        ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join("") ?? "";

    if (!process.env.GROQ_API_KEY) {
      const demoResponse = getDemoResponse(lastText);
      const stream = createDemoStream(demoResponse, messages);
      return createUIMessageStreamResponse({ stream });
    }

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: buildSystemPrompt(),
      messages: await convertToModelMessages(messages),
      temperature: 0.7,
      maxOutputTokens: 1500,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Greška pri generiranju odgovora." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
