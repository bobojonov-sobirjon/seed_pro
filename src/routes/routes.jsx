import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import Layout from '../layout/Layout';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import PageNotFound from '../pages/pageNotFound/PageNotFound';


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
]);

