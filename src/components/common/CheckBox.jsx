import { Check } from "lucide-react";
const CheckBox = (props) => {
  return (
    <>
      <label className="inline-flex items-center">
        <div className="relative inline-block">
          <input
            type="checkbox"
            className={`peer 2xl:h-7 h-5 2xl:w-7 w-5 border opacity-0 border-[#282828] rounded transition-colors duration-150 ease-in-out${props.inputStyle}`}
            checked={props.isChecked}
            onChange={props.handleCheckBox}
          />
          <span
            className={`absolute bg-white 2xl:w-7 w-5 2xl:h-7 h-5 border inset-0 border-[#282828] flex items-center justify-center ${props.checkStyle}`}
          >
            {props.isChecked && <Check className="text-sm text-[#0FB001]" />}
          </span>
        </div>
      </label>
    </>
  );
};
export default CheckBox;
