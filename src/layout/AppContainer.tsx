import { Outlet, ScrollRestoration } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import RouterNavLink from '../components/RouterNavLink.tsx';
import { useOktaAuth } from '@okta/okta-react';
import { AppShell, Burger, Button, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout } from '@tabler/icons-react';

const AppContainer = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>Logo</div>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <Stack justify="space-between" h="100%">
            <Stack>
              <RouterNavLink to="/" label="Home" />
              <RouterNavLink to="/order" label="Orders" />
            </Stack>
            {authState?.isAuthenticated && (
              <Button
                variant="transparent"
                leftSection={<IconLogout />}
                onClick={() => oktaAuth.signOut()}
              >
                Sign Out
              </Button>
            )}
          </Stack>
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
      <ScrollRestoration />
      <TanStackRouterDevtools />
    </>
  );
};

export default AppContainer;
