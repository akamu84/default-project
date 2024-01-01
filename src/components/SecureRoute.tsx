import {useOktaAuth} from "@okta/okta-react";
import {Outlet} from "@tanstack/react-router";
import {useEffect} from "react";
import {toRelativeUrl} from "@okta/okta-auth-js";
import {Box, LoadingOverlay} from "@mantine/core";

const SecureRoute = () => {
    const {authState, oktaAuth} = useOktaAuth();

    useEffect(() => {
        if (!authState) {
            return;
        }

        if (!authState?.isAuthenticated) {
            const originalUri = toRelativeUrl(window.location.href, window.location.origin);
            oktaAuth.setOriginalUri(originalUri);
            oktaAuth.signInWithRedirect();
        }
    }, [oktaAuth, !!authState, authState?.isAuthenticated]);

    if (!authState?.isAuthenticated) return <Box>
        <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ type: 'dots', size: 50 }} />
    </Box>;

    return <Outlet />


}

export default SecureRoute;
