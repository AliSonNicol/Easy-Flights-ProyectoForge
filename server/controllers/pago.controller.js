// pago.controller.js
import { MercadoPagoConfig, Preference } from "mercadopago";
import Viaje from "../models/viajes.models.js";
import Pago from "../models/pago.models.js";

// Inicializar Mercado Pago con tu token
const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_TOKEN_SANDBOX
});

// Crear preferencia y enviar al simulador
export const crearPago = async (req, res) => {
  try {
    const datos = req.body;

    const preference = {
      items: [
        {
          title: `Vuelo a ${datos.destino}`,
          unit_price: Number(datos.precioTotal),
          quantity: 1
        }
      ],
      back_urls: {
        success: "http://localhost:8080/api/pago/exito",
        failure: "http://localhost:8080/api/pago/error"
      },
      auto_return: "approved",
      metadata: datos
    };

    const result = await Preference.create(mp, preference);

    res.json({ url: result.body.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear pago" });
  }
};

// Pago exitoso
export const pagoExitoso = async (req, res) => {
  try {
    const datos = req.query;

    const via = await Viaje.create(datos.metadata);

    await Pago.create({
      idViaje: via._id,
      estado: "aprobado"
    });

    res.send("PAGO EXITOSO. VIAJE REGISTRADO.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al confirmar pago" });
  }
};

// Pago fallido
export const pagoFallido = (req, res) => {
  res.send("EL PAGO FUE CANCELADO O FALLO.");
};
