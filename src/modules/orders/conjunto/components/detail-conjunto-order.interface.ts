import { Product, ProductDetail } from "../../../shared/core/interfaces";

export interface DetailConjuntoOrderInterface {
  product: Product;
  detail: ProductDetail[];
  note: string;
}
