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
import { useUserDataStore } from "@/lib/store";
const NavbarInteraction = () => {
  const router = useRouter();
  const profilePic = useUserDataStore((state) => state.profilePic);

  const deleteUserData = () => {
    useUserDataStore.setState({
      username: "",
      giftLists: {},
      profilePic: "",
      isLoading: false,
      userId: "",
      error: null,
      session: "",
    });
  };

  const logOut = async () => {
    try {
      const error = await logOutAction();
      if (error.error !== null) {
        throw error;
      }

      if (window.location.pathname === "/") {
        useUserDataStore.setState({ session: "" });
        router.refresh();
        toast("Logged out", {
          description: "You have been logged out successfully",
          position: "bottom-center",
        });
        deleteUserData();
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast("Error", {
        description: "Failed to log out. Please try again.",
        position: "bottom-center",
      });
    }
  };

  return (
    <nav className="flex gap-4">
      {useUserDataStore.getState().userId === "" && (
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="hover:bg-white text-white border"
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="hover:bg-transparent hover:text-white  border-1"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Sign up
          </Button>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage
              src={profilePic}
              alt="profile pic"
              className="cursor-pointer"
            />
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
