import {NotFoundRoute, Route} from "@tanstack/react-router";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import {rootRoute} from "./rootRoute.ts";
import {LoginCallback} from "@okta/okta-react";

export const notFoundRoute = new NotFoundRoute({getParentRoute: () => rootRoute, component: NotFoundPage})

export const indexRoute = new Route({ getParentRoute: () => rootRoute, path: '/' })

export const loginRoute = new Route({ getParentRoute: () => rootRoute, path: 'login'});

export const callbackRoute = new Route({ getParentRoute: () => loginRoute, path: 'callback', component: LoginCallback });

export const authenticatedRoute = new Route({
    getParentRoute: () => rootRoute,
    id: 'auth',
    beforeLoad: async ({ context }) => {
        console.log(context);
        if (context.oktaContext && !context.oktaContext?.authState?.isAuthenticated) {
            await context.oktaContext.oktaAuth.signInWithRedirect();
        }
    },
})
