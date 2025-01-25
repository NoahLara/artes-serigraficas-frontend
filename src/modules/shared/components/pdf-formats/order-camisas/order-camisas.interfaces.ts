import { OrderConjuntoInterface } from "../../../../orders/conjunto/order-conjunto.interface";
import { Product, ProductByPerson } from "../../../core/interfaces";

export interface OrderConjuntoPDFProps {
  orderInformation: OrderConjuntoInterface;
  detailOrder: ProductByPerson;
  product: Product;
}
