import type { Dictionary } from "@/dictionaries/types";
import { industries } from "@/lib/data/industries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { MediaImage } from "@/components/ui/MediaImage";
import { getImage } from "@/lib/images";
import type { Locale } from "@/lib/i18n/config";

export function Industries({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home.industries;
  return (
    <section className="section bg-bone-50">
      <div className="container">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} intro={t.intro} />
        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {industries.map(({ id, image }, i) => {
            const item = dict.industries[id];
            return (
              <StaggerItem as="article" key={id} className="group relative overflow-hidden">
                <MediaImage image={getImage(image, locale)} ratio="aspect-[4/5]" zoom sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/25 to-transparent transition-opacity duration-700 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-bone-50 md:p-8">
                  <span className="font-display text-xs text-bone-200/70">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-display text-2xl font-medium tracking-tight">{item.name}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-bone-200/80 transition-colors duration-700 group-hover:text-bone-50">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
