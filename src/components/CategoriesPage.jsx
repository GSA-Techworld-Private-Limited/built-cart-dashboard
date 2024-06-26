import React, { useContext, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import CommonBtn from "./common/CommonBtn";
import CategoriesTable from "./CategoriesTable";
import MyContext from "./context/MyContext";
import { CloseIcon } from "./common/Icons";
import { FiPlusCircle } from "react-icons/fi";
import { addCategory, baseUrl, removeCategory } from "./utils/auth";
import axios from "axios";
import { toast } from "react-toastify";
const CategoriesPage = () => {
  const {
    setActiveSubTab,
    setCategoryData,
    categoryData,
    setEditOverlay,
    editOverlay,
    setShowExport,
    showExport,
    setSelectExport,
    categorySelect,
  } = useContext(MyContext);

  const [addOverlay, setAddOverlay] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: null,
  });
  const showCategoryPopUp = () => {
    setAddOverlay(!addOverlay);
  };
  const showEditOverlay = () => {
    if (categorySelect) {
      setEditOverlay(!editOverlay);
    } else {
      toast.warning("First Select Any Item!!", {
        className: "rounded-[10px]",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setNewCategory({ ...newCategory, image: uploadedFile });
  };

  const filterCategoryWithName = async (e) => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const categoryDataList = await axios.get(
        `${baseUrl}/superadmin/add-category-dashboard/?name_contains=${e.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCategoryData(categoryDataList.data.response);
    } catch (error) {
      console.error("Fetch user data error:", error);
    }
  };
  return (
    <>
      <div className="w-full h-[calc(100vh-126.59px)] 2xl:h-[calc(100vh-150px)] flex flex-col">
        <div className="flex gap-6 mb-[31px]">
          <p className="text-3xl 2xl:text-4xl ps-7 font-bold text-black leading-[80%]">
            Categories
          </p>
          <button
            onClick={showCategoryPopUp}
            className="py-3 2xl:py-5 w-[180px] 2xl:w-[224px] text-center duration-200 border border-transparent hover:border-current hover:bg-transparent hover:text-current leading-5 ml-9 2xl:text-2xl text-lg 2xl:font-medium px-6 rounded-[10px] bg-[#0FA958] text-white"
          >
            Add Category
          </button>
          <button
            onClick={() => setActiveSubTab("add-products")}
            className="py-3 2xl:py-5 w-[180px] 2xl:w-[224px] text-center duration-200 border border-transparent hover:border-current hover:bg-transparent hover:text-current leading-5 2xl:text-2xl text-lg 2xl:font-medium px-6 rounded-[10px] bg-[#0028B7] text-white"
          >
            Add Product
          </button>
        </div>
        <div className="overflow-auto hide_scroll">
          <div className="flex items-center ps-7 mb-3 2xl:mb-10 gap-3 justify-between pr-8">
            <div className="flex items-center gap-[10px] me-4 max-h-[54px] 2xl:max-h-[62px] border w-[300px] 2xl:w-[432px] border-black rounded-[10px] px-[13px]">
              <IoSearchSharp className="text-dark text-xl" />
              <input
                onChange={filterCategoryWithName}
                type="text"
                placeholder="Search Name, Location..."
                className="2xl:text-2xl text-lg text-[#6E6E73] leading-5 w-full placeholder:text-[#6E6E73] font-medium outline-none border-0 bg-transparent py-3 2xl:py-5"
              />
            </div>
            <div className="flex items-center gap-6 2xl:gap-[30px]">
              <CommonBtn
                clickEvent={showEditOverlay}
                style="text-white bg-[#606060] hover:bg-transparent hover:text-[#606060]"
                btntext="Edit"
              />
              <CommonBtn
                clickEvent={() => {
                  removeCategory(
                    categorySelect,
                    setActiveSubTab,
                    setCategoryData
                  );
                }}
                style="text-white bg-[#FF3D00] hover:bg-transparent hover:text-[#FF3D00]"
                btntext="Delete"
              />
              <CommonBtn
                clickEvent={() => {
                  setSelectExport(categoryData), setShowExport(!showExport);
                }}
                style="text-black bg-[#FDC63A] hover:bg-transparent hover:text-[#FDC63A]"
                btntext="Export"
              />
            </div>
          </div>
          <CategoriesTable />
        </div>

        {/* add category */}
        <div
          className={`fixed z-50 duration-300 backdrop-blur-sm bg-opacity-10 inset-0 bg-[#FDC63A] flex justify-center items-center ${
            addOverlay
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            onClick={() => setAddOverlay(!addOverlay)}
            className="fixed inset-0"
          ></div>
          <div className="px-10 2xl:px-16 pt-3 pb-12 2xl:pb-[75px] rounded-[30px] bg-white relative">
            <button
              onClick={() => setAddOverlay(!addOverlay)}
              className="absolute top-7 right-7"
            >
              <CloseIcon style="w-8 2xl:w-11" />
            </button>
            <p className="text-3xl 2xl:text-[42px] text-center font-semibold text-dark mb-16">
              Add Category
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault(),
                  addCategory(newCategory, setCategoryData, setNewCategory);
              }}
            >
              <input
                required
                type="text"
                name="name"
                placeholder="Category Name"
                value={newCategory.name}
                onChange={handleInputChange}
                className="text-lg 2xl:text-2xl text-black outline-none w-[436px] placeholder:text-black leading-5 p-3 2xl:p-[19px] rounded-[10px] border-[#686868] border border-spacing-[0.5px]"
              />
              <div className="mb-10 2xl:mb-[77px]">
                <label
                  htmlFor="add-image"
                  className="cursor-pointer relative inline-block mt-9"
                >
                  {newCategory.image ? (
                    <img
                      className="inset-0 h-[118px] w-[133px] rounded-[10px] object-cover"
                      src={URL.createObjectURL(newCategory.image)}
                      alt="category image"
                    />
                  ) : (
                    <div className="inline-flex relative flex-col items-center gap-4 px-[22px] bg-transparent rounded-[10px] shadow-sm pb-2 pt-[18px]">
                      <FiPlusCircle className="text-3xl 2xl:text-[40px] cursor-pointer text-black" />
                      <p className="text-lg 2xl:text-2xl text-black font-normal">
                        Add Pic
                      </p>
                    </div>
                  )}
                  <input
                    required
                    id="add-image"
                    type="file"
                    accept="image/*"
                    className="opacity-0 pointer-events-none absolute inset-0"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="text-2xl 2xl:text-3xxl relative text-white bg-[#0FA958] w-[190px] 2xl:w-[266px] px-[67px] leading-[110%] border border-transparent hover:border-current duration-200 hover:bg-transparent hover:text-[#0FA958] font-medium py-3.5 rounded-[10px]"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
