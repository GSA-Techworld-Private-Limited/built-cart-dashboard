import React, { useContext, useState } from "react";
import MyContext from "../context/MyContext";
import { CloseIcon } from "./Icons";
import { FiPlusCircle } from "react-icons/fi";
import { updateCategory } from "../utils/auth";

const EditOverlay = () => {
  const {
    setActiveSubTab,
    setCategoryData,
    setEditOverlay,
    editOverlay,
    categorySelect,
  } = useContext(MyContext);
  const [editCategoryData, setEditCategoryData] = useState({
    name: "",
    image: null,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditCategoryData({ ...editCategoryData, [name]: value });
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setEditCategoryData({ ...editCategoryData, image: uploadedFile });
  };
  return (
    <>
      <div
        className={`fixed z-50 duration-300 backdrop-blur-lg inset-0 flex justify-center items-center ${
          editOverlay
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={() => setEditOverlay(!editOverlay)}
          className="fixed inset-0"
        ></div>
        <div className="px-16 pt-3 pb-[75px] rounded-[30px] bg-white relative">
          <button
            onClick={() => setEditOverlay(!editOverlay)}
            className="absolute top-7 right-7"
          >
            <CloseIcon style="w-11" />
          </button>
          <p className="text-[42px] text-center font-semibold text-dark mb-16">
            Edit Category
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault(),
                updateCategory(
                  categorySelect,
                  editCategoryData,
                  setCategoryData,
                  setEditCategoryData,
                  setActiveSubTab
                );
            }}
          >
            <input
              required
              type="text"
              name="name"
              placeholder="Category Name"
              value={editCategoryData.name}
              onChange={handleInputChange}
              className="text-2xl text-black outline-none w-[436px] placeholder:text-black leading-5 p-[19px] rounded-[10px] border-[#686868] border border-spacing-[0.5px]"
            />
            <div className="mb-[77px]">
              <label
                htmlFor="upload-input"
                className="cursor-pointer relative inline-block mt-9"
              >
                {editCategoryData.image && (
                  <img
                    className="absolute inset-0 h-full w-full rounded-[10px] object-cover"
                    src={URL.createObjectURL(editCategoryData.image)}
                    alt="category image"
                  />
                )}
                <div className="inline-flex relative flex-col items-center gap-4 px-[22px] bg-transparent rounded-[10px] shadow-sm pb-2 pt-[18px]">
                  <FiPlusCircle className="text-[40px] cursor-pointer text-black" />
                  <p className="text-2xl text-black font-normal">Add Pic</p>
                </div>
                <input
                  required
                  id="upload-input"
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
                className="text-2xl 2xl:text-3xxl relative text-white bg-[#0FA958] w-[266px] px-[67px] leading-[110%] border border-transparent hover:border-current duration-200 hover:bg-transparent hover:text-[#0FA958] font-medium py-3.5 rounded-[10px]"
              >
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditOverlay;
