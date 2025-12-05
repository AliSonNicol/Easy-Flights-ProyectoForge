import { Router } from "express";
import validateToken from "../middleware/validateToken.js";
import destinosController from "../controllers/destinos.controller.js";

const destinosRoutes = Router();

// =========================================
// OBTENER TODOS LOS DESTINOS
// =========================================
destinosRoutes.get("/", validateToken, destinosController.getAll);

// =========================================
// CREAR NUEVO DESTINO (ida, ida y vuelta)
// =========================================
destinosRoutes.post("/new", validateToken, destinosController.createOne);

// =========================================
// BUSCAR DESTINOS POR FILTROS (origen, destino, fecha)
// =========================================
destinosRoutes.get("/buscar", validateToken, destinosController.buscar);

// =========================================
// OBTENER DESTINO POR ID
// =========================================
destinosRoutes.get("/:id", validateToken, destinosController.getOne);

// =========================================
// ACTUALIZAR DESTINO POR ID
// =========================================
destinosRoutes.put("/update/:id", validateToken, destinosController.updateOne);

// =========================================
// ELIMINAR DESTINO POR ID
// =========================================
destinosRoutes.delete("/destroy/:id", validateToken, destinosController.deleteOne);

export default destinosRoutes;

