import React, { useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRangeIcon } from "./common/Icons";
import MyContext from "./context/MyContext";
import CheckBox from "./common/CheckBox";
import { handleCheckBoxChange } from "./utils/handleCheckBox";
import { formatDateTime } from "./OrdersTable";
const OrderLogTable = () => {
  const {
    setActiveSubTab,
    checkedItems,
    setCheckedItems,
    setCategorySelect,
    orderLogs,
    setLogsDetails,
    filteredLogs,
  } = useContext(MyContext);
  const getLogsDetails = (id) => {
    const logs = orderLogs.find((item) => item.order_id === id);
    setLogsDetails(logs);
    setActiveSubTab("order-details");
  };
  return (
    <>
      <div>
        <div className="w-[2966px]">
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
            <p className="font-semibold text-nowrap pl-6 w-[314px] table-text">
              Items
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[240px] table-text">
              Vendor
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
              Delivery Person
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[244px] table-text">
              Status
            </p>
          </div>
          {orderLogs &&
            (filteredLogs.length > 0 ? filteredLogs : orderLogs)
              .reduce((acc, item) => [item].concat(acc), [])
              .map((val, i) => (
                <div
                  key={i}
                  className={`2xl:h-[60px] h-[54px] mt-2 flex items-center ${
                    i === 0 || i === 2 || i === 4 || i === 7 || i === 9
                      ? "bg-[#FEF9EB]"
                      : "bg-white"
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
                  <p className="font-medium pl-6 w-[178px] text-nowrap table-text">
                    {formatDateTime(val.created_at)}
                  </p>
                  <p
                    onClick={() => getLogsDetails(val.order_id)}
                    className="font-medium cursor-pointer underline hover:no-underline duration-300 text-nowrap pl-6 w-[232px] 2xl:text-2xl text-xl leading-5 text-dark"
                  >
                    {val.order_id}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[249px] table-text">
                    {val.user ? val.user : "N/A"}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[237px] table-text">
                    {val.location_name}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[315px] table-text">
                    {val.ref_coupon}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[314px] table-text">
                    {val.order_item}
                  </p>
                  <p className="font-medium capitalize text-nowrap pl-6 w-[240px] table-text">
                    {val.vendor_name}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[119px] table-text">
                    {val.quantity}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[199px] table-text">
                    ₹{val.total_price}
                  </p>
                  <p className="font-medium uppercase text-nowrap pl-6 w-[244px] table-text">
                    {val.payment_mode}
                  </p>
                  <p className="font-medium capitalize text-nowrap pl-6 w-[244px] table-text">
                    {val.delivery_person}
                  </p>
                  <p
                    className={`font-medium text-nowrap capitalize pl-6 w-[244px] 2xl:text-2xl text-xl leading-5 ${
                      val.status === "pending" || val.status === "cancelled"
                        ? "text-[#FF3D00]"
                        : val.status === "dispatched"
                        ? "text-[#FDC63A]"
                        : val.status === "delivered"
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

export default OrderLogTable;
