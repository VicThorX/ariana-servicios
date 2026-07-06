export interface OrderItem {
  title: string;
  quantity: number;
  price?: number;
}

export interface OrderRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  total: number;
}
