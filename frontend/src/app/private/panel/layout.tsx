"use client";
import { useRouter } from "next/navigation";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <button
        className="hover:bg-gray-100 text-xl underline px-4 py-3"
        onClick={() => router.push("/private/panel/notifications")}
      >
        NOTIFICACIONES: tienes x mensajes
      </button>
      {children}
    </>
  );
}
