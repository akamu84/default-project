import { useOktaAuth } from '@okta/okta-react';
import { Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import PendingLoader from './PendingLoader.tsx';

const SecureRoute = () => {
  const { authState, oktaAuth } = useOktaAuth();

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!authState?.isAuthenticated) {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    }
  }, [oktaAuth, authState]);

  if (!authState?.isAuthenticated) return <PendingLoader />;

  return <Outlet />;
};

export default SecureRoute;
