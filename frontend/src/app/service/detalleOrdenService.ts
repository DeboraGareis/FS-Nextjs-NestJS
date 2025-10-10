import host from "./api";

interface DetalleOrdenBack {
  cantidad: string;
  id_producto: string;
  id_carrito: string;
  precio: number;
  token: string;
}

export const detalleOrdenService = async ({
  cantidad,
  id_producto,
  id_carrito,
  precio,
  token,
}: DetalleOrdenBack) => {
  const subtotal = Number(cantidad) * Number(precio);

  const detalleOrdenBack = {
    cantidad,
    id_producto,
    id_carrito,
    precio: Number(subtotal),
  };

  try {
    const res = await host.post("/detalle-orden", detalleOrdenBack, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error", error.message);
    }
    console.error(error);
  }
};

export const GetDetallesDeOrdenSegunIdCarrito = async (id: string) => {
  try {
    const resBack = await host.get(`/detalle-orden/id-carrito/${id}`);
    return resBack.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error();
  }
};

export const ActualizarDetalleDeOrdenSegunId = async (
  idDetalleOrden: string,
  cantidad: string,
  subtotal: number,
) => {
  try {
    const actualizacionBack = await host.patch(
      `/detalle-orden/${idDetalleOrden}`,
      { cantidad: cantidad, precio: subtotal },
    );
    return actualizacionBack.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error();
  }
};
