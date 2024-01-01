import {
    RouterProvider,
} from '@tanstack/react-router'
import {router} from "./router.tsx";
import {useOktaAuth} from "@okta/okta-react";

const RouterAuthWrapper = () => {
    const oktaContext = useOktaAuth();

    return (
        <RouterProvider router={router} context={{oktaContext: oktaContext}}/>
    )
}

export default RouterAuthWrapper;
