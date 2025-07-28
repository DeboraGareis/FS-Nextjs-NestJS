"use client"
import { fake_messages, fake_id } from "@/components/utils/data";
import { use } from "react";


export default function Chat({ params }: { params: Promise<{ chat: string }> }) {
  const messages = fake_messages.user_notification;
  //reemplazar por id de usuario logueado
  const id_user = fake_id;
  const { chat } = use(params);
  const id= chat;
  console.log("id recibido:",id)
    return (
      <div className="flex flex-col gap-2">
        {messages
          .filter(message => message.IdEmisor === id_user || message.IdReceptor === id_user)
          .filter(message => message.IdEmisor === id || message.IdReceptor === id)
          .map((message, index) => {
            const isSentByUser = message.IdEmisor === id_user;

            return (
              <div key={index} className={`p-2 rounded max-w-xs 
                ${
                  isSentByUser
                    ? "bg-emerald-200 self-end text-right"
                    : "bg-gray-200 self-start text-left"
                }`}
              >
                <p className="text-sm">{message.Texto}</p>
                <p className="text-[10px] text-gray-500">{message.FechaHora}</p>
              </div>
            );
          })}
      </div>
    );
    }