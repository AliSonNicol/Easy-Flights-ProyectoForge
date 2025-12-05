import mongoose from "mongoose";

const viajeSchema = mongoose.Schema({
  destino: { type: String, required: true },
  fechaIda: { type: String, required: true },
  fechaRegreso: { type: String, required: false },
  horario: { type: String, required: true },
  aerolinea: { type: String, required: true },
  equipaje: { type: String, required: true },
  asiento: { type: String, required: true },

  // Datos del pasajero
  nombrePasajero: { type: String, required: true },
  dniPasajero: { type: String, required: true },
  correoPasajero: { type: String, required: true },

  // Pago
  precioTotal: { type: Number, required: true },
  estadoPago: { type: String, default: "pendiente" }, // pendiente, pagado

  fechaCompra: { type: Date, default: Date.now }
});

export default mongoose.model("Viaje", viajeSchema);
