import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";
import { Separator } from "@/components/ui/separator";

import { ModeToggle } from "../mode-toggle";

const Header = () => {
  return (
    <div>
      <div className="flex space-x-6">
        <Sidebar />
        <Searchbar />
        <ModeToggle />
      </div>
      <Separator className="m-4 w-full" />
    </div>
  );
};

export default Header;
