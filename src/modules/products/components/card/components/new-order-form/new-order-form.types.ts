import { IconType } from "react-icons/lib";

export interface Pedido {
  talla: string;
  cantidad: number;
  precio: number;
  color: string;
}

export interface DeliveryMethod {
  name: string;
  icon: IconType;
}
