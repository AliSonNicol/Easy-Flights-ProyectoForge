import { useNavigate } from "react-router-dom";
import styles from "../css/Busqueda.module.css";
import axios from "axios";
import { useState } from "react";

import AutoCompleteOrigen from "../components/AutoCompleteOrigen";

const Busqueda = ({ logOut }) => {
  const navigate = useNavigate();

  const [origen, setOrigen] = useState(""); // código IATA: "LIM"
  const [destino, setDestino] = useState(""); // código IATA: "BOG"
  const [fechaIda, setFechaIda] = useState("");
  const [fechaVuelta, setFechaVuelta] = useState("");
  const [adultos, setAdultos] = useState(1);
  const [tipoViaje, setTipoViaje] = useState("ida");
  const [clase, setClase] = useState("ECONOMY");
  const [directo, setDirecto] = useState(false);
  const [moneda, setMoneda] = useState("USD");
  const [maxprecio, setMaxprecio] = useState();

  const paisesPermitidos = ["PE", "CL", "AR", "CO"];

  const [sugerenciasOrigen, setSugerenciasOrigen] = useState([]);
  const [sugerenciasDestino, setSugerenciasDestino] = useState([]);

  return (
    <>
      <div className={styles.busqueda}>
        <header className={styles.header}>
          <div>
            <img className={styles.logo} src="src/assets/logo.png" alt="logo" />
            <img
              className={styles.titulo}
              src="src/assets/logoletra.png"
              alt=""
            />
            <p>La forma más simple y fácil de viajar</p>
          </div>
          <div>
            <button onClick={logOut}>Cerrar Sesión</button>
          </div>
        </header>
        <main className={styles.main}>
          <h1>¿A dónde viajamos?</h1>
          <p>¡Tan simple que incluso un adulto mayor puede hacerlo!</p>
          <div className={styles.opciones}>
            <div>
              <label htmlFor="tipoViaje">Tipo de Viaje</label>
              <select name="tipoViaje" id="tipoViaje">
                <option type="text">Solo Ida</option>
                <option type="text">Ida y Vuelta</option>
              </select>
            </div>
            <div>
              <label htmlFor="origen">Origen</label>
              <input
                type="text"
                placeholder="Escribe la ciudad"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="origen">Destino</label>
              <input type="text" placeholder="Escribe la ciudad"></input>
            </div>
            <div>
              <label htmlFor="fechaIda">Fecha de Ida</label>
              <input type="date"></input>
            </div>
            <div>
              <label htmlFor="fechaVuelta">Fecha de Vuelta</label>
              <input type="date"></input>
            </div>
            <div>
              <label htmlFor="adultos">Adultos</label>
              <input type="number" defaultValue={1}></input>
            </div>
          </div>
          <button>¡Viajar!</button>
        </main>
        <footer className={styles.footer}>
          <img src="src/assets/logoytitulo.png" alt="logo" />
          <div className={styles.redes}>
            <p>Contacta con nosotros:</p>
            <div>
              <button className={styles.facebook}></button>
              <button className={styles.instagram}></button>
              <button className={styles.twitter}></button>
              <button className={styles.linkedin}></button>
            </div>
          </div>
          <div className={styles.reclamos}>
            <button></button>
            <a href=" ">Libro de Reclamaciones</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Busqueda;
