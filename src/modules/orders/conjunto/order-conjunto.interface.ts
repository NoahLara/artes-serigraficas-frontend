import { Customer, Delivery, Payment } from "../../shared/core/interfaces";

export interface OrderConjuntoInterface {
  date: string;
  madeDate: Date | string;
  orderSource: string;
  note: string;
  customer: Customer;
  payment: Payment;
  delivery: Delivery;
}
