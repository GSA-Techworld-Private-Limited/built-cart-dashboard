import React, { useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import MyContext from "./context/MyContext";
import { formatDateTime } from "./OrdersTable";
import CheckBox from "./common/CheckBox";
import { handleCheckBoxChange } from "./utils/handleCheckBox";

const UserOrderTable = () => {
  const { currUser, setCheckedItems, setCategorySelect, checkedItems } =
    useContext(MyContext);
  return (
    <div className="overflow-auto hide_scroll">
      <div className="w-[calc(1920px-265px)]">
        <div className="bg-[#BDBDBD] h-[54px] 2xl:h-16 flex items-center">
        <div className="px-[68px]"></div>
          <div className="flex pl-6 items-center gap-2 w-[196px]">
            <p className="font-semibold text-nowrap table-text">
              Delivery Date
            </p>
          </div>
          <p className="font-semibold text-nowrap pl-6 w-[270px] table-text">
            Order ID
          </p>
          <p className="font-semibold text-nowrap pl-6 w-[277px] table-text">
            Items
          </p>
          <p className="font-semibold text-nowrap pl-6 w-[287px] table-text">
            Amount Paid
          </p>
          <p className="font-semibold text-nowrap pl-6 w-[266px] table-text">
            Payment Mode
          </p>
          <p className="font-semibold text-nowrap pl-6 w-[250px] table-text">
            Status
          </p>
        </div>
        {currUser.user_orders.length > 0 ? (
          currUser.user_orders
            .reduce((acc, item) => [item].concat(acc), [])
            .map((val, i) => (
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
                <p className="font-medium pl-6 w-[196px] text-nowrap table-text">
                  {formatDateTime(val.order_placed_date)}
                </p>
                <p className="font-medium underline text-nowrap pl-6 w-[270px] table-text">
                  {val.order}
                </p>
                <p className="font-medium text-nowrap pl-6 w-[277px] table-text">
                  {val.product}
                </p>
                <p className="font-medium text-nowrap pl-6 w-[287px] table-text">
                  {val.is_paid ? "Paid" : "Not Paid"}
                </p>
                <p
                  className={`${
                    val.mode_of_payment === "cod" && "!uppercase"
                  } font-medium capitalize text-nowrap pl-6 w-[266px] table-text`}
                >
                  {val.mode_of_payment}
                </p>
                <p
                  className={`font-medium text-nowrap capitalize pl-6 w-[250px] 2xl:text-2xl text-xl leading-5 ${
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
  );
};

export default UserOrderTable;
