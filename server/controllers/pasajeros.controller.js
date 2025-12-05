import { Pasajeros } from "../models/pasajeros.models.js";

const pasajerosController = {
    getAll: async (req, res) => {
        try {
            const pasajeros = await Pasajeros.find();
            return res.status(201).json(pasajeros);
        } catch (e) {
            return res.status(400).json(e);
        }
    },

    createOne: async (req, res) => {
        console.log(req.infoUser);

        const {
            nombres,
            apellidos,
            correo,
            tipoDocumento,
            numeroDocumento,
            genero,
            tipoContacto,
            numeroContacto,
            direccion,
            nacionalidad
        } = req.body;

        const newArray = {
            nombres,
            apellidos,
            correo,
            tipoDocumento,
            numeroDocumento,
            genero,
            tipoContacto,
            numeroContacto,
            direccion,
            nacionalidad
        };

        try {
            const nuevoPasajero = await Pasajeros.create(newArray);
            res.status(201).json(nuevoPasajero);
        } catch (e) {
            const messages = {};

            if (e.name === "ValidationError") {
                Object.keys(e.errors).forEach(key => {
                    messages[key] = e.errors[key].message;
                });
            }

            if (e.code == 11000) {
                messages['numeroDocumento'] = "El documento ya está registrado.";
            }

            return res.status(400).json({ errors: { ...messages } });
        }
    },

    getOne: async (req, res) => {
        const id = req.params.id;
        try {
            const unPasajero = await Pasajeros.findById(id);
            if (!unPasajero) {
                return res.status(404).json({ message: "El id indicado no existe" });
            }
            res.status(201).json(unPasajero);
        } catch (e) {
            return res.status(400).json(e);
        }
    },

    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const eliminado = await Pasajeros.findByIdAndDelete(id);
            if (!eliminado) {
                return res.status(404).json({ message: "El id no existe" });
            }
            res.status(201).json({ message: "El pasajero fue eliminado correctamente" });
        } catch (e) {
            return res.status(400).json(e);
        }
    },

    updateOne: async (req, res) => {
        const id = req.params.id;
        const {
            nombres,
            apellidos,
            correo,
            tipoDocumento,
            numeroDocumento,
            genero,
            tipoContacto,
            numeroContacto,
            direccion,
            nacionalidad
        } = req.body;

        const dataToBeUpdated = {};

        if (nombres) dataToBeUpdated.nombres = nombres;
        if (apellidos) dataToBeUpdated.apellidos = apellidos;
        if (correo) dataToBeUpdated.correo = correo;
        if (tipoDocumento) dataToBeUpdated.tipoDocumento = tipoDocumento;
        if (numeroDocumento) dataToBeUpdated.numeroDocumento = numeroDocumento;
        if (genero) dataToBeUpdated.genero = genero;
        if (tipoContacto) dataToBeUpdated.tipoContacto = tipoContacto;
        if (numeroContacto) dataToBeUpdated.numeroContacto = numeroContacto;
        if (direccion) dataToBeUpdated.direccion = direccion;
        if (nacionalidad) dataToBeUpdated.nacionalidad = nacionalidad;

        try {
            const actualizado = await Pasajeros.findByIdAndUpdate(
                id,
                dataToBeUpdated,
                { new: true, runValidators: true }
            );

            if (!actualizado) {
                return res.status(404).json({ message: "El id no existe" });
            }

            res.status(201).json(actualizado);
        } catch (e) {
            const messages = {};

            if (e.name === "ValidationError") {
                Object.keys(e.errors).forEach(key => {
                    messages[key] = e.errors[key].message;
                });
            }

            if (e.code == 11000) {
                messages['numeroDocumento'] = "El documento ya está registrado.";
            }

            return res.status(400).json({ errors: { ...messages } });
        }
    }
};

export default pasajerosController;
