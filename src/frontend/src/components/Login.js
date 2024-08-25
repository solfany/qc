import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/Login.css";

const Login = () => {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = e.target.username.value;
      const password = e.target.password.value;
      const success = await login(id, password);
      if (success) {
        navigate("/");
      } else {
        alert("로그인 실패: 유효하지 않은 자격 증명");
      }
    } catch (error) {
      console.error(
        "There was an error logging in!",
        error.response?.data || error.message
      );
      alert("로그인 중 오류 발생");
    }
  };

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (user) {
    return null; // 로그인된 사용자는 로그인 페이지를 볼 수 없음
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src="/img/logo.png" alt="Logo" className="login-logo" />
        <div>
          <label>Username</label>
          <input type="text" name="username" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <Link to="/register">Don't have an account? Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
