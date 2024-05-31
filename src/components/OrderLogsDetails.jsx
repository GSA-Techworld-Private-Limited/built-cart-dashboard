import React, { useContext } from "react";
import { IoArrowBack } from "react-icons/io5";
import MyContext from "./context/MyContext";

const OrderLogsDetails = (props) => {
  const { setActiveSubTab, logsDetails } = useContext(MyContext);
  console.log(logsDetails);
  return (
    <>
      <div className="pl-[26px] pb-10 h-[calc(100vh-126.59px)] 2xl:h-[calc(100vh-150px)] flex flex-col overflow-auto">
        <div className="flex items-center justify-between w-[95%] xl:w-[87%] mb-[31px]">
          <div
            onClick={() => setActiveSubTab(null)}
            className="flex items-center gap-4 2xl:gap-8 cursor-pointer"
          >
            <IoArrowBack className="text-3xxl 2xl:text-[50px]" />
            <p className="text-2xl 2xl:text-3xxl text-dark font-semibold">
              Order ID {logsDetails.order_id}
            </p>
          </div>
          <p
            className={`${
              logsDetails.status === "pending" ||
              logsDetails.status === "cancelled"
                ? "after:bg-[#FF3D00] text-[#FF3D00]"
                : logsDetails.status === "delivered"
                ? "after:bg-[#0FB001] text-[#0FB001]"
                : ""
            } text-xl 2xl:text-3xxl capitalize font-semibold relative after:absolute after:w-[15px] after:h-[15px] after:top-1/2 after:-translate-y-1/2 after:rounded-full after:-left-[35px] `}
          >
            {logsDetails.status}
          </p>
        </div>
        <div className="w-[95%] xl:w-[87%]">
          <div className="flex gap-6 justify-between">
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                Customer name
              </p>
              <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none h-10 2xl:h-[54px]">
                {logsDetails.user}
              </p>
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                Mobile Number
              </p>
              <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none h-10 2xl:h-[54px]">
                {logsDetails.mobile_number}
              </p>
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                Location
              </p>
              <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none h-10 2xl:h-[54px]">
                {logsDetails.location_name}
              </p>
            </div>
          </div>
          <div className="flex gap-6 justify-between mb-10 mt-7">
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                Referral ID
              </p>
              <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none h-10 2xl:h-[54px]">
                {logsDetails.ref_coupon}
              </p>
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                Payment Mode
              </p>
              <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none h-10 2xl:h-[54px] uppercase">
                {" "}
                {logsDetails.payment_mode}
              </p>
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                Delivery Address
              </p>

              <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none h-10 2xl:h-[54px]"></p>
            </div>
          </div>
          <p className="text-[26px] font-semibold text-black mb-5">
            Products Ordered
          </p>
          <div className="flex gap-6 justify-between">
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                Product Name
              </p>
              <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none h-10 2xl:h-[54px]">
                {logsDetails.order_item}
              </p>
            </div>

            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                Total Price
              </p>
              <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none h-10 2xl:h-[54px]">
                {logsDetails.total_price}
              </p>
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                Quantity
              </p>
              <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none h-10 2xl:h-[54px]">
                {logsDetails.quantity}
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full mt-10 max-w-[396px]">
            <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
              Total Amount
            </p>
            <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none h-10 2xl:h-[54px]">
               {logsDetails.total_price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderLogsDetails;
