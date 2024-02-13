import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  return (
    <div className="m-2 ">
      <div className="flex items-center justify-between p-1">
        <div className="sm:hidden font-bold text-xl">
          <Sidebar />
        </div>
        <div className="sm:block hidden font-bold text-2xl">PmFolio</div>

        {/* <Searchbar /> */}
        <div>
          {!isLoggedIn && (
            <Button className="mr-2" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
          <ModeToggle className />
        </div>
      </div>
      <Separator className="m-1 w-full" />
    </div>
  );
};

export default Header;
