import host from "./api";
import { z } from "zod";

//* idAdministrador es el del vendedor=>idReceptor(back)
//* idComprador es el de la sesion iniciada=>idEmisor(back)
//* contenido del mensaje texto(back)
//* leido(back)debe enviar 'no'

// Esquema Zod en lugar de type o interface
const MensajeDeAyudaZod = z.object({
  idAdministrador: z.string(),
  idComprador: z.string(),
  texto: z.string(),
  leido: z.string(),
});
// Inferimos el tipo de TS a partir del esquema
export type MensajeDeAyuda = z.infer<typeof MensajeDeAyudaZod>;

export const mensajeDeAyuda = async (dato: MensajeDeAyuda) => {
  try {
    // Validación runtime
    const datosValidados = MensajeDeAyudaZod.parse(dato);
    console.log("🗒 datosValidados:", datosValidados);
    const mensajeDeAyudaBack = {
      idEmisor: datosValidados.idAdministrador,
      idReceptor: datosValidados.idComprador,
      texto: datosValidados.texto,
      leido: datosValidados.leido,
    };
    const res = await host.post("mensaje", mensajeDeAyudaBack);
    console.log("🗒 datosValidados:", res);

    return res.data;
  } catch (error) {
    console.log("error(revisa mensaje de ayuda!): ", error);

    throw new Error("revisas mensaje de ayuda!");
  }
};
