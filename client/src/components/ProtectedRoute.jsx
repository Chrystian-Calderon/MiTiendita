import { Navigate } from 'react-router'

export const ProtectedRoute = ({ children, redirectTo="/" }) => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  if (!auth || !auth.logged) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
}

export default ProtectedRoute;