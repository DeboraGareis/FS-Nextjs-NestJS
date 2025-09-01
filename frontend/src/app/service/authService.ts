import host from "./api";
import { z } from "zod";

//! comunicarme por el producto con la persona que vende el mismo...
//! preguntar por la ruta: http://localhost:3001/panel/5678 ya que la debo debe hacer el fetch para no romper..quitar el ? del div de la img
//validaciones del componente signin y respuesta del back
const LoginZod = z.object({
  email: z.email(),
  password: z.string().min(6),
});
export type Login = z.infer<typeof LoginZod>;

const RespuestaSigninBackZod = z.object({
  access_token: z.jwt(),
});
export type RespuestaSigninBack = z.infer<typeof RespuestaSigninBackZod>;

//validaciones del componente singup y respuesta del back
const RegisterFrontZod = z.object({
  email: z.email(),
  nombre: z.string(),
  password: z.string().min(6),
  retypePassword: z.string().min(6),
});
export type Register = z.infer<typeof RegisterFrontZod>;

const RegisterBackZod = RegisterFrontZod.omit({ retypePassword: true });
export type RegisterSolicitadaPorBack = z.infer<typeof RegisterBackZod>;

const RespuestaRegisterDelBackZod = z.object({
  id: z.uuid(),
  nombre: z.string(),
  email: z.string(),
});
export type RespuestaRegisterDelBack = z.infer<
  typeof RespuestaRegisterDelBackZod
>;

//coneccion con APIs
export const signin = async (login: Login) => {
  try {
    const res = await host.post<RespuestaSigninBack>("auth/login", login, {
      withCredentials: true,
    });
    res.data;
    return true;
  } catch (e) {
    let error: string = "Hay un error";
    if (e?.response?.data?.message) {
      console.log("e?.response?.data: ", e?.response?.data);
      error = e.response.data.message;
    } else if (e instanceof Error) {
      console.log("e.message: ", e.message);
      error = e.message;
    }
    throw new Error(`Error = ${error}`);
  }
};

export const Signup = async (register: Register) => {
  const { nombre, email, password, retypePassword } = register;
  if (password != retypePassword) {
    throw new Error(`Las contraseñas no coinciden`);
  }
  try {
    const formBack: RegisterSolicitadaPorBack = { nombre, email, password };

    const res = await host.post<RespuestaRegisterDelBack>("/usuario", formBack);
    return res.data;
  } catch (e) {
    let error: string = "Hay un error";
    if (e?.response?.data?.message) {
      console.log("e?.response?.data: ", e?.response?.data);
      error = e.response.data.message;
    } else if (e instanceof Error) {
      console.log("e.message: ", e.message);
      error = e.message;
    }
    throw new Error(`Error = ${error}`);
  }
};

export const Me = async () => {
  try {
    const res = await host.get("/auth/me", { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const ClosedSession = async () => {
  //hacer un metodo para cerrar la sesion y eliminar de la cookie el accesstoken
  //tiene que hacerse desde el backend
};
