import {Outlet, ScrollRestoration} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import RouterNavLink from "../components/RouterNavLink.tsx";
import {useOktaAuth} from "@okta/okta-react";
import {Button} from "@mantine/core";

const AppContainer = () => {
    const {oktaAuth, authState} = useOktaAuth();
    return <>
        <div>
            <RouterNavLink to="/" label="Home" />
            <RouterNavLink to="/order" label="Orders" />
            {authState?.isAuthenticated && <Button onClick={() => oktaAuth.signOut()}>Sign Out</Button>}
        </div>
        <hr />
        <ScrollRestoration />
        <Outlet />
        <TanStackRouterDevtools />
    </>
}

export default AppContainer;
