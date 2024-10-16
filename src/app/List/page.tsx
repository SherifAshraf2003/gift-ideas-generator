"use client";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useSearchParams } from "next/navigation";

interface data {
  title: string;
  price: string;
  image: string;
  rating: string;
  numOfRatings: string;
  OverallPick: boolean;
}

const List = () => {
  const useParams = useSearchParams();
  const searchData = useParams.get("data");
  const [list, setList] = useState(() => {
    if (typeof window !== "undefined" && searchData) {
      const storedList = localStorage.getItem(searchData);
      return storedList ? JSON.parse(storedList) : [];
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [ctr, setCtr] = useState(0);
  const [items] = useState(() => {
    if (searchData) {
      try {
        console.log(searchData)
        return JSON.parse(
          decodeURIComponent(searchData)
        );
      } catch (error) {
        console.error("Error parsing searchData:", error);
        return [];
      }
    }
    return [];
  });

  const useFetchInProgress = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (list.length > 0) {
        setIsLoading(false);
        return;
      }

      if (useFetchInProgress.current) return;

      useFetchInProgress.current = true;

      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
      const newList = [];
      console.log(items);

      try {
        if (items.length === 0) {
          throw new Error("No items to search for");
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
        if (searchData) {
          localStorage.setItem(searchData, JSON.stringify(newList));
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        useFetchInProgress.current = false;
      }
    };

    fetchData();
  }, [items, searchData]);

  function StarRating({ rating }: { rating: number }) {
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
      {isLoading ? (
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
            {list.map((item: Array<data>, index: number) => {
              if (item.length === 0)
                return (
                  <AccordionItem
                    key={index}
                    className="h-fit"
                    value={`item-${index}`}
                  >
                    <AccordionTrigger className="text-lg">
                      {items[index].name}
                    </AccordionTrigger>
                    <AccordionContent className="h-fit flex justify-between items-baseline ">
                      <p>No data available</p>
                      <div className="p-0 pt-2">
                        <Link
                          key={index}
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
                      </div>
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
                    <AccordionContent key={index}>
                      <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 h-fit">
                        <div className="flex flex-col sm:flex-row h-fit">
                          <div className="w-full sm:w-1/3 h-fit relative">
                            <Image
                              key={index}
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
                                <StarRating rating={parseInt(data.rating)} />
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

export default List;
