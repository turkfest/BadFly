import type { Dictionary } from "@/dictionaries/types";
import { Award, Clock, Factory, Sliders, Tag } from "@/components/ui/Icons";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const icons = [Factory, Award, Sliders, Clock, Tag];

export function TrustBar({ dict }: { dict: Dictionary["home"]["trust"] }) {
  return (
    <section aria-label={dict.label} className="border-y hairline bg-bone-50">
      <Stagger as="ul" className="container grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-5">
        {dict.items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <StaggerItem
              as="li"
              key={item}
              className="flex items-center gap-4 py-7 text-sm font-medium text-ink-800 lg:justify-center"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border hairline text-clay-500">
                <Icon size={18} />
              </span>
              {item}
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
