import React, { useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { referralData } from "./common/Helper";
import MyContext from "./context/MyContext";
import { formatDateTime } from "./OrdersTable";
import { handleCheckBoxChange } from "./utils/handleCheckBox";
import CheckBox from "./common/CheckBox";

const ReferralsTable = () => {
  const { currUser, checkedItems, setCategorySelect, setCheckedItems } =
    useContext(MyContext);
  return (
    <>
      <div className="overflow-auto hide_scroll">
        <div className="w-[calc(1920px-265px)]">
          <div className="bg-[#BDBDBD] h-[54px] 2xl:h-16 flex items-center">
            <div className="px-[54px]">
              <Checkbox border="border-dark" />
            </div>
            <div className="flex pl-6 items-center gap-2 w-[196px]">
              <p className="font-semibold text-nowrap 2xl:text-2xl text-xl leading-5 text-[#282828]">
                Join Date
              </p>
            </div>
            <p className="font-semibold text-nowrap pl-6 w-[270px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Name
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[340px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Mobile
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[370px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Location
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[250px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
              Referral type
            </p>
          </div>
          {currUser.referred_users ? (
            currUser.referred_users.map((val, i) => (
              <div
                key={i}
                className={`2xl:h-[60px] h-[54px] mt-2 flex items-center ${
                  i % 2 === 0 ? "bg-[#FEF9EB]" : "bg-white"
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
                <p className="font-medium pl-6 w-[196px] text-nowrap 2xl:text-2xl text-xl leading-5 text-[#282828]">
                  {formatDateTime(val.created_at)}
                </p>
                <p className="font-medium text-nowrap pl-6 w-[270px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                  {val.full_name}
                </p>
                <p className="font-medium text-nowrap pl-6 w-[340px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                  {val.mobile_number}
                </p>

                <p className="font-medium text-nowrap pl-6 w-[370px] 2xl:text-2xl text-xl leading-5 text-[#282828]">
                  {val.city}
                </p>
                <p
                  className={`font-medium text-nowrap pl-6 w-[250px] 2xl:text-2xl text-xl leading-5 
                
                  `}
                >
                  {/* {val.referral} */}
                </p>
              </div>
            ))
          ) : (
            <p className="text-red-500 text-3xl font-semibold text-center pt-3">
              No Referals Yet
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ReferralsTable;
// ${
//   val.referral === "Secondary"
//     ? "text-[#FDC63A]"
//     : val.referral === "Primary"
//     ? "text-[#0FB001]"
//     : ""
// }
