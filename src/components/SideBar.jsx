import React, { useContext } from "react";
import AdminTabBtn from "./common/AdminTabBtn";
import { IoMdHome } from "react-icons/io";
import {
  CategoriesIcon,
  ComplaintsIcon,
  OffersIcon,
  OrdersIcon,
  OrdersLogsIcon,
  UserDataIcon,
} from "./common/Icons";
import MyContext from "./context/MyContext";
const DashboardSideBar = () => {
  const { activeTab, setActiveTab } = useContext(MyContext);
  return (
    <div className="rounded-br-[30px] flex flex-col gap-[14px] w-[265px] bg-dark pt-24 2xl:pt-32 pb-12 h-[calc(100vh-99px)] overflow-auto hide_scroll">
      <AdminTabBtn
        btntext="Dashboard"
        icon={<IoMdHome className="text-2xl text-white" />}
        setActiveTab={() => setActiveTab("dashboard")}
        activeTab={activeTab === "dashboard"}
      />
      <AdminTabBtn
        btntext="Orders"
        icon={<OrdersIcon />}
        setActiveTab={() => setActiveTab("orders")}
        activeTab={activeTab === "orders"}
      />
      <AdminTabBtn
        btntext="Order logs"
        icon={<OrdersLogsIcon />}
        setActiveTab={() => setActiveTab("order-logs")}
        activeTab={activeTab === "order-logs"}
      />
      <AdminTabBtn
        btntext="User data"
        icon={<UserDataIcon />}
        setActiveTab={() => setActiveTab("user-data")}
        activeTab={activeTab === "user-data"}
      />
      <AdminTabBtn
        btntext="Categories"
        icon={<CategoriesIcon />}
        setActiveTab={() => setActiveTab("categories")}
        activeTab={activeTab === "categories"}
      />
      <AdminTabBtn
        btntext="Offers"
        icon={<OffersIcon />}
        setActiveTab={() => setActiveTab("offers")}
        activeTab={activeTab === "offers"}
      />
      <AdminTabBtn
        btntext="Complaints"
        icon={<ComplaintsIcon />}
        setActiveTab={() => setActiveTab("complaints")}
        activeTab={activeTab === "complaints"}
      />
    </div>
  );
};

export default DashboardSideBar;
