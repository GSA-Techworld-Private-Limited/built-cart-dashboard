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
import OrderLogTable from "./OrderLogTable";
import MyContext from "./context/MyContext";
import { toast } from "react-toastify";
const OrderLogs = () => {
  const {
    showExport,
    setShowExport,
    setSelectExport,
    orderLogs,
    setFilteredLogs,
  } = useContext(MyContext);
  const filterWithStatus = (value) => {
    if (value === "") {
      // Clear filterData when the search term is empty
      setFilteredLogs([]);
    } else {
      const filteredData = orderLogs.filter(
        (order) =>
          typeof order.status === "string" &&
          order.status.toLowerCase().includes(value)
      );
      console.log(filteredData);
      setFilteredLogs(filteredData);
    }
  };
  const handleChange = (event) => {
    const term = event.target.value.toLowerCase();
    if (term === "") {
      // Clear filterData when the search term is empty
      setFilteredLogs([]);
    } else {
      const filteredData = orderLogs.filter((order) => {
        // Check if any string property of the order object includes the search term
        return Object.values(order).some(
          (value) =>
            typeof value === "string" && value.toLowerCase().includes(term)
        );
      });
      setFilteredLogs(filteredData);
      console.log(filteredData);
    }
  };
  return (
    <>
      <div className="w-full">
        <p className="text-3xxl 2xl:text-4xl ps-7 font-bold text-black leading-[80%] mb-24">
          Order logs
        </p>
        <div className="flex items-center ps-7 mb-[18px] gap-3 justify-between pr-8">
          <div className="flex items-center  gap-3">
            <div className="flex items-center gap-[10px] me-4 max-h-[54px] 2xl:max-h-[62px] border w-[432px] border-black rounded-[10px] px-[13px]">
              <IoSearchSharp className="text-dark text-[28px]" />
              <input
                onChange={handleChange}
                type="text"
                placeholder="Search Name, Location..."
                className="2xl:text-2xl text-xl text-[#6E6E73] leading-5 w-full placeholder:text-[#6E6E73] font-medium outline-none border-0 bg-transparent py-4 2xl:py-5"
              />
            </div>
            <div className="flex items-center gap-2">
              <ChooseIcon dimensions="w-6" />
              <p className="text-xl text-black font-medium text-nowrap">
                Sort By
              </p>
            </div>
            <div className="ml-4">
              <Select onValueChange={filterWithStatus}>
                <SelectTrigger className="w-[191px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent width="w-[191px]">
                  <SelectItem color="text-[#0FA958]" value="delivered">
                    Delivered
                  </SelectItem>
                  <SelectItem color="text-[#B22B00]" value="cancelled">
                    Cancelled
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CommonBtn
            clickEvent={() => {
              setSelectExport(orderLogs), setShowExport(!showExport);
            }}
            style="text-black bg-[#FDC63A] hover:bg-transparent hover:text-[#FDC63A]"
            btntext="Export"
          />
        </div>
        <OrderLogTable />
      </div>
    </>
  );
};

export default OrderLogs;
