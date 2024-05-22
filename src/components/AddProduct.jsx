import React, { useContext, useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import MyContext from "./context/MyContext";
import CommonBtn from "./common/CommonBtn";
import { Check } from "lucide-react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import AddPics from "./common/AddPics";
import { DownArrowIcon } from "./common/Icons";
import { baseUrl } from "./utils/auth";
import axios from "axios";
import { toast } from "react-toastify";
const AddProduct = () => {
  const { setActiveSubTab, categoryData } = useContext(MyContext);
  const [isChecked, setIsChecked] = useState(false);
  const [variantCount, setVariantCount] = useState(1);
  const [variants, setVariants] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("newly added");
  const currId = categoryData.find((val) => val.name === selectedOption);
  const [category, setCategory] = useState(currId.id);
  const [addProducts, setAddProducts] = useState({
    name: "",
    description: "",
    selling_price: "",
    category_id: category, // Specify valid category ID
    benifits: "",
    quantity: null,
    rating: 0.5,
    product_galleries: [],
    product_color_galleries: [],
  });
  const decrementCount = () => {
    if (variantCount > 1) {
      setVariantCount(variantCount - 1);
    } else {
      setVariantCount(1);
    }
  };
  const toggleDropdown = (e) => {
    setIsOpen(!isOpen);
    console.log(e.value);
  };
  const handleOptionClick = (option, id) => {
    setCategory(id);
    setSelectedOption(option);
    setIsOpen(false);
    console.log(id);
  };
  // handle the submit
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    // append the data to formdata
    const formData = new FormData();
    for (const key in addProducts) {
      if (
        key !== "product_galleries" &&
        Object.hasOwnProperty.call(addProducts, key)
      ) {
        formData.append(key, addProducts[key]);
      }
    }

    addProducts.product_galleries.forEach((gallery, index) => {
      formData.append(`product_galleries[${index}][image]`, gallery.image);
    });
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      // Send POST request with Axios
      const response = await axios.post(
        `${baseUrl}/superadmin/add-products-dashboard/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      toast.success(response.data.Message, {
        className: "rounded-[10px]",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // handle input change
  const handleChange = (e) => {
    setAddProducts({ ...addProducts, [e.target.name]: e.target.value });
  };
  // update the category in state
  useEffect(() => {
    setAddProducts((prevProductData) => ({
      ...prevProductData,
      category_id: category,
    }));
  }, [category]);
  // handle the file change
  const handleFileChange = (uploadedFile, product) => {
    const updatedAddProducts = { ...addProducts };
    updatedAddProducts.product_galleries.push({ image: uploadedFile });
    setAddProducts(updatedAddProducts);
  };
  console.log(categoryData);
  console.log(addProducts);
  return (
    <>
      <form onSubmit={handleProductSubmit} className="pl-[26px] pb-10">
        <div className="flex items-center justify-between w-[95%] xl:w-[91%] mb-[31px]">
          <div
            onClick={() => setActiveSubTab(null)}
            className="flex cursor-pointer items-center gap-4"
          >
            <IoArrowBack className="text-3xxl 2xl:text-[50px]" />
            <p className="text-2xl 2xl:text-3xxl text-black font-semibold">
              Add Product
            </p>
          </div>
          <CommonBtn
            style="text-white bg-[#0FB001] hover:bg-transparent hover:text-[#0FB001]"
            btntext="Add"
          />
        </div>
        <div className="w-[95%] xl:w-[87%]">
          <div className="flex gap-[129px]">
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="product-name"
                className="text-2xl font-normal text-black mb-2"
              >
                Product Name
              </label>
              <input
                required
                name="name"
                value={addProducts.name}
                onChange={handleChange}
                id="product-name"
                type="text"
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="price"
                className="text-2xl font-normal text-black mb-2"
              >
                Product Price per Piece
              </label>
              <input
                required
                id="price"
                name="selling_price"
                type="number"
                value={addProducts.selling_price}
                onChange={handleChange}
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex gap-[129px] my-9">
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="description"
                className="text-2xl font-normal text-black mb-2"
              >
                Product Description
              </label>

              <textarea
                required
                className="border h-[200px] 2xl:h-[224px] border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full rounded-[10px] bg-transparent outline-none"
                name="description"
                value={addProducts.description}
                onChange={handleChange}
                id="description"
                rows="6"
              ></textarea>
            </div>
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="benefits"
                className="text-2xl font-normal text-black mb-2"
              >
                Product Benefits
              </label>

              <textarea
                required
                className="border h-[200px] 2xl:h-[224px] border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full rounded-[10px] bg-transparent outline-none"
                name="benifits"
                value={addProducts.benifits}
                onChange={handleChange}
                id="benefits"
                rows="6"
              ></textarea>
            </div>
          </div>
          <div className="flex gap-[129px]">
            <div className="flex flex-col max-w-[396px] w-full">
              <p className="text-2xl font-normal text-black mb-2">
                Select Category
              </p>
              <div className="relative">
                <div
                  className="border border-spacing-[0.5px] flex text-2xl max-w-[396px] font-medium h-12 2xl:h-[62px] text-[#6E6E73] justify-between items-center pl-[18px] pr-8 border-[#6E6E73] p-2 rounded-[10px] cursor-pointer"
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
                        className="px-4 py-2 cursor-pointer text-2xl font-medium text-[#6E6E73]"
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
                className="text-2xl font-normal text-black mb-2"
              >
                Product Quantity
              </label>
              <input
                required
                id="product_qyt"
                name="quantity"
                type="number"
                value={addProducts.quantity}
                onChange={handleChange}
                className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-7 mt-12">
          <label className="inline-flex items-center">
            <div className="relative inline-block">
              <input
                type="checkbox"
                className="peer h-7 w-7 border border-[#282828] rounded transition-colors duration-150 ease-in-out"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <span className="absolute bg-white w-7 h-7 border inset-0 border-[#282828] flex items-center justify-center">
                {isChecked && <Check className=" text-sm text-[#0FB001]" />}
              </span>
            </div>
            <span className="ml-4 text-2xl leading-5 text-[#0028B7] font-normal">
              Add Product with different Colour Variants
            </span>
          </label>
          {variants && isChecked && (
            <button
              onClick={() => setVariants(false)}
              className="text-2xl text-white font-medium leading-5 bg-dark duration-200 py-[21px] px-[42px] hover:border-current border border-transparent rounded-[10px]"
            >
              Add more variants
            </button>
          )}
        </div>
        <div>
          {isChecked ? (
            variants ? (
              <>
                <div className="grid grid-cols-2 gap-6 2xl:gap-9 w-[95%] mt-8">
                  {[...Array(variantCount)].map((_, idx) => (
                    <div
                      key={idx}
                      className="border border-black rounded-[30px] py-6 w-full 2xl:py-[30px] px-8 2xl:px-10"
                    >
                      <div className="flex flex-col w-full max-w-[396px] mb-5">
                        <label
                          htmlFor={`colour-name-${idx}`}
                          className="text-2xl font-normal text-black mb-2"
                        >
                          Colour Name
                        </label>
                        <input
                          required
                          id={`colour-name-${idx}`}
                          type="text"
                          className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
                        />
                      </div>
                      <AddPics />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="ml-11 mt-6">
                  <p className="text-base text-black font-normal mb-3">
                    Add number of variants you want to add
                  </p>
                  <div className="flex items-end gap-6">
                    <div className="border border-black rounded-[10px] flex items-center gap-3 py-2 px-4">
                      <FiMinusCircle
                        onClick={decrementCount}
                        className={`text-2xl cursor-pointer ${
                          variantCount > 1 ? "text-[#686868]" : "text-[#D9D9D9]"
                        }`}
                      />
                      <span className="text-2xl font-normal leading-9 text-[#686868]">
                        {variantCount}
                      </span>
                      <FiPlusCircle
                        onClick={() => setVariantCount(variantCount + 1)}
                        className="text-2xl cursor-pointer text-[#686868]"
                      />
                    </div>
                    <button
                      onClick={() => setVariants(true)}
                      className="text-white border border-transparent text-base leading-5 font-medium py-2.5 px-[30px] bg-[#0FB001] duration-200 hover:border-current rounded-[10px] hover:text-[#0FB001] hover:bg-transparent"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </>
            )
          ) : (
            <div className="w-[41%] mt-11">
              <AddPics
                handleFileChange={handleFileChange}
                image1={addProducts.product_galleries[0]?.image || null}
                image2={addProducts.product_galleries[1]?.image || null}
                image3={addProducts.product_galleries[2]?.image || null}
                image4={addProducts.product_galleries[3]?.image || null}
              />
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default AddProduct;
