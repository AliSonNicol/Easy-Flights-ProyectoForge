import mongoose from "mongoose";

const equipajeSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El pack debe tener un nombre"],
      enum: ["Basic", "Light", "Standard", "Max Flex"]
    },

    beneficios: {
      type: [String], // lista de características visibles para el cliente
      required: true
    },

    // Equipaje incluido
    equipaje: {
      bolsoMano: {
        type: Number,
        default: 0
      },
      cabina: {
        type: Number,
        default: 0
      },
      bodega: {
        type: Number,
        default: 0
      },
      especial: {
        type: Number,
        default: 0
      }
    },

    // Pesos definidos por la aerolínea (el cliente NO los cambia)
    pesosMaximos: {
      cabinaKg: {
        type: Number,
        default: 10 // ejemplo estándar
      },
      bodegaKg: {
        type: Number,
        default: 23
      }
    },

    // Precio por paquete individual
    precio: {
      type: Number,
      required: [true, "El pack debe tener un precio"]
    },

    moneda: {
      type: String,
      required: true,
      enum: ["CLP", "PEN", "ARS", "COP", "USD"]
    }
  },
  { timestamps: true }
);

const Equipaje = mongoose.model("equipajes", equipajeSchema);

export { Equipaje, equipajeSchema };
