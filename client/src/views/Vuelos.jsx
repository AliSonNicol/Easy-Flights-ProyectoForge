import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Vuelos() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const from = params.get("from");
  const to = params.get("to");
  const date = params.get("date");
  const returnDate = params.get("returnDate");
  const adults = params.get("adults");

  const [vuelos, setVuelos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const obtenerVuelos = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:8080/api/flights/search", {
        params: { from, to, date, returnDate, adults }
      });

      setVuelos(response.data.data || []);
    } catch {
      setError("No se pudieron cargar los vuelos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerVuelos();
  }, []);

  return (
    <div className="contenedor-resultados">
      <h2>Resultados de tu búsqueda</h2>

      <p>
        <strong>Desde:</strong> {from} &nbsp;|&nbsp;
        <strong>Hasta:</strong> {to} &nbsp;|&nbsp;
        <strong>Salida:</strong> {date}
        {returnDate && (
          <>
            {" "}| <strong>Retorno:</strong> {returnDate}
          </>
        )}
      </p>

      {loading && <p>Cargando vuelos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {vuelos.map((v, index) => (
          <div key={index} className="card-vuelo">
            <h3>Oferta {index + 1}</h3>
            <p>
              <strong>Aerolínea:</strong> {v.validatingAirlineCodes?.[0]}
            </p>
            <p>
              <strong>Precio:</strong> {v.price?.total} USD
            </p>

            {v.itineraries?.map((it, i) => (
              <div key={i}>
                <h4>{i === 0 ? "Ida" : "Vuelta"}</h4>
                {it.segments.map((seg, j) => (
                  <p key={j}>
                    {seg.departure.iataCode} → {seg.arrival.iataCode} |
                    {seg.departure.at} - {seg.arrival.at}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
