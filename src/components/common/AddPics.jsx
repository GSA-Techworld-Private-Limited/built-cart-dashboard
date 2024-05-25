// AddPics.js
import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const AddPics = ({ id, handleFileChange, image1, image2, image3, image4 }) => {
  const handleFileChangeWithId = (event, index) => {
    const uploadedFile = event.target.files[0];
    handleFileChange(uploadedFile, index, id); // Pass the id to handleFileChange
  };

  return (
    <div>
      <p className="text-2xl text-black font-normal mb-7">Add Pics</p>
      <div className="flex items-center gap-4 2xl:gap-8">
        {[...Array(4).keys()].map((index) => (
          <label
            key={index}
            htmlFor={`product-${id}-${index + 1}`} // Use id to generate unique IDs
            className="cursor-pointer relative inline-block w-full"
          >
            {eval(`image${index + 1}`) && (
              <img
                className="absolute inset-0 h-full w-full rounded-[10px] object-cover"
                src={URL.createObjectURL(eval(`image${index + 1}`))}
                alt="product image"
              />
            )}
            <div className="inline-flex relative flex-col items-center gap-4 px-[22px] w-full h-[100px] 2xl:h-[128px] justify-center bg-transparent rounded-[10px] shadow-sm pb-2 pt-[18px]">
              <FiPlusCircle className="text-[40px] cursor-pointer text-black" />
            </div>
            <input
              // required={index === 0} // Only the first input is required
              id={`product-${id}-${index + 1}`} // Use id to generate unique IDs
              type="file"
              accept="image/*"
              className="opacity-0 pointer-events-none absolute inset-0"
              onChange={(e) => handleFileChangeWithId(e, index)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default AddPics;
