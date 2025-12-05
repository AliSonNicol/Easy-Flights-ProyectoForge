import express from "express";
import { crearPago, pagoExitoso, pagoFallido } from "../controllers/pago.controller.js";

const router = express.Router();

router.post("/crear", crearPago);
router.get("/exito", pagoExitoso);
router.get("/error", pagoFallido);

export default router;
