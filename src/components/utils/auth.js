import axios from "axios";
import { toast } from "react-toastify";
export const baseUrl = "https://v3h2dw9k-8000.inc1.devtunnels.ms/";

export const fetchUserData = async (
  setUserData,
  setOrderData,
  setStatusData,
  setCategoryData
) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const options = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const userDataList = await axios.get(
      `${baseUrl}/superadmin/add-user-dashboard/`,
      {
        headers: options,
      }
    );
    const orderDataList = await axios.get(
      `${baseUrl}/superadmin/orders-list-dashboard/`,
      {
        headers: options,
      }
    );
    const categoryDataList = await axios.get(
      `${baseUrl}/superadmin/add-category-dashboard/`,
      {
        headers: options,
      }
    );
    // console.log(categoryDataList.data.response);
    fetchStatusData(setStatusData);
    setUserData(userDataList.data);
    setOrderData(orderDataList.data.response);
    setCategoryData(categoryDataList.data.response);
  } catch (error) {
    console.error("Fetch user data error:", error);
    // Show error message
    toast.error("Error fetching user data. Try again", {
      className: "rounded-[10px]",
    });
  }
};

export const fetchStatusData = async (setStatusData, value) => {
  const accessToken = sessionStorage.getItem("accessToken");
  try {
    const requestData = {
      choose_by: value ? value : "this month",
    };
    // Send POST request with Axios
    const response = await axios.post(
      `${baseUrl}/superadmin/dashbaord-view-status/`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    setStatusData(response.data.response);
    // console.log("Response:", response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const removeCategory = async (id, setActiveSubTab, setCategoryData) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const requestData = { id: id.toString() };
  console.log(requestData);
  try {
    // Send POST request with Axios
    const response = await axios.post(
      `${baseUrl}/superadmin/delete-category-dashboard/`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    setActiveSubTab(null);
    const categoryDataList = await axios.get(
      `${baseUrl}/superadmin/add-category-dashboard/`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    setCategoryData(categoryDataList.data.response);
    toast.success("Category Deleted Successfully!!", {
      className: "rounded-[10px]",
    });
  } catch (error) {
    toast.error("Request Failed!! Try Again", {
      className: "rounded-[10px]",
    });
  }
};

export const addCategory = async (
  newCategory,
  setCategoryData,
  setNewCategory
) => {
  const accessToken = sessionStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      `${baseUrl}/superadmin/add-category-dashboard/`,
      newCategory,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const categoryDataList = await axios.get(
      `${baseUrl}/superadmin/add-category-dashboard/`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    setCategoryData(categoryDataList.data.response);
    console.log(categoryDataList.data.response);
    setNewCategory({ name: "", image: null });
    toast.success("Category Added Successfully!!", {
      className: "rounded-[10px]",
    });
  } catch (error) {
    toast.error("Category Is Not Added!! Try Again", {
      className: "rounded-[10px]",
    });
  }
};

export const updateCategory = async (
  id,
  editCategoryData,
  setCategoryData,
  setEditCategoryData
) => {
  const accessToken = sessionStorage.getItem("accessToken");
  console.log(editCategoryData);
  try {
    // Send PATCH request with Axios
    const response = await axios.patch(
      `${baseUrl}/superadmin/get-categories-dashboard/${id}/`,
      editCategoryData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const categoryDataList = await axios.get(
      `${baseUrl}/superadmin/add-category-dashboard/`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    setCategoryData(categoryDataList.data.response);
    setEditCategoryData({ name: "", image: null });
    toast.success("Category Updated Successfully!!", {
      className: "rounded-[10px]",
    });
  } catch (error) {
    toast.error("Request Failed!! Try Again", {
      className: "rounded-[10px]",
    });
  }
};

export const addOffer = async (couponData) => {
  const accessToken = sessionStorage.getItem("accessToken");
  console.log(couponData);
  try {
    const response = await axios.post(
      `${baseUrl}/superadmin/add-coupons-dashboard/`,
      couponData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    toast.success("Coupon Added Successfully!!", {
      className: "rounded-[10px]",
    });
  } catch (error) {
    toast.error(`Request Failed!! ${error.request.response}`, {
      className: "rounded-[10px]",
    });
    console.log(error.request.response);
  }
};
