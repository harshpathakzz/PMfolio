import { Input } from "@/components/ui/input";
const Searchbar = () => {
  return (
    <div className="transition-all duration-300 ease-in-out">
      <Input
        type="search"
        placeholder="Search..."
        className="border rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out md:w-[200px] lg:w-[300px] xl:w-[500px] sm:w-[100px]"
      />
    </div>
  );
};

export default Searchbar;
