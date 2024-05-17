import React, { useContext, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import MyContext from "./context/MyContext";
import CommonBtn from "./common/CommonBtn";
import ReferralsTable from "./ReferralsTable";
import UserOrderTable from "./UserOrderTable";

const UserDetails = () => {
  const { setActiveSubTab } = useContext(MyContext);
  const [userTabs, setUserTabs] = useState("Referrals");
  return (
    <>
      <div className="pl-[26px]">
        <div className="flex items-center justify-between w-[95%] xl:w-[87%] mb-12">
          <div
            onClick={() => setActiveSubTab(null)}
            className="flex items-center gap-4"
          >
            <IoArrowBack className="text-3xxl 2xl:text-[50px]" />
            <p className="text-2xl 2xl:text-3xxl text-black font-semibold">
              Kiran(User)
            </p>
          </div>
          <CommonBtn
            style="text-black bg-[#FDC63A] hover:bg-transparent hover:text-[#FDC63A]"
            btntext="Export"
          />
        </div>
        <form className="w-[95%] xl:w-[87%]">
          <div className="flex gap-6 justify-between">
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="name"
                className="text-2xl font-normal text-black mb-2"
              >
                Customer name
              </label>
              <input
                id="name"
                type="text"
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="number"
                className="text-2xl font-normal text-black mb-2"
              >
                Mobile Number
              </label>
              <input
                id="number"
                type="number"
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="Email"
                className="text-2xl font-normal text-black mb-2"
              >
                Email ID
              </label>
              <input
                id="Email"
                type="email"
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex gap-6 justify-between mb-[52px] mt-7">
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="Location"
                className="text-2xl font-normal text-black mb-2"
              >
                Location
              </label>
              <input
                id="Location"
                type="text"
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="total-referrals"
                className="text-2xl font-normal text-black mb-2"
              >
                Total Referrals
              </label>
              <input
                id="total-referrals"
                type="number"
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="Total"
                className="text-2xl font-normal text-black mb-2"
              >
                Total Orders
              </label>
              <input
                id="Total"
                type="number"
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="rounded-t-[30px] bg-[#F1F0F0] flex items-center gap-[121px] pl-[70px]">
        <button
          onClick={() => setUserTabs("Referrals")}
          className={`text-2xl 2xl:text-3xxl font-medium py-4 relative ${
            userTabs === "Referrals"
              ? "text-dark after:absolute after:w-full after:h-[3px] after:bg-dark after:left-0 after:bottom-2"
              : "text-[#606060]"
          }`}
        >
          Referrals
        </button>
        <button
          onClick={() => setUserTabs("Orders")}
          className={`text-2xl 2xl:text-3xxl font-medium py-4 relative ${
            userTabs === "Orders"
              ? "text-dark after:absolute after:w-full after:h-[3px] after:bg-dark after:left-0 after:bottom-2"
              : "text-[#606060]"
          }`}
        >
          Orders
        </button>
      </div>
      {userTabs === "Referrals" ? (
        <ReferralsTable />
      ) : userTabs === "Orders" ? (
        <UserOrderTable />
      ) : null}
    </>
  );
};

export default UserDetails;
