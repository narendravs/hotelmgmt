import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading } = useAppContext();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  // If not logged in, redirect to login and save the current location
  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRoute;
