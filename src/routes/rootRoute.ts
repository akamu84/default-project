import { RootRoute } from '@tanstack/react-router';
import AppContainer from '../layout/AppContainer.tsx';

export const rootRoute = new RootRoute({
  component: AppContainer,
});
