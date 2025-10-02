"use client";
import { useUser } from "@/context/UserContext";
import { useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { MessagesType } from "../NotificationsClient";
import BottonPanel from "@/components/BottonPanel";

type Props = {
  chat: string;
};
type socketType=null|Socket;
export default function ChatClient({ chat }: Props) {
  const hostServer = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useUser();
  const id = chat;

  const contenidoMensaje = {
    idEmisor: "",
    idReceptor: "",
    leido: "",
    texto: "",
  };

  // ---------- Todos los hooks al inicio ----------
  const [socket, setSocket] = useState<socketType>(null);
  const [mensaje, setMensaje] = useState(contenidoMensaje);
  const [mensajesServer, setMensajesServer] = useState<MessagesType[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Conexión cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!user) return;
    const sket = io(hostServer);
    setSocket(sket);

    sket.emit("join", user);
    sket.on("mensaje", (data) => setMensajesServer((prev) => [...prev, data]));
    sket.on("historial_mensajes", (msgs) => setMensajesServer(msgs));

    return () => {
      sket.off("mensaje");
      sket.off("historial_mensajes");
      sket.disconnect();
    };
  }, [user]);

  // Obtener mensajes al montar
  useEffect(() => {
    if (isClient && socket && user && id) {
      socket.emit("obtener_mensajes", {
        idEmisor: user,
        idReceptor: id,
      });
    }
  }, [isClient, socket, id, user]);

  // useMemo siempre arriba, nunca condicional
  const arrayMensaje = useMemo(() => {
    if (!mensajesServer || !user) return [];
    return mensajesServer
      .filter((msg) => msg.idEmisor === id || msg.idReceptor === id)
      .filter((msg) => msg.idEmisor === user || msg.idReceptor === user);
  }, [mensajesServer, user, id]);

  // ---------- Condicionales de render ----------
  if (!isClient || !user) return <div>Cargando chat...</div>;

  // ---------- Handlers ----------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMensaje({ ...mensaje, [name]: value });
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socket) return;
    socket.emit("enviar_mensaje", {
      ...mensaje,
      idEmisor: user,
      idReceptor: id,
      leido: "no",
    });
    setMensaje(contenidoMensaje);
  };

  // ---------- JSX ----------
  return (
    <div className="flex flex-col gap-2">
      {arrayMensaje.map((msg, index) => (
        <div
          key={index}
          className={`p-2 rounded max-w-xs ${
            msg.idEmisor === user
              ? "bg-emerald-200 self-end text-right"
              : "bg-gray-200 self-start text-left"
          }`}
        >
          <p className="text-sm">{msg.texto}</p>
          <p className="text-[10px] text-gray-500">{msg.fechaHora}</p>
        </div>
      ))}
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="mensaje"
          className="p-1 border-1 border-CFFBEE border-y-emerald-400 rounded-lg focus:border-emerald-600 focus:bg-emerald-200 outline-none"
          name="texto"
          value={mensaje.texto}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="border-1 bg-CFFBEE p-1 rounded-lg focus:bg-emerald-200"
        >
          enviar
        </button>
      </form>
      <BottonPanel />
    </div>
  );
}
