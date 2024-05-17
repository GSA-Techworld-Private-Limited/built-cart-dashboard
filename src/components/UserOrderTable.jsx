import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { userOrderData } from "./common/Helper";

const UserOrderTable = () => {
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
          {userOrderData.map((val, i) => (
            <div
              key={i}
              className={`h-[60px] mt-2 flex items-center ${
                i % 2 === 0 ? "bg-[#FEF9EB]" : "bg-white"
              }`}
            >
              <div className="px-[54px] w-[136px]">
                <Checkbox border="border-[#686868]" />
              </div>
              <p className="font-medium pl-6 w-[196px] text-nowrap text-2xl leading-5 text-[#282828]">
                {val.date}
              </p>
              <p className="font-medium underline text-nowrap pl-6 w-[270px] text-2xl leading-5 text-[#282828]">
                {val.id}
              </p>
              <p className="font-medium text-nowrap pl-6 w-[277px] text-2xl leading-5 text-[#282828]">
                {val.items}
              </p>

              <p className="font-medium text-nowrap pl-6 w-[287px] text-2xl leading-5 text-[#282828]">
                {val.amount}
              </p>
              <p className="font-medium text-nowrap pl-6 w-[266px] text-2xl leading-5 text-[#282828]">
                {val.payment}
              </p>
              <p
                className={`font-medium text-nowrap pl-6 w-[250px] text-2xl leading-5 ${
                  val.status === "Unpaid"
                    ? "text-[#FDC63A]"
                    : val.status === "Paid"
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

export default UserOrderTable;
