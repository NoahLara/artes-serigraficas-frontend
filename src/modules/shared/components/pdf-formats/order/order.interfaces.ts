import { OrderInterface } from "../../../../orders/camisa/orders.interface";
import { Product } from "../../../core/interfaces";
import { ProductByPerson } from "../../../core/interfaces/product-by-person.interface";

export interface OrderPDFProps {
  orderInformation: OrderInterface;
  detailOrder: ProductByPerson;
  product: Product;
}
