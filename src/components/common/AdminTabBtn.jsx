import React, { useContext } from "react";
import MyContext from "../context/MyContext";

const AdminTabBtn = ({ setActiveTab, activeTab, btntext, icon }) => {
  const { setActiveSubTab } = useContext(MyContext);
  return (
    <button
      className={`pl-8 pr-[70px] py-3 2xl:py-6 rounded-tr-[20px] text-nowrap text-lg font-medium 2xl:text-xl 2xl:font-semibold w-full text-white hover:bg-primary duration-500 flex gap-4 2xl:gap-6 items-center rounded-br-[20px] ${
        activeTab ? "bg-primary" : "bg-transparent"
      }`}
      onClick={() => {
        setActiveTab(true), setActiveSubTab(null);
      }}
    >
      <span>{icon}</span> {btntext}
    </button>
  );
};

export default AdminTabBtn;
