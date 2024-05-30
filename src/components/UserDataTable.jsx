import React, { useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRangeIcon } from "./common/Icons";
import MyContext from "./context/MyContext";
import { formatDateTime } from "./OrdersTable";
import { handleCheckBoxChange } from "./utils/handleCheckBox";
import CheckBox from "./common/CheckBox";
import { getUserDetails } from "./UserDetails";
const UserDataTable = () => {
  const {
    setActiveSubTab,
    userData,
    checkedItems,
    setCheckedItems,
    setCurrUser,
    setCategorySelect,
  } = useContext(MyContext);
  return (
    <>
      <div className="overflow-auto hide_scroll">
        <div className="w-[1740px]">
          <div className="bg-[#BDBDBD] h-[54px] 2xl:h-16 flex items-center">
            <div className="px-[54px]">
              <Checkbox border="border-dark" />
            </div>
            <div className="flex pl-6 items-center gap-2 w-[178px]">
              <p className="font-semibold text-nowrap 2xl:text-2xl text-xl leading-5 text-[#282828]">
                Join Date
              </p>
              <DateRangeIcon />
            </div>
            <p className="font-semibold text-nowrap pl-6 w-[204px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              User
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[237px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Mobile
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[270px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Email
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[266px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Location
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[204px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Referral
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[243px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Status
            </p>
          </div>
          {userData &&
            userData.map((val, i) => (
              <div
                key={i}
                className={`2xl:h-[60px] h-[54px] mt-2 flex items-center ${
                  i % 2 === 0 ? "bg-[#FEF9EB]" : "bg-white"
                }`}
              >
                <div className="px-[54px] w-[136px]">
                  <CheckBox
                    inputStyle="!border-[#686868]"
                    checkStyle="!border-[#686868] !bg-transparent"
                    isChecked={checkedItems[val.id] || false}
                    handleCheckBox={() =>
                      handleCheckBoxChange(
                        val.id,
                        setCheckedItems,
                        setCategorySelect
                      )
                    }
                  />
                </div>
                <p className="font-medium pl-6 w-[178px] text-nowrap 2xl:text-2xl text-xl leading-5 text-[#282828]">
                  {formatDateTime(val.updated_at)}
                </p>
                <p
                  onClick={() =>
                    getUserDetails(val.id, setActiveSubTab, setCurrUser)
                  }
                  className="font-medium cursor-pointer underline text-nowrap pl-6 w-[204px] 2xl:text-2xl text-xl leading-5 text-[#282828]"
                >
                  {val.full_name}
                </p>
                <p className="font-medium text-nowrap pl-6 w-[237px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                  {val.mobile_number}
                </p>
                <p className="font-medium text-nowrap pl-6 w-[270px] 2xl:text-2xl text-xl text-[#282828] text-ellipsis overflow-hidden">
                  {val.email ? val.email : "N/A"}
                </p>
                <p className="font-medium text-nowrap pl-6 w-[270px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                  {val.city}
                </p>
                <p className="font-medium text-nowrap pl-6 w-[204px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                  {val.referral_counts}
                </p>
                <p
                  className={`font-medium text-nowrap pl-6 w-[243px] 2xl:text-2xl text-xl leading-5 ${
                    val.status === "Pending" ||
                    val.status === "Cancelled" ||
                    val.status === "Inactive"
                      ? "text-[#FF3D00]"
                      : val.status === "Dispatched"
                      ? "text-[#FDC63A]"
                      : val.status === "Delivered" || val.status === "Active"
                      ? "text-[#0FB001]"
                      : ""
                  }`}
                >
                  {val.status ? val.status : "N/A"}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default UserDataTable;
