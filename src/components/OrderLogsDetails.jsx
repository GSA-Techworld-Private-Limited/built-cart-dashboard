import React, { useContext } from "react";
import { IoArrowBack } from "react-icons/io5";
import MyContext from "./context/MyContext";

const OrderLogsDetails = (props) => {
  const { setActiveSubTab } = useContext(MyContext);
  return (
    <>
      <div className="pl-[26px] pb-10">
        <div className="flex items-center justify-between w-[95%] xl:w-[87%] mb-[31px]">
          <div
            onClick={() => setActiveSubTab(null)}
            className="flex items-center gap-4 2xl:gap-8 cursor-pointer"
          >
            <IoArrowBack className="text-3xxl 2xl:text-[50px]" />
            <p className="text-2xl 2xl:text-3xxl text-dark font-semibold">
              Order ID #26474849
            </p>
          </div>
          <p
            className={`text-2xl 2xl:text-3xxl font-semibold relative after:absolute after:w-[15px] after:h-[15px] after:top-1/2 after:-translate-y-1/2 after:rounded-full after:-left-[35px] ${props.style}`}
          >
            {props.status}
          </p>
        </div>
        <form className="w-[95%] xl:w-[87%]">
          <div className="flex gap-6 justify-between">
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="name"
                className="text-2xl font-normal text-black mb-2"
              >
                Customer name
              </label>
              <input
                id="name"
                type="text"
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="number"
                className="text-2xl font-normal text-black mb-2"
              >
                Mobile Number
              </label>
              <input
                id="number"
                type="number"
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="Location"
                className="text-2xl font-normal text-black mb-2"
              >
                Location
              </label>
              <input
                id="Location"
                type="text"
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex gap-6 justify-between mb-10 mt-7">
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="Referral"
                className="text-2xl font-normal text-black mb-2"
              >
                Referral ID
              </label>
              <input
                id="Referral"
                type="text"
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="Payment"
                className="text-2xl font-normal text-black mb-2"
              >
                Payment Mode
              </label>
              <input
                id="Payment"
                type="text"
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="Address"
                className="text-2xl font-normal text-black mb-2"
              >
                Delivery Address
              </label>

              <textarea
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full rounded-[10px] bg-transparent outline-none"
                name=""
                id="Address"
                rows="4"
              ></textarea>
            </div>
          </div>
          <p className="text-[26px] font-semibold text-black mb-5">
            Products Ordered
          </p>
          <div className="flex gap-6 justify-between">
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="Product"
                className="text-2xl font-normal text-black mb-2"
              >
                Product Name
              </label>
              <input
                id="Product"
                type="text"
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>

            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="Price"
                className="text-2xl font-normal text-black mb-2"
              >
                Total Price
              </label>
              <input
                id="Price"
                type="number"
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="Quantity"
                className="text-2xl font-normal text-black mb-2"
              >
                Quantity
              </label>
              <input
                id="Quantity"
                type="number"
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col w-full mt-10 max-w-[396px]">
            <label
              htmlFor="Amount"
              className="text-2xl font-normal text-black mb-2"
            >
              Total Amount
            </label>
            <input
              id="Amount"
              type="number"
              className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default OrderLogsDetails;
