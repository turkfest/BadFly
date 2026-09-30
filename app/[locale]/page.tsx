import type { Metadata } from "next";
import { getDictionary, resolveLocale } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { href } from "@/lib/routes";
import { Hero } from "@/components/sections/home/Hero";
import { TrustBar } from "@/components/sections/home/TrustBar";
import { WhoWeAre } from "@/components/sections/home/WhoWeAre";
import { ProductCategories } from "@/components/sections/home/ProductCategories";
import { Industries } from "@/components/sections/home/Industries";
import { PrivateLabelHighlight } from "@/components/sections/home/PrivateLabelHighlight";
import { Gallery } from "@/components/sections/home/Gallery";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { ProcessTimeline } from "@/components/sections/shared/ProcessTimeline";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { getImage } from "@/lib/images";
import { gallery } from "@/lib/data/gallery";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return {
    ...buildMetadata({
      locale,
      route: "home",
      dict,
      title: dict.home.meta.title,
      description: dict.home.meta.description,
    }),
    title: { absolute: dict.meta.defaultTitle },
  };
}

export default async function HomePage({ params }: Props) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.home;
  // Placeholders never ship in the gallery; the section appears once real photos exist.
  const galleryItems = gallery
    .map((key) => ({ id: key, ...getImage(key, locale) }))
    .filter((item) => !item.placeholder);

  return (
    <>
      <Hero locale={locale} dict={t.hero} image={getImage("home-hero", locale)} />
      <TrustBar dict={t.trust} />
      <WhoWeAre locale={locale} dict={t.about} />
      <ProductCategories locale={locale} dict={dict} />
      <Industries locale={locale} dict={dict} />
      <ProcessTimeline
        steps={dict.process}
        eyebrow={t.process.eyebrow}
        title={t.process.title}
        intro={t.process.intro}
        stepLabel={dict.common.step}
      />
      <PrivateLabelHighlight locale={locale} dict={dict} />
      {galleryItems.length > 0 && <Gallery items={galleryItems} dict={t.gallery} />}
      <Testimonials dict={t.testimonials} labels={{ previous: dict.common.previous, next: dict.common.next }} />
      <ContactCta
        eyebrow={t.cta.eyebrow}
        title={t.cta.title}
        text={t.cta.text}
        button={t.cta.button}
        href={href(locale, "contact")}
      />
    </>
  );
}
