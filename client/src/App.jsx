import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import RoomList from "./components/RoomList";
import Booking from "./components/Booking";
import Dashboard from "./components/Dashboard";
import RoomManagement from "./components/RoomManagement";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./styles/App.css";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.type !== "admin") return <Navigate to="/dashboard" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Auth />} />
              <Route path="/register" element={<Auth isRegister />} />
              <Route
                path="/rooms"
                element={
                  <PrivateRoute>
                    <RoomList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/booking/:roomId"
                element={
                  <PrivateRoute>
                    <Booking />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/manage-rooms"
                element={
                  <AdminRoute>
                    <RoomManagement />
                  </AdminRoute>
                }
              />
              <Route path="/" element={<Navigate to="/rooms" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
