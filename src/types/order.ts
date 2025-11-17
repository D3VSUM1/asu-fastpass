export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type OrderStatus = 'received' | 'in_progress' | 'ready';

export interface Order {
  id: string;
  customerName: string;
  venmoHandle: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}
