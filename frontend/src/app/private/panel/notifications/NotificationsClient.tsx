"use client";

import BottonPanel from "@/components/BottonPanel";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export type MessagesType={
  id:string;
  idEmisor: string;
  idReceptor: string;
  texto: string;
  fechaHora: string;
  leido: string;
}

export type UserType={
  id: string; 
  nombre: string; 
  password:string; 
  email:string; 
  activo: boolean
}

type Props = {
  messages: MessagesType[];
  users: UserType[];
};

export default function NotificationsClient({ messages, users }: Props) {

  const otherUsers = new Set<string>();
  const { user } = useUser();
  const id = user

  console.log("user: ", user)
  console.log("/////messages:  ", messages, "/////users: ", users)
  messages.forEach((msg) => {
    console.log("mensaje: ",msg)
    if (msg.idEmisor === id) {
      otherUsers.add(msg.idReceptor);
    } else if (msg.idReceptor === id) {
      otherUsers.add(msg.idEmisor);
    }
  });

  const uniqueUsers = Array.from(otherUsers);
  console.log("otros usuarios -> ", otherUsers)
  return (
    <div>
      <div className="flex flex-col items-center ">
        {uniqueUsers.map((otherUserId, index) => {
          const user = users.find((u) => u.id === otherUserId);
          return (
            <div className=" hover:bg-emerald-100 text-xl font-[family-name:var(--font-geist-sans)]" key={index}>
              <Link
                className="text-cyan-900 items-center"
                href={`/panel/notifications/${user?.id}`}
              >
                {user?.email}
              </Link>
            </div>
          );
        })}
      </div>
      <BottonPanel />
    </div>
  );
}