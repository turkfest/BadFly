import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/lib/images";

type Props = {
  image: SiteImage;
  /** Container aspect ratio; the image is cropped with object-cover, never stretched. */
  ratio?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  zoom?: boolean;
};

export function MediaImage({
  image,
  ratio = "aspect-[4/5]",
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority,
  zoom = false,
}: Props) {
  return (
    <div className={cn("relative overflow-hidden bg-bone-200", ratio, className)}>
      <Image
        src={asset(image.src)}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        unoptimized={image.placeholder}
        style={{ objectPosition: image.position }}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          zoom && "transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.04]",
          imgClassName,
        )}
      />
    </div>
  );
}
