import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaList, FaHistory, FaSignInAlt, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "../css/Sidebar.css";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("로그아웃됩니다.");
    logout();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/img/logo.png" alt="Logo" className="login-logo" />
      </div>
      <nav className="sidebar-nav">
        <ul>
          {user && (
            <>
              <li>
                <Link to="/user">
                  <FaUser className="icon" />
                  사용자
                </Link>
              </li>
              <li>
                <Link to="/">
                  <FaHome className="icon" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/checklist">
                  <FaList className="icon" />
                  CheckList
                </Link>
              </li>
              <li>
                <Link to="/history">
                  <FaHistory className="icon" />
                  History
                </Link>
              </li>
            </>
          )}
          <li>
            {user ? (
              <button onClick={handleLogout} className="logout-button">
                <FaSignInAlt className="icon" />
                Logout
              </button>
            ) : (
              <Link to="/login">
                <FaSignInAlt className="icon" />
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
