import { User } from "../models/users.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;

const userController = {
  getAll: async (req, res) => {
    try {
      const allUsers = await User.find();
      return res.status(200).json(allUsers);
    } catch (e) {
      console.error("❌ Error en getAll:", e);
      return res.status(400).json({ error: e.message });
    }
  },

  createOne: async (req, res) => {
    console.log("📥 Body recibido:", req.body);

    const { firstName, lastName, email, password, passwordConfirmation } = req.body;

    try {
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
      });

      const saveToken = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        id: newUser._id,
      };

      jwt.sign(saveToken, SECRET, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          console.error("❌ Error generando token:", err);
          return res.status(500).json({ error: "Error creando token" });
        }

        return res.status(201).json({ token });
      });

    } catch (e) {
      console.error("❌ Error creando usuario:", e);

      const messages = {};

      if (e.name === "ValidationError") {
        Object.keys(e.errors).forEach((key) => {
          messages[key] = e.errors[key].message;
        });
      }

      if (e.code === 11000) {
        messages.email = "El correo ya está registrado";
      }

      return res.status(400).json({ errors: messages });
    }
  },

  login: async (req, res) => {
    try {
      console.log("📥 Body recibido en login:", req.body);

      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Email y password son obligatorios."
        });
      }

      const currentUser = await User.findOne({ email });

      if (!currentUser) {
        return res.status(404).json({
          errors: { email: "El correo ingresado no existe." }
        });
      }

      const passwordMatch = await bcrypt.compare(password, currentUser.password);

      if (!passwordMatch) {
        return res.status(401).json({
          errors: { password: "Credenciales incorrectas." }
        });
      }

      const saveToken = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        id: currentUser._id,
      };

      jwt.sign(saveToken, SECRET, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          console.error("❌ Error creando token:", err);
          return res.status(500).json({
            error: "Error creando token",
            detalle: err.message
          });
        }

        return res.status(200).json({ token });
      });

    } catch (e) {
      console.error("❌ Error en login:", e);
      return res.status(500).json({ error: e.message });
    }
  },

  deleteOne: async (req, res) => {
    try {
      const { email } = req.body;
      const deletedUser = await User.findOneAndDelete({ email });

      if (!deletedUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      return res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (e) {
      console.error("❌ Error eliminando usuario:", e);
      return res.status(500).json({ error: e.message });
    }
  }
};

export default userController;
