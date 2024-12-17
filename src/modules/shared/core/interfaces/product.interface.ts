export interface Product {
  productId:   string;
  name:        string;
  price:       number;
  SKU:         string;
  image:       string;
  description: string;
  categoryId:  string;
  createdAt:   Date;
  updatedAt:   Date;
}