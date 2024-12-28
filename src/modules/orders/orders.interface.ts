export interface OrderInterface {
  neckType: string;
  sizeAndFit: string;
  color: string;
  fabric: string;
  fabricThickness: number;
  specialProperties: string[];
  sleeveType: string;
  customizationTechniques: string;
  customizationLocations: string[];
  createdBy: string;
  deliveryDate: string;
  madeDate: Date | string;
  orderSource: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  advancePayment: number;
  advancePaymentMethod: string;
  restPayment: number;
  restPaymentMethod: string;
  deliveryMethod: string;
  meetingPoint: string;
  finalNote: string;
}
