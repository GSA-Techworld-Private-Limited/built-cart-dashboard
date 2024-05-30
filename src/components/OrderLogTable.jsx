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
    console.log(logs);
    setLogsDetails(logs);
    setActiveSubTab("order-details");
  };
  return (
    <>
      <div className="overflow-auto hide_scroll">
        <div className="w-[2966px]">
          <div className="bg-[#BDBDBD] h-[54px] 2xl:h-16 flex items-center">
            <div className="px-[54px]">
              <Checkbox border="border-dark" />
            </div>
            <div className="flex pl-6 items-center gap-9 w-[178px]">
              <p className="font-semibold text-nowrap 2xl:text-2xl text-xl leading-5 text-[#282828]">
                Date
              </p>
              <DateRangeIcon />
            </div>
            <p className="font-semibold text-nowrap pl-6 w-[232px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Order ID
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[249px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              User
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[237px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Location
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[315px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Referral
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[314px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Items
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[240px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Vendor
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[119px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Qty
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[199px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Price
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[244px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Payment mode
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[244px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Delivery Person
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[244px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Status
            </p>
          </div>
          {orderLogs &&
            (filteredLogs.length > 0 ? filteredLogs : orderLogs).map(
              (val, i) => (
                <div
                  key={i}
                  className={`2xl:h-[60px] h-[54px] mt-2 flex items-center ${
                    i === 0 || i === 2 || i === 4 || i === 7 || i === 9
                      ? "bg-[#FEF9EB]"
                      : "bg-white"
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
                  <p className="font-medium pl-6 w-[178px] text-nowrap 2xl:text-2xl text-xl leading-5 text-[#282828]">
                    {formatDateTime(val.created_at)}
                  </p>
                  <p
                    onClick={() => getLogsDetails(val.order_id)}
                    className="font-medium cursor-pointer underline text-nowrap pl-6 w-[232px] 2xl:text-2xl text-xl leading-5 text-dark"
                  >
                    {val.order_id}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[249px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                    {val.user ? val.user : "N/A"}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[237px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                    {val.location_name}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[315px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                    {val.ref_coupon}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[314px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                    {val.order_item}
                  </p>
                  <p className="font-medium capitalize text-nowrap pl-6 w-[240px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                    {val.vendor_name}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[119px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                    {val.quantity}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[199px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                    ₹{val.total_price}
                  </p>
                  <p className="font-medium uppercase text-nowrap pl-6 w-[244px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                    {val.payment_mode}
                  </p>
                  <p className="font-medium capitalize text-nowrap pl-6 w-[244px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
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
              )
            )}
        </div>
      </div>
    </>
  );
};

export default OrderLogTable;
