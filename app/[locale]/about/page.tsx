import type { Metadata } from "next";
import { getDictionary, resolveLocale } from "@/lib/i18n/dictionaries";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { href } from "@/lib/routes";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { MediaImage } from "@/components/ui/MediaImage";
import { JsonLd } from "@/components/ui/JsonLd";
import { getImage } from "@/lib/images";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.aboutPage.meta;
  return buildMetadata({ locale, route: "about", dict, title: t.title, description: t.description });
}

export default async function AboutPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.aboutPage;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.nav.home, url: absoluteUrl(locale, "home") },
          { name: dict.nav.about, url: absoluteUrl(locale, "about") },
        ])}
      />

      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        intro={t.hero.intro}
        image={getImage("about-hero", locale)}
      />

      <section className="section bg-bone-50">
        <div className="container grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6">{t.story.eyebrow}</p>
              <h2 className="font-display text-display-md font-medium text-balance">{t.story.title}</h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 space-y-6 text-lg leading-relaxed text-ink-600">
              {t.story.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <MediaImage image={getImage("about-story", locale)} ratio="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, 100vw" />
          </Reveal>
        </div>
      </section>

      <section className="bg-bone-50">
        <div className="container">
          <Stagger className="grid grid-cols-2 gap-px border-y hairline bg-ink-900/10 lg:grid-cols-4">
            {t.stats.map((s) => (
              <StaggerItem key={s.label} className="bg-bone-50 px-2 py-12 md:px-8 md:py-16">
                <p className="font-display text-5xl font-medium tracking-tight md:text-6xl">{s.value}</p>
                <p className="mt-3 text-sm text-ink-500">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section bg-ink-900 text-bone-50">
        <div className="container grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-bone-50/10">
          {[t.mission, t.vision].map((block, i) => (
            <Reveal key={block.title} delay={i * 0.1} className="md:px-12 md:first:pl-0 md:last:pr-0">
              <p className="eyebrow mb-8 text-bone-200/60">{block.title}</p>
              <p className="font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl">{block.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-bone-100">
        <div className="container">
          <SectionHeading eyebrow={t.philosophy.eyebrow} title={t.philosophy.title} intro={t.philosophy.intro} />
          <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {t.philosophy.items.map((item, i) => (
              <StaggerItem
                key={item.title}
                className="flex min-h-[18rem] flex-col justify-between bg-bone-50 p-8 transition-transform duration-700 ease-premium hover:-translate-y-1"
              >
                <span className="font-display text-5xl font-medium text-clay-500/80">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl font-medium tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ContactCta title={t.cta.title} text={t.cta.text} button={t.cta.button} href={href(locale, "contact")} />
    </>
  );
}
