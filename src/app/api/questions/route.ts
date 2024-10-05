"use server";
import { generateText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { createMistral } from "@ai-sdk/mistral";

export async function GET(req: Request) {
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
