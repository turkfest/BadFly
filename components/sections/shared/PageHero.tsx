import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { MediaImage } from "@/components/ui/MediaImage";
import type { SiteImage } from "@/lib/images";

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  image?: SiteImage;
  actions?: ReactNode;
};

export function PageHero({ eyebrow, title, intro, image, actions }: Props) {
  return (
    <section className="grain relative overflow-hidden bg-bone-50 pb-16 pt-36 md:pb-24 md:pt-48">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-clay-400/10 blur-[120px]" />
      <div className="container">
        <Reveal className="max-w-5xl">
          <p className="eyebrow mb-8">{eyebrow}</p>
          <h1 className="font-display text-display-xl font-medium text-balance">{title}</h1>
        </Reveal>
        <Reveal delay={0.12} className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl text-lg leading-relaxed text-ink-600 md:text-xl">{intro}</p>
          {actions}
        </Reveal>
        {image && (
          <Reveal delay={0.2} className="mt-14 md:mt-20">
            <MediaImage image={image} ratio="aspect-[4/3] md:aspect-[21/9]" sizes="100vw" priority />
          </Reveal>
        )}
      </div>
    </section>
  );
}
