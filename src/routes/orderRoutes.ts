import { createRoute } from '@tanstack/react-router';
import { z } from 'zod';
import OrderDetailPage from '../pages/OrderDetailPage.tsx';
import OrdersPage from '../pages/OrdersPage.tsx';
import { authenticatedRoute } from './baseRoutes.tsx';
import { orderQueryOptions, ordersQueryOptions } from '../queryOptions.ts';
import NotFoundPage from '../pages/NotFoundPage.tsx';

export const orderRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: 'orders',
});

export const orderIndexRoute = createRoute({
  getParentRoute: () => orderRoute,
  path: '/',
  loader: ({ context: { queryClient } }) =>
    queryClient.prefetchQuery(ordersQueryOptions()),
  component: OrdersPage,
});

export const orderDetailRoute = createRoute({
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
});
