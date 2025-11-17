import { Order } from '@/types/order';

const ORDERS_KEY = 'fastpass_orders';

export const orderStore = {
  getOrders: (): Order[] => {
    const orders = localStorage.getItem(ORDERS_KEY);
    return orders ? JSON.parse(orders) : [];
  },

  getOrder: (orderId: string): Order | undefined => {
    const orders = orderStore.getOrders();
    return orders.find(order => order.id === orderId);
  },

  addOrder: (order: Order): void => {
    const orders = orderStore.getOrders();
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  },

  updateOrderStatus: (orderId: string, status: Order['status']): void => {
    const orders = orderStore.getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
  },
};
