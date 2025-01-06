import { Product, ProductByPerson } from "../../../../shared/core/interfaces";
export interface DetailOrderProps {
  detailOrder: ProductByPerson;
  setDetailOrder: React.Dispatch<React.SetStateAction<ProductByPerson>>;
  selectedProduct: Product | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}
