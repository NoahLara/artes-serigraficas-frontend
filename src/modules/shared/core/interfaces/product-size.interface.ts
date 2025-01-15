export type AdultSize = "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL" | "4XL";
export type ChildSize = 2 | 4 | 6 | 8 | 10 | 12 | 14 | 16;

export interface ProductDetail {
  name: AdultSize | ChildSize;
  quantity: number;
  price: number;
  note: string;
}
