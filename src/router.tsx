import {Router} from "@tanstack/react-router";
import {orderDetailRoute, orderIndexRoute, orderRoute} from "./routes/orderRoutes.ts";
import {authenticatedRoute, callbackRoute, indexRoute, loginRoute, notFoundRoute} from "./routes/baseRoutes.ts";
import {rootRoute} from "./routes/rootRoute.ts";

export const routeTree = rootRoute.addChildren([
    indexRoute,
    authenticatedRoute.addChildren([
        orderRoute.addChildren([orderIndexRoute, orderDetailRoute])
    ]),
    loginRoute.addChildren([callbackRoute]),

]);

declare module '@tanstack/react-router' {
    interface Register {
        // This infers the type of our router and registers it across your entire project
        router: typeof router
    }
}

export const router =  new Router({routeTree, notFoundRoute});
