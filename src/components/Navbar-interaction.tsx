"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import Image from "next/image";
import user from "../public/user.png";
import { logOutAction } from "@/app/actions";
import { toast } from "sonner";
const NavbarInteraction = () => {
  const router = useRouter();
  const avatar = "profilePicUrl";

  const logOut: any = async () => {
    const error = await logOutAction();
    if (error === null) {
      console.log("err:", error);
    } else {
      if (window.location.pathname !== "/") router.push("/");
      else {
        toast("Logged out", {
          description: "You have been logged out successfully",
        });
      }
    }
  };

  return (
    <nav className="flex gap-4">
      <Button
        variant="outline"
        onClick={() => {
          router.push("/login");
        }}
      >
        Login
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          router.push("/signup");
        }}
      >
        Sign up
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={avatar} alt="profile pic" />
            <AvatarFallback>
              <Image
                src={user}
                alt="profile pic"
                className="cursor-pointer hover:bg-blue-300"
              />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-30 mt-1">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuItem onClick={logOut}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default NavbarInteraction;
