import { useOktaAuth } from '@okta/okta-react';
import { Outlet } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import PendingLoader from './PendingLoader.tsx';

const SecureRoute = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const pendingLogin = useRef(false);

  useEffect(() => {
    const handleLogin = async () => {
      if (pendingLogin.current) {
        return;
      }

      pendingLogin.current = true;

      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      oktaAuth.setOriginalUri(originalUri);
      await oktaAuth.signInWithRedirect();
    };

    if (!authState) {
      return;
    }

    if (authState.isAuthenticated) {
      pendingLogin.current = false;
      return;
    }

    // Start login if app has decided it is not logged in and there is no pending signin
    if (!authState.isAuthenticated) {
      handleLogin().catch((err) => {
        console.log(err);
      });
    }
  }, [authState, oktaAuth]);

  if (!authState?.isAuthenticated) return <PendingLoader />;

  return <Outlet />;
};

export default SecureRoute;
