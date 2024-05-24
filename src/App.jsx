import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import MyContext from "./components/context/MyContext";
import { fetchUserData, getCoupon } from "./components/utils/auth";
import ProtectedRoute from "./components/routes/ProtectedRoute";

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

  useEffect(() => {
    const isRefreshToken = sessionStorage.getItem("refreshToken");
    console.log(authenticated);
    if (isRefreshToken) {
      setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* {authenticated ? (
          <Route path="/dashboard" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<LoginPage />} />
        )} */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
