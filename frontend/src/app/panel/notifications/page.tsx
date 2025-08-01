"use client";

import BottonPanel from "@/components/BottonPanel";
import { fake_messages, fake_id, fake_users } from "@/components/utils/data";
import Link from "next/link";

export default function Panel() {
  const messages = fake_messages.user_notification;
  const otherUsers = new Set<string>();
  const users = fake_users;

  // reemplazar por el del usuario logueado:
  const id = fake_id;
  messages.forEach((msg) => {
    if (msg.IdEmisor === id) {
      otherUsers.add(msg.IdReceptor);
    } else if (msg.IdReceptor === id) {
      otherUsers.add(msg.IdEmisor);
    }
  });

  const uniqueUsers = Array.from(otherUsers);
  return (
    <div>
      <div className="flex flex-col items-center ">
        {uniqueUsers.map((otherUserId, index) => {
          const user = users.users.find((u) => u.id === otherUserId);
          return (
            <div className=" hover:bg-emerald-100 text-xl font-[family-name:var(--font-geist-sans)]" key={index}>
              <Link
                className="text-cyan-900 items-center"
                href={`/panel/notifications/${user?.id}`}
              >
                {user?.Email}
              </Link>
            </div>
          );
        })}
      </div>
      <BottonPanel />
    </div>
  );
}