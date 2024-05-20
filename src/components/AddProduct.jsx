import React, { useContext, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import MyContext from "./context/MyContext";
import CommonBtn from "./common/CommonBtn";
import { Check } from "lucide-react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import AddPics from "./common/AddPics";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const AddProduct = () => {
  const { setActiveSubTab, categoryData } = useContext(MyContext);
  const [isChecked, setIsChecked] = useState(false);
  const [variantCount, setVariantCount] = useState(1);
  const [variants, setVariants] = useState(false);
  const [addProducts, setAddProducts] = useState({
    name: "",
    description: "",
    selling_price: "",
    category_id: "", // Specify valid category ID
    benifits: "",
    product_galleries: [
      {
        image: null,
      },
      {
        image: null,
      },
    ],
    product_color_galleries: [
      {
        color: "",
        image: null,
      },
      {
        color: "",
        image: null,
      },
    ],
  });
  const decrementCount = () => {
    if (variantCount > 1) {
      setVariantCount(variantCount - 1);
    } else {
      setVariantCount(1);
    }
  };
  console.log(categoryData);
  return (
    <>
      <div className="pl-[26px] pb-10">
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
        <form className="w-[95%] xl:w-[87%]">
          <div className="flex gap-[129px]">
            <div className="flex flex-col w-full max-w-[396px]">
              <label
                htmlFor="product-name"
                className="text-2xl font-normal text-black mb-2"
              >
                Product Name
              </label>
              <input
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
                id="price"
                type="number"
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
                className="border h-[200px] 2xl:h-[224px] border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full rounded-[10px] bg-transparent outline-none"
                name=""
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
                className="border h-[200px] 2xl:h-[224px] border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full rounded-[10px] bg-transparent outline-none"
                name=""
                id="benefits"
                rows="6"
              ></textarea>
            </div>
          </div>
          <div className="flex gap-[129px]">
            <Select>
              <SelectTrigger className="w-[396px]">
                <SelectValue placeholder="Choose Category" />
              </SelectTrigger>
              <SelectContent width="w-[396px]">
                {categoryData.map((val) => (
                  <SelectItem color="text-dark" value={val.name}>
                    {val.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                <div className="flex gap-6 2xl:gap-9 w-[95%] mt-8">
                  <div className="border border-black rounded-[30px] py-6 w-full 2xl:py-[30px] px-8 2xl:px-10">
                    <div className="flex flex-col w-full max-w-[396px] mb-5">
                      <label
                        htmlFor="colour-name"
                        className="text-2xl font-normal text-black mb-2"
                      >
                        Colour Name
                      </label>
                      <input
                        id="colour-name"
                        type="text"
                        className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
                      />
                    </div>
                    <AddPics />
                  </div>
                  <div className="border border-black rounded-[30px] py-6 w-full 2xl:py-[30px] px-8 2xl:px-10">
                    <div className="flex flex-col w-full max-w-[396px] mb-5">
                      <label
                        htmlFor="colour-name"
                        className="text-2xl font-normal text-black mb-2"
                      >
                        Colour Name
                      </label>
                      <input
                        id="colour-name"
                        type="text"
                        className="border border-black text-2xl font-normal text-black placeholder:text-black px-5 w-full h-12 2xl:h-[62px] rounded-[10px] bg-transparent outline-none"
                      />
                    </div>
                    <AddPics />
                  </div>
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
              <AddPics />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddProduct;
