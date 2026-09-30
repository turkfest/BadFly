import type en from "./en";

// English is the source of truth; every other locale must match this shape.
export type Dictionary = typeof en;
