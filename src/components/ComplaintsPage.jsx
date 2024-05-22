import React, { useContext } from "react";
import { IoSearchSharp } from "react-icons/io5";
import CommonBtn from "./common/CommonBtn";
import MyContext from "./context/MyContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ComplaintsTable from "./ComplaintsTable";
const ComplaintsPage = () => {
  const { setActiveSubTab } = useContext(MyContext);
  return (
    <>
      <div className="w-full">
        <p className="text-4xl ps-7 font-bold text-black leading-[80%] mb-[82px]">
          Complaints
        </p>
        <div className="flex items-center ps-7 mb-10 gap-3 justify-between pr-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-[10px] h-[54px] 2xl:max-h-[62px] border w-[432px] border-black rounded-[10px] px-[13px]">
              <IoSearchSharp className="text-dark text-[28px]" />
              <input
                type="text"
                placeholder="Search Name, Location..."
                className="2xl:text-2xl text-xl text-[#6E6E73] leading-5 w-full placeholder:text-[#6E6E73] font-medium outline-none border-0 bg-transparent py-4 2xl:py-5"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[277px]">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent width="w-[277px]">
                <SelectItem color="text-[#0FA958]" value="Resolved">
                  Resolved
                </SelectItem>
                <SelectItem color="text-[#FF3D00]" value="Pending">
                  Pending
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <CommonBtn
            style="text-black bg-[#FDC63A] hover:bg-transparent hover:text-[#FDC63A]"
            btntext="Export"
          />
        </div>
        <ComplaintsTable />
      </div>
    </>
  );
};

export default ComplaintsPage;
