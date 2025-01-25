import { Product } from "../../../shared/core/interfaces";

export interface ProductDetailProps {
  opened: boolean;
  product: Product;
  onSuccess: () => void;
  onClose: () => void;
}
