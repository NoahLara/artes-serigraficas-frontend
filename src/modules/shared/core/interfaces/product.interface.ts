export interface Product {
  productId:      string;
  name:           string;
  retailPrice:    number;
  wholeSalePrice: number;
  SKU:            string;
  image:          string | ArrayBuffer | null;
  description:    string;
  categoryId:     string;
  createdAt:      Date;
  updatedAt:      Date;
}