import { useContext, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import MyContext from "./context/MyContext";
import CommonBtn from "./common/CommonBtn";
import ReferralsTable from "./ReferralsTable";
import UserOrderTable from "./UserOrderTable";
import axios from "axios";
import { baseUrl } from "./utils/auth";
import { toast } from "react-toastify";
export const getUserDetails = async (
  currElem,
  setActiveSubTab,
  setCurrUser
) => {
  const accessToken = sessionStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `${baseUrl}/superadmin/get-user-dashboard/${currElem}/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setCurrUser(response.data);
    setActiveSubTab("user-details");
  } catch (error) {
    console.error("Fetch user data error:", error);
  }
};
const UserDetails = () => {
  const {
    setActiveSubTab,
    currUser,
    setSelectExport,
    setShowExport,
    showExport,
  } = useContext(MyContext);
  const [userTabs, setUserTabs] = useState("Referrals");
  const handleExport = () => {
    const data =
      userTabs === "Referrals" ? currUser.referred_users : currUser.user_orders;
    if (data.length > 0) {
      setSelectExport(data);
      setShowExport(!showExport);
    } else {
      toast.warning("No orders to export", {
        className: "rounded-[10px]",
      });
    }
  };
  return (
    <>
      <div className="w-full h-[calc(100vh-126.59px)] 2xl:h-[calc(100vh-150px)] flex flex-col overflow-auto">
        <div className="pl-[26px]">
          <div className="flex items-center justify-between w-[95%] xl:w-[87%] mb-12">
            <div
              onClick={() => setActiveSubTab(null)}
              className="flex items-center gap-4"
            >
              <IoArrowBack className="text-3xxl 2xl:text-[50px]" />
              <p className="text-2xl 2xl:text-3xxl text-black font-semibold">
                {currUser.full_name}
              </p>
            </div>
            <CommonBtn
              clickEvent={handleExport}
              style="text-black bg-[#FDC63A] hover:bg-transparent hover:text-[#FDC63A]"
              btntext="Export"
            />
          </div>
          <form className="w-[95%] xl:w-[87%]">
            <div className="flex gap-6 justify-between">
              <div className="flex flex-col w-full max-w-[396px]">
                <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                  Customer name
                </p>
                <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 h-10 2xl:h-[54px] rounded-[10px] bg-transparent outline-none">
                  {currUser.full_name}
                </p>
              </div>
              <div className="flex flex-col w-full max-w-[396px]">
                <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                  Mobile Number
                </p>
                <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 h-10 2xl:h-[54px] rounded-[10px] bg-transparent outline-none">
                  {currUser.mobile_number}
                </p>
              </div>
              <div className="flex flex-col w-full max-w-[396px]">
                <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                  Email ID
                </p>
                <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 h-10 2xl:h-[54px] rounded-[10px] bg-transparent outline-none">
                  {currUser.email}
                </p>
              </div>
            </div>
            <div className="flex gap-6 justify-between mb-[52px] mt-7">
              <div className="flex flex-col w-full max-w-[396px]">
                <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                  Location
                </p>
                <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 h-10 2xl:h-[54px] rounded-[10px] bg-transparent outline-none">
                  {currUser.city}
                </p>
              </div>
              <div className="flex flex-col w-full max-w-[396px]">
                <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                  Total Referrals
                </p>
                <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 h-10 2xl:h-[54px] rounded-[10px] bg-transparent outline-none">
                  {currUser.referral_counts}
                </p>
              </div>
              <div className="flex flex-col w-full max-w-[396px]">
                <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                  Total Orders
                </p>
                <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 h-10 2xl:h-[54px] rounded-[10px] bg-transparent outline-none"></p>
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
      </div>
    </>
  );
};

export default UserDetails;
