// src/components/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // 로딩 중일 때 빈 화면을 렌더링
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;