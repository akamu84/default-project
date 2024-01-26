import React from 'react';
import ReactDOM from 'react-dom/client';
import { routeTree } from './routes/routeTree.tsx';
import OktaAuth, { toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { RestoreOriginalUriFunction } from '@okta/okta-react/bundles/types/OktaContext';
import { MantineProvider } from '@mantine/core';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { notFoundRoute } from './routes/baseRoutes.tsx';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import PendingLoader from './components/PendingLoader.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-71511401.okta.com/oauth2/default',
  clientId: '0oae861o1kX1HgorT5d7',
  redirectUri: window.location.origin + '/login/callback',
});

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  notFoundRoute,
  defaultPendingComponent: PendingLoader,
  defaultErrorComponent: NotFoundPage,
  context: { queryClient },
});

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router;
    defaultError: AxiosError;
  }
}

const restoreOriginalUri: RestoreOriginalUriFunction = async (
  _oktaAuth,
  originalUri
) => {
  router.history.push(
    toRelativeUrl(originalUri || '/', window.location.origin)
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <RouterProvider router={router} />
          <Notifications />
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Security>
  </React.StrictMode>
);
