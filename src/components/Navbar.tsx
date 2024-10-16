import { Button } from "./ui/button";
import { Gift } from "lucide-react";

const Navbar = () => {
  return (
    <header className=" p-5 flex items-center justify-between">
      <div className="flex gap-1 items-center">
        <p className="text-xl text-white md:text-2xl ">Gifty</p>
        <Gift color="white" size={32} />
      </div>
      <nav className="flex gap-4">
        <Button variant="outline">Login</Button>
        <Button variant="outline">Sign up</Button>
      </nav>
    </header>
  );
};

export default Navbar;
