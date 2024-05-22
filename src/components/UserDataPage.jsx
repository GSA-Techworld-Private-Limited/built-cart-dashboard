import React, { useContext } from "react";
import { IoSearchSharp } from "react-icons/io5";
import CommonBtn from "./common/CommonBtn";
import UserDataTable from "./UserDataTable";
import axios from "axios";
import { baseUrl } from "./utils/auth";
import MyContext from "./context/MyContext";
import { exportData } from "./utils/export";
const UserDataPage = () => {
  const { setUserData, userData, setShowExport, showExport, setSelectExport } =
    useContext(MyContext);
  const filterUserWithName = async (e) => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const userDataList = await axios.get(
        `${baseUrl}/superadmin/add-user-dashboard/?name_contains=${e.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(e.target.value);
      setUserData(userDataList.data);
    } catch (error) {
      console.error("Fetch user data error:", error);
    }
  };
  return (
    <>
      <div className="w-full">
        <p className="text-4xl ps-7 font-bold text-black leading-[80%] mb-[62px]">
          User Data
        </p>
        <div className="flex items-center ps-7 mb-[18px] gap-3 justify-between pr-8">
          <div className="flex items-center gap-[10px] me-4 max-h-[54px] 2xl:max-h-[62px] border w-[432px] border-black rounded-[10px] px-[13px]">
            <IoSearchSharp className="text-dark text-[28px]" />
            <input
              onChange={filterUserWithName}
              type="text"
              placeholder="Search Name, Location..."
              className="2xl:text-2xl text-xl text-[#6E6E73] leading-5 w-full placeholder:text-[#6E6E73] font-medium outline-none border-0 bg-transparent py-4 2xl:py-5"
            />
          </div>
          <div className="flex items-center gap-7">
            <CommonBtn
              style="text-white bg-[#FF3D00] hover:bg-transparent hover:text-[#FF3D00]"
              btntext="Block"
            />
            <CommonBtn
              clickEvent={() => {
                setSelectExport(userData), setShowExport(!showExport);
              }}
              style="text-black bg-[#FDC63A] hover:bg-transparent hover:text-[#FDC63A]"
              btntext="Export"
            />
          </div>
        </div>
        <UserDataTable />
      </div>
    </>
  );
};

export default UserDataPage;
