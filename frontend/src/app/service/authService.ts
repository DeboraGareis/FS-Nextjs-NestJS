import host from "./api";
//! comunicarme por el producto con la persona que vende el mismo...
//! preguntar por la ruta: http://localhost:3001/panel/5678 ya que la debo debe hacer el fetch para no romper..quitar el ? del div de la img
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
    const res = await host.post<RespuestaSignin>("auth/login", login, {
      withCredentials: true,
    });
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
  const { nombre, email, password, retypePassword } = register;
  if (password != retypePassword) {
    throw new Error(`Las contraseñas no coinciden`);
  }
  try {
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

export const Me = async () => {
  try {
    const res = await host.get("/auth/me", { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
