import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userType = searchParams.get("userType");

    const handleRedirection = () => {
      if (userType === "reader") {
        navigate("/reader");
      } else if (userType === "author") {
        navigate("/author");
      } else {
        navigate("/login");
      }
    };

    handleRedirection();
  }, [location.search, navigate]);

  return (
    <div>
      <h2>Verifying Email...</h2>
    </div>
  );
};

export default VerifyEmail;
