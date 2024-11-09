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
import { useState, useEffect, useRef, use } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useUserDataStore, viewedGiftList } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface data {
  title: string;
  price: string;
  image: string;
  rating: string;
  numOfRatings: string;
  OverallPick: boolean;
}

const List = () => {
  const { items, search_terms, id } = viewedGiftList.getState();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    Promise.resolve(viewedGiftList.persist.rehydrate()).then(() => {
      setIsHydrated(true);
    });
  }, []);

  console.log(items, search_terms);

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
    <div className=" flex flex-col items-center  ">
      {!isHydrated ? (
        <div className="loading"></div>
      ) : (
        <>
          <div>
            <p className=" text-white text-4xl m-10 mt-20 font-bold">{id}</p>
          </div>
          <div className="h-[600px] w-[750px] bg-white flex flex-col  space-y-6 rounded-xl overflow-auto scrollbar-none ">
            <Accordion type="single" collapsible className="p-4 h-fit ">
              {items.map((item: Array<data>, index: number) => {
                if (item.length === 0)
                  return (
                    <AccordionItem
                      key={index}
                      className="h-fit"
                      value={`item-${index}`}
                    >
                      <AccordionTrigger className="text-lg">
                        {search_terms[index]}
                      </AccordionTrigger>
                      <AccordionContent className="h-fit flex justify-between items-baseline ">
                        <p>No data available</p>
                        <div className="p-0 pt-2">
                          <Link
                            key={index}
                            href={`https://www.amazon.com/s?k=${search_terms[
                              index
                            ].replace(/%/g, " and ")}`}
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
                        <div className="hover:underline">
                          {search_terms[index]}
                        </div>

                        <Link
                          href={`https://www.amazon.com/s?k=${search_terms[index]}`}
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
        </>
      )}
    </div>
  );
};

export default List;
