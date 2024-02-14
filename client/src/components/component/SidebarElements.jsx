import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/slices/authSlice";

const SidebarElements = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("feed");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    const itemPaths = {
      feed: "/feed",
      dashboard: "/dashboard",
      jobs: "/jobs",
      settings: "/settings",
      logout: "/",
    };

    if (item === "logout") {
      dispatch(logout());
    }

    navigate(itemPaths[item]);
  };

  return (
    <div className="p-4">
      <ul className="space-y-2">
        {["feed"].map((item) => (
          <li key={item}>
            <Button
              variant={selectedItem === item ? "secondary" : "ghost"}
              onClick={() => handleItemClick(item)}
              className="w-full"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Button>
          </li>
        ))}
      </ul>
      <ul className="space-y-2">
        {isLoggedIn && (
          <>
            <li>
              <Button
                variant={selectedItem === "dashboard" ? "secondary" : "ghost"}
                onClick={() => handleItemClick("dashboard")}
                className="w-full"
              >
                Dashboard
              </Button>
            </li>
            <li>
              <Button
                variant={selectedItem === "settings" ? "secondary" : "ghost"}
                onClick={() => handleItemClick("settings")}
                className="w-full"
              >
                Settings
              </Button>
            </li>
          </>
        )}
        {isLoggedIn && (
          <li>
            <Button
              variant={selectedItem === "logout" ? "secondary" : "ghost"}
              onClick={() => handleItemClick("logout")}
              className="w-full"
            >
              Logout
            </Button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SidebarElements;
