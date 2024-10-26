"use client";
import { Gift } from "lucide-react";
import NavbarInteraction from "./Navbar-interaction";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  return (
    <header className=" bg-gradient-to-r from-gradientFrom to-gradientTo  p-5 flex items-center justify-between">
      <div
        onClick={() => router.push("/")}
        className="flex gap-1 items-center cursor-pointer"
      >
        <p className="text-xl text-white md:text-2xl ">Gifty</p>
        <Gift color="white" size={32} />
      </div>
      <NavbarInteraction />
    </header>
  );
};

export default Navbar;
