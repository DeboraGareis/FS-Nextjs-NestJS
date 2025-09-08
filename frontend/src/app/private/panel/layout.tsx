"use client";
import { useRouter } from "next/navigation";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header del panel */}
      <header className="w-full bg-white shadow p-4 mb-6">
        <button
          className="hover:bg-gray-100 text-xl underline px-4 py-2 rounded"
          onClick={() => router.push("/private/panel/notifications")}
        >
          NOTIFICACIONES: tienes x mensajes
        </button>
      </header>

      {/* Contenido */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
