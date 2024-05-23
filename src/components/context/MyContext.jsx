import React, { createContext, useState } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [showExport, setShowExport] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [editOverlay, setEditOverlay] = useState(false);
  const [categorySelect, setCategorySelect] = useState(null);
  const [selectExport, setSelectExport] = useState(null);
  const [userData, setUserData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [statusData, setStatusData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [productDetailsData, setProductDetailsData] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [userOrderDetails, setUserOrderDetails] = useState();
  const [currUser, setCurrUser] = useState(null);
  const [isOfferSent, setIsOfferSent] = useState(false);
  const [allCoupons, setAllCoupons] = useState(null);
  const [complaints, setComplaints] = useState(null);
  const [orderLogs, setOrderLogs] = useState(null);
  const [logsDetails, setLogsDetails] = useState(null);
  return (
    <MyContext.Provider
      value={{
        setAllCoupons,
        allCoupons,
        checkedItems,
        setCheckedItems,
        activeSubTab,
        setActiveSubTab,
        showExport,
        setShowExport,
        activeTab,
        setActiveTab,
        authenticated,
        setAuthenticated,
        userData,
        setUserData,
        orderData,
        setOrderData,
        statusData,
        setStatusData,
        categoryData,
        setCategoryData,
        productDetailsData,
        setProductDetailsData,
        categorySelect,
        setCategorySelect,
        editOverlay,
        setEditOverlay,
        selectExport,
        setSelectExport,
        userOrderDetails,
        setUserOrderDetails,
        setCurrUser,
        currUser,
        isOfferSent,
        setIsOfferSent,
        setComplaints,
        complaints,
        orderLogs,
        setOrderLogs,
        setLogsDetails,
        logsDetails,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
