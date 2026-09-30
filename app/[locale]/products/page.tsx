import type { Metadata } from "next";
import { getDictionary, resolveLocale } from "@/lib/i18n/dictionaries";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { href } from "@/lib/routes";
import { productGroups, products } from "@/lib/data/products";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { ProductFilter } from "@/components/products/ProductFilter";
import { MediaImage } from "@/components/ui/MediaImage";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { cn } from "@/lib/cn";
import { getImage, type ImageKey } from "@/lib/images";

type Props = { params: Promise<{ locale: string }> };

const showcaseImages: ImageKey[] = ["products-showcase-essentials", "products-showcase-education"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.productsPage.meta;
  return buildMetadata({ locale, route: "products", dict, title: t.title, description: t.description });
}

export default async function ProductsPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.productsPage;

  const items = products.map((p) => ({
    id: p.id,
    group: p.group,
    image: getImage(p.image, locale),
    name: dict.products.items[p.id].name,
    description: dict.products.items[p.id].description,
    meta: [
      { label: t.moqLabel, value: `${p.moq} ${t.pieces}` },
      { label: t.leadTimeLabel, value: `${p.leadWeeks} ${t.weeks}` },
    ],
  }));

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: t.meta.title,
    itemListElement: items.map((item) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: item.name, description: item.description },
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: dict.nav.home, url: absoluteUrl(locale, "home") },
            { name: dict.nav.products, url: absoluteUrl(locale, "products") },
          ]),
          itemListJsonLd,
        ]}
      />
      <PageHero eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <section className="bg-bone-50 pb-24 md:pb-36">
        <div className="container">
          <ProductFilter
            items={items}
            groups={productGroups.map((g) => ({ id: g, label: dict.products.groups[g] }))}
            allLabel={dict.products.groups.all}
            filterLabel={t.filterLabel}
            countLabel={t.resultCount}
            cardHref={href(locale, "contact")}
          />
        </div>
      </section>

      <section className="bg-bone-100">
        {t.showcase.map((s, i) => (
          <div key={s.title} className="container grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-20">
            <Reveal className={cn("lg:col-span-6", i % 2 === 1 && "lg:order-2")}>
              <MediaImage image={getImage(showcaseImages[i % showcaseImages.length], locale)} ratio="aspect-[4/5]" sizes="(min-width: 1024px) 50vw, 100vw" />
            </Reveal>
            <Reveal delay={0.1} className={cn("lg:col-span-5", i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-8")}>
              <p className="eyebrow mb-6">{s.eyebrow}</p>
              <h2 className="font-display text-display-md font-medium text-balance">{s.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-600">{s.text}</p>
              <ul className="mt-10 space-y-4 border-t hairline pt-8">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-bone-50">
                      <Check size={14} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        ))}
      </section>

      <ContactCta title={t.cta.title} text={t.cta.text} button={t.cta.button} href={href(locale, "contact")} />
    </>
  );
}
