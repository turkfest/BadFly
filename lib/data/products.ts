import type { Dictionary } from "@/dictionaries/types";
import type { ImageKey } from "@/lib/images";

export type ProductId = keyof Dictionary["products"]["items"];
export type ProductGroup = Exclude<keyof Dictionary["products"]["groups"], "all">;

export type Product = {
  id: ProductId;
  group: ProductGroup;
  image: ImageKey;
  moq: number;
  leadWeeks: string;
};

export const productGroups: ProductGroup[] = ["essentials", "corporate", "education", "accessories"];

export const products: Product[] = [
  { id: "tshirts", group: "essentials", image: "products-t-shirts", moq: 100, leadWeeks: "4–5" },
  { id: "polos", group: "essentials", image: "products-polo-shirts", moq: 100, leadWeeks: "4–6" },
  { id: "hoodies", group: "essentials", image: "products-hoodies", moq: 100, leadWeeks: "5–6" },
  { id: "sweatshirts", group: "essentials", image: "products-sweatshirts", moq: 100, leadWeeks: "5–6" },
  { id: "corporate", group: "corporate", image: "products-corporate-apparel", moq: 150, leadWeeks: "5–7" },
  { id: "workwear", group: "corporate", image: "products-workwear", moq: 200, leadWeeks: "6–8" },
  { id: "schoolUniforms", group: "education", image: "products-school-uniforms", moq: 300, leadWeeks: "6–8" },
  { id: "universityMerch", group: "education", image: "products-university-merchandise", moq: 100, leadWeeks: "4–6" },
  { id: "graduation", group: "education", image: "products-graduation-apparel", moq: 100, leadWeeks: "5–7" },
  { id: "accessories", group: "accessories", image: "products-accessories", moq: 250, leadWeeks: "4–6" },
  { id: "bags", group: "accessories", image: "products-bags", moq: 250, leadWeeks: "4–6" },
  { id: "caps", group: "accessories", image: "products-caps", moq: 200, leadWeeks: "4–5" },
];
