import { createRoute, NotFoundRoute } from '@tanstack/react-router';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import { rootRoute } from './rootRoute.ts';
import { LoginCallback } from '@okta/okta-react';
import SecureRoute from '../components/SecureRoute.tsx';
import PendingLoader from '../components/PendingLoader.tsx';

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFoundPage,
});

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
});

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'login',
});

export const callbackRoute = createRoute({
  getParentRoute: () => loginRoute,
  path: 'callback',
  component: () => (
    <LoginCallback
      loadingElement={<PendingLoader />}
      errorComponent={(error) => <h1>From po: {error?.error?.message}</h1>}
    />
  ),
});

export const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth',
  component: SecureRoute,
});
