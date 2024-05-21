// Updated AddPics component
import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const AddPics = (props) => {
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    props.handleFileChange(uploadedFile, props.color);
  };

  return (
    <div>
      <p className="text-2xl text-black font-normal mb-7">Add Pics</p>
      <div className="flex items-center gap-4 2xl:gap-8">
        {Array.from(Array(4).keys()).map((index) => (
          <label
            key={index}
            htmlFor={`product-${index + 1}`}
            className="cursor-pointer relative inline-block w-full"
          >
            {props[`image${index + 1}`] && (
              <img
                className="absolute inset-0 h-full w-full rounded-[10px] object-cover"
                src={URL.createObjectURL(props[`image${index + 1}`])}
                alt="product image"
              />
            )}
            <div className="inline-flex relative flex-col items-center gap-4 px-[22px] w-full h-[100px] 2xl:h-[128px] justify-center bg-transparent rounded-[10px] shadow-sm pb-2 pt-[18px]">
              <FiPlusCircle className="text-[40px] cursor-pointer text-black" />
            </div>
            <input
              required={index === 0} // Only the first input is required
              id={`product-${index + 1}`}
              type="file"
              accept="image/*"
              className="opacity-0 pointer-events-none absolute inset-0"
              onChange={handleFileChange}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default AddPics;
