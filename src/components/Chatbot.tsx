import Messages from "./Messages";
import { Button } from "@/components/ui/button";
import sendImage from "../public/send.png";
import Image from "next/image";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";

const Chatbot = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const router = useRouter();

  const showList = () => {
    try {
      console.log(messages[messages.length - 1].content);
      router.push("/list");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section>
      <div className="w-[520px] h-[590px] bg-white rounded-t-2xl overflow-auto">
        {messages.map((msg, i) => (
          <Messages key={i} message={msg.content} sender={msg.role} />
        ))}
      </div>

      <div className="flex mt-1 gap-1">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Type your message here..."
          className="h-16 text-sm border-none outline-none break-words overflow-hidden w-full p-3 resize-none"
          autoFocus
        />
        <Button onClick={handleSubmit} variant="secondary" className="h-16">
          <Image src={sendImage} height={32} width={32} alt="Send Button" />
        </Button>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <Button
          variant="secondary"
          size="lg"
          className="mt-4 bg-white text-gradientFrom p-10 text-lg rounded-xl py-8"
          onClick={showList}
        >
          Get Your List
        </Button>
      </div>
    </section>
  );
};

export default Chatbot;
