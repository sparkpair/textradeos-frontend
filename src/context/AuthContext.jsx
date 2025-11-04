import { createContext, useState, useContext, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 added

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // 👈 finish initialization
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("sessionId", data.sessionId);
    setUser(data);
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
