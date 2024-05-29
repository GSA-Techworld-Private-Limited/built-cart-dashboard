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
const EditProduct = () => {
  const {
    setActiveSubTab,
    categoryData,
    setCategoryData,
    setProductDetails,
    currProduct,
  } = useContext(MyContext);
  const cateId = currProduct.category_names[0];
  const [productId, setProductId] = useState(null);
  const [addDetails, setAddDetails] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [variantCount, setVariantCount] = useState(1);
  const [variants, setVariants] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(cateId);
  const currId = categoryData.find((val) => val.name === selectedOption);
  const [category, setCategory] = useState(currId.id);
  const [updateProduct, setUpdateProduct] = useState(currProduct);
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
    console.log(e.value);
  };
  const handleOptionClick = useCallback(
    (option, id) => {
      currProduct.category_names[0] = option;
      setIsOpen(false);
    },
    [setSelectedOption, setIsOpen]
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
      setAddDetails(true);
      toast.success(response.data.message, {
        className: "rounded-[10px]",
      });
    } catch (error) {
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
  // handle the file change or adding images
  const handleFileChange = (uploadedFile, index) => {
    const product_galleries = updateProduct.product_galleries.map((val, i) => {
      if (i === index) {
        val.image = uploadedFile;
      }
      return val;
    });
    console.log(product_galleries);
    setUpdateProduct((prevData) => ({
      ...prevData,
      product_galleries: product_galleries,
    }));
  };
  //  for adding color variants
  const handleColorChange = (colorName, productId, index) => {
    setColorVariants((prevVariants) => {
      const updatedVariants = prevVariants.map((variant, idx) => {
        return {
          ...variant,
          color_name: colorName,
          index: index,
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
  console.log(categoryData);
  console.log(updateProduct);
  console.log(productImages);
  console.log(colorVariants);
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
      console.log(res);
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
      console.log(res);

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
  };
  console.log(productId);
  console.log(updateProduct);
  const editColorName = (e, index) => {
    const product_color_galleries = updateProduct.product_color_galleries.map(
      (val, i) => {
        if (i === index) {
          val.color_name = e.target.value;
        }
        return val;
      }
    );
    setUpdateProduct((prevData) => ({
      ...prevData,
      product_color_galleries: product_color_galleries,
    }));
    console.log(product_color_galleries);
  };
  return (
    <>
      <div className="pl-[26px] pb-10">
        <form onSubmit={handleProductSubmit}>
          <div className="flex items-center justify-between w-[95%] xl:w-[91%] mb-[31px]">
            <div
              onClick={() => setActiveSubTab(null)}
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
            <>
              <div className="grid grid-cols-2 gap-6 2xl:gap-9 w-[95%] mt-8">
                {updateProduct.product_color_galleries.map((_, idx) => (
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
                        value={
                          updateProduct.product_color_galleries.find(
                            (curr, i) => i === idx
                          )?.color_name || null
                        }
                        id={`colour-name`}
                        name="color_name"
                        onChange={(e) => editColorName(e, idx)}
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
                          updateProduct.product_color_galleries[idx]?.color_name
                        )
                      }
                      image1={
                        updateProduct.product_color_galleries.find(
                          (curr, i) => i === idx
                        )?.image || null // Use image from corresponding color variant
                      }
                      image2={
                        updateProduct.product_color_galleries.filter(
                          (curr) => curr.index === idx
                        )[1]?.image || null // Use image from corresponding color variant
                      }
                      image3={
                        updateProduct.product_color_galleries.filter(
                          (curr) => curr.index === idx
                        )[2]?.image || null // Use image from corresponding color variant
                      }
                      image4={
                        updateProduct.product_color_galleries.filter(
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
            </>
          ) : (
            <div>
              <div className="w-[41%] mt-11">
                <AddPics
                  id={updateProduct?.product_id} // Use product_id from the first image object
                  handleFileChange={handleFileChange}
                  image1={updateProduct.product_galleries[0]?.image || null}
                  image2={updateProduct.product_galleries[1]?.image || null}
                  image3={updateProduct.product_galleries[2]?.image || null}
                  image4={updateProduct.product_galleries[3]?.image || null}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProduct;
