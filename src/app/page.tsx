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

  // useEffect(() => {
  //   const getQuestions = async () => {
  //     try {
  //       const response = await axios.get("api/chatbot");
  //       queryString = encodeURIComponent(
  //         JSON.stringify(
  //           JSON.parse(
  //             response.data.result.responseMessages[0].content[0].text
  //               .replace("```", "")
  //               .replace("json", "")
  //               .replace("```", "")
  //           )
  //         )
  //       );
  //       console.log(queryString);
  //       setIsLoading(false);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   getQuestions();
  // }, []);

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
    <div className="flex flex-col items-center">
      <h1 className="text-white text-[40px] font-bold title">
        Gift Ideas Generator
      </h1>
      <p className="text-[16px] text-textColor my-4 font-bold">
        tired of brainstorming gift ideas ?
      </p>
      <p className="text-[16px] font-bold text-textColor">Let us help you</p>
      <Button onClick={handleClick} className="flex w-fit p-4 m-6 rounded-lg">
        Get Started
        <ChevronRight />
      </Button>
      {isLoading ? <div className="loader"></div> : <div></div>}
    </div>
  );
};

export default Home;
