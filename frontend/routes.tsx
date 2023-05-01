import HelloReactView from 'Frontend/views/helloreact/HelloReactView.js';
import MainLayout from 'Frontend/views/MainLayout.js';
import { createBrowserRouter, IndexRouteObject, NonIndexRouteObject, useMatches } from 'react-router-dom';
import RegistrationView1 from './views/registration/RegistrationView1.js';
import RegistrationView2 from './views/registration/RegistrationView2.js';
import RegistrationView3 from './views/registration/RegistrationView3.js';
import RegistrationView4 from './views/registration/RegistrationView4.js';
import RegistrationView5 from './views/registration/RegistrationView5.js';
import RegistrationView6 from './views/registration/RegistrationView6.js';
import RegistrationView7 from './views/registration/RegistrationView7.js';

export type MenuProps = Readonly<{
  icon?: string;
  title?: string;
}>;

export type ViewMeta = Readonly<{ handle?: MenuProps }>;

type Override<T, E> = Omit<T, keyof E> & E;

export type IndexViewRouteObject = Override<IndexRouteObject, ViewMeta>;
export type NonIndexViewRouteObject = Override<
  Override<NonIndexRouteObject, ViewMeta>,
  {
    children?: ViewRouteObject[];
  }
>;
export type ViewRouteObject = IndexViewRouteObject | NonIndexViewRouteObject;

type RouteMatch = ReturnType<typeof useMatches> extends (infer T)[] ? T : never;

export type ViewRouteMatch = Readonly<Override<RouteMatch, ViewMeta>>;

export const useViewMatches = useMatches as () => readonly ViewRouteMatch[];

export const routes: readonly ViewRouteObject[] = [
  {
    element: <MainLayout />,
    handle: { icon: 'null', title: 'Main' },
    children: [
      { path: '/', element: <HelloReactView />, handle: { icon: 'globe-solid', title: 'Introduction' } },
      { path: '/registration1', element: <RegistrationView1 />, handle: { icon: 'pen-solid', title: 'Registration 1' } },
      { path: '/registration2', element: <RegistrationView2 />, handle: { icon: 'pen-solid', title: 'Registration 2' } },
      { path: '/registration3', element: <RegistrationView3 />, handle: { icon: 'pen-solid', title: 'Registration 3' } },
      { path: '/registration4', element: <RegistrationView4 />, handle: { icon: 'pen-solid', title: 'Registration 4' } },
      { path: '/registration5', element: <RegistrationView5 />, handle: { icon: 'pen-solid', title: 'Registration 5' } },
      { path: '/registration6', element: <RegistrationView6 />, handle: { icon: 'pen-solid', title: 'Registration 6' } },
      { path: '/registration7', element: <RegistrationView7 />, handle: { icon: 'pen-solid', title: 'Registration 7' } },
    ],
  },
];

const router = createBrowserRouter([...routes]);
export default router;
