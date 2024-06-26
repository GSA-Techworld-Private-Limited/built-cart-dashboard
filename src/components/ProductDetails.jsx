import { useContext } from "react";
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
    categoryData,
    setProductDetailsData,
    productDetailsData,
    setProductDetails,
    productDetails,
    selectedCate,
    setShowExport,
    showExport,
    setSelectExport,
    setCurrProduct,
    setMessage,
  } = useContext(MyContext);
  const dataForCurrTitle = categoryData.filter(
    (currElem) => currElem.name === selectedCate
  );
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
      const searchRes = res.data.data.filter((val) =>
        val.category_names.includes(selectedCate)
      );
      setProductDetailsData(searchRes);
    } catch (error) {
      console.error("Fetch user data error:", error);
    }
  };
  const exportProductDetails = () => {
    if (productDetailsData.length > 0) {
      setSelectExport(productDetailsData), setShowExport(!showExport);
    } else {
      toast.warning("No Orders Yet!", {
        className: "rounded-[10px]",
      });
    }
  };
  const editProduct = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (categorySelect) {
      const res = await axios.get(
        `${baseUrl}/superadmin/get-products-dashboard/${categorySelect}/`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setCurrProduct(res.data);
      setActiveSubTab("edit-products");
    } else {
      toast.warning("Select Any Item First!", {
        className: "rounded-[10px]",
      });
      console.log("not item selected");
    }
  };
  return (
    <>
      <div className="w-full h-[calc(100vh-126.59px)] 2xl:h-[calc(100vh-150px)] flex flex-col">
        <p className="text-3xl 2xl:text-4xl capitalize ps-7 font-bold text-black leading-[80%] mb-[62px]">
          {Array.isArray(dataForCurrTitle) &&
            dataForCurrTitle.length > 0 &&
            dataForCurrTitle[0].name}
        </p>

        <div className="overflow-auto hide_scroll">
          <div className="flex items-center ps-7 mb-3 2xl:mb-10 gap-3 justify-between pr-8">
            <div>
              <div className="flex items-center gap-[10px] me-4 max-h-[54px] 2xl:max-h-[62px] border w-[300px] 2xl:w-[432px] border-black rounded-[10px] px-[13px]">
                <IoSearchSharp className="text-dark text-xl" />
                <input
                  onChange={filterUserWithName}
                  type="text"
                  placeholder="Search Name, Location..."
                  className="2xl:text-2xl text-lg text-[#6E6E73] leading-5 w-full placeholder:text-[#6E6E73] font-medium outline-none border-0 bg-transparent py-3 2xl:py-5"
                />
              </div>
            </div>
            <div className="flex items-center gap-6 2xl:gap-[30px]">
              <button
                onClick={() => setActiveSubTab("add-products")}
                className="py-3 2xl:py-5 w-[224px] text-center duration-200 border border-transparent hover:border-current hover:bg-transparent hover:text-current leading-5 2xl:text-2xl text-xl font-medium px-6 rounded-[10px] bg-[#0028B7] text-white"
              >
                Add Product
              </button>
              <CommonBtn
                clickEvent={editProduct}
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
                    setCategoryData,
                    setMessage
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
      </div>
    </>
  );
};

export default ProductDetails;
