import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";
import { Separator } from "@/components/ui/separator";

import { ModeToggle } from "../mode-toggle";

const Header = () => {
  return (
    <div className="m-2 ">
      <div className="flex items-center justify-between p-1">
        <div className="sm:hidden font-bold text-xl">
          <Sidebar />
        </div>
        <div className="sm:block hidden font-bold text-2xl ">PmFolio</div>

        <Searchbar />
        <ModeToggle className />
      </div>
      <Separator className=" m-1 w-full" />
    </div>
  );
};

export default Header;
