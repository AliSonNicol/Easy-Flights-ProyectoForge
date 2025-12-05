
import axios from "axios";

const API_URL = "http://localhost:8080/api/amadeus";

export const buscarAeropuertos = async (palabra) => {
  if (!palabra || palabra.length < 2) return [];

  try {
    const res = await axios.get(`${API_URL}/airport-search`, {
      params: { palabraBusqueda: palabra }
    });

    return res.data;
  } catch (error) {
    console.error("Error consultando aeropuertos:", error);
    return [];
  }
};
