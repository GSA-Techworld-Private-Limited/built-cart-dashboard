import React, { useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { userOrderData } from "./common/Helper";
import MyContext from "./context/MyContext";
import { formatDateTime } from "./OrdersTable";
import CheckBox from "./common/CheckBox";
import { handleCheckBoxChange } from "./utils/handleCheckBox";

const UserOrderTable = () => {
  const {
    currUser,
    setCheckedItems,
    setCategorySelect,
    categorySelect,
    checkedItems,
  } = useContext(MyContext);
  console.log(categorySelect);
  return (
    <>
      <div className="overflow-auto hide_scroll">
        <div className="w-[calc(1920px-265px)]">
          <div className="bg-[#BDBDBD] h-16 flex items-center">
            <div className="px-[54px]">
              <Checkbox border="border-dark" />
            </div>
            <div className="flex pl-6 items-center gap-2 w-[196px]">
              <p className="font-semibold text-nowrap text-2xl leading-5 text-[#282828]">
                Delivery Date
              </p>
            </div>
            <p className="font-semibold text-nowrap pl-6 w-[270px] text-2xl leading-5 text-[#282828]">
              Order ID
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[277px] text-2xl leading-5 text-[#282828]">
              Items
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[287px] text-2xl leading-5 text-[#282828]">
              Amount Paid
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[266px] text-2xl leading-5 text-[#282828]">
              Payment Mode
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[250px] text-2xl leading-5 text-[#282828]">
              Status
            </p>
          </div>
          {currUser.user_orders.length > 0 ? (
            currUser.user_orders.map((val, i) => (
              <div
                key={i}
                className={`h-[60px] mt-2 flex items-center ${
                  i % 2 === 0 ? "bg-[#FEF9EB]" : "bg-white"
                }`}
              >
                <div className="px-[54px] w-[136px]">
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
                <p className="font-medium pl-6 w-[196px] text-nowrap text-2xl leading-5 text-[#282828]">
                  {formatDateTime(val.order_placed_date)}
                </p>
                <p className="font-medium underline text-nowrap pl-6 w-[270px] text-2xl leading-5 text-[#282828]">
                  {val.order}
                </p>
                <p className="font-medium text-nowrap pl-6 w-[277px] text-2xl leading-5 text-[#282828]">
                  {val.product}
                </p>

                <p className="font-medium text-nowrap pl-6 w-[287px] text-2xl leading-5 text-[#282828]">
                  {val.is_paid || "Not Paid"}
                </p>
                <p className="font-medium text-nowrap pl-6 w-[266px] text-2xl leading-5 text-[#282828]">
                  {val.mode_of_payment}
                </p>
                <p
                  className={`font-medium text-nowrap pl-6 w-[250px] text-2xl leading-5 ${
                    val.order_status === "pending"
                      ? "text-[#FDC63A] "
                      : "text-[#0FB001]"
                  }`}
                >
                  {val.order_status}
                </p>
              </div>
            ))
          ) : (
            <p className="text-red-500 text-3xl font-semibold text-center pt-3">
              No Orders Yet
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserOrderTable;
