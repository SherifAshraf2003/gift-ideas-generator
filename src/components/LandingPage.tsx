"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [loader, setLoader] = useState(false);
  const [switcher, setSwitcher] = useState(false);
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
    if (!switcher && isLoading) {
      setSwitcher(true);
      setLoader(false);
      return;
    } else if (switcher) {
      toast("loading questions...", {
        description: "Please wait while we load questions for you",
        position: "bottom-center",
      });
    } else {
      router.push(`/quiz?data=${queryString}`);
    }
  };

  useEffect(() => {
    if (isLoading && switcher) {
      setLoader(true);
      toast("loading questions...", {
        description: "Please wait while we load questions for you",
        position: "bottom-center",
      });
    } else if (!isLoading) {
      queryString = encodeURIComponent(JSON.stringify(data));
      console.log(queryString);
      setLoader(false);
      setSwitcher(false);
    }
  }, [isLoading, switcher]);

  return (
    <div className=" text-center relative flex min-h-screen flex-col items-center justify-center px-4 py-16 container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=""
      >
        <div className="mb-4 flex items-center justify-center">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            Perfect Gifts Made Simple
          </span>
        </div>
        <h1 className="mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
          Gift Ideas Generator
        </h1>
        <p className="text-xl mb-8 text-center text-white/80 sm:text-2xl">
          tired of brainstorming gift ideas ?
          <br />
          Let us help you find the perfect present.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-10 text-center"
        >
          <Button
            size="lg"
            className="group h-12 bg-white px-6 text-lg text-primary hover:bg-white/90"
            onClick={handleClick}
          >
            {loader ? "loading..." : "Get Started"}
            {loader ? (
              ""
            ) : (
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </Button>
        </motion.div>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] animate-pulse rounded-full bg-white/5 blur-3xl" />
      </div>
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-40 w-40 rounded-full bg-teal-500/20 blur-2xl" />
    </div>
  );
};

export default LandingPage;
