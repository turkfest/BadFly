# BadFly — Catalogue Image Mapping

**Source:** `source-materials/badfly-ing.pdf` (English catalogue, 30 pages, A4).

Each catalogue page is a single flattened page render, a JPEG of about 1054 × 1492 px. The BadFly logo, headings, icons, colour-swatch rows and page decorations are part of the same image as the product photo, so they could only be removed by cropping. Every crop below stays clear of the logo, text, icons, swatch rows, website addresses and empty margins. Crops of model photography start below the chin, so no faces are shown.

**Pipeline:** the steps are reproducible, and each writes its results into [`lib/images/manifest.json`](lib/images/manifest.json).

1. `npm run images:catalogue` ([scripts/extract-catalogue.mjs](scripts/extract-catalogue.mjs)) parses the PDF, takes the page render for each page, applies the crop rectangle and writes `images-src/<key>.png`.
2. `npm run images:optimize` ([scripts/optimize-images.mjs](scripts/optimize-images.mjs)):
   - locks the crop to the target aspect ratio without stretching or enlarging
   - encodes WebP at q88
   - writes one responsive variant per width (`-480w`, `-800w`, … and the full width)
   - deletes that entry's placeholder
3. `npm run images:check` runs automatically before every build. It checks that every variant exists, that its dimensions and ratio are right, that it is within the size budget, that alt text exists in EN and DE, and that no files are orphaned or hard-coded.

**Rendering:** `next/image` uses a custom static loader ([lib/images/loader.ts](lib/images/loader.ts)).
- It builds a `srcset` from the pre-generated widths, and every image sets `width` and `height`.
- Images are cropped into a fixed-ratio frame with `object-fit: cover`, which prevents layout shift and never stretches them.
- Images load lazily below the fold. Only the hero on each page loads with priority.

**Extracted image:** `objNNN.jpg` is the page's embedded JPEG render (the PDF object number). **Crop** is `x, y, width, height` in that render's pixels.

---

## Catalogue images in use (26)

| Website section | Key | PDF page | Extracted image | Crop | Final output files | Dimensions |
|---|---|---|---|---|---|---|
| Home / Hero | `home-hero` | 1 | obj449.jpg | 32, 320, 990, 990 | `/images/home/hero-collection-{480,800,990}w.webp` | 990 × 990 (1:1) |
| Home / Who we are | `home-craft` | 14 | obj162.jpg | 140, 200, 496, 620 | `/images/home/barista-aprons-{480,496}w.webp` | 496 × 620 (4:5) |
| Home / Products grid — T-Shirts | `products-t-shirts` | 3 | obj28.jpg | 20, 230, 630, 788 | `/images/products/t-shirts-{480,630}w.webp` | 630 × 788 (4:5) |
| Home / Products grid — Polo Shirts | `products-polo-shirts` | 2 | obj13.jpg | 20, 230, 630, 788 | `/images/products/polo-shirts-{480,630}w.webp` | 630 × 788 (4:5) |
| Home / Products grid — Hoodies | `products-hoodies` | 4 | obj40.jpg | 20, 230, 630, 788 | `/images/products/hoodies-{480,630}w.webp` | 630 × 788 (4:5) |
| Home / Products grid — Sweatshirts | `products-sweatshirts` | 7 | obj76.jpg | 20, 230, 630, 788 | `/images/products/sweatshirts-{480,630}w.webp` | 630 × 788 (4:5) |
| Home / Products grid — Corporate Apparel | `products-corporate-apparel` | 25 | obj318.jpg | 0, 490, 480, 600 | `/images/products/corporate-apparel-{480}w.webp` | 480 × 600 (4:5) |
| Home / Products grid — Workwear | `products-workwear` | 15 | obj177.jpg | 30, 165, 500, 625 | `/images/products/workwear-{480,500}w.webp` | 500 × 625 (4:5) |
| Home / Products grid — School Uniforms | `products-school-uniforms` | 10 | obj415.jpg | 10, 200, 600, 750 | `/images/products/school-uniforms-{480,600}w.webp` | 600 × 750 (4:5) |
| Home / Products grid — Graduation Apparel | `products-graduation-apparel` | 5 | obj52.jpg | 20, 230, 630, 788 | `/images/products/graduation-apparel-{480,630}w.webp` | 630 × 788 (4:5) |
| Home / Products grid — University Merchandise | `products-university-merchandise` | 6 | obj64.jpg | 20, 230, 630, 788 | `/images/products/university-merchandise-{480,630}w.webp` | 630 × 788 (4:5) |
| Home / Products grid — Accessories | `products-accessories` | 30 | obj380.jpg | 165, 350, 370, 462 | `/images/products/accessories-{370}w.webp` | 370 × 463 (4:5) |
| Home / Products grid — Bags | `products-bags` | 16 | obj192.jpg | 108, 180, 468, 585 | `/images/products/bags-{468}w.webp` | 468 × 585 (4:5) |
| Home / Products grid — Caps | `products-caps` | 29 | obj375.jpg | 170, 262, 434, 543 | `/images/products/caps-{434}w.webp` | 434 × 543 (4:5) |
| Products / Showcase — Essentials | `products-showcase-essentials` | 8 | obj88.jpg | 20, 230, 630, 788 | `/images/products/showcase-essentials-{480,630}w.webp` | 630 × 788 (4:5) |
| Products / Showcase — Education | `products-showcase-education` | 11 | obj126.jpg | 10, 200, 600, 750 | `/images/products/showcase-education-{480,600}w.webp` | 600 × 750 (4:5) |
| Home / Industries — Fashion Brands | `industries-fashion` | 22 | obj283.jpg | 0, 470, 480, 600 | `/images/industries/fashion-brands-{480}w.webp` | 480 × 600 (4:5) |
| Home / Industries — Schools | `industries-schools` | 11 | obj126.jpg | 10, 200, 600, 750 | `/images/industries/schools-{480,600}w.webp` | 600 × 750 (4:5) |
| Home / Industries — Universities | `industries-universities` | 8 | obj88.jpg | 20, 230, 630, 788 | `/images/industries/universities-{480,630}w.webp` | 630 × 788 (4:5) |
| Home / Private label manufacturing | `private-label-materials` | 17 | obj207.jpg | 60, 250, 600, 400 | `/images/private-label/private-label-materials-{480,600}w.webp` | 600 × 400 (3:2) |
| Home / Industries — Corporate Organizations | `industries-corporate` | 21 | obj268.jpg | 0, 360, 480, 600 | `/images/industries/corporate-organizations-{480}w.webp` | 480 × 600 (4:5) |
| Home / Industries — Sports Clubs | `industries-sports` | 9 | obj100.jpg | 10, 200, 600, 750 | `/images/industries/sports-clubs-{480,600}w.webp` | 600 × 750 (4:5) |
| Home / Industries — Event Companies | `industries-events` | 1 | obj449.jpg | 60, 600, 560, 700 | `/images/industries/event-companies-{480,560}w.webp` | 560 × 700 (4:5) |
| Private Label / Hero | `private-label-hero` | 1 | obj449.jpg | 0, 850, 1054, 452 | `/images/private-label/bags-and-aprons-{480,800,1054}w.webp` | 1054 × 452 (21:9) |
| About / Hero | `about-hero` | 1 | obj449.jpg | 0, 330, 1054, 452 | `/images/about/collection-row-{480,800,1054}w.webp` | 1054 × 452 (21:9) |
| About / Our story | `about-story` | 12 | obj138.jpg | 40, 200, 570, 712 | `/images/about/navy-apron-{480,570}w.webp` | 570 × 713 (4:5) |

Your priority ranges were followed: Corporate Apparel comes from pages 20–25 (p. 25, with p. 21 and p. 22 used for the related industry cards), Workwear from pages 12–15 (p. 15), and Bags from pages 16–19 (p. 16).

The EN, DE and TR alt text for every image is in `lib/images/manifest.json` and describes the actual product shown.

---

## Placeholders kept (8) — no suitable catalogue image

The catalogue contains product shots only and has no production or process photography. Until real photos exist, the "Inside BadFly" gallery is hidden from the site automatically, so no placeholder is visible to visitors.

| Website section | Key | Reason |
|---|---|---|
| Home / Gallery ("Inside BadFly") | `process-design-development`, `process-fabric-selection`, `process-sampling`, `process-garment-production`, `process-stitching-details`, `process-quality-control`, `process-packaging`, `process-international-delivery` | No production-floor or process photography. The garment detail tiles on pp. 20–28 are about 230 px and too small to use. |

Prompts for these images are in [IMAGE-GENERATION-PROMPTS.md](IMAGE-GENERATION-PROMPTS.md). To install a real photo, save it as `images-src/<key>.jpg` and run `npm run images:optimize`.

---

## Catalogue pages not used

| Pages | Content | Reason |
|---|---|---|
| 13 | Medical lab coat | Workwear is represented by p. 15, which the priority list names. |
| 18–19 | Backpacks, waist bag | Bags is represented by p. 16 and p. 17. On pp. 18–19 the products sit beside large blocks of text, so a clean 4:5 crop isn't possible. |
| 20, 23, 24, 26–28 | Blazers and jackets on models | Corporate is represented by pp. 21, 22 and 25. |

## Resolution note

All catalogue page renders are about 1054 px wide, so product crops are 370–1054 px wide. That is below the ideal targets (1200 px for cards, 2400 px for wide heroes). Nothing was enlarged; `srcset` never offers more pixels than the source has. For sharper results, ask for the original product photography used to build the catalogue, then re-run the pipeline with those files in `images-src/`.
