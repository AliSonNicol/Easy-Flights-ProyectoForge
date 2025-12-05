import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Ingresa el nombre del usuario"],
      minlength: [3, "El primer nombre debe tener al menos 3 caracteres."],
      trim: true, // elimina espacios en blanco
    },
    lastName: {
      type: String,
      required: [true, "Ingresa el apellido del usuario."],
      minlength: [3, "El apellido debe tener al menos 3 caracteres."],
      trim: true, // elimina espacios en blanco
    },
    email: {
      type: String,
      required: [true, "Ingresa el email del usuario."],
      unique: true,
      trim: true, // elimina espacios en blanco
      match: [/^\S+@\S+\.\S+$/, "Ingresa un correo válido."],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Ingresa la contraseña."],
      minlength: [8, "La contraseña debe tener al menos 8 caracteres."],
      validate: {
        validator: (value) => /^(?=.*[A-Za-z])(?=.*\d).+$/.test(value),
        message: "La contraseña debe incluir al menos una letra y un número.",
      },
      trim: true,
    },
    // <-- passwordConfirmation NO va aquí, solo será virtual
  },
  { timestamps: true }
);

// Virtual para passwordConfirmation
userSchema.virtual("passwordConfirmation").get(
  function(){
    return this._passwordConfirmation;
  }
).set(function (value) {
    this._passwordConfirmation = value;
});

// Validación contraseñas no coinciden
// userSchema.pre("validate", function(next){
//     if(this.password !== this.passwordConfirmation){
//         this.invalidate('passwordConfirmation', 'Las contraseñas ingresadas no coinciden')
//     }
//     next();
// })

// Validación antes de guardar
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});




const User = mongoose.model("users", userSchema);

export { User, userSchema };
