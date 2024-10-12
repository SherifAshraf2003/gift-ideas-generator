"use server";
import { generateText } from "ai";
import { createMistral } from "@ai-sdk/mistral";
import { NextRequest } from "next/server";

interface Answers {
  question: string;
  answer: string;
}

export async function GET() {
  console.log("Hi");
  const mistral = createMistral({
    apiKey: process.env.API_KEY,
  });
  const prompt =
    "give me all the questions you need to generate the most customized gift ideas for the user";

  const result = await generateText({
    model: mistral("mistral-large-latest"),
    system:
      "You are a helpful assistant that generates gift ideas based on the users answers, you are gonna ask the user couple questions about the person he want to buy gifts for and then you will generate a list of gifts, REPLY IN JSON FORMAT ONLY AND DONT GIVE ME OPTIONS",
    prompt,
  });

  return Response.json({ result });
}

export async function POST(req: NextRequest) {
  console.log("hello");
  const body = await req.json();
  const { answers }: { answers: Array<Answers> } = body;
  const mistral = createMistral({
    apiKey: process.env.API_KEY,
  });
  const prompt = answers
    .map((answer) => {
      return `Question: ${answer.question}\nAnswer: ${answer.answer}`;
    })
    .join("\n");
  console.log("hello");

  const result = await generateText({
    model: mistral("mistral-large-latest"),
    system:
      "You are a helpful assistant that generates gift ideas based on the users answers, you just asked the user a couple questions about the person he want to buy gifts for, i will provide you with the answers to these questions and then you will generate a list of gifts, REPLY IN JSON FORMAT ONLY",
    prompt,
  });
  return Response.json({ result });
}

/*
const stream = createStreamableValue('');
(async () => {
  const { textStream } = await streamText({
    model: mistral('mistral-large-latest'),
    prompt: input,
  });
  
  for await (const delta of textStream) {
    stream.update(delta);
  }
  
  stream.done();
})();

return { output: stream.value };
*/
