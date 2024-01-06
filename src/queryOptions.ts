import { QueryKey, queryOptions } from '@tanstack/react-query';
import { fetchOrder, fetchOrders } from './ordersApi.ts';

export const orderQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['orders', { orderId: id }] as QueryKey,
    queryFn: () => fetchOrder(id),
  });

export const ordersQueryOptions = () =>
  queryOptions({
    queryKey: ['orders'] as QueryKey,
    queryFn: fetchOrders,
  });
