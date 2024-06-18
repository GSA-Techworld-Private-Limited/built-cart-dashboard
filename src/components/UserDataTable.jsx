import { useContext } from "react";
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
      <div>
        <div className="w-[1310px] 2xl:w-[1740px]">
          <div className="bg-[#BDBDBD] h-12 2xl:h-16 flex items-center">
            <div className="max-2xl:w-[80px] 2xl:px-[68px]"></div>
            <div className="flex pl-6 items-center gap-2 w-[150px] 2xl:w-[178px]">
              <p className="font-semibold text-nowrap table-text">Join Date</p>
              <DateRangeIcon />
            </div>
            <p className="font-semibold text-nowrap pl-6 w-[150px] 2xl:w-[204px] table-text">
              User
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[170px] 2xl:w-[237px] table-text">
              Mobile
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[270px] table-text">
              Email
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[180px] 2xl:w-[266px] table-text">
              Location
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[150px] 2xl:w-[204px] table-text">
              Referral
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[160px] 2xl:w-[243px] table-text">
              Status
            </p>
          </div>
          {userData &&
            userData
              .reduce((acc, item) => [item].concat(acc), [])
              .map((val, i) => (
                <div
                  key={i}
                  className={`2xl:h-[60px] h-12 mt-2 flex items-center ${
                    i % 2 === 0 ? "bg-[#FEF9EB]" : "bg-white"
                  }`}
                >
                  <div className="2xl:px-[54px] text-center w-[80px] 2xl:w-[136px]">
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
                  <p className="font-medium pl-6 w-[150px] 2xl:w-[178px] text-nowrap table-text">
                    {formatDateTime(val.updated_at)}
                  </p>
                  <p
                    onClick={() =>
                      getUserDetails(val.id, setActiveSubTab, setCurrUser)
                    }
                    className="font-medium cursor-pointer underline hover:no-underline duration-300 text-nowrap pl-6 w-[150px] 2xl:w-[204px] table-text"
                  >
                    {val.full_name}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[170px] 2xl:w-[237px] table-text">
                    {val.mobile_number}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[270px] 2xl:text-2xl text-base text-[#282828] text-ellipsis overflow-hidden">
                    {val.email ? val.email : "N/A"}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[180px] 2xl:w-[266px] table-text">
                    {val.city}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[150px] 2xl:w-[204px] table-text">
                    {val.referral_counts}
                  </p>
                  <p
                    className={`font-medium text-nowrap pl-6 w-[160px] 2xl:w-[243px] 2xl:text-2xl text-base leading-5 ${
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
