import React, { useContext } from "react";
import { IoSearchSharp } from "react-icons/io5";
import CommonBtn from "./common/CommonBtn";
import UserDataTable from "./UserDataTable";
import axios from "axios";
import { baseUrl, fetchDataOfUser } from "./utils/auth";
import MyContext from "./context/MyContext";
import { toast } from "react-toastify";
const UserDataPage = () => {
  const {
    setUserData,
    userData,
    setShowExport,
    showExport,
    setSelectExport,
    categorySelect,
  } = useContext(MyContext);
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
      setUserData(userDataList.data);
    } catch (error) {
      console.error("Fetch user data error:", error);
    }
  };
  const deleteUser = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!categorySelect) {
      toast.warning("First Select Any Item!", {
        className: "rounded-[10px]",
      });
    } else {
      try {
        const res = await axios.delete(
          `${baseUrl}/superadmin/get-user-dashboard/${categorySelect}/`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        fetchDataOfUser(setUserData);
        console.log(res);
        toast.success(res.data.message, {
          className: "rounded-[10px]",
        });
      } catch (error) {
        console.error("Error While Blocking!", error);
        // Show error message
        toast.error("Failed!! Try again", {
          className: "rounded-[10px]",
        });
      }
    }
  };
  return (
    <>
      <div className="w-full h-[calc(100vh-126.59px)] 2xl:h-[calc(100vh-150px)] flex flex-col">
        <p className="text-3xxl 2xl:text-4xl ps-7 font-bold text-black leading-[80%] mb-[62px]">
          User Data
        </p>
        <div className="overflow-auto hide_scroll">
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
                clickEvent={deleteUser}
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
      </div>
    </>
  );
};

export default UserDataPage;
