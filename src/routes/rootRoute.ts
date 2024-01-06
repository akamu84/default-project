import { rootRouteWithContext } from '@tanstack/react-router';
import AppContainer from '../layout/AppContainer.tsx';
import { QueryClient } from '@tanstack/react-query';

interface RouteContext {
  queryClient: QueryClient;
}

export const rootRoute = rootRouteWithContext<RouteContext>()({
  component: AppContainer,
});
