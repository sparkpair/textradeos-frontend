import { createContext, useState, useContext, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Check user & business status from DB
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const { data } = await axiosClient.get("/auth/status");
        setUser(data.user); // data.user will now have isReadOnly
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("sessionId", data.sessionId);
    setUser(data); // data contains isReadOnly from login response
  };

  const logout = async () => {
    const sessionId = localStorage.getItem("sessionId");

    if (sessionId) {
      try {
        await axiosClient.post("/users/logout", { sessionId });
      } catch (err) {
        console.log("Logout failed:", err.message);
      }
    }

    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
