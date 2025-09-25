import { UserType } from "../private/panel/PanelClient";
import host from "./api";

export const ObtenerUsuarios = async () => {
  try {
    const res = await host.get("/usuario");
    return res.data.data;
  } catch (e: any) {
    let error = "Error obtener todos los usuarios ";
    if (e?.response?.data?.message) {
      error = e.response.data.message;
    } else if (e instanceof Error) {
      error = e.message;
    }
    throw new Error(error);
  }
};

export const ObtenerVendedores = async () => {
  try {
    const res = await host.get("/usuario/sellers");
    return res.data.data;
  } catch (e: any) {
    let error = "Error obtener todos los vendedores ";
    if (e?.response?.data?.message) {
      error = e.response.data.message;
    } else if (e instanceof Error) {
      error = e.message;
    }
    throw new Error(error);
  }
};

export const ObtenerUserPorId = async (
  id: string,
): Promise<UserType | null> => {
  try {
    const res = await host.get(`/usuario/${id}`);
    return res.data;
  } catch (e: any) {
    if (e?.response?.status === 404) {
      console.warn("No se encontro el usuario");
    } else {
      console.error("Fallo al obtener usuario:", e.message);
    }
    return null;
  }
};
