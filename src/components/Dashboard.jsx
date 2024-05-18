import React, { useContext, useEffect } from "react";
import AdminNav from "./common/AdminNav";

import UserDashboard from "./UserDashboard";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import MyContext from "./context/MyContext";
import OrderLogs from "./OrderLogs";
import ExportOverlay from "./ExportOverlay";
import DashboardSideBar from "./SideBar";
import UserDataPage from "./UserDataPage";
import UserDetails from "./UserDetails";
import CategoriesPage from "./CategoriesPage";
import ProductDetails from "./ProductDetails";
import AddProduct from "./AddProduct";
import ComplaintsPage from "./ComplaintsPage";
import OffersPage from "./OffersPage";
import OrderLogsDetails from "./OrderLogsDetails";
import EditOverlay from "./common/EditOverlay";
const Dashboard = () => {
  const { activeSubTab, activeTab, userData } = useContext(MyContext);
  useEffect(() => {
    scrollTo(0, 0);
  }, [activeTab]);

  return (
    <>
      <section className="flex min-h-screen flex-col overflow-hidden">
        <AdminNav />
        <EditOverlay />
        <div className="flex flex-grow overflow-x-hidden max-w-[1920px] mx-auto">
          <DashboardSideBar />
          <div className="pt-10 w-[calc(100vw-265px)] min-[1920px]:w-[calc(1920px-265px)] h-[calc(100vh-99px)] overflow-auto">
            {activeTab === "dashboard" ? (
              <UserDashboard />
            ) : activeTab === "orders" ? (
              activeSubTab === "order-details" ? (
                <OrderDetails />
              ) : (
                <Orders />
              )
            ) : activeTab === "order-logs" ? (
              activeSubTab === "order-details" ? (
                <OrderLogsDetails
                  status="Delivered"
                  style="after:bg-[#0FB001] text-[#0FB001]"
                />
              ) : (
                <OrderLogs />
              )
            ) : activeTab === "user-data" ? (
              activeSubTab === "user-details" ? (
                <UserDetails />
              ) : (
                <UserDataPage />
              )
            ) : activeTab === "categories" ? (
              activeSubTab === "categories-products" ? (
                <ProductDetails id="" />
              ) : activeSubTab === "add-products" ? (
                <AddProduct />
              ) : (
                <CategoriesPage />
              )
            ) : activeTab === "complaints" ? (
              <ComplaintsPage />
            ) : activeTab === "offers" ? (
              <OffersPage />
            ) : null}
          </div>
        </div>
        <ExportOverlay />
      </section>
    </>
  );
};

export default Dashboard;
