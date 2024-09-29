'use server';
import { streamText, convertToCoreMessages } from 'ai';
import { createStreamableValue } from 'ai/rsc';
import { createMistral } from '@ai-sdk/mistral';

export async function POST(req: Request) {
  
  const mistral = createMistral({ 
    apiKey: process.env.API_KEY,
  });

  const { messages } = await req.json();

  const result = await streamText({
    model: mistral('mistral-large-latest'),
    system: "You are a helpful assistant that generates gift ideas based on the users answers, you are gonna ask the user couple questions about the person he want to buy gifts for, answer each question one by one and then you will generate a list of gifts in Json format only",
    messages: convertToCoreMessages(messages),
  });
  
  return result.toDataStreamResponse();
  
  
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