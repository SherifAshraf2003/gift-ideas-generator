"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Camera, Plus } from "lucide-react";
import { useUserDataStore } from "@/lib/store";

const profilePage = () => {
  const name = useUserDataStore((state) => state.username);
  const [giftLists, _setGiftLists] = useState([
    { id: 1, name: "Birthday Gifts", items: 5 },
    { id: 2, name: "Christmas Gifts", items: 8 },
    { id: 3, name: "Anniversary Gifts", items: 3 },
  ]);

  return (
    <div className="min-h-screen text-white">
      <main className="contaier mx-auto px-10 py-4 ">
        <Card className="bg-white/10 backdrop-blur-lg flex-col border-none text-white ">
          <CardContent className=" p-6 flex-col  items-center ">
            <div className=" flex flex-col gap-7  items-center mb-8 ">
              <Avatar className=" h-32 w-32 text-gray-400 ">
                <AvatarImage src="/" />
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
                        placeholder="Sherif Ashraf"
                      />
                    </div>

                    <Button className="mt-6" size="sm" variant="secondary">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Picture
                    </Button>
                  </div>
                  <Button className="mt-4">Save Changes</Button>
                </div>
              </TabsContent>

              <TabsContent value="giftLists">
                <div className="space-y-4 p-4 flex flex-col">
                  {giftLists.map((list) => (
                    <Card key={list.id}>
                      <CardContent className="flex items-center p-4  justify-between">
                        <div>
                          <h2 className="font-medium">{list.name}</h2>
                          <p className="text-gray-500 text-sm">
                            {list.items} items
                          </p>
                        </div>
                        <Button>view</Button>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="flex-1 w-full flex justify-center">
                    <Button className=" flex-1" size="lg">
                      Create New List
                      <Plus className="h-4 w-4 ml-2" />
                    </Button>
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
