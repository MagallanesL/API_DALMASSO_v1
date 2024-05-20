import { getConnection } from "../database/database";

const getProductById = async (req) => {
  try {
    let { productId } = req.params;
    const connection = await getConnection();
    const [results, fields] = await connection.query(
      `SELECT productos.*, precios_venta.precio, precios_venta.moneda FROM productos
      JOIN precios_venta ON precios_venta.IdProducto = productos.IdProducto
      WHERE productos.IdProducto = ?
      ORDER BY precios_venta.fechamod DESC LIMIT 1`,
      productId
    );
    return results;
  } catch (error) {
    console.log("Error en la consulta:", error);
    return error.message;
  }
};

const getProductByNumber = async (req) => {
  try {
    let { productNumber } = req.params;
    const connection = await getConnection();
    const [results, fields] = await connection.query(
      `SELECT productos.*, precios_venta.precio, precios_venta.moneda, productos.FechaALTA
      FROM productos
      JOIN precios_venta ON precios_venta.IdProducto = productos.IdProducto
      WHERE productos.numero = ?
      ORDER BY precios_venta.fechamod DESC LIMIT 1`,
      productNumber
    );

    // Verifica si el campo 'FechaALTA' está presente en los resultados
    if (results.length > 0 && results[0].hasOwnProperty('FechaALTA')) {
      console.log('FechaALTA presente en los resultados');
    } else {
      console.log('FechaALTA no está presente en los resultados');
    }

    return results;
  } catch (error) {
    console.log("Error en la consulta:", error);
    return error.message;
  }
};

const getProductListByKeyword = async (req) => {
  try {
    let { keyword } = req.params;
    keyword = "%" + keyword + "%";
    console.log("queryKeyword:", keyword);
    const connection = await getConnection();
    const [results, fields] = await connection.query(
      "SELECT IdProducto, Nombre FROM productos WHERE nombre LIKE ? LIMIT 30",
      keyword
    );
    return results;
  } catch (error) {
    console.log("Error en la consulta:", error);
    return error.message;
  }
};

const getAllProductNames = async () => {
  try {
    const connection = await getConnection();
    const [results, fields] = await connection.query(
      "SELECT IdProducto,nombre FROM productos LIMIT 60",
    );
    return results;
  } catch (error) {
    console.log("Error en la consulta:", error);
    return error.message;
  }
};

export const methods = {
  getProductListByKeyword,
  getAllProductNames,
  getProductById,
  getProductByNumber,
};
