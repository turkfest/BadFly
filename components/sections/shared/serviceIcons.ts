import type { PrivateLabelServiceId } from "@/lib/data/process";
import { Layers, Package, Pen, Shield, Tag } from "@/components/ui/Icons";

export const serviceIcons: Record<PrivateLabelServiceId, typeof Tag> = {
  labels: Tag,
  packaging: Package,
  development: Pen,
  sourcing: Layers,
  quality: Shield,
};
