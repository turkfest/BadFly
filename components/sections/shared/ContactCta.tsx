import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  text: string;
  button: string;
  href: string;
};

export function ContactCta({ eyebrow, title, text, button, href }: Props) {
  return (
    <section className="grain relative overflow-hidden bg-ink-900 text-bone-50">
      <div aria-hidden="true" className="absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-clay-500/20 blur-[140px]" />
      <div className="container relative py-28 md:py-40">
        <Reveal className="max-w-5xl">
          {eyebrow && <p className="eyebrow mb-8 text-bone-200/60">{eyebrow}</p>}
          <h2 className="font-display text-display-lg font-medium text-balance">{title}</h2>
        </Reveal>
        <Reveal delay={0.15} className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-lg leading-relaxed text-bone-200/75">{text}</p>
          <LinkButton href={href} variant="light" className="h-16 px-10 text-base">
            {button}
          </LinkButton>
        </Reveal>
      </div>
    </section>
  );
}
