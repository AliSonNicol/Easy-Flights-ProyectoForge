import { Router } from "express";
import validateToken from "../middleware/validateToken.js";
import viajesController from "../controllers/viajes.controller.js";

const viajesRoutes = Router();

// Obtener todos los viajes (opcional)
viajesRoutes.get("/", validateToken, viajesController.getAll);

// Obtener un viaje por ID
viajesRoutes.get("/:id", validateToken, viajesController.getOne);

// Crear un viaje (cliente comprando)
viajesRoutes.post("/new", validateToken, viajesController.createOne);

// Actualizar viaje (solo para corregir datos del pasajero antes del pago)
viajesRoutes.put("/update/:id", validateToken, viajesController.updateOne);

// Eliminar viaje (si cancela antes del pago)
viajesRoutes.delete("/destroy/:id", validateToken, viajesController.deleteOne);

export default viajesRoutes;
