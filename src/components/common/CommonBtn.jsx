import React from "react";

const CommonBtn = (props) => {
  return (
    <button
      onClick={props.clickEvent}
      className={`w-[150px] 2xl:w-[188px] duration-300 border border-transparent leading-5 py-3 2xl:py-5 hover:border-current rounded-[10px] 2xl:text-2xl text-lg 2xl:font-medium ${props.style}`}
    >
      {props.btntext}
    </button>
  );
};

export default CommonBtn;
