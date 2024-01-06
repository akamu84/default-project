import {
  orderDetailRoute,
  orderIndexRoute,
  orderRoute,
} from './orderRoutes.ts';
import {
  authenticatedRoute,
  callbackRoute,
  indexRoute,
  loginRoute,
} from './baseRoutes.ts';
import { rootRoute } from './rootRoute.ts';

export const routeTree = rootRoute.addChildren([
  indexRoute,
  authenticatedRoute.addChildren([
    orderRoute.addChildren([orderIndexRoute, orderDetailRoute]),
  ]),
  loginRoute.addChildren([callbackRoute]),
]);
