import React, { useContext, useState, useEffect, useCallback } from "react";
import { IoArrowBack } from "react-icons/io5";
import MyContext from "./context/MyContext";
import CommonBtn from "./common/CommonBtn";
import { Check } from "lucide-react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import AddPics from "./common/AddPics";
import { DownArrowIcon } from "./common/Icons";
import { baseUrl, getProductDetails } from "./utils/auth";
import axios from "axios";
import { toast } from "react-toastify";
const AddProduct = () => {
  const { setActiveSubTab, categoryData, setCategoryData, setProductDetails } =
    useContext(MyContext);
  const [productId, setProductId] = useState(null);
  const [addDetails, setAddDetails] = useState(false);
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
    product_benifits: "",
    total_quantity: null,
    rating: 0.5,
  });
  const [productImages, setProductImages] = useState([]);
  const [colorVariants, setColorVariants] = useState([]);
  const decrementCount = () => {
    if (variantCount > 1) {
      setVariantCount(variantCount - 1);
    } else {
      setVariantCount(1);
    }
  };
  const toggleDropdown = (e) => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = useCallback(
    (option, id) => {
      setCategory(id);
      setSelectedOption(option);
      setIsOpen(false);
    },
    [setCategory, setSelectedOption, setIsOpen]
  );
  // handle the submit
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const formData = new FormData();
      // Append non-file data to formData
      formData.append("name", addProducts.name);
      formData.append("total_quantity", addProducts.total_quantity);
      formData.append("description", addProducts.description);
      formData.append("rating", addProducts.rating);
      formData.append("selling_price", addProducts.selling_price);
      formData.append("category_id", addProducts.category_id);
      formData.append("product_benifits", addProducts.product_benifits);
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
      setProductId(response.data.product_id);

      setAddDetails(true);
      toast.success("First step completed", {
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
  // handle the file change or adding images
  const handleFileChange = (uploadedFile) => {
    setProductImages((prevImages) => {
      // Create a new object for the uploaded image
      const newImage = {
        product: productId,
        image: uploadedFile, // Store the URL of the uploaded file
        is_featured: false,
      };

      // Return the updated array with the new image object appended
      return [...prevImages, newImage];
    });
  };
  //  for adding color variants
  const handleColorChange = (colorName, productId, index) => {
    setColorVariants((prevVariants) => {
      const updatedVariants = prevVariants.map((variant, idx) => {
        return {
          ...variant,
          color_name: colorName,
          index: index,
          product_id: productId,
        };
      });
      return updatedVariants;
    });
  };
  const handleFile = (file, productId, index, currentColorName) => {
    setColorVariants((prevVariants) => {
      const existingVariantIndex = prevVariants.findIndex(
        (variant) => variant.product_id === productId && variant.index === index
      );

      if (existingVariantIndex !== -1) {
        // If the color variant exists
        const existingVariant = prevVariants[existingVariantIndex];
        if (existingVariant.image === null) {
          // If the new image is different, update the existing variant
          return prevVariants.map((variant, idx) => ({
            ...variant,
            image: file,
          }));
        } else if (existingVariant.image !== null) {
          return [
            ...prevVariants,
            {
              ...existingVariant,
              index: index,
              image: file,
            },
          ];
        }
      } else {
        // If the color variant doesn't exist, create a new object
        return [
          ...prevVariants,
          {
            product_id: productId,
            index: index,
            is_featured: false,
            color_name: currentColorName || "", // Use current color name as default
            image: file,
          },
        ];
      }
    });
  };
  if (colorVariants.length === 0) {
    setColorVariants([
      {
        product_id: productId,
        is_featured: false,
        color_name: "", // You can set default values as needed
        image: null,
      },
    ]);
  }
  const handleImagesSubmit = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const formData = new FormData();

    // Iterate over each image object in the array
    productImages.forEach((imageObject) => {
      // Append product_id and is_featured for each image
      formData.append(`product_id`, imageObject.product);
      formData.append(`is_featured`, imageObject.is_featured);

      // Append the image URL to formData under the key "images"
      formData.append(`images`, imageObject.image);
    });

    try {
      const res = await axios.post(
        `${baseUrl}/superadmin/add-products-images/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success("Images Added Successfully!", {
        className: "rounded-[10px]",
      });
      setProductImages([]);
      // Handle response
    } catch (error) {
      console.log(error);
      toast.error("No Product Found!", {
        className: "rounded-[10px]",
      });
      // Handle error
    }
  };
  const submitVariants = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const formData = new FormData();

    // Iterate over each image object in the array
    colorVariants.forEach((imageObject) => {
      // Append product_id and is_featured for each image
      formData.append(`product_id`, imageObject.product_id);
      formData.append(`is_featured`, imageObject.is_featured);
      formData.append(`color_name`, imageObject.color_name);

      // Append the image URL to formData under the key "images"
      formData.append(`images`, imageObject.image);
    });

    try {
      const res = await axios.post(
        `${baseUrl}/superadmin/product-color-galleries/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("Variants Added Successfully!", {
        className: "rounded-[10px]",
      });
      setColorVariants([]);

      setColorVariants([]);
      // Handle response
    } catch (error) {
      console.log(error);
      toast.error("No Product Found!", {
        className: "rounded-[10px]",
      });
      // Handle error
    }
  };
  const finishAndUpdate = async () => {
    setActiveSubTab(null), setAddDetails(false);
    const accessToken = sessionStorage.getItem("accessToken");
    const res = await axios.get(
      `${baseUrl}/superadmin/add-category-dashboard/`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    setCategoryData(res.data.response);
    getProductDetails(setProductDetails);
    toast.success("Product Added Successfully", {
      className: "rounded-[10px]",
    });
  };

  return (
    <div className="pl-[26px] pb-10 h-[calc(100vh-126.59px)] 2xl:h-[calc(100vh-150px)] flex flex-col overflow-auto">
      <form onSubmit={handleProductSubmit}>
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
          {addDetails || (
            <CommonBtn
              style="text-white bg-[#0FB001] hover:bg-transparent hover:text-[#0FB001]"
              btntext="Next"
            />
          )}
        </div>
        {addDetails || (
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
                  value={addProducts.name}
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
                  value={addProducts.selling_price}
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
                  value={addProducts.description}
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
                  value={addProducts.product_benifits}
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
                  value={addProducts.total_quantity}
                  onChange={handleChange}
                  className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </form>
      {addDetails && (
        <React.Fragment>
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
              <span className="ml-4 2xl:text-2xl text-xl leading-5 text-[#0028B7] font-normal">
                Skip and Add Product with different Colour Variants
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
                <React.Fragment>
                  <div className="grid grid-cols-2 gap-6 2xl:gap-9 w-[95%] mt-8">
                    {[...Array(variantCount)].map((_, idx) => (
                      <div
                        key={idx}
                        className="border border-black rounded-[30px] py-6 w-full 2xl:py-[30px] px-8 2xl:px-10"
                      >
                        <div className="flex flex-col w-full max-w-[396px] mb-5">
                          <label
                            htmlFor={`colour-name-${idx}`}
                            className="text-xl 2xl:text-2xl font-normal text-black mb-2"
                          >
                            Color Name
                          </label>
                          <input
                            required
                            id={`colour-name`}
                            onBlur={
                              (e) =>
                                handleColorChange(
                                  e.target.value,
                                  productId,
                                  idx
                                ) // Include idx to identify the color variant
                            }
                            type="text"
                            className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
                          />
                        </div>
                        <AddPics
                          id={`${idx}-${productId}`} // Use a combination of index and productId as the unique identifier
                          handleFileChange={(file) =>
                            handleFile(
                              file,
                              productId,
                              idx,
                              colorVariants[idx]?.color_name
                            )
                          }
                          image1={
                            colorVariants.filter(
                              (curr) => curr.index === idx
                            )[0]?.image || null // Use image from corresponding color variant
                          }
                          image2={
                            colorVariants.filter(
                              (curr) => curr.index === idx
                            )[1]?.image || null // Use image from corresponding color variant
                          }
                          image3={
                            colorVariants.filter(
                              (curr) => curr.index === idx
                            )[2]?.image || null // Use image from corresponding color variant
                          }
                          image4={
                            colorVariants.filter(
                              (curr) => curr.index === idx
                            )[3]?.image || null // Use image from corresponding color variant
                          }
                        />
                        <button
                          onClick={submitVariants}
                          className="mt-5 bg-[#0FB001] rounded-full py-3 px-8 2xl:text-xl  text-white"
                        >
                          Save
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={finishAndUpdate}
                    className="mt-5 bg-gray-500 rounded-[10px] py-3 px-8 2xl:text-xl  text-white"
                  >
                    Finish
                  </button>
                </React.Fragment>
              ) : (
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
              )
            ) : (
              <div>
                <div className="w-[41%] mt-11">
                  <AddPics
                    id={productImages[0]?.product_id} // Use product_id from the first image object
                    handleFileChange={handleFileChange}
                    image1={productImages[0]?.image || null}
                    image2={productImages[1]?.image || null}
                    image3={productImages[2]?.image || null}
                    image4={productImages[3]?.image || null}
                  />
                  <button
                    onClick={handleImagesSubmit}
                    className="mt-8 bg-[#0FB001] rounded-[10px] py-3 px-8 2xl:text-xl  text-white"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default AddProduct;
