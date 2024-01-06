import { Route } from '@tanstack/react-router';
import { z } from 'zod';
import OrderDetailPage from '../pages/OrderDetailPage.tsx';
import OrdersPage from '../pages/OrdersPage.tsx';
import { authenticatedRoute } from './baseRoutes.ts';
import NotFoundPage from '../pages/NotFoundPage.tsx';

export const orderRoute = new Route({
  getParentRoute: () => authenticatedRoute,
  path: 'orders',
});

export const orderIndexRoute = new Route({
  getParentRoute: () => orderRoute,
  path: '/',
  component: OrdersPage,
});

export const orderDetailRoute = new Route({
  getParentRoute: () => orderRoute,
  path: '$orderId',
  parseParams: (params) => ({
    orderId: z.number().int().parse(Number(params.orderId)),
  }),
  stringifyParams: ({ orderId }) => ({ orderId: `${orderId}` }),
  component: OrderDetailPage,
  errorComponent: NotFoundPage,
});
