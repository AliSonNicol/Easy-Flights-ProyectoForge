import mongoose from "mongoose";

const destinosSchema = mongoose.Schema(
  {
    tipoViaje: {
      type: String,
      required: [true, "Selecciona el tipo de viaje"],
      enum: ["Ida", "Ida y Vuelta"]
    },

    // ORIGEN -- Se hara con combobox dependiendo del pais
    origenPais: {
      type: String,
      required: true,
      enum: ["Perú", "Chile", "Argentina", "Colombia"]
    },

    origenCiudad: {
      type: String,
      required: true
    },

    // DESTINO
    destinoPais: {
      type: String,
      required: true,
      enum: ["Perú", "Chile", "Argentina", "Colombia"]
    },

    destinoCiudad: {  //esto jala las ciudades dependiendo del pais seleccionado
      type: String,
      required: true
    },

    // FECHAS DEL VIAJE
    fechaIda: {
      type: Date,
      required: [true, "Selecciona una fecha de ida"]
    },

    fechaVuelta: {
      type: Date,
      required: false // Solo aplica cuando tipoViaje = "Ida y Vuelta"
    },

    // MONEDA SUGERIDA
    moneda: {
      type: String,
      required: true,
      enum: ["PEN", "CLP", "ARS", "COP", "USD"]
    },

    // AEROLÍNEA
    aerolinea: {
      type: String,
      required: true,
      enum: ["LATAM", "Sky Airlines", "JetSmart", "Avianca"] //solo 4 por ahora
    },

    // DURACIÓN ESTIMADA DEL VUELO
    duracionHoras: { //si o si number
      type: Number,
      default: 3
    },

    // ESCALAS
    escalas: [  // lista de escalas (si las hay)
      {
        aeropuerto: { type: String },
        ciudad: { type: String },
        duracion: { type: String } // Ejemplo: "1h 20m"   
      }
    ]
  },
  { timestamps: true }
);

const Destino = mongoose.model("destinos", destinosSchema);

export { Destino, destinosSchema };
