import React, { useContext, useState, useEffect, useCallback } from "react";
import { IoArrowBack } from "react-icons/io5";
import MyContext from "./context/MyContext";
import CommonBtn from "./common/CommonBtn";
import { DownArrowIcon } from "./common/Icons";
import { baseUrl, getProductDetails } from "./utils/auth";
import axios from "axios";
import { toast } from "react-toastify";
const EditProduct = () => {
  const { setActiveSubTab, categoryData, setProductDetails, currProduct } =
    useContext(MyContext);
  const cateId = currProduct.category_names[0];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(cateId);
  const currId = categoryData.find((val) => val.name === selectedOption);
  const [category, setCategory] = useState(currId.id);
  const [updateProduct, setUpdateProduct] = useState(currProduct);
  const toggleDropdown = (e) => {
    setIsOpen(!isOpen);
    console.log(e.value);
  };
  const handleOptionClick = useCallback(
    (option, id) => {
      // Create a new copy of the currProduct to avoid direct mutation
      const updatedProduct = {
        ...currProduct,
        category_names: [...currProduct.category_names],
      };
      updatedProduct.category_names[0] = option;

      // Update the state with the new product
      setUpdateProduct((prevData) => ({
        ...prevData,
        category_names: updatedProduct.category_names,
      }));

      // Update other states
      setIsOpen(false);
      setSelectedOption(option);
    },
    [currProduct, setUpdateProduct, setIsOpen, setSelectedOption]
  );
  // handle the submit
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const response = await axios.patch(
        `${baseUrl}/superadmin/get-products-dashboard/${currProduct.product_id}/`,
        updateProduct,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      getProductDetails(setProductDetails);
      toast.success("Product Updated Successfully!", {
        className: "rounded-[10px]",
      });
      setActiveSubTab(null);
    } catch (error) {
      toast.error(error.data, {
        className: "rounded-[10px]",
      });
      console.error("Error fetching data:", error);
    }
  };
  // handle input change
  const handleChange = (e) => {
    setUpdateProduct({ ...updateProduct, [e.target.name]: e.target.value });
  };
  // update the category in state
  useEffect(() => {
    setUpdateProduct((prevProductData) => ({
      ...prevProductData,
      category_id: category,
    }));
  }, [category]);
  console.log(updateProduct);
  return (
      <div className="pl-[26px] pb-10">
        <form onSubmit={handleProductSubmit}>
          <div className="flex items-center justify-between w-[95%] xl:w-[91%] mb-[31px]">
            <div
              onClick={() => setActiveSubTab("categories-products")}
              className="flex cursor-pointer items-center gap-4"
            >
              <IoArrowBack className="text-3xxl 2xl:text-[50px]" />
              <p className="text-2xl 2xl:text-3xxl text-black font-semibold">
                Update Product
              </p>
            </div>
            <CommonBtn
              style="text-white bg-[#0FB001] hover:bg-transparent hover:text-[#0FB001]"
              btntext="Update"
            />
          </div>
          <div className="w-[95%] xl:w-[87%]">
            <div className="flex gap-[129px]">
              <div className="flex flex-col w-full max-w-[396px]">
                <label
                  htmlFor="product-name"
                  className="text-xl 2xl:text-2xl font-normal text-black mb-2"
                >
                  Product Name
                </label>
                <input
                  required
                  name="name"
                  value={updateProduct.name}
                  onChange={handleChange}
                  id="product-name"
                  type="text"
                  className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
                />
              </div>
              <div className="flex flex-col w-full max-w-[396px]">
                <label
                  htmlFor="price"
                  className="text-xl 2xl:text-2xl font-normal text-black mb-2"
                >
                  Product Price per Piece
                </label>
                <input
                  required
                  id="price"
                  name="selling_price"
                  type="number"
                  value={updateProduct.selling_price}
                  onChange={handleChange}
                  className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex gap-[129px] my-9">
              <div className="flex flex-col w-full max-w-[396px]">
                <label
                  htmlFor="description"
                  className="text-xl 2xl:text-2xl font-normal text-black mb-2"
                >
                  Product Description
                </label>

                <textarea
                  required
                  className="border h-[200px] 2xl:h-[224px] border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full rounded-[10px] bg-transparent outline-none"
                  name="description"
                  value={updateProduct.description}
                  onChange={handleChange}
                  id="description"
                  rows="6"
                ></textarea>
              </div>
              <div className="flex flex-col w-full max-w-[396px]">
                <label
                  htmlFor="benefits"
                  className="text-xl 2xl:text-2xl font-normal text-black mb-2"
                >
                  Product Benefits
                </label>

                <textarea
                  required
                  className="border h-[200px] 2xl:h-[224px] border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full rounded-[10px] bg-transparent outline-none"
                  name="product_benifits"
                  value={updateProduct.product_benifits}
                  onChange={handleChange}
                  id="benefits"
                  rows="6"
                ></textarea>
              </div>
            </div>
            <div className="flex gap-[129px]">
              <div className="flex flex-col max-w-[396px] w-full">
                <p className="text-xl 2xl:text-2xl font-normal text-black mb-2">
                  Select Category
                </p>
                <div className="relative">
                  <div
                    className="border border-spacing-[0.5px] flex 2xl:text-2xl text-xl max-w-[396px] font-medium h-12 2xl:h-[62px] text-[#6E6E73] justify-between items-center pl-[18px] pr-8 border-[#6E6E73] p-2 rounded-[10px] cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    {selectedOption}

                    <DownArrowIcon />
                  </div>
                  {isOpen && (
                    <div className="absolute z-10 bg-white border-t-0 top-9 2xl:top-[52px] rounded-t-none border border-spacing-[0.5px] rounded-[10px] border-[#6E6E73] mt-1 py-1 w-full">
                      {categoryData.map((option, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 cursor-pointer 2xl:text-2xl text-xl font-medium text-[#6E6E73]"
                          onClick={() =>
                            handleOptionClick(option.name, option.id)
                          }
                        >
                          {option.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full max-w-[396px]">
                <label
                  htmlFor="product_qyt"
                  className="text-xl 2xl:text-2xl font-normal text-black mb-2"
                >
                  Product Quantity
                </label>
                <input
                  required
                  id="product_qyt"
                  name="total_quantity"
                  type="number"
                  value={updateProduct.total_quantity}
                  onChange={handleChange}
                  className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
  );
};

export default EditProduct;
