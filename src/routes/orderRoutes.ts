import { Route } from '@tanstack/react-router';
import { z } from 'zod';
import OrderDetailPage from '../pages/OrderDetailPage.tsx';
import OrdersPage from '../pages/OrdersPage.tsx';
import { authenticatedRoute } from './baseRoutes.ts';
import { orderQueryOptions, ordersQueryOptions } from '../queryOptions.ts';
import PendingLoader from '../components/PendingLoader.tsx';
import NotFoundPage from '../pages/NotFoundPage.tsx';

export const orderRoute = new Route({
  getParentRoute: () => authenticatedRoute,
  path: 'orders',
});

export const orderIndexRoute = new Route({
  getParentRoute: () => orderRoute,
  path: '/',
  loader: ({ context: { queryClient } }) =>
    queryClient.prefetchQuery(ordersQueryOptions()),
  pendingComponent: PendingLoader,
  component: OrdersPage,
});

export const orderDetailRoute = new Route({
  getParentRoute: () => orderRoute,
  path: '$orderId',
  parseParams: (params) => ({
    orderId: z.number().int().parse(Number(params.orderId)),
  }),
  stringifyParams: ({ orderId }) => ({ orderId: `${orderId}` }),
  loader: async ({ context: { queryClient }, params: { orderId } }) =>
    await queryClient.prefetchQuery(orderQueryOptions(orderId)),
  component: OrderDetailPage,
  errorComponent: NotFoundPage,
  pendingComponent: PendingLoader,
});
