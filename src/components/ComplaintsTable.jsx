import { useContext } from "react";
import MyContext from "./context/MyContext";
import { DateRangeIcon } from "./common/Icons";
import CheckBox from "./common/CheckBox";
import { handleCheckBoxChange } from "./utils/handleCheckBox";
import { formatDateTime } from "./OrdersTable";
const ComplaintsTable = () => {
  const {
    setCheckedItems,
    setCategorySelect,
    complaints,
    filteredComplaints,
    checkedItems,
  } = useContext(MyContext);
  console.log(complaints);
  return (
    <>
      <div>
        <div className="w-[calc(1536px-265px)] 2xl:w-[calc(1920px-265px+88px)]">
          <div className="bg-[#BDBDBD] h-[54px] 2xl:h-16 flex items-center">
            <div className="max-2xl:w-[80px] 2xl:px-[68px]"></div>
            <div>
              <div className="flex pl-6 items-center gap-5 2xl:gap-11 w-[120px] 2xl:w-[178px]">
                <p className="font-semibold text-nowrap table-text">Date</p>
                <DateRangeIcon />
              </div>
            </div>
            <p className="font-semibold text-nowrap pl-6 w-[170px] 2xl:w-[232px] table-text">
              Order ID
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[160px] 2xl:w-[204px] table-text">
              Customer
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[170px] 2xl:w-[237px] table-text">
              Mobile
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[160px] 2xl:w-[204px] table-text">
              Items
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[276px] table-text">
              Complaints
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[170px] 2xl:w-[276px] table-text">
              Status
            </p>
          </div>
          {complaints &&
            (filteredComplaints.length > 0 ? filteredComplaints : complaints)
              .reduce((acc, item) => [item].concat(acc), [])
              .map((val, i) => (
                <div
                  key={i}
                  className={`py-3 2xl:py-4 mt-2 flex ${
                    i % 2 === 0 ? "bg-[#FEF9EB]" : "bg-white"
                  }`}
                >
                  <div className="2xl:px-[54px] py-2 2xl:py-4 text-center w-[80px] 2xl:w-[136px]">
                    <CheckBox
                      inputStyle="!border-[#686868]"
                      checkStyle="!border-[#686868] !bg-transparent"
                      isChecked={checkedItems[val.id] || false}
                      handleCheckBox={() =>
                        handleCheckBoxChange(
                          val.id,
                          setCheckedItems,
                          setCategorySelect
                        )
                      }
                    />
                  </div>
                  <p className="font-medium py-3 2xl:py-5 pl-6 w-[120px] 2xl:w-[178px] text-nowrap table-text">
                    {formatDateTime(val.created_at)}
                  </p>
                  <p className="font-medium underline py-3 2xl:py-5 pl-6 w-[170px] 2xl:w-[232px] text-nowrap table-text">
                    {val.order_product.order_id}
                  </p>
                  <p className="font-medium py-3 2xl:py-5 pl-6 w-[160px] 2xl:w-[204px] text-nowrap table-text">
                    {val.user.customer_name}
                  </p>
                  <p className="font-medium py-3 2xl:py-5 text-nowrap pl-6 w-[170px] 2xl:w-[237px] table-text">
                    {val.user.mobile_number}
                  </p>
                  <p className="font-medium py-3 2xl:py-5 text-nowrap pl-6 w-[160px] 2xl:w-[204px] table-text">
                    {val.order_product.product}
                  </p>
                  <div className="w-[276px] flex items-center pl-6">
                    <div className="w-[233px] border p-2 overflow-hidden text-ellipsis border-spacing-[0.5px] rounded-[10px] border-black">
                      <p className="text-ellipsis overflow-hidden">
                        {val.query}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-medium capitalize py-3 2xl:py-5 text-nowrap pl-6 w-[170px] 2xl:w-[276px] 2xl:text-2xl text-base leading-5 ${
                      val.status === "resolved"
                        ? "text-[#0FA958]"
                        : val.status === "pending"
                        ? "text-[#FF3D00]"
                        : ""
                    }`}
                  >
                    {val.status}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default ComplaintsTable;
