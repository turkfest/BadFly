// Extracts catalogue page renders from source-materials/badfly-ing.pdf and writes cropped
// product images to images-src/<manifest-key>.png for scripts/optimize-images.mjs.
// Crop rectangles are in page-image pixels ([x, y, width, height]) and exclude logos, text,
// icons, colour-swatch rows and page decorations.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PDF = "source-materials/badfly-ing.pdf";

const P45 = [1200, 1500];
const WIDE = [2400, 1029];

// file/target/alt are written into lib/images/manifest.json so the site reflects the catalogue content.
export const crops = {
  "home-hero": {
    page: 1, rect: [32, 320, 990, 990], file: "/images/home/hero-collection.webp", target: [1200, 1200],
    alt: {
      en: "BadFly collection: hoodie, polo shirt, sweatshirt and T-shirt on forms with aprons, bags and folded garments",
      de: "BadFly-Kollektion: Hoodie, Poloshirt, Sweatshirt und T-Shirt auf Büsten mit Schürzen, Taschen und gefalteter Kleidung",
      tr: "BadFly koleksiyonu: manken büstleri üzerinde kapüşonlu sweatshirt, polo tişört, sweatshirt ve tişört; önlükler, çantalar ve katlanmış ürünlerle",
    },
  },
  "about-hero": {
    page: 1, rect: [0, 330, 1054, 452], file: "/images/about/collection-row.webp", target: WIDE,
    alt: {
      en: "Row of BadFly garments on forms — hoodie, polo shirt, sweatshirt, T-shirt and aprons",
      de: "Reihe von BadFly-Kleidungsstücken auf Büsten – Hoodie, Poloshirt, Sweatshirt, T-Shirt und Schürzen",
      tr: "Manken büstleri üzerinde BadFly ürünleri — kapüşonlu sweatshirt, polo tişört, sweatshirt, tişört ve önlükler",
    },
  },
  "private-label-hero": {
    page: 1, rect: [0, 850, 1054, 452], file: "/images/private-label/bags-and-aprons.webp", target: WIDE,
    alt: {
      en: "Canvas messenger bag, backpack, aprons and folded garments from the BadFly collection",
      de: "Canvas-Umhängetasche, Rucksack, Schürzen und gefaltete Kleidung aus der BadFly-Kollektion",
      tr: "BadFly koleksiyonundan kanvas postacı çantası, sırt çantası, önlükler ve katlanmış ürünler",
    },
  },
  "industries-events": {
    page: 1, rect: [60, 600, 560, 700], file: "/images/industries/event-companies.webp", target: P45,
    alt: {
      en: "Backpack, canvas bag, apron and folded T-shirts from the BadFly merchandise range",
      de: "Rucksack, Canvas-Tasche, Schürze und gefaltete T-Shirts aus dem BadFly-Merchandise-Sortiment",
      tr: "BadFly promosyon ürünlerinden sırt çantası, kanvas çanta, önlük ve katlanmış tişörtler",
    },
  },
  "products-polo-shirts": {
    page: 2, rect: [20, 230, 630, 788], file: "/images/products/polo-shirts.webp", target: P45,
    alt: { en: "Cream piqué polo shirt with ribbed collar and button placket", de: "Cremefarbenes Piqué-Poloshirt mit Rippkragen und Knopfleiste", tr: "Ribana yakalı ve düğmeli patlı krem pike polo tişört" },
  },
  "products-t-shirts": {
    page: 3, rect: [20, 230, 630, 788], file: "/images/products/t-shirts.webp", target: P45,
    alt: { en: "Olive green crew-neck cotton T-shirt", de: "Olivgrünes Baumwoll-T-Shirt mit Rundhalsausschnitt", tr: "Zeytin yeşili bisiklet yaka pamuklu tişört" },
  },
  "products-hoodies": {
    page: 4, rect: [20, 230, 630, 788], file: "/images/products/hoodies.webp", target: P45,
    alt: { en: "Black heavyweight hoodie with drawcords and kangaroo pocket", de: "Schwarzer schwerer Hoodie mit Kordeln und Kängurutasche", tr: "İpli ve kanguru cepli siyah ağır gramaj kapüşonlu sweatshirt" },
  },
  "industries-universities": {
    page: 8, rect: [20, 230, 630, 788], file: "/images/industries/universities.webp", target: P45,
    alt: {
      en: "Mustard long-sleeve knitted polo for campus collections",
      de: "Senfgelbes langärmeliges Strick-Poloshirt für Campus-Kollektionen",
      tr: "Kampüs koleksiyonları için hardal rengi uzun kollu triko polo",
    },
  },
  "products-graduation-apparel": {
    page: 5, rect: [20, 230, 630, 788], file: "/images/products/graduation-apparel.webp", target: P45,
    alt: {
      en: "Purple full-zip hoodie for graduation and class collections",
      de: "Lila Zip-Hoodie für Abschluss- und Jahrgangskollektionen",
      tr: "Mezuniyet ve dönem koleksiyonları için mor fermuarlı kapüşonlu sweatshirt",
    },
  },
  "private-label-materials": {
    page: 17, rect: [60, 250, 600, 400], file: "/images/private-label/private-label-materials.webp", target: [1800, 1200],
    alt: {
      en: "Black canvas messenger bag with leather-look base panel and adjustable strap",
      de: "Schwarze Canvas-Umhängetasche mit Unterteil in Lederoptik und verstellbarem Gurt",
      tr: "Deri görünümlü alt panelli ve ayarlanabilir askılı siyah kanvas postacı çantası",
    },
  },
  "products-university-merchandise": {
    page: 6, rect: [20, 230, 630, 788], file: "/images/products/university-merchandise.webp", target: P45,
    alt: { en: "Navy full-zip hoodie with contrast red hood lining", de: "Marineblauer Zip-Hoodie mit kontrastierendem roten Kapuzenfutter", tr: "Kontrast kırmızı kapüşon astarlı lacivert fermuarlı sweatshirt" },
  },
  "products-sweatshirts": {
    page: 7, rect: [20, 230, 630, 788], file: "/images/products/sweatshirts.webp", target: P45,
    alt: { en: "Light blue crew-neck sweatshirt with ribbed cuffs and hem", de: "Hellblaues Rundhals-Sweatshirt mit Rippbündchen und -saum", tr: "Ribanalı manşet ve etekli açık mavi bisiklet yaka sweatshirt" },
  },
  "products-showcase-essentials": {
    page: 8, rect: [20, 230, 630, 788], file: "/images/products/showcase-essentials.webp", target: [1400, 1750],
    alt: { en: "Mustard long-sleeve knitted polo shirt", de: "Senfgelbes langärmeliges Strick-Poloshirt", tr: "Hardal rengi uzun kollu triko polo" },
  },
  "industries-sports": {
    page: 9, rect: [10, 200, 600, 750], file: "/images/industries/sports-clubs.webp", target: P45,
    alt: { en: "Navy jogger trousers with drawcord waist and ribbed cuffs", de: "Marineblaue Jogginghose mit Tunnelzug und Rippbündchen", tr: "Bel bağcıklı ve ribanalı paçalı lacivert eşofman altı" },
  },
  // Skirt/trousers alternate so the same garment never appears twice on one page.
  "products-showcase-education": {
    page: 11, rect: [10, 200, 600, 750], file: "/images/products/showcase-education.webp", target: [1400, 1750],
    alt: { en: "Navy A-line uniform skirt with side pleats", de: "Marineblauer A-Linien-Uniformrock mit seitlichen Falten", tr: "Yanları pliseli lacivert A kesim üniforma eteği" },
  },
  "industries-schools": {
    page: 11, rect: [10, 200, 600, 750], file: "/images/industries/schools.webp", target: P45,
    alt: { en: "Navy pleated skirt for school uniform programmes", de: "Marineblauer Faltenrock für Schuluniform-Programme", tr: "Okul üniforması programları için lacivert pliseli etek" },
  },
  "products-school-uniforms": {
    page: 10, rect: [10, 200, 600, 750], file: "/images/products/school-uniforms.webp", target: P45,
    alt: { en: "Navy tailored uniform trousers", de: "Marineblaue Uniformhose mit klassischem Schnitt", tr: "Lacivert klasik kesim üniforma pantolonu" },
  },
  "about-story": {
    page: 12, rect: [40, 200, 570, 712], file: "/images/about/navy-apron.webp", target: P45,
    alt: { en: "Navy bib apron with front pocket and adjustable ties", de: "Marineblaue Latzschürze mit Fronttasche und verstellbaren Bändern", tr: "Ön cepli ve ayarlanabilir bağcıklı lacivert boyun askılı önlük" },
  },
  "home-craft": {
    page: 14, rect: [140, 200, 496, 620], file: "/images/home/barista-aprons.webp", target: P45,
    alt: {
      en: "Black and brown canvas barista aprons with leather straps and pockets",
      de: "Schwarze und braune Canvas-Baristaschürzen mit Lederriemen und -taschen",
      tr: "Deri askılı ve cepli siyah ve kahverengi kanvas barista önlükleri",
    },
  },
  "products-workwear": {
    page: 15, rect: [30, 165, 500, 625], file: "/images/products/workwear.webp", target: P45,
    alt: { en: "Royal blue work coat shown from front and back", de: "Königsblauer Arbeitskittel in Vorder- und Rückansicht", tr: "Önden ve arkadan görünümüyle saks mavisi iş önlüğü" },
  },
  "products-bags": {
    page: 16, rect: [108, 180, 468, 585], file: "/images/products/bags.webp", target: P45,
    alt: { en: "Cream canvas messenger bag with adjustable shoulder strap", de: "Cremefarbene Canvas-Umhängetasche mit verstellbarem Schultergurt", tr: "Ayarlanabilir omuz askılı krem kanvas postacı çantası" },
  },
  "industries-corporate": {
    page: 21, rect: [0, 360, 480, 600], file: "/images/industries/corporate-organizations.webp", target: P45,
    alt: { en: "Light blue women's button-down shirt", de: "Hellblaue Damenbluse mit Knopfleiste", tr: "Açık mavi düğmeli kadın gömleği" },
  },
  "industries-fashion": {
    page: 22, rect: [0, 470, 480, 600], file: "/images/industries/fashion-brands.webp", target: P45,
    alt: { en: "Beige double-breasted trench coat with belt", de: "Beiger zweireihiger Trenchcoat mit Gürtel", tr: "Kemerli bej kruvaze trençkot" },
  },
  "products-corporate-apparel": {
    page: 25, rect: [0, 490, 480, 600], file: "/images/products/corporate-apparel.webp", target: P45,
    alt: { en: "Men's textured beige blazer worn with dark tailored trousers", de: "Strukturierter beiger Herrenblazer zu dunkler Anzughose", tr: "Koyu kumaş pantolonla kombinlenmiş dokulu bej erkek blazer ceket" },
  },
  // Landscape products: tight 4:5 crop on the front detail; the page has no clean vertical space.
  "products-caps": {
    page: 29, rect: [170, 262, 434, 543], file: "/images/products/caps.webp", target: P45,
    alt: { en: "Navy washed-cotton cap with embroidered sailboat", de: "Marineblaue Cap aus gewaschener Baumwolle mit gestickter Segelboot-Applikation", tr: "İşlemeli yelkenli detaylı lacivert yıkamalı pamuk şapka" },
  },
  "products-accessories": {
    page: 30, rect: [165, 350, 370, 462], file: "/images/products/accessories.webp", target: P45,
    alt: { en: "Cream cotton bucket hat with metal eyelets", de: "Cremefarbener Baumwoll-Fischerhut mit Metallösen", tr: "Metal havalandırma delikli krem pamuklu bucket şapka" },
  },
};

function parsePdf(buf) {
  const s = buf.toString("latin1");
  const offsets = {};
  for (const m of s.matchAll(/(\d+)\s+0\s+obj\b/g)) offsets[m[1]] = m.index + m[0].length;
  const body = (id) => {
    const o = offsets[id];
    const end = s.indexOf("endobj", o);
    const st = s.indexOf("stream", o);
    return s.slice(o, st !== -1 && st < end ? st : end);
  };
  const dict = (text, key) => {
    const ref = text.match(new RegExp(`/${key}\\s*(\\d+)\\s+0\\s+R`));
    if (ref) return body(ref[1]);
    const i = text.indexOf(`/${key}`);
    if (i === -1) return "";
    const j = text.indexOf("<<", i);
    let depth = 0;
    let k = j;
    for (; k < text.length; k++) {
      if (text.startsWith("<<", k)) { depth++; k++; }
      else if (text.startsWith(">>", k)) { depth--; k++; if (depth === 0) break; }
    }
    return text.slice(j, k + 1);
  };
  const int = (text, key) => {
    const m = text.match(new RegExp(`/${key}\\s+(\\d+)(\\s+0\\s+R)?`));
    if (!m) return 0;
    return m[2] ? parseInt(body(m[1]).trim(), 10) : parseInt(m[1], 10);
  };
  const stream = (id) => {
    let a = s.indexOf("stream", offsets[id]) + 6;
    if (s[a] === "\r") a++;
    if (s[a] === "\n") a++;
    return buf.subarray(a, a + int(body(id), "Length"));
  };

  const rootId = s.match(/\/Root\s+(\d+)\s+0\s+R/)[1];
  const pages = [];
  (function walk(id, inherited) {
    const d = body(id);
    const res = /\/Resources/.test(d) ? dict(d, "Resources") : inherited;
    if (/\/Type\s*\/Pages/.test(d)) {
      for (const r of d.match(/\/Kids\s*\[([^\]]*)\]/)[1].matchAll(/(\d+)\s+0\s+R/g)) walk(r[1], res);
    } else pages.push(res);
  })(body(rootId).match(/\/Pages\s+(\d+)\s+0\s+R/)[1], "");

  // Each catalogue page is one full-page JPEG render; pick the largest DCT image on the page.
  return pages.map((res) => {
    let best = null;
    for (const m of dict(res, "XObject").matchAll(/\/[^\s/<>]+\s+(\d+)\s+0\s+R/g)) {
      const d = body(m[1]);
      if (!/\/Subtype\s*\/Image/.test(d) || !/DCTDecode/.test(d)) continue;
      const area = int(d, "Width") * int(d, "Height");
      if (!best || area > best.area) best = { id: m[1], area };
    }
    return best && { object: Number(best.id), jpeg: stream(best.id) };
  });
}

const pages = parsePdf(readFileSync(join(root, PDF)));
const outDir = join(root, "images-src");
mkdirSync(outDir, { recursive: true });

const only = process.argv.slice(2);
const updates = {};
for (const [key, { page, rect, file, target, alt }] of Object.entries(crops)) {
  if (only.length && !only.includes(key)) continue;
  const p = pages[page - 1];
  const [left, top, width, height] = rect;
  await sharp(p.jpeg).toColourspace("srgb").extract({ left, top, width, height }).png().toFile(join(outDir, `${key}.png`));
  updates[key] = { file, target, alt, source: { pdf: PDF, page, object: p.object, rect } };
  console.log(`${key}: page ${page} (obj ${p.object}) → ${width}×${height}`);
}

const manifestPath = join(root, "lib/images/manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
for (const [key, u] of Object.entries(updates)) {
  const entry = manifest[key];
  // A changed source or file means the current final image is stale; let optimize-images replace it.
  if (JSON.stringify(entry.source) !== JSON.stringify(u.source) || entry.file !== u.file) {
    entry.status = "placeholder";
    entry.size = null;
  }
  Object.assign(entry, u, { position: "50% 50%" });
}
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
