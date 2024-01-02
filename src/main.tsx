import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './router.tsx';
import OktaAuth, { toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { RestoreOriginalUriFunction } from '@okta/okta-react/bundles/types/OktaContext';
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import { RouterProvider } from '@tanstack/react-router';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-71511401.okta.com/oauth2/default',
  clientId: '0oae861o1kX1HgorT5d7',
  redirectUri: window.location.origin + '/login/callback',
});

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
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </Security>
  </React.StrictMode>
);
