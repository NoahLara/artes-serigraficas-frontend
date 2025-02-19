import { Customer, Payment } from ".";

export interface OrderGeneralDetails {
  date: Date | string;
  madeDate: Date | string;
  customer: Customer;
  payment: Payment;
}
