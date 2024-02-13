import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/feed");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-background"
      style={{ marginTop: "-20vh" }}
    >
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary lg:text-7xl">
          PMfolio
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Connect with other product managers, share insights, and build your
          professional network.
        </p>
        <Button
          className="mt-8 w-1/2 bg-primary hover:bg-primary-foreground text-primary-foreground hover:text-primary rounded-lg py-3 px-6 shadow-md"
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
