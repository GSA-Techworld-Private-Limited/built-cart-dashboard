import React from "react";

const ErrorMessage = (props) => {
  return (
    <div>
      <div className="h-[300px] p-4 flex flex-col gap-3 items-center border border-[#D31010] justify-center w-[300px] bg-[#d3101011] rounded-[30px] shadow-sm">
        <div className="h-[70px] w-[70px] flex items-center justify-center rounded-full bg-[#D31010]">
          <ImCross className="text-2xl text-white" />
        </div>
        <p className="text- font-semibold text-xl">Error</p>
        <p className="text- font-semibold text-sm text-center">
          {props.errorMessage}
        </p>
        <button className="py-2 px-8 rounded-[10px] bg-[#D31010] text-white text-xl">
          Try again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
