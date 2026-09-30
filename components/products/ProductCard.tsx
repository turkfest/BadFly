import Link from "next/link";
import { MediaImage } from "@/components/ui/MediaImage";
import { ArrowUpRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/lib/images";

type Props = {
  index: number;
  name: string;
  description: string;
  image: SiteImage;
  href: string;
  meta?: { label: string; value: string }[];
  className?: string;
};

export function ProductCard({ index, name, description, image, href, meta, className }: Props) {
  return (
    <Link href={href} className={cn("group block", className)}>
      <div className="relative">
        <MediaImage image={image} ratio="aspect-[4/5]" zoom sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" />
        <span className="absolute left-3 top-3 bg-bone-50/90 px-2 py-1 font-display text-xs text-ink-700">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-bone-50 text-ink-900 opacity-0 transition-all duration-500 ease-premium group-hover:opacity-100 group-focus-visible:opacity-100">
          <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="pt-5">
        <h3 className="font-display text-lg font-medium tracking-tight md:text-xl">{name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{description}</p>
        {meta && (
          <dl className="mt-4 flex gap-6 border-t hairline pt-4 text-xs">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="uppercase tracking-wider text-ink-400">{m.label}</dt>
                <dd className="mt-1 font-medium text-ink-800">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Link>
  );
}
