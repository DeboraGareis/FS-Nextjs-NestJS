import axios from "axios";
import host from "./api";
import { z } from "zod";

// Esquema Zod en lugar de type o interface
const MensajeDeAyudaZod = z
  .object({
    idAdministrador: z.uuid(),
    idComprador: z.uuid(),
    texto: z.string().min(2),
    leido: z.string(),
  })
  .transform((dato) => ({
    idEmisor: dato.idAdministrador,
    idReceptor: dato.idComprador,
    texto: dato.texto,
    leido: dato.leido,
  }));
// tipo de claves que usa el front
export type MensajeDeAyudaFront = z.input<typeof MensajeDeAyudaZod>;

// tipo de claves que solicita el backend
export type MensajeDeAyudaBack = z.output<typeof MensajeDeAyudaZod>;

export const mensajeDeAyuda = async (dato: MensajeDeAyudaFront) => {
  try {
    // Validación runtime
    console.log("dato###", dato);

    const payload = MensajeDeAyudaZod.parse(dato);
    const res = await host.post("mensaje", payload);
    return res.data;
  } catch (error) {
    // tirar error de Zod
    if (error instanceof z.ZodError) {
      console.log(error);

      console.error("ZOD: error de validacion: ", error.errors);
      throw new Error("Datos invalidos en mensaje de ayuda");
    }
    // tirar error de axios
    if (axios.isAxiosError(error)) {
      console.error("Error HTTP:", error.response?.data);
      throw new Error(
        error.response?.data?.detail ?? "Error desconocido del backend",
      );
    }
    console.log("throw error: ", error);
    throw new Error("Error inesperado al enviar mensaje de ayuda");
  }
};

export const ObtenerMensajes = async () => {
  //?mostrar solo loe mensajes que envio y recibio el cliente,
  //? hacer un metodo en el backend qque filtre con el id del emisor
  //? y el id de receptor
  try {
    const res = await host.get("mensaje");
    return res.data;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   catch (e: any) {
    let error = "Error obtener mensajes";
    if (e?.response?.data?.message) {
      error = e.response.data.message;
    } else if (e instanceof Error) {
      error = e.message;
    }
    throw new Error(error);
  }
};
