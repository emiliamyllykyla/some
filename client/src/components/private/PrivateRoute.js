import { useAuth } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

// Wrapper for components that are only to be displayed
// to an authenticated user
const PrivateRoute = () => {
  const { auth, loadingAuth } = useAuth();

  if(loadingAuth) return <div>Loading...</div>
  return auth ? <Outlet/> : <Navigate to="/login" />;
};

export default PrivateRoute;
