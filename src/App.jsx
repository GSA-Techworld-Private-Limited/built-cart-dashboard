import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import MyContext from "./components/context/MyContext";
import { fetchUserData, getCoupon } from "./components/utils/auth";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { checkTokenExpiry } from "./components/utils/logout";
import { useNavigate, Navigate } from "react-router-dom";
function App() {
  const {
    authenticated,
    setAuthenticated,
    setOrderData,
    setUserData,
    setStatusData,
    setCategoryData,
    setAllCoupons,
    setComplaints,
    setOrderLogs,
    setProductDetails,
  } = useContext(MyContext);
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      fetchUserData(
        setUserData,
        setOrderData,
        setStatusData,
        setCategoryData,
        setComplaints,
        setOrderLogs,
        setProductDetails
      );
      getCoupon(setAllCoupons);
    }
  }, []);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  // Check token expiry on component mount
  useEffect(() => {
    setIsTokenExpired(checkTokenExpiry());
  }, []);
  // Check token expiry periodically (e.g., every minute)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTokenExpired(checkTokenExpiry());
    }, 60000); // 60000 milliseconds = 1 minute
    return () => clearInterval(interval);
  }, []);
  // Logout user if token is expired
  useEffect(() => {
    if (isTokenExpired) {
      logout(navigate, setAuthenticated);
    }
  }, [isTokenExpired]);
  useEffect(() => {
    const isRefreshToken = sessionStorage.getItem("refreshToken");
    if (isRefreshToken) {
      setAuthenticated(true);
    }
  }, [authenticated]);
  return (
    <React.Fragment>
      <ToastContainer autoClose={2500} />
      <Routes>
        <Route
          path="/"
          element={authenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;
