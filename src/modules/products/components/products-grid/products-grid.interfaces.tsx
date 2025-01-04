import { Product } from "../../../shared/core/interfaces";

export interface ProductsGridProps {
  filteredProducts: Product[] | undefined;
  onSuccess: () => void;
}
