import React, { useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { complaintsTableData } from "./common/Helper";
import MyContext from "./context/MyContext";
import { DateRangeIcon } from "./common/Icons";
import CheckBox from "./common/CheckBox";
import { handleCheckBoxChange } from "./utils/handleCheckBox";
const ComplaintsTable = () => {
  const { checkedItems, setCheckedItems, setCategorySelect, categorySelect } =
    useContext(MyContext);
  console.log(categorySelect);
  return (
    <>
      <div className="overflow-auto hide_scroll">
        <div className="w-[calc(1920px-265px+88px)]">
          <div className="bg-[#BDBDBD] h-16 flex items-center">
            <div className="px-[54px]">
              <Checkbox border="border-dark" />
            </div>
            <div>
              <div className="flex pl-6 items-center gap-11 w-[178px]">
                <p className="font-semibold text-nowrap text-2xl leading-5 text-[#282828]">
                  Date
                </p>
                <DateRangeIcon />
              </div>
            </div>
            <p className="font-semibold text-nowrap pl-6 w-[232px] text-2xl leading-5 text-[#282828]">
              Order ID
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[204px] text-2xl leading-5 text-[#282828]">
              Customer
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[237px] text-2xl leading-5 text-[#282828]">
              Mobile
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[204px] text-2xl leading-5 text-[#282828]">
              Items
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[276px] text-2xl leading-5 text-[#282828]">
              Complaints
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[276px] text-2xl leading-5 text-[#282828]">
              Status
            </p>
          </div>
          {complaintsTableData.map((val, i) => (
            <div
              key={i}
              className={`py-4 mt-2 flex ${
                i % 2 === 0 ? "bg-[#FEF9EB]" : "bg-white"
              }`}
            >
              <div className="px-[54px] py-4 w-[136px]">
                {/* <Checkbox border="border-[#686868]" /> */}
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
              <p className="font-medium py-5 pl-6 w-[178px] text-nowrap text-2xl leading-5 text-[#282828]">
                {val.date}
              </p>
              <p className="font-medium underline py-5 pl-6 w-[232px] text-nowrap text-2xl leading-5 text-[#282828]">
                {val.id}
              </p>
              <p className="font-medium py-5 pl-6 w-[204px] text-nowrap text-2xl leading-5 text-[#282828]">
                {val.customer}
              </p>
              <p className="font-medium py-5 text-nowrap pl-6 w-[237px] text-2xl leading-5 text-[#282828]">
                {val.mobile}
              </p>
              <p className="font-medium py-5 text-nowrap pl-6 w-[204px] text-2xl leading-5 text-[#282828]">
                {val.items}
              </p>
              <div className="w-[276px] pl-6">
                <div className="w-[233px] border p-2 border-spacing-[0.5px] h-[90px] rounded-[10px] border-black">
                  {val.complaints}
                </div>
              </div>
              <p
                className={`font-medium py-5 text-nowrap pl-6 w-[276px] text-2xl leading-5 ${
                  val.status === "Resolved"
                    ? "text-[#0FA958]"
                    : val.status === "Pending"
                    ? "text-[#FF3D00]"
                    : ""
                }`}
              >
                {val.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ComplaintsTable;
