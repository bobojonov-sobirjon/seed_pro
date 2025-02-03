import { Navigate, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import {
  Profile,
  Projects,
  Messages,
  Favorites,
  Settings,
  Pages,
} from '../pages/dashboard';
import ProjectDetails from '../pages/dashboard/projects/ProjectDetails';
import AllProjects from '../pages/dashboard/projects/AllProjects';
import AllProjectsDetails from '../pages/dashboard/projects/AllProjectsDetails';
import CreateProject from '../pages/dashboard/projects/CreateProject';
import Specializations from '../pages/specializations/Specializations';
import SpecializationsDetails from '../pages/specializations/SpecializationsDetails';
import OneProjectView from '../pages/dashboard/projects/components/OneProjectView';
import Role from '../pages/dashboard/role/Role';
import PageNotFound from '../pages/pageNotFound/PageNotFound';

export const dashboardRouter = createBrowserRouter([
  {
    path: '/role',
    element: <Role />,
  },
  {
    path: '/admin',
    element: <DashboardLayout />,
    children: [
      {
        path: '/admin/profile',
        element: <Profile />,
      },
      {
        path: '/admin/pages',
        element: <Pages />,
      },
      {
        path: '/admin/projects',
        element: <Projects />,
      },
      {
        path: '/admin/create-project',
        element: <CreateProject />,
      },
      {
        path: '/admin/update-project',
        element: <CreateProject />,
      },
      {
        path: '/admin/all-projects',
        element: <AllProjects />,
      },
      {
        path: '/admin/all-projects/project-about',
        element: <OneProjectView />,
      },
      {
        path: '/admin/projects/details/',
        element: <ProjectDetails />,
      },
      {
        path: '/admin/specializations',
        element: <Specializations />,
      },
      {
        path: '/admin/specializations/specialization-detail',
        element: <SpecializationsDetails />,
      },
      {
        path: '/admin/all-projects/details/:id',
        element: <AllProjectsDetails />,
      },
      {
        path: '/admin/messages',
        element: <Messages />,
      },
      {
        path: '/admin/favorites',
        element: <Favorites />,
      },
      {
        path: '/admin/settings',
        element: <Settings />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: '/',
    // element: <Navigate to="/admin/pages" replace />,
    element: <Navigate to="/role" replace />,
  },
]);
