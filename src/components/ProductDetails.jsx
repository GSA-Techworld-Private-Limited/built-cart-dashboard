import React, { useContext, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import CommonBtn from "./common/CommonBtn";
import ProductDetailsTables from "./ProductDetailsTable";
import MyContext from "./context/MyContext";
import { baseUrl, deleteProduct } from "./utils/auth";
import axios from "axios";
import { toast } from "react-toastify";
const ProductDetails = () => {
  const {
    setActiveSubTab,
    categorySelect,
    setCategoryData,
    setEditOverlay,
    editOverlay,
    categoryData,
    setProductDetailsData,
    productDetailsData,
    setProductDetails,
    productDetails,
    selectedCate,
    setShowExport,
    showExport,
    setSelectExport,
  } = useContext(MyContext);
  const dataForCurrTitle = categoryData.filter(
    (currElem) => currElem.name === selectedCate
  );
  console.log(dataForCurrTitle);
  const filterUserWithName = async (e) => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const res = await axios.get(
        `${baseUrl}/superadmin/add-products-dashboard/?name_contains=${e.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res.data);
      const searchRes = res.data.data.filter((val) =>
        val.category_names.includes(selectedCate)
      );
      setProductDetailsData(searchRes);
    } catch (error) {
      console.error("Fetch user data error:", error);
    }
  };
  console.log(productDetailsData);
  console.log(productDetails);
  const exportProductDetails = () => {
    if (productDetailsData.length > 0) {
      setSelectExport(productDetailsData), setShowExport(!showExport);
    } else {
      toast.warning("No Orders Yet!", {
        className: "rounded-[10px]",
      });
    }
  };
  return (
    <>
      <div className="w-full">
        <p className="text-3xxl 2xl:text-4xl capitalize ps-7 font-bold text-black leading-[80%] mb-[62px]">
          {Array.isArray(dataForCurrTitle) &&
            dataForCurrTitle.length > 0 &&
            dataForCurrTitle[0].name}
        </p>

        <div className="flex items-center ps-7 mb-10 gap-3 justify-between pr-8 hide_scroll overflow-auto">
          <div>
            <div className="flex items-center gap-[10px] me-4 max-h-[54px] 2xl:max-h-[62px] border w-[432px] border-black rounded-[10px] px-[13px]">
              <IoSearchSharp className="text-dark text-[28px]" />
              <input
                onChange={filterUserWithName}
                type="text"
                placeholder="Search Name, Location..."
                className="2xl:text-2xl text-xl text-[#6E6E73] leading-5 w-full placeholder:text-[#6E6E73] font-medium outline-none border-0 bg-transparent py-4 2xl:py-5"
              />
            </div>
          </div>
          <div className="flex items-center gap-6 2xl:gap-[30px]">
            <button
              onClick={() => setActiveSubTab("add-products")}
              className="py-4 2xl:py-5 w-[224px] text-center duration-200 border border-transparent hover:border-current hover:bg-transparent hover:text-current leading-5 2xl:text-2xl text-xl font-medium px-6 rounded-[10px] bg-[#0028B7] text-white"
            >
              Add Product
            </button>
            <CommonBtn
              // clickEvent={() => setEditOverlay(!editOverlay)}
              style="text-white bg-[#606060] hover:bg-transparent hover:text-[#606060]"
              btntext="Edit"
            />
            <CommonBtn
              clickEvent={() =>
                deleteProduct(
                  categorySelect,
                  setProductDetails,
                  productDetails,
                  setProductDetailsData,
                  selectedCate,
                  setCategoryData
                )
              }
              style="text-white bg-[#FF3D00] hover:bg-transparent hover:text-[#FF3D00]"
              btntext="Delete"
            />
            <CommonBtn
              clickEvent={exportProductDetails}
              style="text-black bg-[#FDC63A] hover:bg-transparent hover:text-[#FDC63A]"
              btntext="Export"
            />
          </div>
        </div>
        <ProductDetailsTables />
      </div>
    </>
  );
};

export default ProductDetails;
