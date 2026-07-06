import productsData from "./products.json";

export interface Product {
  id: string;
  title: string;
  description: string;
  category: "limpiadores" | "insumos" | "ecologicos" | "accesorios";
  price: number;
  image: string;
  specs?: string[]; // especificaciones técnicas
  packSize?: string; // presentación (ej. "Bidón de 5 Litros")
}

export const catalogProducts: Product[] = productsData as Product[];
