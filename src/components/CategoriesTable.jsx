import { useContext } from "react";
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
        <div className="w-[calc(100vw-265px)] 2xl:w-[calc(1920px-265px)]">
          <div className="bg-[#BDBDBD] h-12 2xl:h-16 flex gap-[62px] items-center">
            <div className="max-2xl:w-[80px] 2xl:px-[68px]"></div>
            <div className="flex pl-6 items-center gap-2 w-[120px] 2xl:w-[178px] -ml-[62px]">
              <p className="font-semibold text-nowrap table-text">Date</p>
              <DateRangeIcon />
            </div>
            <p className="font-semibold text-nowrap pl-6 w-[160px] 2xl:w-[204px] table-text">
              Category Pic
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[160px] 2xl:w-[204px] table-text">
              Category
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[190px] 2xl:w-[270px] table-text">
              Total Products
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[160px] 2xl:w-[204px] table-text">
              Total Orders
            </p>
          </div>
          {categoryData &&
            categoryData
              .reduce((acc, item) => [item].concat(acc), [])
              .map((val, i) => (
                <div
                  key={val.id}
                  className={`2xl:h-[60px] h-12 mt-2 gap-[62px] flex items-center ${
                    i % 2 === 0 ? "bg-[#FEF9EB]" : "bg-white"
                  }`}
                >
                  <div className="2xl:px-[54px] text-center w-[80px] 2xl:w-[136px]">
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
                  <p className="font-medium pl-6 w-[120px] 2xl:w-[178px] text-nowrap table-text -ml-[62px]">
                    {formatDateTime(val.created_at)}
                  </p>
                  <div className="pl-6 w-[160px] 2xl:w-[204px]">
                    <img
                      src={`${baseUrl}${val.image}`}
                      className="rounded object-cover 2xl:w-[67px] w-14 max-h-12"
                      alt="category pic"
                    />
                  </div>
                  <p className="font-medium capitalize underline text-nowrap overflow-hidden text-ellipsis pl-6 w-[160px] 2xl:w-[204px] 2xl:text-2xl text-base text-[#282828]">
                    {val.name}
                  </p>
                  <p
                    onClick={() => showProductDetails(val.name)}
                    className="font-medium cursor-pointer underline hover:no-underline duration-300 text-nowrap pl-6 w-[190px] 2xl:w-[270px] 2xl:text-2xl text-base leading-5 text-[#0028B7]"
                  >
                    {val.total_product_count}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[160px] 2xl:w-[204px] table-text">
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
