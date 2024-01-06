import React from 'react';
import ReactDOM from 'react-dom/client';
import { routeTree } from './routes/routeTree.tsx';
import OktaAuth, { toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { RestoreOriginalUriFunction } from '@okta/okta-react/bundles/types/OktaContext';
import { MantineProvider } from '@mantine/core';
import { Router, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { notFoundRoute } from './routes/baseRoutes.ts';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-71511401.okta.com/oauth2/default',
  clientId: '0oae861o1kX1HgorT5d7',
  redirectUri: window.location.origin + '/login/callback',
});

const queryClient = new QueryClient();

const router = new Router({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  notFoundRoute,
  context: { queryClient },
});

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router;
  }
}

const restoreOriginalUri: RestoreOriginalUriFunction = async (
  _oktaAuth,
  originalUri
) => {
  console.log(originalUri);
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
