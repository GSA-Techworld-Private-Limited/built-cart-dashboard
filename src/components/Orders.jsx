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
  const updateOrderStatus = async (value) => {
    console.log(value);
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const res = await axios.patch(
        `${baseUrl}/superadmin/get-orders-dashboard/${categorySelect}/`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      fetchOrderData(setOrderData);
      fetchStatusData(setStatusData, "this month");
      console.log(res);
      toast.success("Status Updated Successfully", {
        className: "rounded-[10px]",
      });
    } catch (error) {
      console.error("Fetch user data error:", error);
      // Show error message
      toast.warning("First Select Any Item!!", {
        className: "rounded-[10px]",
      });
    }
  };
  return (
    <>
      <div className="w-full">
        <p className="text-3xxl 2xl:text-4xl ps-7 font-bold text-black leading-[80%] mb-24">
          Orders
        </p>
        <div className="overflow-auto hide_scroll">
          <div className="flex items-center ps-7 mb-[18px] gap-3 w-[calc(1920px-265px)]">
            <div className="flex items-center gap-[10px] me-4 max-h-[54px] 2xl:max-h-[62px] border w-[432px] border-black rounded-[10px] px-[13px]">
              <IoSearchSharp className="text-dark text-[28px]" />
              <input
                onChange={handleChange}
                type="text"
                placeholder="Search Name, Location..."
                className="2xl:text-2xl text-xl text-[#6E6E73] leading-5 w-full placeholder:text-[#6E6E73] font-medium outline-none border-0 bg-transparent py-4 2xl:py-5"
              />
            </div>
            <Select onValueChange={updateOrderStatus}>
              <SelectTrigger className="w-[277px]">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent width="w-[272px]">
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
            <div className="flex items-center gap-2">
              <ChooseIcon dimensions="w-6" />
              <p className="text-xl text-black font-medium text-nowrap">
                Sort By
              </p>
            </div>
            <Select>
              <SelectTrigger className="w-[191px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent width="w-[191px]">
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
        </div>
        <OrdersTable filterData={filterData} />
      </div>
    </>
  );
};

export default Orders;
