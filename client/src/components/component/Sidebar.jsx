import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SidebarElements from "@/components/component/SidebarElements";
import { AlignLeft } from "lucide-react";
const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <AlignLeft />
      </SheetTrigger>
      <SheetContent side="left" className="w-2/4">
        <SheetHeader>
          <SheetTitle>PMfolio</SheetTitle>
          <SheetDescription>
            <SidebarElements />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
