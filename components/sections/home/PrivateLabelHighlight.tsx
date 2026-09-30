import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/dictionaries/types";
import { href } from "@/lib/routes";
import { privateLabelServices } from "@/lib/data/process";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { MediaImage } from "@/components/ui/MediaImage";
import { LinkButton } from "@/components/ui/Button";
import { serviceIcons } from "@/components/sections/shared/serviceIcons";
import { getImage } from "@/lib/images";

export function PrivateLabelHighlight({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home.privateLabel;
  return (
    <section className="section bg-bone-50">
      <div className="container grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow mb-6">{t.eyebrow}</p>
            <h2 className="font-display text-display-lg font-medium text-balance">{t.title}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">{t.intro}</p>
          </Reveal>

          <Stagger as="ul" className="mt-12 border-t hairline">
            {privateLabelServices.map((id) => {
              const Icon = serviceIcons[id];
              const s = dict.privateLabelServices[id];
              return (
                <StaggerItem as="li" key={id} className="group flex gap-6 border-b hairline py-6">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bone-200 text-ink-900 transition-colors duration-500 group-hover:bg-clay-500 group-hover:text-bone-50">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-medium">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-600">{s.text}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal className="mt-12 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={href(locale, "contact")}>{dict.common.startProject}</LinkButton>
            <LinkButton href={href(locale, "privateLabel")} variant="secondary" arrow={false}>
              {dict.common.discoverPrivateLabel}
            </LinkButton>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6" delay={0.15}>
          <div className="lg:sticky lg:top-32">
            <MediaImage
              image={getImage("private-label-materials", locale)}
              ratio="aspect-[3/2]"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
