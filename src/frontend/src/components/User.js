import React from "react";
import "../css/User.css"; // Import the CSS file for styling
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";

const User = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 로딩 메시지 표시
  }

  if (!user) {
    return <div>No user data available.</div>; // 사용자 정보가 없을 때 메시지 표시
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };

  return (
    <div className="user-page">
      <h1>User Info</h1>
      <div className="user-container">
        <div className="user-info">
          <h3>유저 정보</h3>
          <p>
            <strong>Id:</strong> {user.id || "N/A"}
          </p>
          <p>
            <strong>Name:</strong> {user.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user.email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone || "N/A"}
          </p>
          <p>
            <strong>Role:</strong> {user.role || "N/A"}
          </p>
          <p>
            <strong>Join Date:</strong> {formatDate(user.createDt)}
          </p>
          <p>
            <strong>Last Connect Date:</strong> {formatDate(user.lastConnectDt)}
          </p>
        </div>
      </div>
      <div className="user-container">
        <div className="user-info">
          <h3>최근 접속일</h3>
          <ul>
            {user.lastConnectDt ? (
              <li>{formatDate(user.lastConnectDt)}</li>
            ) : (
              <li>No recent logins</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default User;
