import type { Dictionary } from "@/dictionaries/types";

export type ProcessStepId = keyof Dictionary["process"];

export const processSteps: ProcessStepId[] = [
  "discovery",
  "design",
  "sampling",
  "production",
  "quality",
  "packaging",
  "delivery",
];

export type PrivateLabelServiceId = keyof Dictionary["privateLabelServices"];

export const privateLabelServices: PrivateLabelServiceId[] = [
  "labels",
  "packaging",
  "development",
  "sourcing",
  "quality",
];
