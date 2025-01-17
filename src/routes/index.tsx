
import { ElementType, lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// import AuthGuard from 'guards/AuthGuard';
// guards
// layouts
// components
import LoadingScreen from 'components/LoadingScreen';
// hooks

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
(
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);



// PAGE
const ProjectList = Loadable(lazy(() => import('pages/ProjectList')));


export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="project-list" replace />,
    },
    {
      path: 'project-list',
      element: (
        < ProjectList />
      ),
    },
    { path: '*', element: <Navigate to="/project-list" replace /> },
  ]);
}
