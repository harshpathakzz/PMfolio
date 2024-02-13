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
    <div className="min-h-screen flex flex-col justify-center items-center bg-background">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">
          PMfolio
        </h1>
        <p className="text-xl text-muted-foreground">
          Connect with other product managers, share insights, and build your
          professional network.
        </p>
        <Button
          className="w-1/2 bg-primary hover:bg-primary-foreground text-primary-foreground hover:text-primary rounded-lg py-3 px-6 shadow-md"
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
