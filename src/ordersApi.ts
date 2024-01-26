import axios from 'axios';

export interface Order {
  id: number;
  total: number;
}

export const fetchOrder = async (orderId: number): Promise<Order> => {
  console.log(`Fetching order with id ${orderId}...`);
  const response = await axios.get<Order>(
    `http://localhost:3000/orders/${orderId}`
  );
  return response.data;
};

export const fetchOrders = async (): Promise<Order[]> => {
  console.log(`Fetching orders...`);
  const response = await axios.get<Order[]>(`http://localhost:3000/orddfders`);
  return response.data;
};
