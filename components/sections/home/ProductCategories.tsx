import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/dictionaries/types";
import { href } from "@/lib/routes";
import { products } from "@/lib/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";
import { getImage } from "@/lib/images";

export function ProductCategories({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home.products;
  return (
    <section id="collections" className="section bg-bone-100">
      <div className="container">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          intro={t.intro}
          action={
            <LinkButton href={href(locale, "products")} variant="secondary">
              {dict.common.viewAllProducts}
            </LinkButton>
          }
        />
        <Stagger className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4" stagger={0.05}>
          {products.map((p, i) => (
            <StaggerItem key={p.id}>
              <ProductCard
                index={i}
                name={dict.products.items[p.id].name}
                description={dict.products.items[p.id].description}
                image={getImage(p.image, locale)}
                href={href(locale, "products")}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
