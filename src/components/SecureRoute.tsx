import {useOktaAuth} from "@okta/okta-react";
import {Outlet} from "@tanstack/react-router";

const SecureRoute = () => {
    const {authState} = useOktaAuth();

    if (!authState?.isAuthenticated) return null;

    return <Outlet />
}

export default SecureRoute;
