import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import Layout from '../layout/Layout';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import PageNotFound from '../pages/pageNotFound/PageNotFound';

// dashboard
// import DashboardLayout from '../layout/DashboardLayout';
// import {
//   Favorites,
//   Messages,
//   Pages,
//   Profile,
//   Projects,
//   Settings,
// } from '../pages/dashboard';
// import ProjectsDetails from '../pages/dashboard/projects/ProjectDetails';
// import AllProjects from '../pages/dashboard/projects/AllProjects';
// import AllProjectsDetails from '../pages/dashboard/projects/AllProjectsDetails';
// import CreateProject from '../pages/dashboard/projects/CreateProject';
// import Specializations from '../pages/specializations/Specializations';
// import SpecializationsDetails from '../pages/specializations/SpecializationsDetails';

// Определение основного маршрутизатора для публичных страниц
export const router = createBrowserRouter([
  // home
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
  // auth
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  // dashboard
  // {
  //   path: '/admin',
  //   element: <DashboardLayout />,
  //   children: [
  //     {
  //       path: 'profile',
  //       element: <Profile />,
  //     },
  //     {
  //       path: 'pages',
  //       element: <Pages />,
  //     },
  //     {
  //       path: 'projects',
  //       element: <Projects />,
  //     },
  //     {
  //       path: 'projects/create-project',
  //       element: <CreateProject />,
  //     },
  //     {
  //       path: 'projects/details/:id',
  //       element: <ProjectsDetails />,
  //     },
  //     {
  //       path: 'all-projects',
  //       element: <AllProjects />,
  //     },
  //     {
  //       path: 'all-projects/details/:id',
  //       element: <AllProjectsDetails />,
  //     },
  //     {
  //       path: 'specializations',
  //       element: <Specializations />,
  //     },
  //     {
  //       path: 'specializations/specializations-details',
  //       element: <SpecializationsDetails />,
  //     },
  //     {
  //       path: 'messages',
  //       element: <Messages />,
  //     },
  //     {
  //       path: 'favorites',
  //       element: <Favorites />,
  //     },
  //     {
  //       path: 'settings',
  //       element: <Settings />,
  //     },
  //   ],
  // },
]);

// export const = createBrowserRouter([
//   {
//     path: '/admin',
//     element: <DashboardLayout />,
//     children: [
//       {
//         path: '/admin/profile',
//         element: <Profile />,
//       },
//       {
//         path: '/admin/projects',
//         element: <Projects />,
//       },
//       {
//         path: '/admin/projects/details/:id',
//         element: <ProjectsDetails />,
//       },
//       {
//         path: '/admin/messages',
//         element: <Messages />,
//       },
//       {
//         path: '/admin/favorites',
//         element: <Favorites />,
//       },
//       {
//         path: '/admin/settings',
//         element: <Settings />,
//       },
//     ],
//   },
// ]);
