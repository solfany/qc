import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:8080/api/user", {
            params: { id: localStorage.getItem("userId") }, // `id`를 쿼리 파라미터로 포함
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error(
            "User fetch error:",
            error.response?.data || error.message
          );
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setUser(null);
        }
      }
    };

    fetchUser();
  }, []);

  const login = async (id, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        id,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", id); // `id`를 로컬 스토리지에 저장

        const userResponse = await axios.get("http://localhost:8080/api/user", {
          params: { id }, // 로그인한 사용자 ID를 쿼리 파라미터로 전달
          headers: { Authorization: `Bearer ${response.data.token}` },
        });

        setUser(userResponse.data);
        return true;
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
