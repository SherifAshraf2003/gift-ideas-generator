// import Image from "next/image";
// import userImage from "../public/user.png";
// import chatBotImage from "../public/chatbot.svg";

// interface Message {
//   message: string;
//   sender: string;
// }

// const Messages = ({ message, sender }: Message) => {
//   return (
//     <div>
//       {sender === "user" ? (
//         <div className="flex justify-end items-start gap-2.5 p-6">
//           <div className="w-fit max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl rounded-tr-none dark:bg-gray-700 break-words">
//             <span className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
//               {message}
//             </span>
//           </div>
//           <Image
//             className="w-8 h-8 rounded-full"
//             src={userImage}
//             alt="User image"
//             width={32}
//             height={32}
//           />
//         </div>
//       ) : (
//         <div className="flex items-start gap-2.5 p-6">
//           <Image
//             className="w-8 h-8 rounded-full"
//             src={chatBotImage}
//             alt="Chatbot image"
//             width={32}
//             height={32}
//           />
//           <div className="w-fit max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 break-words">
//             <span className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
//               <div dangerouslySetInnerHTML={{ __html: message }} />
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Messages;
