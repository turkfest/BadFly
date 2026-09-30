import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/dictionaries/types";
import { href } from "@/lib/routes";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { MediaImage } from "@/components/ui/MediaImage";
import { LinkButton } from "@/components/ui/Button";
import { getImage } from "@/lib/images";

export function WhoWeAre({ locale, dict }: { locale: Locale; dict: Dictionary["home"]["about"] }) {
  return (
    <section className="section bg-bone-50">
      <div className="container grid gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <MediaImage
            image={getImage("home-craft", locale)}
            ratio="aspect-[4/5]"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </Reveal>

        <div className="flex flex-col justify-center lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-6">{dict.eyebrow}</p>
            <h2 className="font-display text-display-md font-medium text-balance">{dict.title}</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 space-y-5 text-lg leading-relaxed text-ink-600">
            {dict.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>

          <Stagger className="mt-12 grid gap-px border hairline bg-ink-900/10 sm:grid-cols-2">
            {dict.pillars.map((pillar, i) => (
              <StaggerItem key={pillar.title} className="bg-bone-50 p-7">
                <span className="font-display text-sm text-clay-500">0{i + 1}</span>
                <h3 className="mt-3 font-display text-xl font-medium">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{pillar.text}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-10">
            <LinkButton href={href(locale, "about")} variant="link">
              {dict.cta}
            </LinkButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
