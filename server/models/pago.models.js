import mongoose from "mongoose";

const pagoSchema = mongoose.Schema({
  idViaje: { type: mongoose.Schema.Types.ObjectId, ref: "Viaje" },
  estado: { type: String }, // aprobado, rechazado
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model("Pago", pagoSchema);
