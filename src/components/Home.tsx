"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";

const Home = () => {
  const router = useRouter();
  let queryString = "";
  const fetcher = (url: string) =>
    axios
      .get(url)
      .then((res) =>
        JSON.parse(
          res.data.result.responseMessages[0].content[0].text
            .replace("```", "")
            .replace("json", "")
            .replace("```", "")
        )
      );
  const { data, isLoading } = useSWR("api/chatbot", fetcher);

  const handleClick = () => {
    if (isLoading) {
      toast("loading questions...", {
        description: "Please wait while we load questions for you",
      });
      return;
    } else {
      queryString = encodeURIComponent(JSON.stringify(data));
      console.log(queryString);
      router.push(`/quiz?data=${queryString}`);
    }
  };

  return (
    <>
      <div className="space-y-4 text-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold title">
          Gift Ideas Generator
        </h1>
        <p className=" text-lg md:text-2xl text-slate-300  font-bold">
          tired of brainstorming gift ideas ?
        </p>
        <p className="text-lg md:text-2xl font-bold text-slate-300">
          Let us help you
        </p>
      </div>
      <Button
        onClick={handleClick}
        variant="outline"
        className="flex w-fit p-4 m-6 rounded-lg"
      >
        Get Started
        <ChevronRight />
      </Button>
      {isLoading ? <div className="loader"></div> : <div></div>}
    </>
  );
};

export default Home;
