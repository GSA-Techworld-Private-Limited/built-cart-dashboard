import React, { useContext, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import MyContext from "./context/MyContext";
import CommonBtn from "./common/CommonBtn";
import ReferralsTable from "./ReferralsTable";
import UserOrderTable from "./UserOrderTable";
import axios from "axios";
import { baseUrl } from "./utils/auth";
export const getUserDetails = async (
  currElem,
  setActiveSubTab,
  setCurrUser
) => {
  const accessToken = sessionStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `${baseUrl}/superadmin/add-user-dashboard/?name_contains=${currElem}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setCurrUser(response.data);
    console.log(response.data);
    setActiveSubTab("user-details");
  } catch (error) {
    console.error("Fetch user data error:", error);
  }
};
const UserDetails = () => {
  const { setActiveSubTab, currUser } = useContext(MyContext);
  const [userTabs, setUserTabs] = useState("Referrals");

  const userDetails = currUser[0];
  console.log(currUser[0]);
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
              {userDetails.full_name}
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
              <p className="text-2xl font-normal text-black mb-2">
                Customer name
              </p>
              <p className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full 2xl:py-3 py-2 2xl:min-h-[62px] min-h-11 rounded-[10px] bg-transparent outline-none">
                {userDetails.full_name}
              </p>
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-2xl font-normal text-black mb-2">
                Mobile Number
              </p>
              <p className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full 2xl:py-3 py-2 2xl:min-h-[62px] min-h-11 rounded-[10px] bg-transparent outline-none">
                {userDetails.mobile_number}
              </p>
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-2xl font-normal text-black mb-2">Email ID</p>
              <p className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full 2xl:py-3 py-2 2xl:min-h-[62px] min-h-11 rounded-[10px] bg-transparent outline-none">
                {" "}
                {userDetails.email}
              </p>
            </div>
          </div>
          <div className="flex gap-6 justify-between mb-[52px] mt-7">
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-2xl font-normal text-black mb-2">Location</p>
              <p className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full 2xl:py-3 py-2 2xl:min-h-[62px] min-h-11 rounded-[10px] bg-transparent outline-none">
                {userDetails.city}
              </p>
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-2xl font-normal text-black mb-2">
                Total Referrals
              </p>
              <p className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full 2xl:py-3 py-2 2xl:min-h-[62px] min-h-11 rounded-[10px] bg-transparent outline-none">
                {userDetails.referral_counts}
              </p>
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-2xl font-normal text-black mb-2">
                Total Orders
              </p>
              <p className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full 2xl:py-3 py-2 2xl:min-h-[62px] min-h-11 rounded-[10px] bg-transparent outline-none"></p>
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
