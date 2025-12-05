import mongoose from "mongoose";

const pasajerosSchema = mongoose.Schema(
  {
    nombres: {
      type: String,
      required: [true, "Por favor ingresa los nombres del pasajero"],
      minlength: [3, "Los nombres deben tener al menos 3 caracteres."],
      trim: true
    },
    apellidos: {
      type: String,
      required: [true, "Por favor ingresa los apellidos del pasajero"],
      minlength: [3, "Los apellidos deben tener al menos 3 caracteres."],
      trim: true
    },
    correo: {
      type: String,
      required: [true, "Por favor ingresa el correo del pasajero."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Por favor ingresa un correo válido."]
    },
    tipoDocumento: {
      type: String,
      required: [true, "Selecciona el tipo de documento"],
      enum: ["DNI", "PASAPORTE", "OTROS"]
    },
    dni: {
      type: String,
      required: [true, "Por favor ingresa el número de documento"],
      minlength: [8, "El documento debe tener al menos 8 caracteres."],
      trim: true,
      unique: true
    },
    genero: {
      type: String,
      required: [true, "Selecciona el género"],
      enum: ["Masculino", "Femenino", "Otro"]
    },
    tipoTelefono: {
      type: String,
      required: [true, "Selecciona el tipo de teléfono"],
      enum: ["Teléfono", "Celular"]
    },
    telefono: {
      type: String,
      required: [true, "Por favor ingresa un número de contacto"],
      minlength: [9, "El número debe tener al menos 9 caracteres."],
      trim: true
    },
    direccion: {
      type: String,
      required: [true, "Por favor ingresa la dirección del pasajero"],
      minlength: [5, "La dirección debe tener al menos 5 caracteres."],
      trim: true
    },
    nacionalidad: {
      type: String,
      required: [true, "Selecciona la nacionalidad"],
      enum: ["Chilena", "Peruana", "Argentina", "Colombiana"]
    }
  },
  { timestamps: true }
);

const Pasajeros = mongoose.model("pasajeros", pasajerosSchema);

export { Pasajeros, pasajerosSchema };
