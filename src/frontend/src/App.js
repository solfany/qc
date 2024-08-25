import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import MainPage from "./components/MainPage";
import CheckList from "./components/CheckList";
import ChecklistDetail from "./components/ChecklistDetail";
import History from "./components/History";
import User from "./components/User";
import Layout from "./components/Layout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 로딩 메시지 표시
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<MainPage />} />
        <Route path="checklist" element={<CheckList />} />
        <Route path="checklist/:id" element={<ChecklistDetail />} />
        <Route path="history" element={<History />} />
        <Route path="user" element={<User />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
