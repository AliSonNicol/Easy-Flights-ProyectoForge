import { Equipaje } from "../models/equipaje.models.js";

// ---------------------------------------------
// Obtener todos los packs de equipaje
// ---------------------------------------------
const getAll = async (req, res) => {
  try {
    const data = await Equipaje.find();
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener equipajes" });
  }
};

// ---------------------------------------------
// Crear un pack de equipaje
// ---------------------------------------------
const createOne = async (req, res) => {
  try {
    const nuevoEquipaje = await Equipaje.create(req.body);

    return res.status(201).json({
      message: "Pack de equipaje registrado correctamente",
      equipaje: nuevoEquipaje,
    });

  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: "Error al crear pack de equipaje",
      error: error.message
    });
  }
};

// ---------------------------------------------
// Obtener un pack por ID
// ---------------------------------------------
const getOne = async (req, res) => {
  try {
    const equipaje = await Equipaje.findById(req.params.id);

    if (!equipaje) {
      return res.status(404).json({ message: "Pack no encontrado" });
    }

    return res.json(equipaje);

  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error al buscar pack" });
  }
};

// ---------------------------------------------
// Buscar por nombre (Basic, Light, Standard, Max Flex)
// ---------------------------------------------
const buscar = async (req, res) => {
  try {
    const { nombre } = req.query;

    let filtros = {};
    if (nombre) filtros.nombre = nombre;

    const resultados = await Equipaje.find(filtros);

    return res.json(resultados);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al buscar equipajes" });
  }
};

// ---------------------------------------------
// Actualizar pack de equipaje
// ---------------------------------------------
const updateOne = async (req, res) => {
  try {
    const actualizado = await Equipaje.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!actualizado) {
      return res.status(404).json({ message: "Pack no encontrado" });
    }

    return res.json({
      message: "Pack actualizado correctamente",
      equipaje: actualizado
    });

  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error al actualizar pack" });
  }
};

// ---------------------------------------------
// Eliminar pack
// ---------------------------------------------
const deleteOne = async (req, res) => {
  try {
    const eliminado = await Equipaje.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({ message: "Pack no encontrado" });
    }

    return res.json({ message: "Pack eliminado correctamente" });

  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error al eliminar pack" });
  }
};

export default {
  getAll,
  createOne,
  getOne,
  buscar,
  updateOne,
  deleteOne
};
