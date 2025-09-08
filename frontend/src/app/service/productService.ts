import host from "./api";

export type Product = {
  Categoria: string;
  Nombre: string;
  Stock: number;
  Precio: number;
  IdAdministrador: string;
};

export const crearProducto = async (data: Product, file: File) => {
  try {
    const formData = new FormData();
    formData.append("categoria", data.Categoria);
    formData.append("nombre", data.Nombre);
    formData.append("stock", String(data.Stock));
    formData.append("precio", String(data.Precio));
    formData.append("idAdministrador", data.IdAdministrador);
    formData.append("file", file);

    const res = await host.post("/producto", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (e: any) {
    let error = "Error al crear el producto";
    if (e?.response?.data?.message) {
      error = e.response.data.message;
    } else if (e instanceof Error) {
      error = e.message;
    }
    console.log("🖕 ", e);

    throw new Error(error);
  }
};

export const ObtenerProductos = async () => {
  try {
    const res = await host.get("/producto", {
      withCredentials: true,
    });
    return res.data;
  } catch (e: any) {
    let error = "Error obtener todos los productos ";
    if (e?.response?.data?.message) {
      error = e.response.data.message;
    } else if (e instanceof Error) {
      error = e.message;
    }
    throw new Error(error);
  }
};


export const ObtenerProductosVendedor = async (adminId: string) => {
  try {
    const res = await host.get(`/producto/productos/${adminId}`);
    return res.data;
  } catch (e: any) {
  if (e?.response?.status === 404) {
    console.warn("No hay productos para este vendedor");
    return [];
  }
  console.error("Fallo al obtener productos:", e.message);
  return [];
}
};
