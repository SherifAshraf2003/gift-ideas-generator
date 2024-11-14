"use client";
import { useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Camera, Plus } from "lucide-react";
import { useUserDataStore, viewedGiftList } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GiftList } from "@/lib/types";
import imageCompression from "browser-image-compression";
import { createClient } from "../utils/supabase/client";
import { toast } from "sonner";

const profilePage = () => {
  const name = useUserDataStore((state) => state.username);
  const profilePic = useUserDataStore((state) => state.profilePic);
  const setProfilePic = useUserDataStore((state) => state.setProfilePic);
  const inputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");

  const giftLists = Object.values(useUserDataStore((state) => state.giftLists));
  const router = useRouter();
  const supabase = createClient();

  const handleNavigation = (items: GiftList) => {
    console.log(items);
    viewedGiftList.setState(items);
    console.log(viewedGiftList.getState().items);
    router.push(`/giftList`);
  };

  const [isPending] = useTransition();

  const convertBlobUrlToFile = async (url: string): Promise<File> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const userId = useUserDataStore.getState().userId;

      const file = new File([blob], userId, { type: blob.type });

      URL.revokeObjectURL(url);
      console.log(file);
      return file;
    } catch (error) {
      console.error("Error converting blob URL to file:", error);
      throw error;
    }
  };

  const handleDataChange = async (file: File) => {
    const fileName = file.name;
    const path = fileName;
    try {
      file = await imageCompression(file, { maxSizeMB: 1 });
    } catch (error) {
      console.error("Error compressing image:", error);
      return { url: "", error: "Image compression failed" };
    }

    const { data, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return { url: "", error: "Image upload failed" };
    }

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${data?.path}`;
    return { url, error: "" };
  };

  const handleUpload = async () => {
    if (inputRef.current?.files?.[0]) {
      const file = inputRef.current.files[0];
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

      if (!validImageTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload a valid image file.", {
          position: "bottom-center",
        });
        return;
      }

      try {
        const imageUrl = URL.createObjectURL(file);
        const imageFile = await convertBlobUrlToFile(imageUrl);
        URL.revokeObjectURL(imageUrl);

        const { url, error } = await handleDataChange(imageFile);

        if (error) {
          console.error(error);
          toast.error("Failed to upload image", {
            position: "bottom-center",
          });
        } else {
          setProfilePic(url);

          await useUserDataStore.getState().getProfilePic();

          toast.success("Profile picture updated successfully");
        }
      } catch (error) {
        console.error("Error updating profile picture:", error);
        toast.error("Failed to update profile picture", {
          position: "bottom-center",
        });
      }
    }

    if (username) {
      try {
        const { error } = await supabase
          .from("profiles")
          .update({ username: username })
          .eq("id", useUserDataStore.getState().userId);

        useUserDataStore.setState({ username: username });
        toast.success("Username updated successfully", {
          position: "bottom-center",
        });
      } catch (error) {
        console.error("Error updating username:", error);
        toast.error("Failed to update username", {
          position: "bottom-center",
        });
      }
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpload();
  };

  return (
    <div className="min-h-screen text-white">
      <main className="contaier max-w-7xl mx-auto  px-10 py-4 ">
        <Card className="bg-white/10 backdrop-blur-lg flex-col border-none text-white ">
          <CardContent className=" p-6 flex-col  items-center ">
            <div className=" flex flex-col gap-7  items-center mb-8 ">
              <Avatar className=" h-32 w-32 text-gray-400 ">
                <AvatarImage src={profilePic} height={64} width={64} />
                <AvatarFallback>
                  <User className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
              <h1 className="text-center text-2xl font-bold ">{name}</h1>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="flex w-full">
                <TabsTrigger value="profile" className="flex-1">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="giftLists" className="flex-1">
                  GiftLists
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <div className="flex flex-col items-center mt-5">
                  <div className="flex flex-1 gap-6 items-center ">
                    <div>
                      <label
                        htmlFor="name"
                        className="font-medium mb-1 text-sm"
                      >
                        Name
                      </label>
                      <Input
                        className="text-white bg-white/20 border-none placeholder-black "
                        id="name"
                        placeholder={name}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        value={username}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="picture"
                        className="font-medium mb-1 text-sm flex gap-1 items-center"
                      >
                        <Camera className="h-6 w-6" />
                        profile picture
                      </label>
                      <Input
                        className="text-black"
                        id="picture"
                        type="file"
                        ref={inputRef}
                      />
                    </div>
                  </div>
                  <Button
                    className="mt-4 "
                    disabled={isPending}
                    onClick={onSubmit}
                  >
                    {isPending ? "Saving changes..." : "Save changes"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="giftLists">
                <div className="space-y-4 p-4 flex flex-col">
                  {giftLists.map((list) => (
                    <Card key={list.id}>
                      <CardContent className="flex items-center p-4  justify-between">
                        <div>
                          <h2 className="font-medium">{list.id}</h2>
                          <p className="text-gray-500 text-sm">
                            {list.items.length} items
                          </p>
                        </div>
                        <Button
                          className="mx-1"
                          onClick={() => handleNavigation(list)}
                        >
                          view
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="flex-1 w-full flex justify-center">
                    <Link href="/">
                      <Button className=" flex-1" size="lg">
                        Create New List
                        <Plus className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default profilePage;
