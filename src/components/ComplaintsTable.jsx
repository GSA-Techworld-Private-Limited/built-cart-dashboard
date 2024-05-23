import React, { useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import MyContext from "./context/MyContext";
import { DateRangeIcon } from "./common/Icons";
import CheckBox from "./common/CheckBox";
import { handleCheckBoxChange } from "./utils/handleCheckBox";
import { formatDateTime } from "./OrdersTable";
const ComplaintsTable = () => {
  const {
    checkedItems,
    setCheckedItems,
    setCategorySelect,
    categorySelect,
    complaints,
  } = useContext(MyContext);
  console.log(categorySelect);
  return (
    <>
      <div className="overflow-auto hide_scroll">
        <div className="w-[calc(1920px-265px+88px)]">
          <div className="bg-[#BDBDBD] h-[54px] 2xl:h-16 flex items-center">
            <div className="px-[54px]">
              <Checkbox border="border-dark" />
            </div>
            <div>
              <div className="flex pl-6 items-center gap-11 w-[178px]">
                <p className="font-semibold text-nowrap 2xl:text-2xl text-xl leading-5 text-[#282828]">
                  Date
                </p>
                <DateRangeIcon />
              </div>
            </div>
            <p className="font-semibold text-nowrap pl-6 w-[232px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Order ID
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[204px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Customer
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[237px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Mobile
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[204px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Items
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[276px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Complaints
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[276px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Status
            </p>
          </div>
          {complaints &&
            complaints.map((val, i) => (
              <div
                key={i}
                className={`py-3 2xl:py-4 mt-2 flex ${
                  i % 2 === 0 ? "bg-[#FEF9EB]" : "bg-white"
                }`}
              >
                <div className="px-[54px] py-3 2xl:py-4 w-[136px]">
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
                <p className="font-medium py-3 2xl:py-5 pl-6 w-[178px] text-nowrap 2xl:text-2xl text-xl leading-5 text-[#282828]">
                  {formatDateTime(val.created_at)}
                </p>
                <p className="font-medium underline py-3 2xl:py-5 pl-6 w-[232px] text-nowrap 2xl:text-2xl text-xl leading-5 text-[#282828]">
                  {val.order_product.order_id}
                </p>
                <p className="font-medium py-3 2xl:py-5 pl-6 w-[204px] text-nowrap 2xl:text-2xl text-xl leading-5 text-[#282828]">
                  {val.user.customer_name}
                </p>
                <p className="font-medium py-3 2xl:py-5 text-nowrap pl-6 w-[237px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                  {val.user.mobile_number}
                </p>
                <p className="font-medium py-3 2xl:py-5 text-nowrap pl-6 w-[204px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                  {val.order_product.product}
                </p>
                <div className="w-[276px] flex items-center pl-6">
                  <div className="w-[233px] border p-2 overflow-hidden text-ellipsis border-spacing-[0.5px] h- [90px] rounded-[10px] border-black">
                    <p className="leading-[100%] text-ellipsis overflow-hidden">
                      {val.query}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-medium capitalize py-3 2xl:py-5 text-nowrap pl-6 w-[276px] 2xl:text-2xl text-xl leading-5 ${
                    val.status === "resolved"
                      ? "text-[#0FA958]"
                      : val.status === "pending"
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
