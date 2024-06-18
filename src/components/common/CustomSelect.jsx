import React, { useState, useEffect, useRef } from "react";
const CustomSelect = ({ options, onValueChange, placeholder, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className="w-full flex items-center font-medium justify-between px-6 py-4 border border-black bg-white rounded-[10px] text-xl leading-5 text-[#6E6E73]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedValue ? selectedValue.label : placeholder}</span>
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border border-black rounded-[10px] z-50 border-t-0 rounded-t-none top-[42px]">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-6 py-3 cursor-pointer text-xl font-medium leading-5 ${option.color}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CustomSelect;
