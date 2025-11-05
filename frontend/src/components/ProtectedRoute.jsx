import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // If no user is logged in, send them to the /login page
    return <Navigate to="/login" replace />;
  }

  // If they are logged in, show them the page they asked for
  return children;
}

export default ProtectedRoute;