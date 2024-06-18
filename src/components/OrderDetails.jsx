import React, { useContext } from "react";
import { IoArrowBack } from "react-icons/io5";
import MyContext from "./context/MyContext";

const OrderDetails = () => {
  const { setActiveSubTab, userOrderDetails } = useContext(MyContext);
  const userDetails = userOrderDetails.orders[0];
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
              Order ID {userOrderDetails.order_id}
            </p>
          </div>
          <p
            className={`${
              userOrderDetails.status === "payment_pending"
                ? "after:bg-[#FF3D00] text-[#FF3D00]"
                : userOrderDetails.status === "delivered"
                ? "after:bg-[#0FB001] text-[#0FB001]"
                : userOrderDetails.status === "in_transit"
                ? "after:bg-[#FDC63A] text-[#FDC63A]"
                : "after:bg-dark"
            } text-xl 2xl:text-3xxl capitalize font-semibold relative after:absolute after:w-[15px] after:h-[15px] after:top-1/2 after:-translate-y-1/2 after:rounded-full after:-left-[35px] `}
          >
            {userOrderDetails.status === "payment_pending"
              ? "Pending"
              : userOrderDetails.status === "in_transit"
              ? "In Transit"
              : userOrderDetails.status === "delivered"
              ? "Delivered"
              : userOrderDetails.status === "placed"
              ? "Placed"
              : userOrderDetails.status === "created"
              ? "Created"
              : ""}
          </p>
        </div>
        <div className="w-[95%] xl:w-[87%]">
          <div className="flex gap-6 justify-between">
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                Customer name
              </p>
              <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none">
                {userDetails.order_address.full_name}
              </p>
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                Mobile Number
              </p>
              <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none">
                {userDetails.order_address.mobile_number}
              </p>
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                Location
              </p>
              <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none">
                {userDetails.order_address.city}
              </p>
            </div>
          </div>
          <div className="flex gap-6 justify-between mb-10 mt-7">
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                Referral ID
              </p>
              <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 h-10 2xl:h-[54px] rounded-[10px] bg-transparent outline-none"></p>
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                Payment Mode
              </p>
              <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none">
                {userDetails.mode_of_payment}
              </p>
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                Delivery Address
              </p>

              <div className="border py-[5px] 2xl:py-3 border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full rounded-[10px] bg-transparent outline-none">
                {`House No.${userDetails.order_address.house_no}, ${userDetails.order_address.street}, ${userDetails.order_address.area}, ${userDetails.order_address.city}, ${userDetails.order_address.state}, ${userDetails.order_address.pincode}`}
              </div>
            </div>
          </div>
          <p className="text-[26px] font-semibold text-black mb-5">Products</p>
          {userOrderDetails &&
            userOrderDetails.orders.map((obj, i) => (
              <div key={obj.id}>
                <div className="flex gap-6 justify-between">
                  <div className="flex flex-col w-full max-w-[396px]">
                    <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                      Product Name
                    </p>
                    <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none">
                      {obj.product.name}
                    </p>
                  </div>
                  <div className="flex flex-col w-full max-w-[396px]">
                    <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                      Quantity
                    </p>
                    <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none">
                      {obj.product.total_quantity}
                    </p>
                  </div>
                  <div className="flex flex-col w-full max-w-[396px]">
                    <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                      Price
                    </p>
                    <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none">
                      {(
                        obj.product.selling_price * obj.product.total_quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col w-full mt-10 max-w-[396px]">
                  <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                    Total Amount
                  </p>
                  <p className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full py-[5px] 2xl:py-3 rounded-[10px] bg-transparent outline-none">
                    {(
                      obj.product.selling_price * obj.product.total_quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
