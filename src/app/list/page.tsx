"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, StarHalf } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface data {
  title: string;
  price: string;
  image: string | any;
  rating: string;
  numOfRatings: number | any;
  OverallPick: boolean;
}

const list = () => {
  const [data, setData] = useState<Array<data>>([]);
  const searchParams = useSearchParams();
  const searchData = searchParams.get("data");
  const [list, setList] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const storedList = localStorage.getItem(searchData);
      return storedList ? JSON.parse(storedList) : [];
    }
    return [];
  });
  const [isloading, setIsLoading] = useState(true);
  const [ctr, setCtr] = useState(0);
  const [items, setItems] = useState(
    searchData
      ? JSON.parse(
          decodeURIComponent(searchData)
            .replace(`{"gift_ideas":`, "")
            .slice(0, -1)
        )
      : []
  );

  const fetchInProgress = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (list.length > 0) {
        setIsLoading(false);
        return;
      }

      if (fetchInProgress.current) return;

      fetchInProgress.current = true;

      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
      const newList = [];

      try {
        if (items.length === 0) {
          throw new Error("No items to search for");
          return;
        }
        for (let i = 0; i < items.length; i++) {
          setCtr((prev) => prev + 1);
          const time = Math.random() * 3000 + 1000;
          console.log(items[i].name);
          const response = await fetch(
            `/api/scrape?searchTerm=${items[i].name}`
          );
          const data = await response.json();
          newList.push(data);
          await delay(time);
        }

        setList(newList);
        localStorage.setItem(searchData, JSON.stringify(newList));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        fetchInProgress.current = false;
      }
    };

    fetchData();
  }, []);

  function StarRating({ rating }: { rating: any }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return (
              <Star
                key={index}
                className="w-4 h-4 text-yellow-400 fill-yellow-400"
              />
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <StarHalf
                key={index}
                className="w-4 h-4 text-yellow-400 fill-yellow-400"
              />
            );
          } else {
            return <Star key={index} className="w-4 h-4 text-gray-300" />;
          }
        })}
        <span className=" text-sm text-gray-600">{rating}</span>
      </div>
    );
  }

  return (
    <>
      {isloading ? (
        <div className="flex flex-col items-center gap-10 ">
          <Progress
            className=" w-[400px] "
            value={(ctr / items.length) * 100}
          />
          <div className="loaderr"></div>
        </div>
      ) : (
        <div className="h-[600px] w-[750px] bg-white flex flex-col  space-y-6 rounded-xl overflow-auto scrollbar-none ">
          <Accordion type="single" collapsible className="p-4 h-fit ">
            {list.map((item, index) => {
              if (item.length === 0)
                return (
                  <AccordionItem className="h-fit" value={`item-${index}`}>
                    <AccordionTrigger className="text-lg">
                      {items[index].name}
                    </AccordionTrigger>
                    <AccordionContent className="h-fit flex justify-between items-baseline ">
                      <p>No data available</p>
                      <CardFooter className="p-0 pt-2">
                        <Link
                          href={`https://www.amazon.com/s?k=${items[
                            index
                          ].name.replace(/%/g, " and ")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-purple-600 text-white hover:bg-purple-700 py-2 px-4 rounded-md transition-colors duration-300 flex items-center text-sm"
                        >
                          View on Amazon
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </CardFooter>
                    </AccordionContent>
                  </AccordionItem>
                );
              return (
                <AccordionItem
                  className="h-fit"
                  value={`item-${index}`}
                  key={index}
                >
                  <AccordionTrigger className="flex justify-center">
                    <div className=" flex  flex-row justify-between w-full items-center  text-lg">
                      <div className="hover:underline">{items[index].name}</div>

                      <Link
                        href={`https://www.amazon.com/s?k=${items[index].name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-600 text-white hover:bg-purple-700 py-2 w-fit px-4 m-0 rounded-md transition-colors duration-300 flex items-center text-sm"
                      >
                        Explore More on Amazon
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </AccordionTrigger>
                  {item.map((data: data) => (
                    <AccordionContent>
                      <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 h-fit">
                        <div className="flex flex-col sm:flex-row h-fit">
                          <div className="w-full sm:w-1/3 h-fit relative">
                            <Image
                              src={data.image}
                              alt={`item-${index}`}
                              height={200}
                              width={200}
                              className="object-fill h-full w-full"
                              loading="lazy"
                            />
                            {data?.OverallPick && (
                              <Badge className="absolute top-2 left-2 bg-yellow-400 text-yellow-900">
                                Top Rated
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-col justify-between w-full sm:w-2/3 p-4">
                            <CardHeader className="p-0">
                              <CardTitle className="text-lg mb-2">
                                {data.title}
                              </CardTitle>

                              <p className=" py-auto text-2xl font-bold text-purple-800 ">
                                {`$${data.price.split(".")[0]}`}
                              </p>
                              <div className="flex items-center space-x-2 ">
                                <StarRating rating={data.rating} />
                              </div>
                            </CardHeader>
                            <CardFooter className="p-0 mt-auto">
                              <Link
                                href={`https://www.amazon.com/s?k=${data.title.replace(
                                  /&/g,
                                  " and "
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-purple-600 text-white hover:bg-purple-700 py-2 px-4 rounded-md transition-colors duration-300 flex items-center text-sm"
                              >
                                View on Amazon
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </Link>
                            </CardFooter>
                          </div>
                        </div>
                      </Card>
                    </AccordionContent>
                  ))}
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      )}
    </>
  );
};

export default list;
