import { ObtenerMensajes } from "@/app/service/mensajeService";
import { ObtenerUsuarios } from "@/app/service/userService";
import NotificationsClient from "./NotificationsClient";

export default async function NotificationsPage() {
  const messages = await ObtenerMensajes();
  const users = await ObtenerUsuarios();

  return <NotificationsClient users={users} messages={messages} />;
}
