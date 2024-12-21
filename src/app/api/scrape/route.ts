import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

interface products {
  title: string;
  price: string;
  image: string;
  rating: string;
  numOfRatings: string;
  OverallPick: boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm");
  const newSearchTerm = searchTerm?.replace(/ /g, "+");
  console.log(newSearchTerm);

  const url = `https://www.amazon.com/s?k=${newSearchTerm}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });

    const $ = cheerio.load(data);

    const products: Array<products> = [];

    $("div.s-result-item").each((_, element) => {
      const selector = "a h2 span";

      const title = $(element).find(selector).first().text().trim();

      const priceWhole = $(element).find("span.a-price-whole").text().trim();
      const priceFraction = $(element)
        .find("span.a-price-fraction")
        .text()
        .trim();
      const image = $(element).find("img.s-image").attr("src");
      const rating = $(element)
        .find("span.a-icon-alt")
        .text()
        .trim()
        .split(" ")[0];
      const numOfRatings = $(element).find("span.a-size-base").text().trim();
      const OverallPick = numOfRatings.includes("Overall Pick") ? true : false;

      if (title && priceWhole && priceFraction && image) {
        products.push({
          title,
          price: `${priceWhole}.${priceFraction}`,
          image,
          rating,
          numOfRatings,
          OverallPick,
        });
      }
    });

    // Debug log
    console.log("Number of products found:", products.length);

    if (products.length === 0) {
      // Log the HTML structure for debugging
      console.log(
        "Sample HTML structure:",
        $("div.s-result-item").first().html()
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}
