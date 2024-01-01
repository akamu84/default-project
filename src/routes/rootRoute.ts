import {rootRouteWithContext} from "@tanstack/react-router";
import AppContainer from "../layout/AppContainer.tsx";
import {IOktaContext} from "@okta/okta-react/bundles/types/OktaContext";

export interface RouterContext {
    oktaContext?: IOktaContext
}

export const rootRoute = rootRouteWithContext<RouterContext>()({component: AppContainer});
