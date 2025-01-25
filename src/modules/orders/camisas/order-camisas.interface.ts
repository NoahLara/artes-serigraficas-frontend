import { Customer, Payment } from "../../shared/core/interfaces";

export interface OrderCamisasInterface {
  date: Date | string;
  madeDate: Date | string;
  customer: Customer;
  payment: Payment;
  neckType: string;
  sizeAndFit: string;
  color: string;
  fabric: string;
  fabricThickness: number;
  specialProperties: string[];
  sleeveType: string;
  customizationTechniques: string;
  customizationLocations: string[];
}
