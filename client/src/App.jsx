import React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import HomePage from "@/pages/HomePage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import CreateCaseStudy from "@/pages/CreateCaseStudy";
import ProfilePage from "@/pages/ProfilePage";

const App = () => {
  return (
    <div>
      App
      <Button variant="secondary">Submit</Button>
      <ModeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-case-study" element={<CreateCaseStudy />} />
        <Route path="/:userId" element={<ProfilePage />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
};

export default App;
