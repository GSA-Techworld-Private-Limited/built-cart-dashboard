import React, { useContext, useState, useEffect, useCallback } from "react";
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
    product_benifits: "",
    total_quantity: null,
    rating: 0.5,
    product_color_galleries: [],
  });
  const product__Id = "12";
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
      setCategory(id);
      setSelectedOption(option);
      setIsOpen(false);
      console.log(id);
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

      // Append file data to formData
      // addProducts.product_galleries.forEach((gallery, index) => {
      //   if (gallery.image) {
      //     formData.append(`product_galleries[${index}][image]`, gallery.image);
      //     formData.append(
      //       `product_galleries[${index}][is_featured]`,
      //       gallery.is_featured
      //     );
      //   }
      // });

      // // Append color gallery file data to formData
      // addProducts.product_color_galleries.forEach((colorGallery, index) => {
      //   if (colorGallery.image) {
      //     formData.append(
      //       `product_color_galleries[${index}][color_name]`,
      //       colorGallery.color_name
      //     );
      //     formData.append(
      //       `product_color_galleries[${index}][image]`,
      //       colorGallery.image
      //     );
      //     formData.append(
      //       `product_color_galleries[${index}][is_featured]`,
      //       colorGallery.is_featured
      //     );
      //   }
      // });
      // console.log(formData.get("product_galleries[0][image]"));
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

  // handle the file change or adding images
  const handleFileChange = (uploadedFile) => {
    const productId = "a5703d01-e";

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
  const handleFile = (uploadedFile, productId) => {
    setColorVariants((prevState) => {
      const updatedColorVariants = [...prevState];
      const color_name = prevState[prevState.length - 1]?.color_name || "";
  
      // Find the index of the color variant with the same color_name
      const index = updatedColorVariants.findIndex(
        (variant) => variant.color_name === color_name
      );
  
      // If the color variant doesn't exist, create a new one
      if (index === -1) {
        updatedColorVariants.push({
          product: productId,
          color_name: color_name,
          image: uploadedFile,
          is_featured: false, // Default is_featured to false
        });
      } else {
        // If the color variant already exists, update its image
        updatedColorVariants[index].image = uploadedFile;
      }
  
      return updatedColorVariants;
    });
  };
  
  const handleColorChange = (productId) => {
    setColorVariants((prevState) => {
      const updatedColorVariants = [...prevState];
      const color_name = prevState[prevState.length - 1]?.color_name || "";
  
      // Find the index of the color variant with the same color_name
      const index = updatedColorVariants.findIndex(
        (variant) => variant.color_name === color_name
      );
  
      // If the color variant doesn't exist, create a new one
      if (index === -1) {
        updatedColorVariants.push({
          product: productId,
          color_name: color_name,
          image: null, // Initialize image as null
          is_featured: false, // Set is_featured to default false
        });
      }
  
      return updatedColorVariants;
    });
  };

  console.log(categoryData);
  console.log(addProducts);
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
      setProductImages([]);
      // Handle response
    } catch (error) {
      console.log(error);
      // Handle error
    }
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
                          className="text-xl 2xl:text-2xl font-normal text-black mb-2"
                        >
                          Color Name
                        </label>
                        <input
                          required
                          id={`colour-name-${idx}`}
                          onChange={(e) =>
                            handleColorChange(e.target.value, idx, product__Id)
                          }
                          type="text"
                          className="border border-black 2xl:text-2xl text-xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
                        />
                      </div>
                      <AddPics
                        id={idx}
                        handleFileChange={(file, index) =>
                          handleFile(file, index, product__Id)
                        }
                        image1={colorVariants.image?.[0] || null}
                        image2={colorVariants.image?.[1] || null}
                        image3={colorVariants.image?.[2] || null}
                        image4={colorVariants.image?.[3] || null}
                      />
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
            <div>
              <button onClick={handleImagesSubmit}>Next</button>
              <div className="w-[41%] mt-11">
                <AddPics
                  id={productImages[0]?.product_id} // Use product_id from the first image object
                  handleFileChange={handleFileChange}
                  image1={productImages[0]?.image || null}
                  image2={productImages[1]?.image || null}
                  image3={productImages[2]?.image || null}
                  image4={productImages[3]?.image || null}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddProduct;
