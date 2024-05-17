import React from "react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
const AddPics = () => {
  return (
    <div>
      <p className="text-2xl text-black font-normal mb-7">Add Pics</p>
      <div className="flex items-center gap-4 2xl:gap-8">
        <div className="flex items-center cursor-pointer justify-center w-full h-[100px] 2xl:h-[128px] shadow-sm rounded-[10px] bg-white">
          <FiPlusCircle className="text-3xl 2xl:text-[38px]" />
        </div>
        <div className="flex items-center cursor-pointer justify-center w-full h-[100px] 2xl:h-[128px] shadow-sm rounded-[10px] bg-white">
          <FiPlusCircle className="text-3xl 2xl:text-[38px]" />
        </div>
        <div className="flex items-center cursor-pointer justify-center w-full h-[100px] 2xl:h-[128px] shadow-sm rounded-[10px] bg-white">
          <FiPlusCircle className="text-3xl 2xl:text-[38px]" />
        </div>
        <div className="flex items-center cursor-pointer justify-center w-full h-[100px] 2xl:h-[128px] shadow-sm rounded-[10px] bg-white">
          <FiPlusCircle className="text-3xl 2xl:text-[38px]" />
        </div>
      </div>
    </div>
  );
};

export default AddPics;
