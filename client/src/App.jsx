import LandingPage from "@/pages/LandingPage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import { Routes, Route } from "react-router-dom";
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
        <div className=" w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/add-case-study" element={<CreateCaseStudy />} />
            <Route path="/user/:userId" element={<ProfilePage />} />
            <Route
              path="/case-study/:caseStudyId"
              element={<CaseStudyPage />}
            />
            <Route
              path="/case-study/edit/:caseStudyId"
              element={<EditCaseStudy />}
            />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
