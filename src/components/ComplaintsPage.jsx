import { useContext } from "react";
import { IoSearchSharp } from "react-icons/io5";
import CommonBtn from "./common/CommonBtn";
import MyContext from "./context/MyContext";
import ComplaintsTable from "./ComplaintsTable";
import { baseUrl, getComplaints } from "./utils/auth";
import axios from "axios";
import { toast } from "react-toastify";
import CustomSelect from "./common/CustomSelect";
const ComplaintsPage = () => {
  const {
    complaints,
    setSelectExport,
    showExport,
    setShowExport,
    setComplaints,
    categorySelect,
    setFilteredComplaints,
  } = useContext(MyContext);
  const updateComplaintsStatus = async (value) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!categorySelect) {
      toast.warning("First Select Any Item", {
        className: "rounded-[10px]",
      });
    } else {
      try {
        const res = await axios.patch(
          `${baseUrl}/superadmin/user-complaints-update/${categorySelect}/`,
          { status: value.value },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        getComplaints(setComplaints);
        toast.success(res.data.message, {
          className: "rounded-[10px]",
        });
      } catch (error) {
        console.error("Failed to update", error);
        toast.error("Failed to update Try again", {
          className: "rounded-[10px]",
        });
      }
    }
  };
  const handleChange = (event) => {
    const term = event.target.value.toLowerCase();
    if (term === "") {
      // Clear filteredComplaints when the search term is empty
      setFilteredComplaints([]);
    } else {
      const filteredData = complaints.filter((complaint) => {
        // Recursively check if any nested string property includes the search term
        const checkNestedProperties = (obj) => {
          return Object.values(obj).some((value) => {
            if (typeof value === "string") {
              return value.toLowerCase().includes(term);
            } else if (typeof value === "object" && value !== null) {
              return checkNestedProperties(value);
            }
            return false;
          });
        };
        return checkNestedProperties(complaint);
      });
      setFilteredComplaints(filteredData);
    }
  };
  const complaintStatusOptions = [
    { value: "resolved", label: "Resolved", color: "text-[#0FA958]" },
    { value: "pending", label: "Pending", color: "text-[#FF3D00]" },
  ];

  return (
    <>
      <div className="w-full h-[calc(100vh-126.59px)] 2xl:h-[calc(100vh-150px)] flex flex-col">
        <p className="text-3xl 2xl:text-4xl ps-7 font-bold text-black leading-[80%] mb-[82px]">
          Complaints
        </p>
        <div className="overflow-auto hide_scroll">
          <div className="flex items-center ps-7 mb-3 2xl:mb-10 gap-3 justify-between pr-8">
            <div className="flex items-center gap-8">
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
                options={complaintStatusOptions}
                onValueChange={updateComplaintsStatus}
                placeholder="Update Status"
                className="w-[230px] 2xl:w-[277px]"
              />
            </div>
            <CommonBtn
              clickEvent={() => {
                setSelectExport(complaints), setShowExport(!showExport);
              }}
              style="text-black bg-[#FDC63A] hover:bg-transparent hover:text-[#FDC63A]"
              btntext="Export"
            />
          </div>
          <ComplaintsTable />
        </div>
      </div>
    </>
  );
};

export default ComplaintsPage;
