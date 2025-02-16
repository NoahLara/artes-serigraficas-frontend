import { AdultSize, ChildSize } from "../../../../shared/core/interfaces";

// Reusable Types
export type NeckType = "Redondo" | "V" | "Otro";
export type SleeveType = "Corta" | "Larga" | "3/4" | "Sin manga" | "Otro";
export type FabricType = "Algodón" | "Poliéster" | "Licra" | "P. Durazno" | "Otro";
export type FabricWeight = 170 | 180 | 190 | 200;
export type TechniqueType = "Serigrafía" | "Vinil" | "Sublimación" | "Bordado" | "Otro";
export type StampingOptions = "Manga Derecha" | "Manga Izquierda" | "Pecho" | "Espalda";
export type ShirtFit = "Regular" | "Agrandada" | "Oversized" | "Otro";

// Interface for Shirt Order
export interface ShirtOrder {
  size: AdultSize | ChildSize;
  quantity: number;
  price: number;
}

// Main Order Interface
export interface DetailCamisaOrderInterface {
  image?: string;
  shirts: ShirtOrder[];
  neck: NeckType;
  sleeve: SleeveType;
  fabric: FabricType;
  fit: ShirtFit;
  fabricWeight: FabricWeight;
  technique: TechniqueType;
  stamping: StampingOptions[];
  note: string;
}
