import type { Dictionary } from "@/dictionaries/types";
import type { ImageKey } from "@/lib/images";

export type IndustryId = keyof Dictionary["industries"];

export const industries: { id: IndustryId; image: ImageKey }[] = [
  { id: "fashion", image: "industries-fashion" },
  { id: "schools", image: "industries-schools" },
  { id: "universities", image: "industries-universities" },
  { id: "corporate", image: "industries-corporate" },
  { id: "sports", image: "industries-sports" },
  { id: "events", image: "industries-events" },
];
