import React, { useContext, useState } from "react";
import { CalendarIcon, CloseIcon } from "./common/Icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MyContext from "./context/MyContext";
import { exportData } from "./utils/export";
const ExportOverlay = () => {
  const { showExport, setShowExport, selectExport } = useContext(MyContext);
  const [status, setStatus] = useState("export");
  const [timeFrame, setTimeFrame] = useState({
    from: "",
    to: "",
  });
  const [fileType, setFileType] = useState("pdf");
  const handleClick = (e) => {
    e.preventDefault();
    if (status === "export") {
      exportData(timeFrame, selectExport, fileType, () => {
        setStatus("exported"),
          setTimeout(() => {
            setStatus("done");
          }, 1000);
      });
    } else if (status === "done") {
      onComplete();
    }
    setTimeFrame({ from: "", to: "" });
  };

  const onComplete = () => {
    setShowExport(false);
    setStatus("export");
  };
  const closeOverlay = () => {
    setShowExport(!showExport);
    setStatus("export");
  };
  const handleDateInput = (e) => {
    const { name, value } = e.target;
    setTimeFrame({ ...timeFrame, [name]: value });
  };
  console.log(timeFrame);
  return (
    <>
      <div
        className={`fixed z-50 duration-300 backdrop-blur-lg inset-0 flex justify-center items-center ${
          showExport
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div onClick={closeOverlay} className="fixed inset-0"></div>
        <form
          // onSubmit={handleClick}
          className="px-7 py-6 rounded-[30px] bg-white relative"
        >
          <span
            onClick={closeOverlay}
            className="absolute cursor-pointer top-5 right-8"
          >
            <CloseIcon />
          </span>
          <p className="text-2xl font-semibold text-black mb-9">Export Files</p>
          <div className="flex justify-between gap-10 mb-4">
            <div className="flex flex-col w-full relative">
              <label
                htmlFor="from-date"
                className="text-xl font-normal text-black mb-[10px]"
              >
                From
              </label>
              <div className="flex relative w-full items-center">
                <CalendarIcon style="absolute top-1/2 bg-white -translate-y-1/2 right-[25px] pointer-events-none" />
                <input
                  required
                  name="from"
                  onChange={handleDateInput}
                  value={timeFrame.from}
                  id="from-date"
                  className="h-[63px] border outline-none border-dark w-full uppercase text-dark rounded-[10px] py-3.5 px-5 leading-5 text-2xl"
                  type="date"
                />
              </div>
            </div>
            <div className="flex flex-col w-full relative">
              <label
                htmlFor="to-date"
                className="text-xl font-normal text-black mb-[10px]"
              >
                To
              </label>
              <div className="flex relative w-full items-center">
                <CalendarIcon style="absolute top-1/2 bg-white -translate-y-1/2 right-[25px] pointer-events-none" />
                <input
                  required
                  name="to"
                  value={timeFrame.to}
                  onChange={handleDateInput}
                  id="to-date"
                  className="h-[63px] border outline-none border-dark w-full uppercase text-dark rounded-[10px] py-3.5 px-5 leading-5 text-2xl"
                  type="date"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-xl font-normal text-black mb-[10px]">
              File Type
            </p>
            <Select onValueChange={(value) => setFileType(value)}>
              <SelectTrigger
                titleColor="placeholder:!text-dark !text-dark"
                className="w-[255px]"
              >
                <SelectValue placeholder="pdf" />
              </SelectTrigger>
              <SelectContent width="w-[255px]">
                <SelectItem color="text-dark" value="pdf">
                  pdf
                </SelectItem>
                <SelectItem color="text-dark" value="xlsx">
                  xlsx
                </SelectItem>
                <SelectItem color="text-dark" value="xls">
                  xls
                </SelectItem>
              </SelectContent>
            </Select>
            <button
              onClick={handleClick}
              type="submit"
              className={`w-full text-center p-4 border border-transparent duration-200 rounded-[10px] mt-[50px] text-xl font-semibold ${
                status === "export" ? "bg-[#FDC63A] text-white" : ""
              } ${
                status === "exported"
                  ? "bg-transparent !border-[#686868] text-[#686868]"
                  : ""
              } ${status === "done" ? "bg-[#0FB001] text-white" : ""}`}
            >
              {status === "done"
                ? "Done"
                : status === "exported"
                ? "File Exported"
                : "Export"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ExportOverlay;
