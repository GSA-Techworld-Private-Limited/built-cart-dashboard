import axios from "axios";
import { toast } from "react-toastify";
export const baseUrl = "http://64.227.161.199:8007/";
export const fetchUserData = async (
  setUserData,
  setOrderData,
  setStatusData,
  setCategoryData,
  setComplaints,
  setOrderLogs,
  setProductDetails
) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const options = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const categoryDataList = await axios.get(
      `${baseUrl}/superadmin/add-category-dashboard/`,
      {
        headers: options,
      }
    );
    fetchDataOfUser(setUserData);
    fetchOrderData(setOrderData);
    fetchStatusData(setStatusData);
    getComplaints(setComplaints);
    getOrderLogs(setOrderLogs);
    getProductDetails(setProductDetails);
    setCategoryData(categoryDataList.data.response);
  } catch (error) {
    console.error("Fetch user data error:", error);
    // Show error message
    toast.error("Error fetching user data. Try again", {
      className: "rounded-[10px]",
    });
  }
};
export const fetchDataOfUser = async (setUserData) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const options = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const res = await axios.get(`${baseUrl}/superadmin/add-user-dashboard/`, {
      headers: options,
    });
    setUserData(res.data);
  } catch (error) {
    console.error("Fetch user data error:", error);
    // Show error message
    toast.error("Error fetching user data. Try again", {
      className: "rounded-[10px]",
    });
  }
};
export const fetchOrderData = async (setOrderData) => {
  const accessToken = sessionStorage.getItem("accessToken");
  try {
    const orderDataList = await axios.get(
      `${baseUrl}/superadmin/orders-list-dashboard/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setOrderData(orderDataList.data.response);
  } catch (error) {
    toast.error("Error fetching order data. Try again", {
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
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const removeCategory = async (id, setActiveSubTab, setCategoryData) => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (id) {
    const requestData = { id: id.toString() };
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
      toast.success(response.data.message, {
        className: "rounded-[10px]",
      });
    } catch (error) {
      toast.error("Request Failed!! Try Again", {
        className: "rounded-[10px]",
      });
    }
  } else {
    toast.warning("Select Any Item First!!", {
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
export const addOffer = async (
  couponData,
  setIsOfferSent,
  setcouponData,
  selectedOption
) => {
  const accessToken = sessionStorage.getItem("accessToken");
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

    setIsOfferSent(true);
    setTimeout(() => {
      setIsOfferSent(false);
    }, 2000);
    setcouponData({
      coupon_code: "",
      order_value_amount: "",
      validity_start: "",
      validity_end: "",
      term_conditions: "",
      account_created_from: "",
      account_created_to: "",
      number_of_referral_from: "",
      number_of_referral_to: "",
      state_name: selectedOption,
      total_beneficiaries: "",
    });
    toast.success("Coupon Added Successfully!!", {
      className: "rounded-[10px]",
    });
  } catch (error) {
    toast.error(`Request Failed!! ${error.request}`, {
      className: "rounded-[10px]",
    });

    console.log(error);
  }
};
export const showOrderDetails = async (
  id,
  setActiveSubTab,
  setUserOrderDetails
) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const options = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const res = await axios.get(
      `${baseUrl}/superadmin/get-orders-dashboard/${id}/`,
      {
        headers: options,
      }
    );
    if (res.data.orders >= 0) {
      toast.warning("No Order Placed Yet!!", {
        className: "rounded-[10px]",
      });
    } else {
      setUserOrderDetails(res.data);
      setActiveSubTab("order-details");
    }
  } catch (error) {
    console.error("Fetch user data error:", error);
    // Show error message
    toast.error("Error fetching user data. Try again", {
      className: "rounded-[10px]",
    });
  }
};
export const getCoupon = async (setCouponData) => {
  const accessToken = sessionStorage.getItem("accessToken");
  try {
    const res = await axios.get(
      `${baseUrl}/superadmin/add-coupons-dashboard/`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    setCouponData(res.data);
  } catch (error) {
    toast.error("Error fetching coupon data. Try again", {
      className: "rounded-[10px]",
    });
  }
};
export const getComplaints = async (setComplaints) => {
  const accessToken = sessionStorage.getItem("accessToken");
  try {
    const res = await axios.get(`${baseUrl}/superadmin/user-complaints`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setComplaints(res.data.response);
  } catch (error) {
    console.error("Fetch coupon data error:", error);
    // Show error message
    toast.error("Error fetching coupon data. Try again", {
      className: "rounded-[10px]",
    });
  }
};
export const getOrderLogs = async (setOrderLogs) => {
  const accessToken = sessionStorage.getItem("accessToken");
  try {
    const res = await axios.get(`${baseUrl}/superadmin/user-logs`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setOrderLogs(res.data.response);
  } catch (error) {
    console.error("Fetch coupon data error:", error);
    // Show error message
    toast.error("Error fetching coupon data. Try again", {
      className: "rounded-[10px]",
    });
  }
};
export const getProductDetails = async (setProductDetails) => {
  const accessToken = sessionStorage.getItem("accessToken");
  try {
    const res = await axios.get(
      `${baseUrl}/superadmin/add-products-dashboard/`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    setProductDetails(res.data.data);
  } catch (error) {
    console.error("Fetch coupon data error:", error);
    // Show error message
    toast.error("Error fetching coupon data. Try again", {
      className: "rounded-[10px]",
    });
  }
};
export const deleteProduct = async (
  id,
  setProductDetails,
  productDetails,
  setProductDetailsData,
  selectedCate,
  setCategoryData,
  setMessage
) => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (id) {
    try {
      const res = await axios.delete(
        `${baseUrl}/superadmin/get-products-dashboard/${id}/`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      // setMessage(true);
      // Immediately update productDetails to reflect changes
      const updatedProductDetails = productDetails.filter(
        (product) => product.product_id !== id
      );
      setProductDetails(updatedProductDetails);
      // Update productDetailsData for the current category
      const filteredProductDetails = updatedProductDetails.filter((val) =>
        val.category_names.includes(selectedCate)
      );
      setProductDetailsData(filteredProductDetails);
      const categoryDataList = await axios.get(
        `${baseUrl}/superadmin/add-category-dashboard/`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setCategoryData(categoryDataList.data.response);
      toast.success("Product Deleted Successfully!", {
        className: "rounded-[10px]",
      });
    } catch (error) {
      console.error("error:", error);
      // Show error message
      toast.error("Error Try again", {
        className: "rounded-[10px]",
      });
    }
  } else {
    toast.warning("First Select Any Item", {
      className: "rounded-[10px]",
    });
  }
};
