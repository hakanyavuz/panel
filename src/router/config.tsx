import type { RouteObject } from 'react-router-dom'
import HomePage from '../pages/home/page'
import DashboardPage from '../pages/dashboard/page'
import ModulesPage from '../pages/dashboard/modules'
import LoginPage from '../pages/auth/login'
import RegisterPage from '../pages/auth/register'
import NotFoundPage from '../pages/NotFound'
import ProtectedRoute from '../components/ProtectedRoute'
import AnalyticsPage from '../pages/analytics/page'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/modules',
    element: (
      <ProtectedRoute>
        <ModulesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/analytics',
    element: <ProtectedRoute><AnalyticsPage /></ProtectedRoute>
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

export default routes
