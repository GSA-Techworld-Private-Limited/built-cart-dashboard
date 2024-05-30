import { toast } from "react-toastify";
import { baseUrl } from "./auth";
import axios from "axios";

const logout = async (navigate, setAuthenticated) => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  const accessToken = sessionStorage.getItem("accessToken");
  console.log(refreshToken);
  if (refreshToken) {
    try {
      // Send the logout request
      const response = await axios.post(
        `${baseUrl}/superadmin/logout/`,
        {
          refresh_token: refreshToken,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response.status === 200) {
        console.log("Logout Successfully");
        // Example: clear refresh token from sessionStorage
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("activeTab");
        sessionStorage.removeItem("activeSubTab");
        setAuthenticated(false);
        navigate("/");
        toast.success(response.data.detail, {
          className: "rounded-[10px]",
        });

        return true;
      } else {
        // Handle logout failure
        console.error("Logout failed");
        return false;
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error logging out:", error);
      return false;
    }
  }
};

// Check if the token exists and is not expired
export const checkTokenExpiry = () => {
  const token = sessionStorage.getItem("accessToken");

  // Check if the token exists
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the token payload
    const tokenExpiryTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
    const currentTime = Date.now();

    // Check if the token has expired
    if (currentTime > tokenExpiryTime) {
       return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
export default logout;
