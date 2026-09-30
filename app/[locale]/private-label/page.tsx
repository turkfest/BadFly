import type { Metadata } from "next";
import { getDictionary, resolveLocale } from "@/lib/i18n/dictionaries";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { href } from "@/lib/routes";
import { privateLabelServices } from "@/lib/data/process";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ProcessTimeline } from "@/components/sections/shared/ProcessTimeline";
import { FaqAccordion } from "@/components/sections/shared/FaqAccordion";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { serviceIcons } from "@/components/sections/shared/serviceIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { getImage } from "@/lib/images";
import { cn } from "@/lib/cn";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.privateLabelPage.meta;
  return buildMetadata({ locale, route: "privateLabel", dict, title: t.title, description: t.description });
}

export default async function PrivateLabelPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.privateLabelPage;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: dict.nav.home, url: absoluteUrl(locale, "home") },
            { name: dict.nav.privateLabel, url: absoluteUrl(locale, "privateLabel") },
          ]),
          serviceJsonLd(locale, t.meta.title, t.meta.description),
          faqJsonLd(t.faq.items),
        ]}
      />

      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        intro={t.hero.intro}
        image={getImage("private-label-hero", locale)}
        actions={<LinkButton href={href(locale, "contact")}>{t.hero.cta}</LinkButton>}
      />

      <section className="section bg-bone-100">
        <div className="container">
          <SectionHeading eyebrow={t.model.eyebrow} title={t.model.title} intro={t.model.intro} />
          <Stagger className="mt-16 grid gap-4 lg:grid-cols-3 lg:gap-6">
            {t.model.tiers.map((tier, i) => {
              const featured = "highlight" in tier && !!tier.highlight;
              return (
                <StaggerItem
                  as="article"
                  key={tier.name}
                  className={cn(
                    "relative flex flex-col p-8 transition-transform duration-700 ease-premium hover:-translate-y-1 md:p-10",
                    featured ? "bg-ink-900 text-bone-50" : "border hairline bg-bone-50",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn("font-display text-sm", featured ? "text-clay-400" : "text-clay-500")}>
                      0{i + 1}
                    </span>
                    {featured && (
                      <span className="rounded-full bg-clay-500 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-bone-50">
                        {tier.highlight}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-8 font-display text-3xl font-medium tracking-tight">{tier.name}</h3>
                  <p className={cn("mt-3 leading-relaxed", featured ? "text-bone-200/75" : "text-ink-600")}>{tier.text}</p>
                  <ul className={cn("mt-10 space-y-3 border-t pt-8 text-sm", featured ? "border-bone-50/15" : "hairline")}>
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <Check size={16} className={featured ? "text-clay-400" : "text-clay-500"} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="section bg-bone-50">
        <div className="container">
          <SectionHeading eyebrow={dict.home.privateLabel.eyebrow} title={dict.home.privateLabel.title} intro={dict.home.privateLabel.intro} />
          <Stagger className="mt-16 grid gap-px border hairline bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-5">
            {privateLabelServices.map((id, i) => {
              const Icon = serviceIcons[id];
              const s = dict.privateLabelServices[id];
              return (
                <StaggerItem key={id} className="group relative bg-bone-50 p-8 transition-colors duration-500 hover:bg-bone-100">
                  <span className="absolute right-6 top-6 font-display text-xs text-ink-400">0{i + 1}</span>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border hairline text-ink-900 transition-all duration-500 ease-premium group-hover:border-clay-500 group-hover:bg-clay-500 group-hover:text-bone-50">
                    <Icon size={24} />
                  </span>
                  <h3 className="mt-10 font-display text-lg font-medium">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <ProcessTimeline
        steps={dict.process}
        eyebrow={t.process.eyebrow}
        title={t.process.title}
        intro={t.process.intro}
        stepLabel={dict.common.step}
      />

      <section className="section bg-bone-50">
        <div className="container">
          <SectionHeading eyebrow={t.benefits.eyebrow} title={t.benefits.title} />
          <Stagger className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {t.benefits.items.map((b) => (
              <StaggerItem key={b.title} className="border-t border-ink-900 pt-6">
                <h3 className="font-display text-xl font-medium tracking-tight">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-600">{b.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section bg-bone-100">
        <div className="container grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-6">{t.faq.eyebrow}</p>
            <h2 className="font-display text-display-md font-medium text-balance">{t.faq.title}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <FaqAccordion items={t.faq.items} />
          </Reveal>
        </div>
      </section>

      <ContactCta title={t.cta.title} text={t.cta.text} button={t.cta.button} href={href(locale, "contact")} />
    </>
  );
}
