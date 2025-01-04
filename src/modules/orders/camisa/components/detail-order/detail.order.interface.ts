import { Product } from "../../../shared/core/interfaces";
import { ProductByPerson } from "../../../shared/core/interfaces/product-by-person.interface";

export interface DetailOrderProps {
  detailOrder: ProductByPerson;
  setDetailOrder: React.Dispatch<React.SetStateAction<ProductByPerson>>;
  selectedProduct: Product | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}
