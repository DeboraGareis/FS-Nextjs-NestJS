"use client"
import { useUser } from "@/context/UserContext";
import { use } from "react";
import { MessagesType } from "../NotificationsClient";
import BottonPanel from "@/components/BottonPanel";

type Props = {
  chat: string;
  messages: MessagesType[];
};

export default function ChatClient({ chat, messages }: Props) {
  const { user } = useUser();
  const id = chat;
  console.log("id recibido:", id)
    
  return (
      <div className="flex flex-col gap-2">
        {messages
          .filter(message => message.idEmisor === user || message.idReceptor === user)
          .filter(message => message.idEmisor === id || message.idReceptor === id)
          .map((message, index) => {
            const isSentByUser = message.idEmisor === user;

            return (
              <div key={index} className={`p-2 rounded max-w-xs 
                ${
                  isSentByUser
                    ? "bg-emerald-200 self-end text-right"
                    : "bg-gray-200 self-start text-left"
                }`}
              >
                <p className="text-sm">{message.texto}</p>
                <p className="text-[10px] text-gray-500">{message.fechaHora}</p>
              </div>
            );
          })}
          <BottonPanel/>
      </div>
    );
    }