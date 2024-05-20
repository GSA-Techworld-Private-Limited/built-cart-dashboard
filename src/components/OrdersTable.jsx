import React, { useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRangeIcon } from "./common/Icons";
import MyContext from "./context/MyContext";
import { ordersTabledata } from "./common/Helper";
import CheckBox from "./common/CheckBox";
import { handleCheckBoxChange } from "./utils/handleCheckBox";
import { showOrderDetails } from "./utils/auth";
export const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString();
};
const OrdersTable = () => {
  const {
    setActiveSubTab,
    orderData,
    setCategorySelect,
    checkedItems,
    setCheckedItems,
    categorySelect,
    setUserOrderDetails,
  } = useContext(MyContext);

  console.log(categorySelect);
  return (
    <>
      <div className="overflow-auto hide_scroll">
        <div className="w-[2370px]">
          <div className="bg-[#BDBDBD] h-16 flex items-center">
            <div className="px-[54px]">
              <Checkbox border="border-dark" />
            </div>
            <div className="flex pl-6 items-center gap-9 w-[178px]">
              <p className="font-semibold text-nowrap text-2xl leading-5 text-[#282828]">
                Date
              </p>
              <DateRangeIcon />
            </div>
            <p className="font-semibold text-nowrap pl-6 w-[232px] text-2xl leading-5 text-[#282828]">
              Order ID
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[249px] text-2xl leading-5 text-[#282828]">
              User
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[237px] text-2xl leading-5 text-[#282828]">
              Location
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[315px] text-2xl leading-5 text-[#282828]">
              Referral
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[209px] text-2xl leading-5 text-[#282828]">
              Items
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[119px] text-2xl leading-5 text-[#282828]">
              Qty
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[199px] text-2xl leading-5 text-[#282828]">
              Price
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[244px] text-2xl leading-5 text-[#282828]">
              Payment mode
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[244px] text-2xl leading-5 text-[#282828]">
              Status
            </p>
          </div>
          {orderData &&
            orderData.map((val, i) => (
              <div
                key={i}
                className={`h-[60px] mt-2 flex items-center ${
                  i % 2 === 0 ? "bg-[#FEF9EB]" : "bg-white"
                }`}
              >
                <div className="px-[54px] w-[136px]">
                  {/* {val.user === "" || <Checkbox border="border-[#686868]" />} */}
                  <CheckBox
                    inputStyle="!border-[#686868]"
                    checkStyle="!border-[#686868] !bg-transparent"
                    isChecked={checkedItems[val.order_id] || false}
                    handleCheckBox={() =>
                      handleCheckBoxChange(
                        val.order_id,
                        setCheckedItems,
                        setCategorySelect
                      )
                    }
                  />
                </div>
                <p className="font-medium pl-6 w-[178px] text-nowrap text-2xl leading-5 text-[#282828]">
                  {formatDateTime(val.created_at)}
                </p>
                <p
                  onClick={() =>
                    showOrderDetails(
                      val.order_id,
                      setActiveSubTab,
                      setUserOrderDetails
                    )
                  }
                  className="font-medium underline cursor-pointer text-nowrap pl-6 w-[232px] text-2xl leading-5 text-dark"
                >
                  {val.order_id}
                </p>
                <div className="w-[1572px] flex">
                  {val.orders.map((obj, i) => (
                    <div key={i} className="flex">
                      <p className="font-medium text-nowrap pl-6 w-[249px] text-2xl leading-5 text-[#282828]">
                        {obj.user}
                      </p>
                      <p className="font-medium text-nowrap pl-6 w-[237px] text-2xl leading-5 text-[#282828]">
                        {obj.order_address}
                      </p>
                      <p className="font-medium text-nowrap pl-6 w-[315px] text-2xl leading-5 text-[#282828]">
                        {obj.referral}
                      </p>
                      <p
                        className={`font-medium text-nowrap pl-6 w-[209px] text-2xl leading-5 ${
                          obj.date === "" ? "text-[#FF8B66]" : "text-[#282828]"
                        }`}
                      >
                        {obj.product}
                      </p>
                      <p
                        className={`font-medium text-nowrap pl-6 w-[119px] text-2xl leading-5 ${
                          obj.date === "" ? "text-[#FF8B66]" : "text-[#282828]"
                        }`}
                      >
                        {obj.quantity}
                      </p>
                      <p
                        className={`font-medium text-nowrap pl-6 w-[199px] text-2xl leading-5 ${
                          obj.date === "" ? "text-[#FF8B66]" : "text-[#282828]"
                        }`}
                      >
                        {obj.price}
                      </p>
                      <p className="font-medium text-nowrap pl-6 w-[244px] text-2xl leading-5 text-[#282828]">
                        {obj.mode_of_payment}
                      </p>
                    </div>
                  ))}
                </div>
                <p
                  className={`font-medium text-nowrap pl-6 w-[244px] text-2xl leading-5 ${
                    val.status === "Pending" || val.status === "Cancelled"
                      ? "text-[#FF3D00]"
                      : val.status === "Dispatched"
                      ? "text-[#FDC63A]"
                      : val.status === "Delivered"
                      ? "text-[#0FB001]"
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

export default OrdersTable;
