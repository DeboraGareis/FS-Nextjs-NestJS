
import host from "./api";

export const ObtenerUsuarios = async () => {
try{
    const res = await host.get("/usuario",{
      withCredentials: true,
    });
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
}

export const ObtenerVendedores = async () => {
try{
    const res = await host.get("/usuario/sellers",{
      withCredentials: true,
    });
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
}
