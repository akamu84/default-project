import { queryOptions } from '@tanstack/react-query';
import { fetchOrder, fetchOrders } from './ordersApi.ts';

export const orderQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['orders', { orderId: id }],
    queryFn: () => fetchOrder(id),
  });

export const ordersQueryOptions = () =>
  queryOptions({
    queryKey: ['orders'],
    queryFn: () => fetchOrders(),
  });
