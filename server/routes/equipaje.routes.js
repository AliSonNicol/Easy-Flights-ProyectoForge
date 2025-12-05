import { Router } from "express";
import validateToken from "../middleware/validateToken.js";
import equipajeController from "../controllers/equipaje.controller.js";

const equipajeRoutes = Router();

// Obtener todos
equipajeRoutes.get("/", validateToken, equipajeController.getAll);

// Crear uno nuevo
equipajeRoutes.post("/new", validateToken, equipajeController.createOne);

// Buscar por nombre (ej: ?nombre=Standard)
equipajeRoutes.get("/buscar", validateToken, equipajeController.buscar);

// Obtener por ID
equipajeRoutes.get("/:id", validateToken, equipajeController.getOne);

// Actualizar
equipajeRoutes.put("/update/:id", validateToken, equipajeController.updateOne);

// Eliminar
equipajeRoutes.delete("/destroy/:id", validateToken, equipajeController.deleteOne);

export default equipajeRoutes;
