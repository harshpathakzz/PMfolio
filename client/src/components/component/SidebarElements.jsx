import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const SidebarElements = () => {
  const [selectedItem, setSelectedItem] = useState("feed");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="p-4">
      <ul className="space-y-2">
        <li className={`${selectedItem === "feed" && "font-bold"}`}>
          <Button
            variant="secondary"
            onClick={() => handleItemClick("feed")}
            className="w-full"
          >
            Feed
          </Button>
        </li>
        <li className={`${selectedItem === "dashboard" && "font-bold"}`}>
          <Button
            variant="secondary"
            onClick={() => handleItemClick("dashboard")}
            className="w-full"
          >
            Dashboard
          </Button>
        </li>
        <li className={`${selectedItem === "jobs" && "font-bold"}`}>
          <Button
            variant="secondary"
            onClick={() => handleItemClick("jobs")}
            className="w-full"
          >
            Jobs
          </Button>
        </li>
      </ul>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Settings</h3>
        <ul className="space-y-2">
          <li className={`${selectedItem === "settings" && "font-bold"}`}>
            <Button
              variant="secondary"
              onClick={() => handleItemClick("settings")}
              className="w-full"
            >
              Settings
            </Button>
          </li>
          <li className={`${selectedItem === "logout" && "font-bold"}`}>
            <Button
              variant="secondary"
              onClick={() => handleItemClick("logout")}
              className="w-full"
            >
              Logout
            </Button>
          </li>
        </ul>
        <Button variant="secondary" className="w-full">
          Helloo
        </Button>
      </div>
    </div>
  );
};

export default SidebarElements;
