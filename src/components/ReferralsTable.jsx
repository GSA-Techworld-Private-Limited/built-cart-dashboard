import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { referralData } from "./common/Helper";

const ReferralsTable = () => {
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
                Join Date
              </p>
            </div>
            <p className="font-semibold text-nowrap pl-6 w-[270px] text-2xl leading-5 text-[#282828]">
              Name
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[340px] text-2xl leading-5 text-[#282828]">
              Mobile
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[370px] text-2xl leading-5 text-[#282828]">
              Location
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[250px] text-2xl leading-5 text-[#282828]">
              Referral type
            </p>
          </div>
          {referralData.map((val, i) => (
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
              <p className="font-medium text-nowrap pl-6 w-[270px] text-2xl leading-5 text-[#282828]">
                {val.user}
              </p>
              <p className="font-medium text-nowrap pl-6 w-[340px] text-2xl leading-5 text-[#282828]">
                {val.mobile}
              </p>

              <p className="font-medium text-nowrap pl-6 w-[370px] text-2xl leading-5 text-[#282828]">
                {val.location}
              </p>
              <p
                className={`font-medium text-nowrap pl-6 w-[250px] text-2xl leading-5 ${
                  val.referral === "Secondary"
                    ? "text-[#FDC63A]"
                    : val.referral === "Primary"
                    ? "text-[#0FB001]"
                    : ""
                }`}
              >
                {val.referral}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReferralsTable;
