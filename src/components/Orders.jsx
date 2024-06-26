import React, { useContext, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChooseIcon } from "./common/Icons";
import CommonBtn from "./common/CommonBtn";
import OrdersTable from "./OrdersTable";
import MyContext from "./context/MyContext";
import { baseUrl, fetchOrderData, fetchStatusData } from "./utils/auth";
import { toast } from "react-toastify";
import axios from "axios";
import CustomSelect from "./common/CustomSelect";

const Orders = () => {
  const {
    showExport,
    setShowExport,
    orderData,
    setOrderData,
    setSelectExport,
    categorySelect,
    setStatusData,
  } = useContext(MyContext);
  const [accept, setAccept] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const handleChange = (event) => {
    const term = event.target.value.toLowerCase();
    if (term === "") {
      // Clear filterData when the search term is empty
      setFilterData([]);
    } else {
      const filteredData = orderData.filter((order) =>
        order.orders.some((item) =>
          Object.values(item).some(
            (val) => typeof val === "string" && val.toLowerCase().includes(term)
          )
        )
      );
      setFilterData(filteredData);
    }
  };
  const filterWithStatus = (value) => {
    if (value === "") {
      // Clear filterData when the status term is empty
      setFilterData([]);
    } else {
      const filteredData = orderData.filter(
        (order) =>
          typeof order.status === "string" &&
          order.status.toLowerCase().includes(value)
      );
      setFilterData(filteredData);
    }
  };
  const updateOrderStatus = async (value) => {
    console.log(value);
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const res = await axios.patch(
        `${baseUrl}/superadmin/get-orders-dashboard/${categorySelect}/`,
        { status: value.value },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      fetchOrderData(setOrderData);
      fetchStatusData(setStatusData, "this month");
      toast.success("Status Updated Successfully", {
        className: "rounded-[10px]",
      });
    } catch (error) {
      console.error("No items selected:", error);
      // Show error message
      toast.warning("First Select Any Item!!", {
        className: "rounded-[10px]",
      });
    }
  };
  const options = [
    { value: "payment_pending", label: "Pending", color: "text-[#0E39D1]" },
    { value: "in_transit", label: "In Transit", color: "text-[#FDC63A]" },
    { value: "delivered", label: "Delivered", color: "text-[#0FA958]" },
    { value: "placed", label: "Placed", color: "text-dark" },
    { value: "created", label: "Created", color: "text-dark" },
  ];

  return (
    <>
      <div className="w-full h-[calc(100vh-126.59px)] 2xl:h-[calc(100vh-150px)] flex flex-col">
        <p className="text-3xl 2xl:text-4xl ps-7 font-bold text-black leading-[80%] mb-24">
          Orders
        </p>
        <div className="overflow-auto hide_scroll">
          <div>
            <div className="flex items-center ps-7 mb-[12px] gap-3 w-[calc(1920px-265px)]">
              <div className="flex items-center gap-[10px] me-4 max-h-[54px] 2xl:max-h-[62px] border w-[300px] 2xl:w-[432px] border-black rounded-[10px] px-[13px]">
                <IoSearchSharp className="text-dark text-xl" />
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Search Name, Location..."
                  className="2xl:text-2xl text-lg text-[#6E6E73] leading-5 w-full placeholder:text-[#6E6E73] font-medium outline-none border-0 bg-transparent py-3 2xl:py-5"
                />
              </div>
              <CustomSelect
                options={options}
                onValueChange={updateOrderStatus}
                placeholder="Update Status"
                className="w-[230px] 2xl:w-[277px]"
              />
              <div className="flex items-center gap-2">
                <ChooseIcon dimensions="w-6" />
                <p className="text-base 2xl:text-xl text-black font-medium text-nowrap">
                  Sort By
                </p>
              </div>
              <Select onValueChange={filterWithStatus}>
                <SelectTrigger className="w-[160px] 2xl:w-[191px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent width="w-[160px] 2xl:w-[188px]">
                  <SelectItem color="text-dark" value=" ">
                    All
                  </SelectItem>
                  <SelectItem color="text-[#0E39D1]" value="payment_pending">
                    Pending
                  </SelectItem>
                  <SelectItem color="text-[#FDC63A]" value="in_transit">
                    In Transit
                  </SelectItem>
                  <SelectItem color="text-[#0FA958]" value="delivered">
                    Delivered
                  </SelectItem>
                  <SelectItem color="text-dark" value="placed">
                    Placed
                  </SelectItem>
                  <SelectItem color="text-dark" value="created">
                    Created
                  </SelectItem>
                </SelectContent>
              </Select>
              <CommonBtn
                clickEvent={() => setAccept(true)}
                style={
                  accept
                    ? "text-[#6E6E73] bg-transparent border-[#0FB001] hover:border-[#0FB001]"
                    : "text-white bg-[#0FB001] hover:bg-transparent hover:text-[#0FB001]"
                }
                btntext={accept ? "Accepted" : "Accept"}
              />
              <CommonBtn
                style="text-white bg-[#FF3D00] hover:bg-transparent hover:text-[#FF3D00]"
                btntext="Refund"
              />
              <CommonBtn
                clickEvent={() => {
                  setSelectExport(orderData), setShowExport(!showExport);
                }}
                style="text-black bg-[#FDC63A] hover:bg-transparent hover:text-[#FDC63A]"
                btntext="Export"
              />
            </div>
            <OrdersTable filterData={filterData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
