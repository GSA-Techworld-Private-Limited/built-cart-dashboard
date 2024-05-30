import React, { useContext } from "react";
import MyContext from "../context/MyContext";
import { BsFillBagCheckFill } from "react-icons/bs";

const SuccessMessage = (props) => {
  const { setMessage } = useContext(MyContext);
  return (
    <div className="absolute inset-0 bg-white bg-opacity-95 flex justify-center items-center z-10">
      <div className="h-[300px] p-4 flex flex-col gap-3 items-center border border-[#0FB001] justify-center w-[300px] bg-[#10b00112] rounded-[30px] shadow-sm">
        <div className="h-[70px] w-[70px] flex items-center justify-center rounded-full bg-[#0FB001]">
          <BsFillBagCheckFill className="text-3xl text-white" />
        </div>
        <p className="text- font-semibold text-xl">Success</p>
        <p className="text- font-semibold text-sm text-center">
          {props.successMessage}
        </p>
        <button
          onClick={() => setMessage(false)}
          className="py-2 px-8 rounded-[10px] bg-[#0FB001] text-white text-xl"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
