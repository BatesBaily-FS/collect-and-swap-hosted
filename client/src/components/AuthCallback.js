import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const AuthCallback = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/profile");
    }
  }, [isLoading, isAuthenticated, navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;
