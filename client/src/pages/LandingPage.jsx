import React from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate("/feed");
  }

  return (
    <div>
      LandingPage
      <Button
        className="w-1/2"
        onClick={() => {
          navigate("/feed");
        }}
      >
        Get Started
      </Button>
    </div>
  );
};

export default LandingPage;
