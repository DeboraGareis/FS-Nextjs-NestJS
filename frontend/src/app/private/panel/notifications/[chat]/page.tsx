import { ObtenerMensajes } from "@/app/service/mensajeService";
import ChatClient from "./ChatClient";

type Props = {
  chat: string;
};
export default async function NotificationsPage({ params }: { params: { chat: string } }) {
  const messages = await ObtenerMensajes();
  return <ChatClient messages={messages} chat={params.chat} />;
}