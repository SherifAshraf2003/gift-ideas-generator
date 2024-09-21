import Messages from "./Messages"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import sendImage from "../../public/send.png"
import Image from 'next/image';
import { useState } from "react";
import { Mistral } from '@mistralai/mistralai';
import { remark } from 'remark';
import html from 'remark-html';
import { useChat } from 'ai/react';



type Message = {
  text: string;
  sender: "user" | "chatBot";
};

const Chatbot = () => {

  const { messages, input, handleInputChange, handleSubmit } = useChat();

  
  const [message, setMessage] = useState("")
  
  const handleClick = async () => {
    
  }

  return (
    <section>
      <div className=" w-[520px] h-[590px] bg-white rounded-t-2xl overflow-auto ">
        
      {messages.map((msg, i) => (
        <Messages key={i} message={msg.content} sender={msg.role} />
      ))}

      </div>
        
      <div className="flex mt-1 gap-1">
        <textarea
        value={input}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
            setMessage("");
          }
        }}
        placeholder="Type your message here..."
        className="h-16 text-sm border-none outline-none break-words overflow-hidden w-full p-3 resize-none"
        autoFocus  
        />
        <Button onClick={handleSubmit} variant= "secondary" className="h-16" >
          <Image src={sendImage} height={32} width={32} alt="Send Button" />
        </Button>
      </div>
    </section>
  );
};

export default Chatbot;



/**
 

 if (message.trim()) {
   setMessages((prevMessages) => [...prevMessages, { text: message, sender: "user" }])
   setMessage("")
 }
 
 
 
 const client = new Mistral({apiKey: key});
 const chatResponse = await client.agents.complete({
   agentId: 'ag:c78b1f9a:20240918:untitled-agent:31feeb9c',
   messages: [
     {role: 'user', content: message}
   ],
 });
 
 console.log(message)
 
 if (chatResponse.choices && chatResponse.choices.length > 0) {
   const content = chatResponse.choices[0].message.content || "No response";
   const processedContent = await remark().use(html).process(content);
   const contentHtml = processedContent.toString();
   setMessages(prevMessages => [...prevMessages, { text: contentHtml, sender: "chatBot" }]);
   console.log(contentHtml)
 }

 const [messages, setMessages] = useState<Message[]>([
   { text: "Hello!, I am your personal Gift ideas generator, How can I assist you today?", sender: "chatBot" },
 ])


 You are a helpful assistant that generates gift ideas based on the users answers, you are gonna ask the user couple questions about the person he want to buy gifts for, answer each question one by one and then you will generate a list of gift ideas
 */