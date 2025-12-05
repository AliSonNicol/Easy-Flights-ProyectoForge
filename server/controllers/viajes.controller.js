import Viaje from "../models/viajes.models.js";

// =======================================================
// Obtener todos los viajes (opcional)
// =======================================================
const getAll = async (req, res) => {
  try {
    const data = await Viaje.find();
    return res.json(data);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener viajes" });
  }
};

// =======================================================
// Obtener un viaje por ID
// =======================================================
const getOne = async (req, res) => {
  try {
    const viaje = await Viaje.findById(req.params.id);

    if (!viaje) {
      return res.status(404).json({ message: "Viaje no encontrado" });
    }

    return res.json(viaje);

  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error al obtener viaje" });
  }
};

// =======================================================
// Crear un viaje (cliente eligió destino, fecha, equipaje, asiento)
// =======================================================
const createOne = async (req, res) => {
  try {
    const nuevoViaje = await Viaje.create(req.body);

    return res.status(201).json({
      message: "Viaje creado correctamente",
      viaje: nuevoViaje
    });

  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Error al crear viaje",
      error: error.message
    });
  }
};

// =======================================================
// Actualizar viaje (solo si debe corregir datos del pasajero)
// =======================================================
const updateOne = async (req, res) => {
  try {
    const actualizado = await Viaje.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!actualizado) {
      return res.status(404).json({ message: "Viaje no encontrado" });
    }

    return res.json({
      message: "Viaje actualizado correctamente",
      viaje: actualizado
    });

  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error al actualizar viaje" });
  }
};

// =======================================================
// Eliminar viaje (si cancela antes del pago)
// =======================================================
const deleteOne = async (req, res) => {
  try {
    const eliminado = await Viaje.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({ message: "Viaje no encontrado" });
    }

    return res.json({ message: "Viaje eliminado correctamente" });

  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error al eliminar viaje" });
  }
};

export default {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
};
