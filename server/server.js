import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import toConnectToBd from './config/database.js';

// ===========================
// IMPORTACIÓN DE TODAS LAS RUTAS
// ===========================
import usersRoutes from './routes/users.route.js';
import pasajerosRoutes from './routes/pasajeros.route.js';
import destinosRoutes from './routes/destinos.routes.js';
import equipajeRoutes from './routes/equipaje.routes.js';
import viajesRoutes from './routes/viajes.routes.js';
import pagoRoutes from './routes/pago.routes.js';
import amadeusRoutes from './routes/amadeus.routes.js';

// IMPORTACION DE AMADEUS

import flightsRoutes from "./routes/flights.route.js";

//IMPORTACION RUTA AEROPUERTOS
import airportsRoute from "./routes/aeropuertos.routes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// ===========================
// MIDDLEWARES
// ===========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ===========================
// CONEXIÓN A LA BASE DE DATOS
// ===========================
toConnectToBd();

// ===========================
// RUTAS PRINCIPALES
// ===========================
app.use('/api/users', usersRoutes);
app.use('/api/pasajeros', pasajerosRoutes);
app.use('/api/destinos', destinosRoutes);
app.use('/api/equipaje', equipajeRoutes);
app.use('/api/viajes', viajesRoutes);
app.use('/api/pago', pagoRoutes);
//app.use('/api/amadeus', amadeusRoutes);
app.use("/api/flights", flightsRoutes);
// RUTA DE AEROPUERTOS
app.use("/api/airports", airportsRoute);

// ===========================
// INICIAR SERVIDOR
// ===========================
app.listen(PORT, () => {
    console.log(`Server running en puerto ${PORT}`);
});

export default app;