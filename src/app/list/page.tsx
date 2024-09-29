"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge" 
import { ExternalLink, Star, StarHalf } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";


interface data {
    title: string;
    price: string;
    image: string | any;
    rating: string;
    numOfRatings: number | any;
    OverallPick: boolean;
}


const list = () => {

  

  const [data, setData] = useState<Array<data>>([])

  const handleClick = async () => {
    const response = await fetch("/api/scrape?searchTerm=headphones");
    const data = await response.json();
    console.log(data);
    setData(data);
  };

  function starRating({rating} : { rating: number} ){
    const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return <Star key={index} className="w-4 h-4 text-yellow-400 fill-yellow-400" />;
        } else if (index === fullStars && hasHalfStar) {
          return <StarHalf key={index} className="w-4 h-4 text-yellow-400 fill-yellow-400" />;
        } else {
          return <Star key={index} className="w-4 h-4 text-gray-300" />;
        }
      })}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  )
  }




  return (
    <section className='flex items-center justify-center flex-col h-[100vh] bg-gradient-to-r from-gradientFrom to-gradientTo '>
      <div className='h-[600px] w-[750px] bg-white flex flex-col  space-y-6 rounded-xl overflow-auto '>
      <Card  className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 h-[200px]">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="w-full sm:w-1/3 h-full relative">
                  <Image
                    src={data[1]?.image}
                    alt="earphones"
                    height={200}
                    width={200}
                    className="object-fill h-full w-full"
                    loading="lazy"	
                  />
                  {data[1]?.OverallPick && (
                    <Badge className="absolute top-2 left-2 bg-yellow-400 text-yellow-900">
                      Top Rated
                    </Badge>)}
                </div>
                <div className="flex flex-col justify-between w-full sm:w-2/3 p-4">
                  <CardHeader className="p-0">
                    <CardTitle className="text-lg mb-2">earphones</CardTitle>
                    <Badge variant="outline" className="bg-purple-100 text-purple-800 mb-4 w-fit rounded-full ">
                      technology
                    </Badge>
                    <p className="text-2xl font-bold text-purple-800 mb-2">$400</p>
                    <div className="flex items-center space-x-2 mb-4">
                      <starRating rating= "4.5" />
                      <span className="text-sm text-gray-600">400</span>
                    </div>
                  </CardHeader>
                  <CardFooter className="p-0">
                    <Link 
                      href= "https://www.amazon.com/s?k=earphones"
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
            <Button onClick={handleClick}>
              click me
            </Button>
      </div>
    </section>
  )
}

export default list