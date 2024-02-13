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
    <div className=" min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our App!</h1>
        <p className="text-lg mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Button
          className="w-1/2"
          onClick={() => {
            navigate("/feed");
          }}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
