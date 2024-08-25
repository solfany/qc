// src/components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import "../css/Layout.css";

const Layout = () => {
  const { user } = useAuth();

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        {user ? <Outlet /> : <p>You need to log in to view this content.</p>}
      </div>
    </div>
  );
};

export default Layout;
