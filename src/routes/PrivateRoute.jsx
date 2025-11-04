// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function PrivateRoute({ children }) {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" replace />;
// }

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth(); // 👈 include loading from AuthContext

  if (loading) {
    // 🕒 Prevent redirect until AuthProvider finishes restoring user
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium">
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}
