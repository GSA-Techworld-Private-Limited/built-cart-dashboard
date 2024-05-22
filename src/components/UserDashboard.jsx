import React, { useContext } from "react";
import { ChooseIcon } from "./common/Icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "react-toastify/dist/ReactToastify.css";
import MyContext from "./context/MyContext";
import { fetchStatusData } from "./utils/auth";
const UserDashboard = () => {
  const { statusData, setStatusData } = useContext(MyContext);

  const handleStatusUpdate = (value) => {
    fetchStatusData(setStatusData, value);
  };
  return (
    <>
      <div className="flex items-center ps-9 pb-16">
        <ChooseIcon />
        <p className="text-2xl text-black font-medium ms-[14px] mr-6">
          Choose By
        </p>
        <Select onValueChange={handleStatusUpdate}>
          <SelectTrigger className="w-[277px]">
            <SelectValue placeholder="This Month" />
          </SelectTrigger>
          <SelectContent width="w-[277px]">
            <SelectItem color="text-black" value="today">
              Today
            </SelectItem>
            <SelectItem color="text-black" value="yesterday">
              Yesterday
            </SelectItem>
            <SelectItem color="text-black" value="this week">
              This week
            </SelectItem>
            <SelectItem color="text-black" value="this month">
              This month
            </SelectItem>
            <SelectItem color="text-black" value="last month">
              Last month
            </SelectItem>
            <SelectItem color="text-black" value="last 3 month">
              Last 3 month
            </SelectItem>
            <SelectItem color="text-black" value="last 6 month">
              Last 6 month
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="inline-grid grid-cols-2 ps-7 gap-y-8 2xl:gap-y-11 gap-14 2xl:gap-x-[72px] pb-10">
        {statusData && (
          <>
            <div className="w-[320px] 2xl:w-[387px] p-[22px] bg-light shadow-lg text-center rounded-[10px]">
              <p className={`text-2xl font-medium mb-2 text-dark `}>
                Total User{" "}
              </p>
              <p className={`text-5xl font-bold leading-[72px] text-dark `}>
                {statusData.Total_User}
              </p>
            </div>
            <div className="w-[320px] 2xl:w-[387px] p-[22px] bg-light shadow-lg text-center rounded-[10px]">
              <p className={`text-2xl font-medium mb-2 text-[#FDC63A] `}>
                Total Orders
              </p>
              <p
                className={`text-5xl font-bold leading-[72px] text-[#FDC63A] `}
              >
                {statusData.Total_Order}
              </p>
            </div>
            <div className="w-[320px] 2xl:w-[387px] p-[22px] bg-light shadow-lg text-center rounded-[10px]">
              <p className={`text-2xl font-medium mb-2 text-[#D31010] `}>
                Orders Pending
              </p>
              <p
                className={`text-5xl font-bold leading-[72px] text-[#D31010] `}
              >
                {statusData.Order_Pending}
              </p>
            </div>
            <div className="w-[320px] 2xl:w-[387px] p-[22px] bg-light shadow-lg text-center rounded-[10px]">
              <p className={`text-2xl font-medium mb-2 text-[#0FB001] `}>
                Orders Completed
              </p>
              <p
                className={`text-5xl font-bold leading-[72px] text-[#0FB001] `}
              >
                {statusData.Order_Completed}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserDashboard;
