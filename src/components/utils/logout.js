import { baseUrl } from "./auth";
import axios from "axios";
const logout = async (navigate, setAuthenticated) => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  console.log(refreshToken);
  if (refreshToken) {
    try {
      // Send the logout request
      const response = await axios.post(`${baseUrl}/superadmin/logout/`, {
        refresh_token: refreshToken,
      });

      if (response.status === 200) {
        console.log("Logout Successfully");
        // Example: clear refresh token from sessionStorage
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        setAuthenticated(false);
        navigate("/");
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
export default logout;
