import { Customer, Payment } from "../../shared/core/interfaces";

export interface OrderConjuntoInterface {
  date: string;
  madeDate: Date | string;
  orderSource: string;
  customer: Customer;
  payment: Payment;
}
