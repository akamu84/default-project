import axios from 'axios';

interface Order {
  id: number;
  total: number;
}

class NotFoundError extends Error {}

export const fetchOrder = async (orderId: number) => {
  console.log(`Fetching order with id ${orderId}...`);
  await new Promise((r) => setTimeout(r, 500));
  const post = await axios
    .get<Order>(`http://localhost:3000/orders/${orderId}`)
    .then((r) => r.data);

  if (!post) {
    throw new NotFoundError(`Order with id "${orderId}" not found!`);
  }

  return post;
};

export const fetchOrders = async () => {
  console.log(`Fetching orders...`);
  await new Promise((r) => setTimeout(r, 500));
  const post = await axios
    .get<Order[]>(`http://localhost:3000/orders`)
    .then((r) => r.data);

  if (!post) {
    throw new NotFoundError(`Orders not found!`);
  }

  return post;
};
