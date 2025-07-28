import { ServerResponse } from "http";
import host from "./api";
import { AxiosError } from "axios";

export interface Login {
  email: string;
  password: string;
}

interface RespuestaSignin {
  access_token: string;
}

export interface Register {
  email: string;
  nombre: string;
  password: string;
  retypePassword: string;
}

type RegisterSolicitadaPorBack = Pick<
  Register,
  "email" | "nombre" | "password"
>;

interface RespuestaSignup {
  id: string;
  nombre: string;
  password: string;
  email: string;
}

export const signin = async (login: Login) => {
  try {
    const res = await host.post<RespuestaSignin>("auth/login", login);
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

export const Signup = async (register: Register) => {
  try {
    const { nombre, email, password } = register;
    const formBack: RegisterSolicitadaPorBack = { nombre, email, password };

    const res = await host.post<RespuestaSignup>("/usuario", formBack);
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
