# BadFly — Image Inventory & Generation Prompts

**Status:** 24 of 34 images now come from the BadFly catalogue (`source-materials/badfly-ing.pdf`); see [IMAGE-MAPPING.md](IMAGE-MAPPING.md). The prompts below are still needed for the 10 remaining placeholders listed in section 5. Prompts for catalogue-covered keys are kept for when higher-resolution originals or new photography are commissioned.

Everything the site knows about each image is stored in [`lib/images/manifest.json`](lib/images/manifest.json): the file path, target size, crop focus, section and EN/DE alt text. Components get their images through `getImage(key, locale)` and never hard-code image paths.

---

## 1. How to install a final image

1. Save the approved image as `images-src/<key>.jpg`. Use `.png`, `.webp` or `.tif` if that's the format you have. `<key>` is the manifest key shown in each heading below. The file must be at least the target size.
2. Run `npm run images:optimize`. The script:
   - crops the image to the target aspect ratio, using the `position` value as the focal point
   - resizes it without enlarging
   - encodes it as WebP at ≤ 350 KB
   - writes it to the `file` path
   - marks the entry `final` and records the real size
   - deletes that entry's placeholder
3. Run `npm run images:check`. It also runs automatically before every `npm run build`.
4. If the subject isn't centred, adjust `position` in the manifest. The format is a CSS `object-position` value such as `"50% 30%"`.

Images that are already `final` are never overwritten unless you pass `--force`, so company photography is protected.

---

## 2. Review of the company presentation (`OKUL CONCEPT ENG.pdf` / `ALMANCA.pdf`)

| Finding | Count | Implication |
|---|---|---|
| Lifestyle photos of two young models on a school or university campus | 44 | Every photo has identifiable faces, and the school context suggests minors may be pictured. Faces can be reused only if cropped out. |
| Real Turkish institution names or crests printed on the products (e.g. İTÜ, Hacettepe, Dokuz Eylül/DEU, Özyeğin/ÖZÜ, TED, Başkent, İstanbul, Anadolu, Galatasaray) | ~30 | Showing these names to European buyers suggests client relationships that haven't been verified. Not used. |
| Mugs and keychains with university crests | 4 | Same trademark issue. Not used. |
| Stylised 3D icons (handshake, truck, stopwatch) | 6 | Clip-art style that conflicts with the premium direction. Not used. |
| Resolution | — | 750–1100 px wide, which is below every target size. The images would be upscaled or soft at hero and showcase sizes. |
| Colour-swatch rows (small cut-out garments on white) | ~12 | Each garment is only about 100 px wide, too small for a product card. |

**Reused (1):** Photo 47 (plain black T-shirts and black canvas crossbody bags) was cropped from the shoulders down to the shoes. The crop shows no faces and no readable branding, and becomes `products-bags` (590×738 WebP, 66 KB). It is below the 1200 px target, so replace it with a higher-resolution original or a generated image when possible.

**Could be reused only if you confirm:** the "Class of 2024" graduation hoodie (photo 52) and the plain hoodie/T-shirt shots (photos 08, 09, 53). These carry college names ("Sukar College", "Sular College") that may or may not be fictional sample brands. If you confirm the names are fictional and send the original high-resolution files, crop them the same face-free way.

---

## 3. Global art direction (prepend to every prompt)

> Editorial product photography for a premium European B2B apparel manufacturer. Calm, minimal, architectural. Soft diffused north-facing daylight, gentle long shadows, true-to-life colour, fine fabric texture visible. Neutral palette of warm off-white (#F6F3EE), sand, stone grey, charcoal and ink black, with occasional muted terracotta (#B4532A), navy, bottle green or burgundy garments. Surfaces: honed limestone, pale oak, matte plaster, brushed steel. Clean, uncluttered, precise composition with generous negative space. Shot on a medium-format camera, 80 mm lens, f/5.6, high dynamic range, subtle film grain. Photorealistic.

**Negative prompt / avoid (append to every prompt):**

> text, letters, numbers, logos, brand names, labels with writing, watermarks, signatures, identifiable faces, portraits, eye contact, retail shop interior, shop window, price tags, mannequins in a store, e-commerce white-background packshot, cheap stock-photo look, oversaturated colours, neon, clutter, dirty or old factory, rusty machinery, dim fluorescent lighting, crowded workers, certification marks, flags, country symbols, sustainability icons, CGI plastic look, distorted hands, extra fingers, warped fabric

**People:** use hands and forearms only. Crop at the shoulder or below and never show a face. Keep sleeves and clothing neutral.

---

## 4. Image inventory & prompts

Columns: **Key**, **target file**, **size (aspect)**, **page / section**, **display crop**.

### 4.1 Home

#### `home-hero` — `/images/home/hero-apparel-studio.webp`
- **Size:** 2400 × 1400 (12:7) · **Section:** Home / Hero · **Priority:** yes (only priority image on the page)
- **Display crops:** 4:5 on mobile, 16:9 on tablet, 21:9 on desktop, so keep the subject in the central 60 % of the frame and leave calm space at the bottom for the headline overlay.
- **Purpose:** Sets up the whole brand in the first screen: premium product, material quality, development expertise.
- **Alt (EN):** Folded premium cotton garments, fabric swatches and technical sketches arranged on a studio worktable
- **Prompt:** Wide editorial still life in a bright minimalist design studio with a limestone floor and pale plaster walls. A long pale-oak worktable holds neat stacks of folded heavyweight cotton T-shirts, hoodies and polo shirts in off-white, sand, charcoal, navy and muted terracotta. Beside them lie fanned fabric swatch books, cones of thread in matching tones, a tailor's measuring tape, and technical flat sketches on matte paper with no readable text. Soft daylight falls from tall windows on the left and throws gentle long shadows. The camera is at a low three-quarter angle, and a shallow depth of field keeps the folded garments sharp and fades the background. Quiet, premium, organised. No people.

#### `home-craft` — `/images/home/stitching-detail.webp`
- **Size:** 1200 × 1500 (4:5) · **Section:** Home / Who we are
- **Purpose:** Craftsmanship and precision behind the partnership story.
- **Alt (EN):** Hands guiding a garment seam under an industrial sewing machine needle
- **Prompt:** Close-up, portrait orientation. Two hands with neutral sleeves guide the side seam of a charcoal cotton sweatshirt under the needle of a modern, clean industrial flatlock sewing machine. The needle and presser foot are in crisp focus, and the thread is tonal. The machine is matte white and brushed steel, the table surface is pale oak, and the background is softly blurred in warm grey. Soft window light comes from the right. No face, no text.

### 4.2 Private label

#### `private-label-materials` — `/images/private-label/private-label-materials.webp`
- **Size:** 1800 × 1200 (3:2) · **Section:** Home / Private label manufacturing
- **Purpose:** Shows everything a private-label client receives: labels, packaging, materials, development.
- **Alt (EN):** Blank woven labels, folded garments, thread cones, fabric swatches and a technical sketch on a worktable
- **Prompt:** Overhead flat-lay on a honed limestone surface, arranged on a precise grid with generous spacing:
  - blank woven neck labels in off-white and black with no writing, plus a small roll of blank satin care-label tape
  - blank kraft hang tags on cotton string
  - an unprinted matte kraft mailer box, open, with folded off-white tissue paper
  - two folded T-shirts (sand, ink black)
  - cotton fabric swatches pinned together
  - thread cones in terracotta, navy and cream
  - a technical garment flat sketch on paper with only lines and no text
  - a steel ruler and fabric scissors

  Soft even daylight with subtle shadows. Calm, orderly, premium. No logos, no brand names.

#### `private-label-hero` — `/images/private-label/product-development.webp`
- **Size:** 2400 × 1400 (12:7) · **Section:** Private Label / Hero · **Display:** 4:3 on mobile, 21:9 on desktop
- **Alt (EN):** Hands reviewing a garment sample next to fabric swatches and a technical drawing
- **Prompt:** Wide shot of a bright product-development room. On a long oak table, a pair of hands (neutral sleeves, no face) holds up the collar of a navy piqué polo sample to inspect it. Around it:
  - fabric swatch cards
  - colour-matching thread cones
  - a tape measure
  - a technical sketch with lines only

  A dress form with a sand-coloured jacket sample and a clothing rail with a few neutral garments sit softly out of focus. The architecture is clean: plaster walls, large window light. Keep the main subject centred with calm margins on both sides.

### 4.3 About

#### `about-hero` — `/images/about/production-floor.webp`
- **Size:** 2400 × 1400 (12:7) · **Section:** About / Hero · **Display:** 4:3 on mobile, 21:9 on desktop
- **Alt (EN):** Organised sewing line with neatly stacked garment components in soft daylight
- **Prompt:** Wide, calm view down a clean modern sewing line. The room has white epoxy floors, matte white industrial sewing machines in an orderly row, and bundles of cut cotton panels in sand and charcoal stacked neatly in shallow grey trays. Large skylights and windows give soft even daylight. Shoot at an architectural perspective with a slight central vanishing point and shallow depth of field. The space is empty of people, or at most one far-away blurred figure seen from behind with no face. Organised, contemporary, quiet. Avoid clutter, signage and flags. Nothing should suggest a specific factory size.

#### `about-story` — `/images/about/hands-at-work.webp`
- **Size:** 1200 × 1500 (4:5) · **Section:** About / Our story
- **Alt (EN):** Close-up of hands aligning fabric panels on a cutting table
- **Prompt:** Portrait close-up of two hands smoothing and aligning layered cotton fabric panels in off-white and terracotta on a large pale cutting table. A paper pattern piece with lines only and pattern weights sit nearby. Soft side light shows the weave of the fabric. The background is blurred and neutral. No face, no text.

### 4.4 Product categories (4:5, 1200 × 1500)

**Shared direction:** one garment or a small, precise arrangement on a honed limestone plinth or pale-oak surface, in front of a warm off-white plaster wall. Soft daylight from the upper left and one gentle shadow. The product fills about 60 % of the frame and is centred with calm space above. Same camera height and lens for every card so the set looks consistent. No people unless noted, no text, no logos, no hangers with branding.

| Key | File | Section | Alt (EN) | Prompt (after shared direction) |
|---|---|---|---|---|
| `products-t-shirts` | `/images/products/t-shirts.webp` | Home / Products grid | Stack of folded plain T-shirts in neutral tones on a stone plinth | A precise stack of five folded heavyweight cotton T-shirts in off-white, sand, stone grey, charcoal and ink black. The crisp ribbed crew necks are visible, and the top shirt is slightly offset to show the fabric texture. |
| `products-polo-shirts` | `/images/products/polo-shirts.webp` | ″ | Piqué polo shirt on a hanger showing collar and placket detail | A navy cotton piqué polo on a plain pale-wood hanger against the plaster wall, three-quarter view. The knitted collar, two-button placket and tonal buttons are in sharp focus, with a folded bottle-green polo on the plinth below. |
| `products-hoodies` | `/images/products/hoodies.webp` | ″ | Heavyweight hoodie laid flat, showing hood, drawcords and ribbed cuffs | A heavyweight charcoal brushed-fleece hoodie with a sand hoodie folded beside it. The flat drawcords with metal tips and the ribbed cuffs and hem are clearly visible. |
| `products-sweatshirts` | `/images/products/sweatshirts.webp` | ″ | Folded crewneck sweatshirts in muted colours with ribbed hems | Three folded crewneck sweatshirts stacked (burgundy, stone grey, off-white), showing the ribbed neck, cuffs and hem and the loopback fabric on a turned-back cuff. |
| `products-corporate-apparel` | `/images/products/corporate-apparel.webp` | ″ | Navy jacket, shirt and knit polo arranged as a coordinated corporate outfit | A coordinated capsule: a navy softshell jacket on a plain wooden hanger, a light-blue oxford shirt and a folded charcoal knit polo on the plinth. Sharp, professional, understated. |
| `products-workwear` | `/images/products/workwear.webp` | ″ | Durable work jacket and trousers with reinforced seams and utility pockets | A charcoal canvas work jacket and matching trousers, neatly folded. Triple-stitched seams, bar-tack reinforcements and utility pockets are visible. Clean and premium, not dirty or industrial. |
| `products-school-uniforms` | `/images/products/school-uniforms.webp` | ″ | School uniform set with blazer, shirt, knit jumper and trousers on hangers | A navy blazer (no crest), a white shirt, a V-neck knit jumper in bottle green and grey trousers on plain wooden hangers on a minimal steel rail. Neat and timeless. No badges, no emblems. |
| `products-university-merchandise` | `/images/products/university-merchandise.webp` | ″ | Unbranded varsity-style sweatshirt, cap and tote bag arranged as a campus collection | An unbranded varsity-style crew sweatshirt in heather grey with a navy ribbed trim, a folded navy baseball cap and a natural canvas tote bag on the oak surface. No letters, crests or numbers. |
| `products-graduation-apparel` | `/images/products/graduation-apparel.webp` | ″ | Graduation gown and stole folded beside a mortarboard cap | A neatly folded black graduation gown with a satin burgundy stole draped across it and a black mortarboard cap with a tassel beside it. Elegant, ceremonial, no text or insignia. |
| `products-accessories` | `/images/products/accessories.webp` | ″ | Knitted scarf, beanie and woven lanyard arranged on a neutral surface | A folded ribbed-knit scarf in sand, a cuffed beanie in charcoal and a coiled woven lanyard in terracotta with a brushed-metal clip, arranged in a precise composition. |
| `products-bags` | `/images/products/bags.webp` | ″ | Cream canvas messenger bag with adjustable shoulder strap | **Now catalogue p. 16.** Replacement prompt if needed: a natural canvas tote, a black canvas crossbody bag with a leather-look strap and an off-white drawstring bag on the plinth. Visible stitching, no text on patches. |
| `products-caps` | `/images/products/caps.webp` | ″ | Six-panel caps in muted colours stacked to show crown and brim stitching | Three six-panel baseball caps stacked (navy, sand, bottle green), with the top one tilted to show the crown panels, eyelets and even rows of stitching on the curved brim. No embroidery. |

### 4.5 Products page showcase (4:5, 1400 × 1750)

#### `products-showcase-essentials` — `/images/products/showcase-essentials.webp`
- **Alt (EN):** Stack of heavyweight garment-dyed hoodies and sweatshirts in earth tones
- **Prompt:** A tall editorial still life. A generous, slightly irregular stack of garment-dyed heavyweight hoodies and sweatshirts in earth tones (clay, sand, olive, stone, charcoal) sits on a limestone block. The soft washed texture and tonal ribbing are visible. A single thread cone sits at the base. Warm diffused light from the side, deep calm shadows, a plaster wall behind.

#### `products-showcase-education` — `/images/products/showcase-education.webp`
- **Alt (EN):** Unbranded school and campus apparel — blazer, knitwear and sweatshirts — on a clothing rail
- **Prompt:** A minimal matte-black steel clothing rail in a bright architectural room holds, evenly spaced on plain wooden hangers:
  - a navy blazer
  - a bottle-green V-neck jumper
  - a white oxford shirt
  - a heather-grey crew sweatshirt
  - a burgundy hoodie

  Folded polos sit on a low oak bench below. All pieces are unbranded, with no crests or text. The light is soft and orderly.

### 4.6 Industries (4:3, 1200 × 900)

**Shared direction:** landscape still life or detail composition with the same palette and lighting as the product set. The bottom third of the frame will sit under a dark gradient with white text, so keep the main subject in the upper two-thirds.

| Key | File | Alt (EN) | Prompt |
|---|---|---|---|
| `industries-fashion` | `/images/industries/fashion-brands.webp` | Minimal capsule collection of neutral garments on a rail in a bright studio | A minimal fashion-brand capsule: six neutral garments (oversized tee, overshirt, knit, trousers) spaced evenly on a slim steel rail. A pale plaster wall, a concrete floor, soft daylight. A design-studio feel, not a shop. |
| `industries-schools` | `/images/industries/schools.webp` | Folded school uniform pieces — knit jumpers, shirts and trousers — in coordinated colours | An overhead grid of folded uniform pieces: navy knit jumpers, white shirts, grey trousers and a bottle-green cardigan, arranged in precise rows on a pale oak table. No emblems. |
| `industries-universities` | `/images/industries/universities.webp` | Unbranded campus sweatshirts and caps arranged on a wooden bench | Heather-grey and navy unbranded crew sweatshirts folded on a slatted oak bench with two caps. The background is a softly blurred modern campus colonnade in daylight with no people and no signage. |
| `industries-corporate` | `/images/industries/corporate-organizations.webp` | Coordinated navy and grey corporate polos and knitwear folded on a table | Neatly folded navy and stone-grey piqué polos and a charcoal quarter-zip knit on a clean meeting-room table of pale oak. A glass wall behind is softly out of focus. |
| `industries-sports` | `/images/industries/sports-clubs.webp` | Training tops and shorts in team colours folded beside a sports bag | Folded technical training tops and shorts in bottle green and white, a rolled training jacket and a black duffel bag on a light concrete bench. An empty, softly blurred indoor court in the background. No numbers, no crests. |
| `industries-events` | `/images/industries/event-companies.webp` | Batches of folded event T-shirts sorted by size in open cartons | Rows of open plain kraft cartons, each filled with neatly folded T-shirts in one colour (off-white, terracotta, charcoal). The cartons are organised and ready for dispatch, with a clean light floor and soft daylight. No printing on the shirts or boxes. |

### 4.7 Manufacturing process (Home / Gallery "Inside BadFly" masonry)

Ratios are mixed on purpose to create the masonry rhythm, so keep the given sizes. Use hands only and never show faces.

| Key | File | Size | Alt (EN) | Prompt |
|---|---|---|---|---|
| `process-design-development` | `/images/process/design-development.webp` | 1200 × 1500 (4:5) | Technical garment sketches, a measuring tape and fabric swatches on a design desk | Overhead of a designer's oak desk: technical flat sketches of a hoodie and polo (lines only, no writing), a coiled tape measure, a pencil, fabric swatch cards, a Pantone-style colour fan with blank chips and one hand holding a pencil. Soft daylight. |
| `process-fabric-selection` | `/images/process/fabric-selection.webp` | 1500 × 1000 (3:2) | Hands comparing cotton fabric swatches in a range of neutral colours | Two hands fan out a thick book of cotton jersey and fleece swatches in a gradient from off-white to sand, terracotta, olive and charcoal. Macro texture, shallow depth of field. |
| `process-sampling` | `/images/process/sampling.webp` | 1200 × 1200 (1:1) | Garment sample on a dress form with pinned adjustments | A sand-coloured jacket sample on a linen dress form, with dressmaker pins marking a sleeve adjustment and chalk marks at the hem. A hand is placing a pin. Bright studio, plaster wall. |
| `process-garment-production` | `/images/process/garment-production.webp` | 1200 × 1600 (3:4) | Hands assembling a garment at a sewing machine on an organised production line | From behind the shoulder: hands feeding a navy polo panel through a clean industrial sewing machine. A short row of identical tidy workstations recedes softly into the background with no faces. Daylight. |
| `process-stitching-details` | `/images/process/stitching-details.webp` | 1500 × 1000 (3:2) | Macro view of even twin-needle stitching on a cotton hem | Extreme macro of a perfectly even twin-needle coverstitch on the hem of a heavyweight off-white T-shirt, with a tonal thread and the jersey loops visible. Raking light. |
| `process-quality-control` | `/images/process/quality-control.webp` | 1200 × 1500 (4:5) | Hands measuring a finished sweatshirt with a tape measure on an inspection table | A charcoal sweatshirt laid perfectly flat on a white inspection table under soft even light. Two hands hold a tape measure across the chest, and a clipboard with a blank checklist grid (no text) sits beside it. |
| `process-packaging` | `/images/process/packaging.webp` | 1200 × 1200 (1:1) | Folded garments placed in plain cardboard boxes with tissue paper | Hands placing a precisely folded off-white T-shirt into a plain kraft box lined with off-white tissue. More folded garments are stacked beside it on an oak packing table. No labels with text. |
| `process-international-delivery` | `/images/process/international-delivery.webp` | 1500 × 1000 (3:2) | Sealed, unbranded shipping cartons stacked on a pallet in a clean dispatch area | Neatly stacked, sealed plain kraft cartons stretch-wrapped on a wooden pallet in a bright, clean dispatch area. There's a blurred loading-bay door with daylight and a light epoxy floor. No company names, no flags, no country markings, no visible shipping labels. |

---

## 5. Current state summary

| Category | Keys |
|---|---|
| **Generated** | none (no generation tool connected) |
| **Catalogue imagery (24)** | see [IMAGE-MAPPING.md](IMAGE-MAPPING.md) |
| **Remaining placeholders (10)** | `private-label-materials`, `products-graduation-apparel`, all 8 `process-*` |
| **Below target resolution** | all 24 catalogue images (source renders are ~1054 px wide) |
