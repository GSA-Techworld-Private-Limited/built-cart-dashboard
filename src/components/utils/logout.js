import { baseUrl } from "./auth";
import axios from "axios";
import { useState } from "react"; // Assuming you're using React for state management

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
      console.log("Token expired");
      return true;
    } else {
      console.log("Token not expired", new Date(tokenExpiryTime));
      return false;
    }
  } else {
    console.log("Token not found");
    return false;
  }
};
