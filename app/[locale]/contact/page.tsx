import type { Metadata } from "next";
import { getDictionary, resolveLocale } from "@/lib/i18n/dictionaries";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { Mail } from "@/components/ui/Icons";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.contactPage.meta;
  return buildMetadata({ locale, route: "contact", dict, title: t.title, description: t.description });
}

export default async function ContactPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.contactPage;

  const details = [
    { label: t.details.responseLabel, value: t.details.responseTime },
    { label: t.details.locationLabel, value: t.details.location },
    { label: t.details.languagesLabel, value: t.details.languages },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: dict.nav.home, url: absoluteUrl(locale, "home") },
            { name: dict.nav.contact, url: absoluteUrl(locale, "contact") },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: t.meta.title,
            url: absoluteUrl(locale, "contact"),
            about: { "@id": `${site.url}/#organization` },
          },
        ]}
      />

      <section className="grain relative overflow-hidden bg-bone-50 pb-24 pt-36 md:pb-36 md:pt-48">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-clay-400/10 blur-[120px]" />
        <div className="container grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-8">{t.eyebrow}</p>
              <h1 className="font-display text-display-xl font-medium text-balance">{t.title}</h1>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-600">{t.intro}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-14 border-t hairline pt-10">
              <h2 className="text-xs font-medium uppercase tracking-eyebrow text-ink-500">{t.details.title}</h2>
              <a
                href={`mailto:${site.email}`}
                className="group mt-6 inline-flex items-center gap-4 font-display text-2xl font-medium tracking-tight md:text-3xl"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-bone-50 transition-colors duration-500 group-hover:bg-clay-500">
                  <Mail size={20} />
                </span>
                <span className="underline-offset-8 group-hover:underline">{site.email}</span>
              </a>
              <dl className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
                {details.map((d) => (
                  <div key={d.label}>
                    <dt className="text-xs uppercase tracking-wider text-ink-400">{d.label}</dt>
                    <dd className="mt-1.5 text-ink-800">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="bg-bone-50 p-6 shadow-[0_40px_120px_-40px_rgba(14,14,16,0.18)] ring-1 ring-ink-900/5 sm:p-10 md:p-14">
              <ContactForm dict={t.form} recipient={site.email} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
