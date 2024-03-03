import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("id");

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify?id=${userId}`);
        if (response.ok) {
          console.log("Email verified successfully!");
          window.location.href = "/";
        } else {
          console.error("Failed to verify email");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
      }
    };

    verifyEmail();
  }, [location.search]);

  return (
    <div>
      <h2>Verifying Email...</h2>
    </div>
  );
};

export default VerifyEmail;
