import React, { useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRangeIcon } from "./common/Icons";
import MyContext from "./context/MyContext";
import CheckBox from "./common/CheckBox";
import { handleCheckBoxChange } from "./utils/handleCheckBox";
import { showOrderDetails } from "./utils/auth";
export const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString();
};
const OrdersTable = ({ filterData }) => {
  const {
    setActiveSubTab,
    orderData,
    setCategorySelect,
    checkedItems,
    setCheckedItems,
    setUserOrderDetails,
  } = useContext(MyContext);

  return (
    <div>
      <div className="w-[2370px]">
        <div className="bg-[#BDBDBD] h-[54px] 2xl:h-16 flex items-center">
        <div className="px-[68px]"></div>
          <div className="flex pl-6 items-center gap-9 w-[178px]">
            <p className="font-semibold text-nowrap table-text">Date</p>
            <DateRangeIcon />
          </div>
          <p className="font-semibold text-nowrap pl-6 w-[232px] table-text">
            Order ID
          </p>
          <p className="font-semibold text-nowrap pl-6 w-[249px] table-text">
            User
          </p>
          <p className="font-semibold text-nowrap pl-6 w-[237px] table-text">
            Location
          </p>
          <p className="font-semibold text-nowrap pl-6 w-[315px] table-text">
            Referral
          </p>
          <p className="font-semibold text-nowrap pl-6 w-[209px] table-text">
            Items
          </p>
          <p className="font-semibold text-nowrap pl-6 w-[119px] table-text">
            Qty
          </p>
          <p className="font-semibold text-nowrap pl-6 w-[199px] table-text">
            Price
          </p>
          <p className="font-semibold text-nowrap pl-6 w-[244px] table-text">
            Payment mode
          </p>
          <p className="font-semibold text-nowrap pl-6 w-[244px] table-text">
            Status
          </p>
        </div>
        {orderData &&
          (filterData.length > 0 ? filterData : orderData)
            .reduce((acc, item) => [item].concat(acc), [])
            .map((val, i) => (
              <React.Fragment key={i}>
                <div
                  className={`2xl:h-[60px] h-[54px] mt-2 flex items-center ${
                    i % 2 === 0 ? "bg-[#FEF9EB]" : "bg-white"
                  }`}
                >
                  <div className="px-[54px] w-[136px]">
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
                  <p className="font-medium pl-6 w-[178px] text-nowrap table-text">
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
                    className="font-medium underline hover:no-underline duration-300 cursor-pointer text-nowrap pl-6 w-[232px] 2xl:text-2xl text-xl leading-5 text-dark"
                  >
                    {val.order_id}
                  </p>
                  <div className="w-[1572px] flex">
                    {val.orders.map((obj, ind) => (
                      <div key={`${i}-${ind}`} className="flex">
                        <p className="font-medium text-nowrap pl-6 w-[249px] table-text">
                          {obj.user}
                        </p>
                        <p className="font-medium text-nowrap pl-6 w-[237px] table-text">
                          {obj.order_address}
                        </p>
                        <p className="font-medium text-nowrap pl-6 w-[315px] table-text">
                          {obj.referral ? obj.referral : "N/A"}
                        </p>
                        <p
                          className={`font-medium text-nowrap pl-6 w-[209px] 2xl:text-2xl text-xl leading-5 ${
                            obj.date === ""
                              ? "text-[#FF8B66]"
                              : "text-[#282828]"
                          }`}
                        >
                          {obj.product}
                        </p>
                        <p
                          className={`font-medium text-nowrap pl-6 w-[119px] 2xl:text-2xl text-xl leading-5 ${
                            obj.date === ""
                              ? "text-[#FF8B66]"
                              : "text-[#282828]"
                          }`}
                        >
                          {obj.quantity}
                        </p>
                        <p
                          className={`font-medium text-nowrap pl-6 w-[199px] 2xl:text-2xl text-xl leading-5 ${
                            obj.date === ""
                              ? "text-[#FF8B66]"
                              : "text-[#282828]"
                          }`}
                        >
                          {obj.price}
                        </p>
                        <p
                          className={`${
                            obj.mode_of_payment === "cod" && "!uppercase"
                          } font-medium text-nowrap capitalize pl-6 w-[244px] table-text`}
                        >
                          {obj.mode_of_payment}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p
                    className={`font-medium text-nowrap pl-6 w-[244px] 2xl:text-2xl text-xl leading-5 ${
                      val.status === "payment_pending"
                        ? "text-[#FF3D00]"
                        : val.status === "in_transit"
                        ? "text-[#FDC63A]"
                        : val.status === "delivered"
                        ? "text-[#0FB001]"
                        : val.status === "placed" || val.status === "created"
                        ? "text-dark"
                        : null
                    }`}
                  >
                    {val.status === "payment_pending"
                      ? "Pending"
                      : val.status === "in_transit"
                      ? "In Transit"
                      : val.status === "delivered"
                      ? "Delivered"
                      : val.status === "placed"
                      ? "Placed"
                      : val.status === "created"
                      ? "Created"
                      : ""}
                  </p>
                </div>
              </React.Fragment>
            ))}
      </div>
    </div>
  );
};

export default OrdersTable;
