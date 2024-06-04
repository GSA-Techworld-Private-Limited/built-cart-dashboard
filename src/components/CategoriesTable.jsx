import React, { useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import MyContext from "./context/MyContext";
import { DateRangeIcon } from "./common/Icons";
import { formatDateTime } from "./OrdersTable";
import CheckBox from "./common/CheckBox";
import { handleCheckBoxChange } from "./utils/handleCheckBox";
import { baseUrl } from "./utils/auth";
const CategoriesTable = () => {
  const {
    setActiveSubTab,
    categoryData,
    setProductDetailsData,
    setCategorySelect,
    setCheckedItems,
    checkedItems,
    productDetails,
    setSelectedCate,
  } = useContext(MyContext);

  const showProductDetails = (name) => {
    setSelectedCate(name);
    const res = productDetails.filter((val) =>
      val.category_names.includes(name)
    );
    setProductDetailsData(res);
    setActiveSubTab("categories-products");
  };
  return (
    <>
      <div>
        <div className="w-[calc(1920px-265px)]">
          <div className="bg-[#BDBDBD] h-[54px] 2xl:h-16 flex gap-[62px] items-center">
            <div className="px-[68px]"></div>
            <div className="flex pl-6 items-center gap-2 w-[178px] -ml-[62px]">
              <p className="font-semibold text-nowrap table-text">Date</p>
              <DateRangeIcon />
            </div>
            <p className="font-semibold text-nowrap pl-6 w-[204px] table-text">
              Category Pic
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[204px] table-text">
              Category
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[270px] table-text">
              Total Products
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[204px] table-text">
              Total Orders
            </p>
          </div>
          {categoryData &&
            categoryData
              .reduce((acc, item) => [item].concat(acc), [])
              .map((val, i) => (
                <div
                  key={val.id}
                  className={`2xl:h-[60px] h-[54px] mt-2 gap-[62px] flex items-center ${
                    i % 2 === 0 ? "bg-[#FEF9EB]" : "bg-white"
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
                  <p className="font-medium pl-6 w-[178px] text-nowrap table-text -ml-[62px]">
                    {formatDateTime(val.created_at)}
                  </p>
                  <div className="pl-6 w-[204px]">
                    <img
                      width={67}
                      src={`${baseUrl}${val.image}`}
                      className="rounded object-cover max-h-[54px]"
                      alt="category pic"
                    />
                  </div>
                  <p className="font-medium capitalize underline text-nowrap overflow-hidden text-ellipsis pl-6 w-[204px] 2xl:text-2xl text-xl text-[#282828]">
                    {val.name}
                  </p>
                  <p
                    onClick={() => showProductDetails(val.name)}
                    className="font-medium cursor-pointer underline hover:no-underline duration-300 text-nowrap pl-6 w-[270px] 2xl:text-2xl text-xl leading-5 text-[#0028B7]"
                  >
                    {val.total_product_count}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[204px] table-text">
                    {val.total_order}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesTable;
