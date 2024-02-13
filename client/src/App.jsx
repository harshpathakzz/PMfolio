import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Analytics } from "@vercel/analytics/react";
import LandingPage from "@/pages/LandingPage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import CreateCaseStudy from "@/pages/CreateCaseStudy";
import ProfilePage from "@/pages/ProfilePage";
import DashBoard from "@/pages/DashBoard";
import SidebarElements from "@/components/component/SidebarElements";
import Header from "./components/component/Header";
import JobsPage from "@/pages/JobsPage";
import SettingsPage from "@/pages/SettingsPage";
import EditCaseStudy from "@/pages/EditCaseStudy";
import CaseStudyPage from "@/pages/CaseStudyPage";
import Feed from "@/pages/Feed";
import Protected from "./components/component/Protected";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  const isPublicRoute =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div>
      <Analytics />
      {!isPublicRoute && (
        <div>
          <Header />
        </div>
      )}
      <div className="flex">
        {!isPublicRoute && (
          <div className="hidden sm:block w-1/5">
            <SidebarElements />
          </div>
        )}
        <div className="w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/feed" element={<Feed />} />
            <Route
              path="/add-case-study"
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <CreateCaseStudy />
                </Protected>
              }
            />
            <Route path="/user/:userId" element={<ProfilePage />} />
            <Route
              path="/case-study/:caseStudyId"
              element={<CaseStudyPage />}
            />
            <Route
              path="/case-study/edit/:caseStudyId"
              element={<EditCaseStudy />}
            />
            <Route
              path="/dashboard"
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <DashBoard />
                </Protected>
              }
            />
            <Route path="/jobs" element={<JobsPage />} />
            <Route
              path="/settings"
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <SettingsPage />
                </Protected>
              }
            />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
