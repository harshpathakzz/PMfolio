import React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import HomePage from "@/pages/HomePage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import CreateCaseStudy from "@/pages/CreateCaseStudy";
import ProfilePage from "@/pages/ProfilePage";
import SidebarElements from "@/components/component/SidebarElements";
import Searchbar from "./components/component/Searchbar";
import Header from "./components/component/Header";

const App = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex">
        <div className="hidden sm:block w-1/5 ">
          <SidebarElements />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/add-case-study" element={<CreateCaseStudy />} />
            <Route path="/:userId" element={<ProfilePage />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
