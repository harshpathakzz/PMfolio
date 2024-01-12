import { useState } from "react";
import { Button } from "@/components/ui/button";

const SidebarElements = () => {
  const [selectedItem, setSelectedItem] = useState("feed");

  const handleItemClick = (item) => {
    setSelectedItem((prevItem) => (prevItem === item ? null : item));
  };

  return (
    <div className="p-4">
      <ul className="space-y-2">
        <li>
          <Button
            variant={selectedItem === "feed" ? "secondary" : "ghost"}
            onClick={() => handleItemClick("feed")}
            className="w-full"
          >
            Feed
          </Button>
        </li>
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
            variant={selectedItem === "jobs" ? "secondary" : "ghost"}
            onClick={() => handleItemClick("jobs")}
            className="w-full"
          >
            Jobs
          </Button>
        </li>
      </ul>

      <ul className="space-y-2">
        <li>
          <Button
            variant={selectedItem === "settings" ? "secondary" : "ghost"}
            onClick={() => handleItemClick("settings")}
            className="w-full"
          >
            Settings
          </Button>
        </li>
        <li>
          <Button
            variant={selectedItem === "logout" ? "secondary" : "ghost"}
            onClick={() => handleItemClick("logout")}
            className="w-full"
          >
            Logout
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarElements;
