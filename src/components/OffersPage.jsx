import React, { useState, useEffect, useContext } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { CalendarTwoIcon, DownArrowIcon } from "./common/Icons";
import { addOffer } from "./utils/auth";
import MyContext from "./context/MyContext";
const OffersPage = () => {
  const { isOfferSent, setIsOfferSent } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Karnataka");
  const options = ["Karnataka", "Haryana"];
  const [couponData, setcouponData] = useState({
    coupon_code: "",
    order_value_amount: "",
    validity_start: "",
    validity_end: "",
    term_conditions: "",
    account_created_from: "",
    account_created_to: "",
    number_of_referral_from: "",
    number_of_referral_to: "",
    state_name: selectedOption,
    total_beneficiaries: "",
  });

  const toggleDropdown = (e) => {
    setIsOpen(!isOpen);
    console.log(e.value);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const handleSent = (e) => {
    e.preventDefault();
    addOffer(couponData, setIsOfferSent,setcouponData);
  };
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setcouponData({ ...couponData, [name]: value });
  //   console.log(value);
  // };
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "order_value_amount") {
      if (/^\d*\.?\d*$/.test(value)) {
        const digitsBeforeDecimal = value.split(".")[0];

        if (digitsBeforeDecimal.length <= 3) {
          setcouponData({ ...couponData, [name]: value });
        }
      }
    } else if (name === "validity_start" || name === "validity_end") {
      const selectedDate = new Date(value);
      const currentDate = new Date();

      if (selectedDate < currentDate) {
        setcouponData({
          ...couponData,
          [name]: tomorrow.toISOString().split("T")[0],
        });
      } else {
        setcouponData({ ...couponData, [name]: value });
      }
    } else {
      setcouponData({ ...couponData, [name]: value });
    }
  };
  useEffect(() => {
    setcouponData((prevCouponData) => ({
      ...prevCouponData,
      state_name: selectedOption,
    }));
  }, [selectedOption]);

  console.log(couponData);
  console.log(selectedOption);

  return (
    <>
      <form onSubmit={handleSent} className="w-full">
        <div className="flex justify-between items-start pr-[26px] mb-[38px]">
          <p className="text-4xl pl-9 font-bold text-black leading-[80%]">
            Offers
          </p>
          <button
            className={`text-2xl font-semibold text-white duration-200 text-nowrap border w-[256px] text-center rounded-[10px] px-16 py-3.5 ${
              isOfferSent
                ? "flex items-center gap-3 justify-center border-[#0FB001]"
                : "hover:text-[#0FB001] text-white bg-[#0FB001] hover:bg-transparent border-transparent hover:border-current"
            }`}
          >
            {isOfferSent ? (
              <>
                <span className="text-[#0FB001]">Sent</span>
                <BsPatchCheckFill className="text-[#0FB001] text-lg" />
              </>
            ) : (
              "Send Offer"
            )}
          </button>
        </div>
        <div>
          <div className="flex pl-9 gap-14 min-[1840px]:gap-[90px] min-[1880px]:w-[95%] max-[1880px]:pr-5">
            <div className="w-full">
              <div className="flex flex-col">
                <label
                  htmlFor="coupon"
                  className="text-2xl font-medium text-black mb-4"
                >
                  Enter Coupon Code
                </label>
                <input
                  required
                  onChange={handleInputChange}
                  id="coupon"
                  type="text"
                  name="coupon_code"
                  value={couponData.coupon_code}
                  className="text-2xl 2xl:text-3xxl font-medium h-12 2xl:h-[62px] text-[#6E6E73] placeholder:text-[#6E6E73] border border-spacing-[0.5px] border-[#6E6E73] rounded-[10px] py-2 px-5 w-[420px] outline-none"
                  placeholder="Enter Code"
                />
              </div>
              <div className="flex flex-col mt-[46px]">
                <label
                  htmlFor="order-value"
                  className="text-2xl font-medium text-black mb-4"
                >
                  Order value
                </label>
                <div>
                  <input
                    required
                    onChange={handleInputChange}
                    id="order-value"
                    type="number"
                    name="order_value_amount"
                    value={couponData.order_value_amount}
                    className="text-2xl 2xl:text-3xxl font-medium h-12 2xl:h-[62px] text-[#6E6E73] placeholder:text-[#6E6E73] border border-spacing-[0.5px] border-[#6E6E73] rounded-[10px] py-2 px-5 w-[420px] outline-none"
                    placeholder="₹"
                  />
                </div>
              </div>
              <p className="text-2xl font-medium text-black mb-6 mt-[53px]">
                Coupon Validity
              </p>
              <div className="flex items-center flex-col min-[1800px]:flex-row gap-8 mb-[72px]">
                <div className="flex items-center gap-5 w-full">
                  <p className="text-2xl font-normal text-black">From</p>
                  <div className="flex relative w-full items-center">
                    <input
                      required
                      onChange={handleInputChange}
                      name="validity_start"
                      value={couponData.validity_start}
                      // min={tomorrow.toISOString().split("T")[0]}
                      className="h-12 2xl:h-[62px] border outline-none border-[#6E6E73] w-full uppercase text-[#6E6E73] rounded-[10px] py-3.5 px-5 leading-5 text-2xl border-spacing-[0.5px]"
                      type="date"
                    />
                    <CalendarTwoIcon style="absolute top-1/2 bg-white -translate-y-1/2 right-[25px] pointer-events-none max-2xl:w-7" />
                  </div>
                </div>
                <div className="flex items-center gap-[51px] min-[1800px]:gap-5 w-full">
                  <p className="text-2xl font-normal text-black">To</p>
                  <div className="flex relative w-full items-center">
                    <input
                      required
                      onChange={handleInputChange}
                      name="validity_end"
                      value={couponData.validity_end}
                      // min={tomorrow.toISOString().split("T")[0]}
                      className="h-12 2xl:h-[62px] border outline-none border-[#6E6E73] w-full uppercase text-[#6E6E73] rounded-[10px] py-3.5 px-5 leading-5 text-2xl border-spacing-[0.5px]"
                      type="date"
                    />
                    <CalendarTwoIcon style="absolute top-1/2 bg-white -translate-y-1/2 right-[25px] pointer-events-none max-2xl:w-7" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-3">
                <label
                  htmlFor="t&c"
                  className="text-2xl font-medium text-black mb-4"
                >
                  Enter T&C
                </label>
                <textarea
                  required
                  onChange={handleInputChange}
                  name="term_conditions"
                  id="t&c"
                  rows={8}
                  value={couponData.term_conditions}
                  placeholder="Write here"
                  className="text-xl font-normal max-h-[200px] 2xl:max-h-[262px] text-[#6E6E73] placeholder:text-[#6E6E73] border border-spacing-[0.5px] border-[#6E6E73] rounded-[10px] py-[22px] px-[26px] outline-none"
                ></textarea>
              </div>
            </div>
            <div className="w-full overflow-hidden">
              <p className="text-[28px] font-medium text-black">
                Select Criteria
              </p>
              <p className="text-2xl font-medium text-black mb-7 mt-6">
                Account Creation Date :
              </p>
              <div className="flex items-center flex-col min-[1800px]:flex-row gap-8 mb-[72px]">
                <div className="flex items-center gap-5 w-full">
                  <p className="text-2xl font-normal text-black">From</p>
                  <div className="flex relative w-full items-center">
                    <input
                      required
                      onChange={handleInputChange}
                      name="account_created_from"
                      value={couponData.account_created_from}
                      className="h-12 2xl:h-[62px] border outline-none border-[#6E6E73] w-full uppercase text-[#6E6E73] rounded-[10px] py-3.5 px-5 leading-5 text-2xl border-spacing-[0.5px]"
                      type="date"
                    />
                    <CalendarTwoIcon style="absolute top-1/2 bg-white -translate-y-1/2 right-[25px] pointer-events-none max-2xl:w-7" />
                  </div>
                </div>
                <div className="flex items-center gap-[51px] min-[1800px]:gap-5 w-full">
                  <p className="text-2xl font-normal text-black">To</p>
                  <div className="flex relative w-full items-center">
                    <input
                      required
                      onChange={handleInputChange}
                      name="account_created_to"
                      value={couponData.account_created_to}
                      className="h-12 2xl:h-[62px] border outline-none border-[#6E6E73] w-full uppercase text-[#6E6E73] rounded-[10px] py-3.5 px-5 leading-5 text-2xl border-spacing-[0.5px]"
                      type="date"
                    />
                    <CalendarTwoIcon style="absolute top-1/2 bg-white -translate-y-1/2 right-[25px] pointer-events-none max-2xl:w-7" />
                  </div>
                </div>
              </div>
              <p className="text-2xl font-medium text-black mb-6">
                Number of Referrals :
              </p>
              <div className="flex items-center gap-8 mb-10">
                <div className="flex items-center gap-5">
                  <p className="text-2xl font-normal text-black">From:</p>
                  <input
                    required
                    onChange={handleInputChange}
                    name="number_of_referral_from"
                    value={couponData.number_of_referral_from}
                    className="border h-12 2xl:h-[62px] outline-none max-w-[113px] border-[#6E6E73] w-full uppercase text-[#6E6E73] rounded-[10px] py-3.5 px-5 leading-5 text-2xl border-spacing-[0.5px]"
                    type="number"
                  />
                </div>
                <div className="flex items-center gap-5">
                  <p className="text-2xl font-normal text-black">To:</p>
                  <input
                    required
                    onChange={handleInputChange}
                    name="number_of_referral_to"
                    value={couponData.number_of_referral_to}
                    className="border h-12 2xl:h-[62px] outline-none max-w-[113px] border-[#6E6E73] w-full uppercase text-[#6E6E73] rounded-[10px] py-3.5 px-5 leading-5 text-2xl border-spacing-[0.5px]"
                    type="number"
                  />
                </div>
              </div>
              <p className="text-2xl font-medium text-black mb-4">
                Select State
              </p>
              <div className="relative">
                <div
                  className="border border-spacing-[0.5px] flex text-2xl w-[401px] font-medium h-12 2xl:h-[62px] text-[#6E6E73] justify-between items-center pl-[18px] pr-8 border-[#6E6E73] p-2 rounded-[10px] cursor-pointer"
                  onClick={toggleDropdown}
                >
                  {selectedOption}

                  <DownArrowIcon />
                </div>
                {isOpen && (
                  <div className="absolute z-10 bg-white border-t-0 top-9 2xl:top-[52px] rounded-t-none border border-spacing-[0.5px] rounded-[10px] border-[#6E6E73] mt-1 py-1 w-[401px]">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer text-2xl font-medium text-[#6E6E73]"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-[50px] flex flex-col">
                <label
                  htmlFor="total-beneficiaries"
                  className="text-2xl font-medium text-black mb-4"
                >
                  Total Beneficiaries
                </label>
                <input
                 
                  onChange={handleInputChange}
                  name="total_beneficiaries"
                  value={couponData.total_beneficiaries}
                  id="total-beneficiaries"
                  className="text-2xl 2xl:text-3xxl font-medium h-12 2xl:h-[62px] text-[#6E6E73] placeholder:text-[#6E6E73] border border-spacing-[0.5px] border-[#6E6E73] rounded-[10px] py-2 px-5 max-w-[365px] outline-none"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default OffersPage;
