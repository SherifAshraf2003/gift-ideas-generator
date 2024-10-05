"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuizStore } from "@/lib/store";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  let queryString = "";
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get("api/questions");
        queryString = encodeURIComponent(
          JSON.stringify(
            JSON.parse(
              response.data.result.responseMessages[0].content[0].text
                .replace("```", "")
                .replace("json", "")
                .replace("```", "")
            )
          )
        );
        console.log(
          JSON.parse(
            response.data.result.responseMessages[0].content[0].text
              .replace("```", "")
              .replace("json", "")
              .replace("```", "")
          )
        );
      } catch (e) {
        console.error(e);
      }
    };
    getQuestions();
  }, []);

  const handleClick = () => {
    router.push(`/quiz?data=${queryString}`);
  };

  return (
    <section className="flex items-center justify-center flex-col h-[100vh] bg-gradient-to-r from-gradientFrom to-gradientTo">
      <h1 className="text-white text-[40px] font-bold title">
        Gift Ideas Generator
      </h1>
      <p className="text-[16px] text-textColor my-4 font-bold">
        tired of brainstorming gift ideas ?
      </p>
      <p className="text-[16px] font-bold text-textColor">Let us help you</p>
      <Button onClick={handleClick} className="flex  p-4 m-6 rounded-lg">
        Get Started
        <ChevronRight />
      </Button>
    </section>
  );
};

export default Home;
