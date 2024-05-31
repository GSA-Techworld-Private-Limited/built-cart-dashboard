import React, { useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import MyContext from "./context/MyContext";
import { formatDateTime } from "./OrdersTable";
import CheckBox from "./common/CheckBox";
import { handleCheckBoxChange } from "./utils/handleCheckBox";
const ProductDetailsTables = () => {
  const {
    productDetailsData,
    setCheckedItems,
    checkedItems,
    setCategorySelect,
  } = useContext(MyContext);
  return (
    <>
      <div>
        <div className="w-[calc(1920px-265px)]">
          <div className="bg-[#BDBDBD] h-[54px] 2xl:h-16 flex gap-[65px] items-center">
          <div className="px-[68px]"></div>
            <div className="flex pl-6 items-center gap-2 w-[244px] -ml-[65px]">
              <p className="font-semibold text-nowrap table-text">Date</p>
            </div>
            <p className="font-semibold text-nowrap pl-6 w-[280px] table-text">
              Product
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[280px] table-text">
              Price per piece
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[280px] table-text">
              Total Orders
            </p>
          </div>
          {productDetailsData.length > 0 ? (
            productDetailsData
              .reduce((acc, item) => [item].concat(acc), [])
              .map((obj, index) => (
                <div
                  className={`2xl:h-[60px] h-[54px] mt-2 gap-[65px] flex items-center ${
                    index % 2 === 0 ? "bg-[#FEF9EB]" : "bg-white"
                  }`}
                  key={index}
                >
                  <div className="px-[54px] w-[136px]">
                    <CheckBox
                      inputStyle="!border-[#686868]"
                      checkStyle="!border-[#686868] !bg-transparent"
                      isChecked={checkedItems[obj.product_id] || false}
                      handleCheckBox={() =>
                        handleCheckBoxChange(
                          obj.product_id,
                          setCheckedItems,
                          setCategorySelect
                        )
                      }
                    />
                  </div>
                  <p className="font-medium pl-6 w-[244px] text-nowrap table-text -ml-[65px]">
                    {formatDateTime(obj.created_at)}
                  </p>
                  <p className="font-medium pl-6 w-[280px] text-nowrap table-text">
                    {obj.name}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[280px] table-text">
                    {obj.selling_price}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[280px] table-text">
                    {obj.total_orders ? obj.total_orders : "N/A"}
                  </p>
                </div>
              ))
          ) : (
            <p className="text-red-500 text-3xl font-semibold text-center pt-3">
              No Orders Yet
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsTables;
