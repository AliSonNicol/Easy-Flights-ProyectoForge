import { Destino } from "../models/destinos.models.js";

// =========================================
// Mapa de CIUDADES por PAÍS (para validar combobox) - Se eligio estos destinos en llamada grupal
// =========================================
const ciudadesPorPais = {
  "Perú": ["Lima", "Cusco", "Cajamarca", "Iquitos", "Arequipa"],
  "Chile": ["Santiago", "Valparaíso", "Antofagasta", "Iquique"],
  "Argentina": ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"],
  "Colombia": ["Bogota", "Cali", "Medellin", "Santa Marta"]
};

// =========================================
// Obtener TODOS los destinos disponibles
// =========================================
const getAll = async (req, res) => {
  try {
    const destinos = await Destino.find();
    res.json(destinos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener destinos" });
  }
};

// =========================================
// Crear un destino - solicita los datos necesarios
// =========================================
const createOne = async (req, res) => {
  try {
    const {
      tipoViaje,
      origenPais,
      origenCiudad,
      destinoPais,
      destinoCiudad,
      fechaIda,
      fechaVuelta,
      moneda,
      aerolinea,
      duracionHoras,
      escalas
    } = req.body;

    // -------------------------------
    // Validación de CIUDADES dependientes del PAÍS (COMBOBOX)
    // -------------------------------

    //es solo una validacion pq se supone el combobox cambia dependiendo del pais pero se mantiene por precaucion
    if (!ciudadesPorPais[origenPais] ||  
        !ciudadesPorPais[origenPais].includes(origenCiudad)) {
      return res.status(400).json({
        message: `La ciudad ${origenCiudad} no pertenece al país ${origenPais}`
      });
    }



    if (!ciudadesPorPais[destinoPais] ||
        !ciudadesPorPais[destinoPais].includes(destinoCiudad)) {
      return res.status(400).json({
        message: `La ciudad ${destinoCiudad} no pertenece al país ${destinoPais}`
      });
    }

    // -------------------------------
    // No permitir ORIGEN = DESTINO IGUALES
    // -------------------------------
    if (
      origenPais === destinoPais &&
      origenCiudad === destinoCiudad
    ) {
      return res.status(400).json({
        message: "El origen y el destino no pueden ser iguales"
      });
    }

    // -------------------------------
    // Validación FECHA IDA  - si se elijhe ida y vuelta debe haber fecha de regreso
    // -------------------------------
    if (!fechaIda) {
      return res.status(400).json({
        message: "La fecha de ida es obligatoria"
      });
    }

    // -------------------------------
    // Validación FECHA VUELTA (solo si aplica)
    // -------------------------------
    if (tipoViaje === "Ida y Vuelta" && !fechaVuelta) {
      return res.status(400).json({
        message: "Debes seleccionar una fecha de vuelta"
      });
    }

    // -------------------------------
    // Crear destino
    // -------------------------------
    const nuevoDestino = await Destino.create({
      tipoViaje,
      origenPais,
      origenCiudad,
      destinoPais,
      destinoCiudad,
      fechaIda,
      fechaVuelta: tipoViaje === "Ida y Vuelta" ? fechaVuelta : null,
      moneda,
      aerolinea,
      duracionHoras,
      escalas
    });

    return res.status(201).json({
      message: "Destino registrado correctamente",
      destino: nuevoDestino
    });

  } catch (error) {
    return res.status(400).json({
      message: "Error al crear destino",
      error: error.message
    });
  }
};

// =========================================
// Obtener destino por ID - se jala de la BD - solo sirve de manera backend, para consultar registros
// =========================================
const getOne = async (req, res) => {
  try {
    const destino = await Destino.findById(req.params.id);

    if (!destino) {
      return res.status(404).json({ message: "Destino no encontrado" });
    }

    return res.json(destino);

  } catch (error) {
    return res.status(400).json({ message: "ID inválido" });
  }
};

// =========================================
// Buscar destinos por ORIGEN / DESTINO / FECHA (filtros) 
// =========================================
const buscar = async (req, res) => {
  try {
    const { origenPais, destinoPais, fechaIda } = req.query;

    let filtro = {};

    if (origenPais) filtro.origenPais = origenPais;
    if (destinoPais) filtro.destinoPais = destinoPais;
    if (fechaIda) filtro.fechaIda = fechaIda;

    const resultados = await Destino.find(filtro);

    res.json(resultados);

  } catch (error) {
    res.status(500).json({ message: "Error en la búsqueda" });
  }
};

// =========================================
// Actualizar destino
// =========================================
const updateOne = async (req, res) => {
  try {
    const destinoActualizado = await Destino.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!destinoActualizado) {
      return res.status(404).json({ message: "Destino no encontrado" });
    }

    return res.json({
      message: "Destino actualizado",
      destino: destinoActualizado
    });

  } catch (error) {
    return res.status(400).json({ message: "Error al actualizar destino" });
  }
};

// =========================================
// Eliminar destino
// =========================================
const deleteOne = async (req, res) => {
  try {
    const eliminado = await Destino.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({ message: "Destino no encontrado" });
    }

    return res.json({ message: "Destino eliminado" });

  } catch (error) {
    return res.status(400).json({ message: "Error al eliminar destino" });
  }
};

// =========================================
// Exportar controlador
// =========================================
export default {
  getAll,
  createOne,
  getOne,
  buscar,
  updateOne,
  deleteOne
};
